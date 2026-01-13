import { getPermissions, type Permission, type ResourceType } from '../utils/permissions';


export function usePermissions(resource: ResourceType ): Permission {
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