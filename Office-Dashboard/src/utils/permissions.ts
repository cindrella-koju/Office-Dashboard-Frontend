import type { Role } from "../pages/auth/auth.type";


export interface Permission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canEditByOwn : boolean;
}

export type ResourceType = 'user' | 'event' | 'profile' | 'scoreboard' | 'eventdetail' | null | "tiesheet" | "group" | "rounds"

export const getPermissions = (role: string | null, resource: ResourceType): Permission => {
  if (!role) {
    return { canView: false, canCreate: false, canEdit: false, canDelete: false, canEditByOwn: false };
  }

  switch (resource) {
    case 'user':
      if (role === 'superadmin') {
        return { canView: true, canCreate: true, canEdit: true, canDelete: true , canEditByOwn: false };
      }
      if (role === 'admin') {
        return { canView: true, canCreate: false, canEdit: false, canDelete: false, canEditByOwn: false  };
      }
      return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };

    case 'event':
      if (role === 'superadmin' || role === 'admin') {
        return { canView: true, canCreate: true, canEdit: true, canDelete: true , canEditByOwn: false };
      }
      if (role === 'member') {
        return { canView: true, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
      }
      return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };

    case 'scoreboard':
      if (role === 'superadmin' || role === 'admin') {
        return { canView: true, canCreate: true, canEdit: true, canDelete: true , canEditByOwn: false };
      }
      if (role === 'member') {
        return { canView: true, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
      }
      return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
    
    case 'eventdetail':
      if (role === 'superadmin' || role === 'admin') {
        return { canView: true, canCreate: true, canEdit: true, canDelete: true , canEditByOwn: false };
      }
      if (role === 'member') {
        return { canView: true, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
      }
      return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };

      case 'tiesheet':
        if (role === 'superadmin' || role === 'admin') {
          return { canView: true, canCreate: true, canEdit: true, canDelete: true , canEditByOwn: false };
        }
        if (role === 'member') {
          return { canView: true, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
        }
        return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
      case 'group':
        if (role === 'superadmin' || role === 'admin') {
          return { canView: true, canCreate: true, canEdit: true, canDelete: true , canEditByOwn: false };
        }
        if (role === 'member') {
          return { canView: true, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
        }
        return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
      case 'rounds':
        if (role === 'superadmin' || role === 'admin') {
          return { canView: true, canCreate: true, canEdit: true, canDelete: true , canEditByOwn: false };
        }
        if (role === 'member') {
          return { canView: true, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
        }
        return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
      
    case 'profile':
      return { canView: true, canCreate: false, canEdit: false, canDelete: false, canEditByOwn : true };

    default:
      return { canView: false, canCreate: false, canEdit: false, canDelete: false , canEditByOwn: false };
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