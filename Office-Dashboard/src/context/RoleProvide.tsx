import { useEffect, useState, useCallback, useRef } from "react";
import { roleService } from "../services/role.service";
import { RoleContext } from "./RoleContext";
import { useAuth } from "../hooks/useAuth";
import { getCurrentUserRole } from "../services/profile.service";

const ROLE_REFRESH_INTERVAL = 30000;

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const { roleId, isAuthenticated } = useAuth();
  const [roleInfo, setRoleInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRoleId, setCurrentRoleId] = useState<string | null>(roleId);

  const isRequestInProgressRef = useRef(false);
  const isTabVisibleRef = useRef(true);

  const fetchRoleDetail = useCallback(async (roleIdToFetch: string | null) => {
    if (!roleIdToFetch) {
      setRoleInfo(null);
      setLoading(false);
      return;
    }

    if (isRequestInProgressRef.current) return;
    isRequestInProgressRef.current = true;

    try {
      const data = await roleService.getRoleDetail(roleIdToFetch);
      setRoleInfo(data?.[0] || null);
    } catch (error) {
      console.error("Failed to fetch role detail:", error);
      setRoleInfo(null);
    } finally {
      setLoading(false);
      isRequestInProgressRef.current = false;
    }
  }, []);

  // Check if user's role has changed
  const checkAndUpdateRole = useCallback(async () => {
    if (!isAuthenticated || !isTabVisibleRef.current) return;

    // Prevent concurrent checks
    if (isRequestInProgressRef.current) return;

    try {
      const currentRole = await getCurrentUserRole();
      
      if (currentRole && currentRole.role_id) {
        const storedRoleId = localStorage.getItem("role_id");
        
        // If role_id has changed, update localStorage and fetch new permissions
        if (currentRole.role_id !== storedRoleId) {
          localStorage.setItem("role_id", currentRole.role_id);
          localStorage.setItem("role", currentRole.role);
          setCurrentRoleId(currentRole.role_id);
          await fetchRoleDetail(currentRole.role_id);
          window.dispatchEvent(new CustomEvent('roleUpdated'));
          return;
        }
      }

      if (currentRoleId) {
        await fetchRoleDetail(currentRoleId);
      }
    } catch (error) {
      console.error("Failed to check role update:", error);
    }
  }, [isAuthenticated, currentRoleId, fetchRoleDetail]);

  // Initial fetch when roleId changes
  useEffect(() => {
    setCurrentRoleId(roleId);
    fetchRoleDetail(roleId);
  }, [roleId, fetchRoleDetail]);

  // Periodic refresh - only when tab is visible
  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial check after a short delay
    const initialCheck = setTimeout(() => {
      checkAndUpdateRole();
    }, 3000);

    const intervalId = setInterval(() => {
      if (isTabVisibleRef.current) {
        checkAndUpdateRole();
      }
    }, ROLE_REFRESH_INTERVAL);

    return () => {
      clearTimeout(initialCheck);
      clearInterval(intervalId);
    };
  }, [isAuthenticated, checkAndUpdateRole]);

  // Track tab visibility - don't poll when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabVisibleRef.current = document.visibilityState === 'visible';
      
      // Refresh when tab becomes visible again
      if (isTabVisibleRef.current && isAuthenticated) {
        checkAndUpdateRole();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAuthenticated, checkAndUpdateRole]);

  // Listen for storage events (when role changes in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'role_id' && e.newValue && e.newValue !== currentRoleId) {
        setCurrentRoleId(e.newValue);
        fetchRoleDetail(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentRoleId, fetchRoleDetail]);

  // Listen for custom role update event
  useEffect(() => {
    const handleRoleUpdate = () => {
      const newRoleId = localStorage.getItem("role_id");
      if (newRoleId && newRoleId !== currentRoleId) {
        setCurrentRoleId(newRoleId);
        fetchRoleDetail(newRoleId);
      }
    };

    window.addEventListener('roleUpdated', handleRoleUpdate);
    return () => window.removeEventListener('roleUpdated', handleRoleUpdate);
  }, [currentRoleId, fetchRoleDetail]);

  if (loading) return null;
  
  return (
    <RoleContext.Provider value={roleInfo}>
      {children}
    </RoleContext.Provider>
  );
};
