import { useEffect, useState } from "react";
import { roleService } from "../services/role.service";
import { RoleContext } from "./RoleContext";
import { useAuth } from "../hooks/useAuth";

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const { roleId } = useAuth();
  const [roleInfo, setRoleInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleId) {
      setRoleInfo(null);
      setLoading(false);
      return;
    }

    const fetchRoleDetail = async () => {
      try {
        setLoading(true);
        const data = await roleService.getRoleDetail(roleId);
        setRoleInfo(data?.[0] || null);
      } catch (error) {
        console.error("Failed to fetch role detail:", error);
        setRoleInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleDetail();
  }, [roleId]);

  if (loading) return null;
  
  return (
    <RoleContext.Provider value={roleInfo}>
      {children}
    </RoleContext.Provider>
  );
};
