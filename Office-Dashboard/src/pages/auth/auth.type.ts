export type Role = "admin" | "user" | "manager" | string;

export interface AuthContextType {
  userId: string | null;
  roleId: string | null;
  role: Role | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isAuthorized: (allowedRoles?: Role[]) => boolean;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
}
