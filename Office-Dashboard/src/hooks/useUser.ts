import { useEffect, useState } from "react";
import type { AddUser, UserDetail } from "../type/user.type";
import type { Round } from "../type/group.type";
import * as userService from "../services/user.service";
import extractHeaders from "../utils/extractHeader";
import { useToast } from "../context/ToastContext";
import { roleService } from "../services/role.service";

export const useUser = () => {
    const { showToast } = useToast();
    const [users, setUsers] = useState<UserDetail[]>([]);
    const [rounds, setRounds] = useState<Round[]>([]);
    const [selectedRole, setSelectedRole] = useState<Round | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tablehead, setTableHead ] = useState<string[]>([])
    const [roles,setRoles] = useState<Round[]>()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fetchUsers = async() => {
        try{
            setLoading(true);
            const data = await userService.getUser();
            setUsers(data);
            setTableHead(extractHeaders(data))
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchRoleIdNameNotInEvent = async() => {
        try{
            setLoading(true);
            const data = await roleService.getRoleNotInEvent();
            setRounds(data)
            if(data.length > 0 ) setSelectedRole(data[0])
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchAllRoleIdName = async() => {
        try{
            setLoading(true);
            const data = await roleService.getAllRole()
            setRoles(data)
            // if(data.length > 0 ) setSelectedRole(data[0])
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }


    const createUser = async (payload: AddUser) => {
        await userService.createUser(payload, showToast);
        fetchUsers();
        fetchRoleIdNameNotInEvent();
    };

    const updateUser = async (id: string, payload: Partial<AddUser>) => {
        await userService.updateUser(id, payload,showToast);
        fetchUsers();
    };

    const deleteUser = async (id : string) => {
        await userService.deleteUser(id,showToast);
        fetchUsers()
    }

    useEffect(() => {
        fetchRoleIdNameNotInEvent();
        fetchUsers();
        fetchAllRoleIdName();
    }, []);

    return {
        users,
        rounds,
        roles,
        selectedRole,
        tablehead,
        setSelectedRole,
        loading,
        error,
        fetchRoleIdNameNotInEvent,
        createUser,
        updateUser, 
        setUsers,
        showPassword,
        togglePasswordVisibility,
        deleteUser
    };
}