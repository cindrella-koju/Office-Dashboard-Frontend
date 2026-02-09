
import useFetch from "../hooks/useFetch";
import { RETRIEVE_ROLE_DETAIL } from "../constants/urls";
import { RoleContext } from "./RoleContext";

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const roleId = localStorage.getItem("role_id")
  const { data: roleDetail, loading, error } = useFetch(
    RETRIEVE_ROLE_DETAIL(roleId ? roleId : "")
  );
  const roleInfo = roleDetail?.[0];
  if (loading) return null;
  if (error) return null;

  return (
    <RoleContext.Provider value={roleInfo}>
      {children}
    </RoleContext.Provider>
  );
};
