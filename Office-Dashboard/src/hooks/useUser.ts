import { useEffect, useState, useCallback, useRef } from "react";
import type { AddUser, UserDetailResponse } from "../type/user.type";
import type { Round } from "../type/group.type";
import * as userService from "../services/user.service";
import extractHeaders from "../utils/extractHeader";
import { useToast } from "../context/ToastContext";
import { roleService } from "../services/role.service";
import type { StatusProps } from "./event/useEvent";

export const useUser = () => {
    const { showToast } = useToast();
    const [users, setUsers] = useState<UserDetailResponse>();
    const [rounds, setRounds] = useState<Round[]>([]);
    const [selectedRole, setSelectedRole] = useState<Round | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tablehead, setTableHead ] = useState<string[]>([])
    const [roles,setRoles] = useState<Round[]>()
    const [showPassword, setShowPassword] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [role, setRole] = useState<StatusProps | null>(null);

    // Request deduplication
    const isRequestInProgressRef = useRef({
        users: false,
        roles: false,
        allRoles: false
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fetchUsers = useCallback(async() => {
        if (isRequestInProgressRef.current.users) return;
        isRequestInProgressRef.current.users = true;
        
        try{
            setLoading(true);
            const data = await userService.getUser(currentPage, limit);

            setUsers(data);
            setTableHead(extractHeaders(data.items))
            setTotalPage(data.total_pages)
            setError(null);
        } catch(err:any){
            setError(err.message || "Failed to load users")
        } finally{
            setLoading(false);
            isRequestInProgressRef.current.users = false;
        }
    }, [currentPage, limit]);

    const fetchUsersByRole = useCallback(async() => {
        if(!role) return;
        if (isRequestInProgressRef.current.users) return;
        isRequestInProgressRef.current.users = true;
        
        try{
            setLoading(true);
            const data = await userService.getUserByRole(role.id, currentPage, limit);

            setUsers(data);
            setTableHead(extractHeaders(data.items))
            setTotalPage(data.total_pages)
            setError(null);
        } catch(err:any){
            setError(err.message || "Failed to load users by role")
        } finally{
            setLoading(false);
            isRequestInProgressRef.current.users = false;
        }
    }, [role, currentPage, limit]);

    const fetchRoleIdNameNotInEvent = useCallback(async() => {
        if (isRequestInProgressRef.current.roles) return;
        isRequestInProgressRef.current.roles = true;
        
        try{
            const data = await roleService.getRoleNotInEvent();
            setRounds(data)
            if(data.length > 0 ) setSelectedRole(data[0])
        }catch(err:any){
            console.error("Failed to fetch roles:", err.message)
        } finally{
            isRequestInProgressRef.current.roles = false;
        }
    }, []);

    const fetchAllRoleIdName = useCallback(async() => {
        if (isRequestInProgressRef.current.allRoles) return;
        isRequestInProgressRef.current.allRoles = true;
        
        try{
            const data = await roleService.getAllRole()
            setRoles(data)
        }catch(err:any){
            console.error("Failed to fetch all roles:", err.message)
        } finally{
            isRequestInProgressRef.current.allRoles = false;
        }
    }, []);


    const createUser = async (payload: AddUser) => {
        await userService.createUser(payload, showToast);
        await fetchUsers();
        await fetchRoleIdNameNotInEvent();
    };

    const updateUser = async (id: string, payload: Partial<AddUser>) => {
        await userService.updateUser(id, payload,showToast);
        await fetchUsers();
    };

    const deleteUser = async (id : string) => {
        await userService.deleteUser(id,showToast);
        await fetchUsers();
    }

    // Initial data fetch - run in parallel for faster loading
    useEffect(() => {
        Promise.all([
            fetchRoleIdNameNotInEvent(),
            fetchUsers(),
            fetchAllRoleIdName()
        ]);
    }, []);

    // Fetch users when pagination or role filter changes
    useEffect(() => {
        if(role && role.id !== "all"){
            fetchUsersByRole()
        } else {
            fetchUsers()
        }
    }, [currentPage, limit, role, fetchUsers, fetchUsersByRole]);

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
        deleteUser,

        currentPage,
        limit,
        totalPage,
        setCurrentPage,
        setLimit,
        setRole
    };
}