import { useContext } from 'react';
import { RoleContext } from '../context/RoleContext';

export interface Permission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canViewRoles : boolean; 
  canEditRoles : boolean;
  canCreateRoles : boolean; 
  canDeleteRoles : boolean; 
  canViewUsers : boolean;
  canEditUsers : boolean;
  canCreateUsers : boolean; 
  canDeleteUsers : boolean; 
  canManageEvents : boolean;  

}
export function usePermissions(){
  const role = useContext(RoleContext)
  const permissions = {
    canCreate : role?.can_create,
    canView :  role?.can_view,
    canEdit :  role?.can_edit,
    canDelete : role?.can_delete,
    canViewRoles : role?.can_view_roles,
    canEditRoles : role?.can_edit_roles,
    canCreateRoles : role?.can_create_roles,
    canDeleteRoles : role?.can_delete_roles,
    canViewUsers : role?.can_view_users,
    canEditUsers : role?.can_edit_users,
    canCreateUsers : role?.can_create_users,
    canDeleteUsers : role?.can_delete_users,
    canManageEvents : role?.can_manage_events 
  }  
  return permissions;
}