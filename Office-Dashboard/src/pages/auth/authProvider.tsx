import { useState, useEffect, useCallback, type ReactNode } from "react";
import type { Role, AuthContextType } from "./auth.type";
import { AuthContext } from "./authContext";
import { jwtDecode } from "jwt-decode";
import { authClient } from "../../services/auth.client";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUserId = localStorage.getItem("user_id");
        const storedRoleId = localStorage.getItem("role_id");
        const storedRole = localStorage.getItem("role");
        const storedAccessToken = sessionStorage.getItem("access_token");
        const storedRefreshToken = localStorage.getItem("refresh_token");

        if (storedAccessToken && isTokenValid(storedAccessToken)) {
          // Access token is still valid
          setUserId(storedUserId);
          setRoleId(storedRoleId);
          setRole(storedRole as Role);
          setAccessToken(storedAccessToken);
        } else if (storedRefreshToken) {
          // Try to refresh the access token
          const refreshed = await refreshTokenInternal();
          if (!refreshed && storedUserId) {
            // Refresh failed, clear auth state
            clearAuthState();
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth:logout events from authClient
    const handleLogoutEvent = () => {
      logout();
    };

    window.addEventListener("auth:logout", handleLogoutEvent);
    return () => {
      window.removeEventListener("auth:logout", handleLogoutEvent);
    };
  }, []);

  const clearAuthState = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("role_id");
    localStorage.removeItem("role");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");

    setUserId(null);
    setRoleId(null);
    setRole(null);
    setAccessToken(null);
  };

  const login = (access_token: string, refresh_token: string) => {
    try {
      const decoded: any = jwtDecode(access_token);

      localStorage.setItem("user_id", decoded.sub);
      localStorage.setItem("role_id", decoded.role_id);
      localStorage.setItem("role", decoded.role);

      sessionStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      setUserId(decoded.sub);
      setRoleId(decoded.role_id);
      setRole(decoded.role);
      setAccessToken(access_token);
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  const logout = useCallback(() => {
    clearAuthState();
    authClient.clearTokens();
  }, []);

  const isTokenValid = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      // Add 30 second buffer before actual expiration
      return decoded.exp > now + 30;
    } catch {
      return false;
    }
  };

  const refreshTokenInternal = async (): Promise<boolean> => {
    try {
      const newToken = await authClient.refreshAccessToken();
      
      if (newToken) {
        const decoded: any = jwtDecode(newToken);
        
        setUserId(decoded.sub);
        setRoleId(decoded.role_id);
        setRole(decoded.role);
        setAccessToken(newToken);

        localStorage.setItem("user_id", decoded.sub);
        localStorage.setItem("role_id", decoded.role_id);
        localStorage.setItem("role", decoded.role);

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  const refreshToken = useCallback(async (): Promise<boolean> => {
    return refreshTokenInternal();
  }, []);

  const isAuthorized = (allowedRoles?: Role[]) => {
    if (!accessToken || !userId || !isTokenValid(accessToken)) return false;
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return allowedRoles.includes(role!);
  };

  const value: AuthContextType = {
    userId,
    roleId,
    role,
    accessToken,
    isAuthenticated: !!userId && !!accessToken,
    isLoading,
    isAuthorized,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
