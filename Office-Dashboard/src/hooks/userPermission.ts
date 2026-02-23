import { useContext } from 'react';
import { RoleContext } from '../context/RoleContext';
import { EventRoleContext } from '../context/EventRoleContext';

export interface Permission {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canEditRoles : boolean;
  canCreateRoles : boolean; 
  canDeleteRoles : boolean; 
  canEditUsers : boolean;
  canCreateUsers : boolean; 
  canDeleteUsers : boolean; 
  canEditEvents : boolean;
  canCreateEvents : boolean; 
  canDeleteEvents : boolean; 
  canManageEvents : boolean;  
}

export interface EventPermission{
  id : string;
  rolename : string;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}
interface PermissionProps{
  withinevent? : boolean
}
export function usePermissions<T = Permission | EventPermission>({
  withinevent = false,
}: PermissionProps): T {
  const userrole = localStorage.getItem("role")
  const role =
    withinevent && !["admin", "superadmin"].includes(userrole ? userrole : "member")
      ? useContext(EventRoleContext)
      : useContext(RoleContext);

  const permissions = withinevent
    ? {
        id: role?.id ?? '',
        rolename: role?.rolename ?? '',
        canCreate: role?.can_create ?? false,
        canEdit: role?.can_edit ?? false,
        canDelete: role?.can_delete ?? false,
      }
    : {
        canCreate: role?.can_create ?? false,
        canEdit: role?.can_edit ?? false,
        canDelete: role?.can_delete ?? false,
        canEditRoles: role?.can_edit_roles ?? false,
        canCreateRoles: role?.can_create_roles ?? false,
        canDeleteRoles: role?.can_delete_roles ?? false,
        canEditUsers: role?.can_edit_users ?? false,
        canCreateUsers: role?.can_create_users ?? false,
        canDeleteUsers: role?.can_delete_users ?? false,
        canEditEvents: role?.can_edit_events ?? false,
        canCreateEvents: role?.can_create_events ?? false,
        canDeleteEvents: role?.can_delete_events ?? false,
        canManageEvents: role?.can_manage_events ?? false,
      };

  return permissions as T;
}
