import { useState } from "react"
import type { selectPermsission } from "../../type/role.type"

export const useRole = () => {
    const filterOptions = [
        { id:"event", name: "Events" },
        { id:"role", name: "Roles" },
        { id:"user", name: "Users" },
        { id:"within_event", name: "Within Events" },
        { id:"page", name: "Pages" },
    ]
    const [filterfor, setFilterFor] = useState<string>(filterOptions[0].id)
    const [details, setDetails] = useState<selectPermsission>()
    const [header,setHeader] = useState<string[]>([])
    const [dataKeys, setDataKeys] = useState<string[]>([])
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // const fetRole = async() => {
    //     try{
    //         setLoading(true)
    //     }
    // }
}