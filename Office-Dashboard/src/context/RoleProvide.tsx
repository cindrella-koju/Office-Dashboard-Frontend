
import useFetch from "../hooks/useFetch";
import { RETRIEVE_ROLE_DETAIL } from "../constants/urls";
import { RoleContext } from "./RoleContext";

const roleId = "0f10196e-8dbb-47bc-b0af-f0ae6b24f526";

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: roleDetail, loading, error } = useFetch(
    RETRIEVE_ROLE_DETAIL(roleId)
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
