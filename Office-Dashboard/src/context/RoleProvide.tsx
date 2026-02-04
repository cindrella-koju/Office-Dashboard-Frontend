
import useFetch from "../hooks/useFetch";
import { RETRIEVE_ROLE_DETAIL } from "../constants/urls";
import { RoleContext } from "./RoleContext";

const roleId = "e838cde6-4769-482b-ac47-28e01d9a5d22";

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
