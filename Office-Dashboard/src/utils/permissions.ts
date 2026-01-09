import type { Role } from "../pages/auth/auth.type";


export interface Permission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export const getPermissions = (role: string | null, resource: 'user' | 'event' | 'profile' | null): Permission => {
  if (!role) {
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  switch (resource) {
    case 'user':
      if (role === 'superadmin') {
        return { canView: true, canCreate: true, canEdit: true, canDelete: true };
      }
      if (role === 'admin') {
        return { canView: true, canCreate: false, canEdit: false, canDelete: false };
      }
      return { canView: false, canCreate: false, canEdit: false, canDelete: false };

    case 'event':
      if (role === 'superadmin' || role === 'admin') {
        return { canView: true, canCreate: true, canEdit: true, canDelete: true };
      }
      if (role === 'member') {
        return { canView: true, canCreate: false, canEdit: false, canDelete: false };
      }
      return { canView: false, canCreate: false, canEdit: false, canDelete: false };

    case 'profile':
      return { canView: true, canCreate: false, canEdit: true, canDelete: false };

    default:
      return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }
};

export const canAccessPage = (role: Role | null, page: string): boolean => {
  if (!role) return false;

  switch (page) {
    case 'home':
      return true;

    case 'event':
      return true;

    case 'profile':
      return true;

    case 'user':
      return role === 'superadmin' || role === 'admin';

    default:
      return false;
  }
};