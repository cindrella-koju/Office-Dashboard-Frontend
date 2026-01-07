export type RoleType = "Admin" | "Superadmin" | "Member"

export type UserDetail = {
    id: number,
    username : string,
    fullname : string,
    email : string,
    role : RoleType
}