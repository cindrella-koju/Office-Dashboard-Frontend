export type Role = "admin" | "superadmin" | "member"

export interface AuthContextType{
    token :  string;
    role : Role;
    isAuthenticated : boolean;
    login : (token:string, role : Role) => void;
    logout : () => void;
}