import { getPermissions, type Permission } from '../utils/permissions';


export function usePermissions(resource: 'user' | 'event' | 'profile'| 'scoreboard' | null): Permission {
  const auth = {
    token : "SDfdsfS",
    role: "admin",
    isAuthenticated : true
  }
  
  if (!auth || !auth.isAuthenticated) {
    return { canView: true, canCreate: false, canEdit: false, canDelete: false, canEditByOwn: false };
  }
  
  const { role } = auth;
  return getPermissions(role, resource);
}

// export interface AuthContextType{
//     token :  string;
//     role : Role;
//     isAuthenticated : boolean;
//     login : (token:string, role : Role) => void;
//     logout : () => void;
// }