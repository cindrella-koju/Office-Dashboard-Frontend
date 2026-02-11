import { useCallback, useEffect, useState } from "react"
import type { selectPermsission } from "../../type/role.type"
import { extractPermissionHeaders } from "../../utils/extractHeader"
import { RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT } from "../../constants/urls"
import type { ModelType } from "../../type/main.type"
import { roleService, type RolePayload } from "../../services/role.service"
import { useToast } from "../../context/ToastContext"

export const useUserRole = () => {
    const { showToast } = useToast();
    const [details, setDetails] = useState<selectPermsission>()
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined)
    const [modelType, setModelType] = useState<ModelType>(null)
    const filterOptions = [
        { id:"event", name: "Events" },
        { id:"role", name: "Roles" },
        { id:"user", name: "Users" },
        { id:"within_event", name: "Within Events" },
        { id:"page", name: "Pages" },
    ]
    const [filterfor, setFilterFor] = useState<string>(filterOptions[0].id)
    const [dataKeys, setDataKeys] = useState<string[]>([])
    const [header,setHeader] = useState<string[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        if(!details || !Array.isArray(details)){
            setHeader([])
            return;
        }

        if(filterfor === "page"){
            const roleAccessPage = details[0].roleaccesspage;
            const headerList = ["Rolename"]
            if (roleAccessPage){
                const formattedKeys = Object.keys(roleAccessPage).map(key => {
                    const withSpaces = key.replace(/_/g, " ");
                    const capitalized = withSpaces.replace(/\b\w/g, char => char.toUpperCase());
                    
                    return capitalized;
                });

                headerList.push(...formattedKeys)
            }
            setHeader(headerList);
            if(details[0].roleaccesspage){
                setDataKeys(["rolename", ...Object.keys(details[0].roleaccesspage)])
            }else {
                setDataKeys(["rolename"])
            }
        } else{
            setHeader(extractPermissionHeaders(details));
            const excludeKeys = ["id", "created_at", "updated_at"];
            const keys = Object.keys(details[0]).filter(key => !excludeKeys.includes(key));
            setDataKeys(keys);
        }
    },[details, filterfor])


    
    const urlFunction = useCallback(() => {
        return RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT(filterfor)
    }, [filterfor])

    const fetchRole = async(filter? : string) => {
        try{
            setLoading(true)
            const data = await roleService.getRole(filter ? filter : filterfor);
            setDetails(data)
        } catch(err: any){
            console.error("Error caught:", err)
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }   

    const createRole = async(payload : RolePayload) => {
        await roleService.createRole(payload, showToast);
        fetchRole()
    }

    const updateRole = async(id : string, payload : Partial<RolePayload>) => {
        await roleService.updateRole(id, payload, showToast);
        fetchRole()
    }

    const deleteRole = async(id:string) => {
        await roleService.deleteRole(id, showToast);
        fetchRole()
    }
    useEffect(() => {
        fetchRole();
    },[])

    return{
        selectedRole,
        filterOptions,
        urlFunction,
        setDetails,
        setFilterFor,
        header,
        dataKeys,
        setSelectedRole,
        modelType,
        setModelType,
        details,
        filterfor,
        createRole,
        updateRole,
        deleteRole,
        loading,
        error,
    }
}