import { useEffect, useState, useCallback } from "react";
import { roleService } from "../services/role.service";
import { RoleContext } from "./RoleContext";
import { useAuth } from "../hooks/useAuth";
import { getCurrentUserRole } from "../services/profile.service";

const ROLE_REFRESH_INTERVAL = 15000; // Refresh every 15 seconds for faster role updates

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const { roleId, isAuthenticated } = useAuth();
  const [roleInfo, setRoleInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRoleId, setCurrentRoleId] = useState<string | null>(roleId);

  // Fetch role details based on roleId
  const fetchRoleDetail = useCallback(async (roleIdToFetch: string | null) => {
    if (!roleIdToFetch) {
      setRoleInfo(null);
      setLoading(false);
      return;
    }

    try {
      const data = await roleService.getRoleDetail(roleIdToFetch);
      setRoleInfo(data?.[0] || null);
    } catch (error) {
      console.error("Failed to fetch role detail:", error);
      setRoleInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user's role has changed by fetching from the backend
  const checkAndUpdateRole = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      // Try the dedicated current-role endpoint
      const currentRole = await getCurrentUserRole();
      
      if (currentRole && currentRole.role_id) {
        const storedRoleId = localStorage.getItem("role_id");
        
        // If role_id has changed, update localStorage and fetch new permissions
        if (currentRole.role_id !== storedRoleId) {
          // Update localStorage with new role info
          localStorage.setItem("role_id", currentRole.role_id);
          localStorage.setItem("role", currentRole.role);
          
          // Update state and fetch new role details
          setCurrentRoleId(currentRole.role_id);
          await fetchRoleDetail(currentRole.role_id);
          
          // Dispatch custom event for other components
          window.dispatchEvent(new CustomEvent('roleUpdated'));
          return;
        }
      }
      
      // If no role change detected, just refresh current role permissions
      // This handles the case where role_id is same but permissions might have changed
      if (currentRoleId) {
        await fetchRoleDetail(currentRoleId);
      }
    } catch (error) {
      console.error("Failed to check role update:", error);
      // Fallback: just refresh current role details
      if (currentRoleId) {
        await fetchRoleDetail(currentRoleId);
      }
    }
  }, [isAuthenticated, currentRoleId, fetchRoleDetail]);

  // Initial fetch when roleId changes
  useEffect(() => {
    setCurrentRoleId(roleId);
    fetchRoleDetail(roleId);
  }, [roleId, fetchRoleDetail]);

  // Periodic refresh to catch role and permission changes made by superadmin
  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial check after a short delay
    const initialCheck = setTimeout(() => {
      checkAndUpdateRole();
    }, 2000);

    const intervalId = setInterval(() => {
      checkAndUpdateRole();
    }, ROLE_REFRESH_INTERVAL);

    return () => {
      clearTimeout(initialCheck);
      clearInterval(intervalId);
    };
  }, [isAuthenticated, checkAndUpdateRole]);

  // Listen for storage events (when role changes in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'role_id' && e.newValue) {
        setCurrentRoleId(e.newValue);
        fetchRoleDetail(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [fetchRoleDetail]);

  // Listen for custom role update event (triggered when admin changes user's role)
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
