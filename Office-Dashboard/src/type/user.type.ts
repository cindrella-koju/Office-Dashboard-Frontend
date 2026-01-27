export type RoleType = "Admin" | "Superadmin" | "Member"

export type UserDetail = {
    id: string,
    username : string,
    fullname : string,
    email : string,
    role : RoleType,
    created_at : string,
    updated_at : string
}

export interface AddUser {
  username: string;
  fullname: string;
  email: string;
  role: string;
}