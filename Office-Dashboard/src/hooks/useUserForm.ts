import { useEffect, useState } from "react";
import type { AddUser, UserDetail } from "../type/user.type";

export const useUserForm = (initial?: UserDetail) => {
    const [userDetail, setUserDetail] = useState<AddUser>({
        id: "",
        username: "",
        fullname: "",
        email: "",
        role_id: "",
        password: "",
        ...initial,
    });
    

    const [originalUser, setOriginalUser] = useState<UserDetail | null>(initial || null);

    // Add user data for edit
    useEffect(() => {
        if (initial) {
        setOriginalUser(initial);
        setUserDetail({
            id: initial.id,
            username: initial.username,
            fullname: initial.fullname,
            email: initial.email,
            role_id: initial.role_id,
            password: "",
        });
        }
    }, [initial]);

    // Extract the data that is only changed
    const getChangedFields = () => {
        if (!originalUser) return userDetail;
        const changed: Partial<AddUser> = {};
        Object.keys(userDetail).forEach((key) => {
        if (key !== "id" && key !== "password" && (userDetail as any)[key] !== (originalUser as any)[key]) {
            (changed as any)[key] = (userDetail as any)[key];
        }
        });
        return changed;
    };

    const closeFunction = () => {
        setUserDetail({
            id: "",
            username: "",
            fullname: "",
            email: "",
            role_id: "",
            password: "", 
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetail((prev) => ({ ...prev, [name]: value }));
    };

    return { userDetail, setUserDetail, getChangedFields, closeFunction, handleChange };
}