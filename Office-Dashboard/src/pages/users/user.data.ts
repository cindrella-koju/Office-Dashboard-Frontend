import type { UserDetail } from "./user.type";

export const USER_DUMMY_DATA : UserDetail[] = [
    {
        id : 1,
        username : "johndoe",
        fullname : "John Doe",
        email : "johndoe@gmail.com",
        role : "Member"
    },
    {
        id : 2,
        username : "anna",
        fullname : "Anna Doe",
        email : "annnadoe@gmail.com",
        role : "Superadmin"
    },

]

export const DUMMY_LOGGED_USER : UserDetail = {
    id : 2,
    username : "anna",
    fullname : "Anna Doe",
    email : "annnadoe@gmail.com",
    role : "Superadmin"
}