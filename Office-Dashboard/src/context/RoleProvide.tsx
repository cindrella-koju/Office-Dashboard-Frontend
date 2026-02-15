import { useEffect, useState } from "react";
import { roleService } from "../services/role.service";
import { RoleContext } from "./RoleContext";

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [roleInfo, setRoleInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roleId = localStorage.getItem("role_id");
    
    if (!roleId) {
      setLoading(false);
      return;
    }

    const fetchRoleDetail = async () => {
      try {
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
  }, []);

  if (loading) return null;

  return (
    <RoleContext.Provider value={roleInfo}>
      {children}
    </RoleContext.Provider>
  );
};
