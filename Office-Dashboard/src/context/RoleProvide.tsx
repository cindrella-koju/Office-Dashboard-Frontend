
import useFetch from "../hooks/useFetch";
import { RETRIEVE_ROLE_DETAIL } from "../constants/urls";
import { RoleContext } from "./RoleContext";

// Superadmin
// const roleId = "a2aaca89-ca5e-4815-ba8a-9ba9e699f8d5";

const roleId = "80ebcd0f-52d4-476b-8ad0-4898e23dadbf"
// admin
// const roleId = "2d5180e6-e723-48ff-acd0-da51f3fae46e";

// member
// const roleId = "ae64bb70-6940-4a61-a419-3395ed3d53e3"
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
