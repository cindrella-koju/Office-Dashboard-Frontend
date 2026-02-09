import { useState, useEffect, type ReactNode } from "react";
import type { Role } from "./auth.type";
import { AuthContext } from "./authContect";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  userId: string | null;
  roleId: string | null;
  role: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isAuthorized: (allowedRoles?: Role[]) => boolean;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const storedRoleId = localStorage.getItem("role_id");
    const storedRole = localStorage.getItem("role");
    const storedAccessToken = sessionStorage.getItem("access_token");

    if (storedUserId && storedRole && storedAccessToken) {
      setUserId(storedUserId);
      setRoleId(storedRoleId);
      setRole(storedRole as Role);
      setAccessToken(storedAccessToken);
    }
  }, []);

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

  const logout = () => {
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

  const isTokenValid = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;
      return decoded.exp > now;
    } catch {
      return false;
    }
  };

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
    isAuthenticated: !!userId,
    isAuthorized,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
