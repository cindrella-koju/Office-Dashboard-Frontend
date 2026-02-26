import { useEffect, useState } from "react";
import { usePermissions, type EventPermission } from "./userPermission";
import { type ModelType } from "../type/main.type";
import type { EventParticipants } from "../pages/event/eventdetailpages/participants";
import { useToast } from "../context/ToastContext";
import { getParticipants } from "../services/participants.service";
import type { Round } from "../type/group.type";
import { roleService } from "../services/role.service";
import { type EventRole, type EventRoleDetail } from "../type/eventrole.type";
import * as EventRoleServices from "../services/eventrole.service";
import extractHeaders from "../utils/extractHeader";

export const useEventRole = (eventID : string ) => {
    const { showToast } = useToast()
    const permissions = usePermissions<EventPermission>({withinevent: true});
    const [mode, setMode] = useState<ModelType>(null)
    const [participant, setParticipants] = useState<EventParticipants>()
    const [role,setRole] = useState<Round[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [eventRole, setEventrole] = useState<EventRoleDetail[]>([])
    const [tablehead, setTableHead] = useState<string[]>([])
    const [popUpDelete, setPopUpDelete ] = useState<boolean>(false)
    // store role for filter
    const [onlyEventRole,setOnlyEventRole] = useState<Round[]>([])
    const [selectedRole,setSelectedRole] = useState<Round | null>(null)
    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [formData, setFormData ] = useState<EventRoleDetail>({
        id : "",
        user_id : "",
        role_id : "",
        username : "",
        rolename : ""
    })

    const fetchParticipants = async() => {
        if(!eventID) return;
        try{
            setLoading(true)
            const data = await getParticipants(eventID)
            setParticipants(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchRoundByEvent= async() => {
        if(!eventID) return;
        try{
            setLoading(true);
            const data = await roleService.getAllRole();
            setRole(data)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }
    const fetchOnlyRoleInEvent = async() => {
        if(!eventID) return;
        try{
            setLoading(true)
            const data = await roleService.getRoleInEvent(eventID);
            setOnlyEventRole(data);
            // if( data.length > 0 ){
            //      setSelectedRole(data[0])
            // }
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchEventRole = async() => {
        if(!eventID) return;
        try{
            setLoading(true);
            const data = await EventRoleServices.getEventRole(eventID, currentPage, limit);
            setEventrole(data.data)
            setTableHead(extractHeaders(data.data))
            setTotalPage(data.total_pages)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchEventRoleByROLEID = async() => {
        if(!selectedRole) return;
        if(!eventID) return;
        try{
            setLoading(true);
            const data = await EventRoleServices.getEventRoleByRoleId(eventID, selectedRole?.id, currentPage, limit);
            setEventrole(data.data)
            setTableHead(extractHeaders(data.data))
            setTotalPage(data.total_pages)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const createEventRole = async(payload : EventRole) => {
        if(!eventID) return;
        await EventRoleServices.createEventRole(payload,eventID, showToast);
        setMode(null)
        fetchEventRole()
        fetchOnlyRoleInEvent()
    }

    const editEventRole = async(event_role_id : string, payload : EventRole) => {
        await EventRoleServices.editEventRole(payload, event_role_id, showToast);
        setMode(null)
        fetchEventRole()
        fetchOnlyRoleInEvent()
    }

    const deleteEventRole = async(event_role_id : string) => {
        await EventRoleServices.deleteEventRole(event_role_id, showToast);
        fetchEventRole()
        fetchOnlyRoleInEvent()
    }

    useEffect(() => {
        fetchParticipants();
        fetchRoundByEvent();
        fetchOnlyRoleInEvent();
    },[])

    useEffect(() => {
        if(selectedRole && selectedRole.id != "all"){
            fetchEventRoleByROLEID()
        } else{
            fetchEventRole()
        }
    },[selectedRole, currentPage, limit])

    return {
        permissions,
        mode,
        setMode,
        participant,
        role, 
        formData,
        setFormData,
        createEventRole,
        eventRole,
        tablehead,
        popUpDelete,
        setPopUpDelete,
        deleteEventRole,
        editEventRole,
        loading,
        error,
        onlyEventRole,
        selectedRole,
        setSelectedRole,
        setEventrole,
        // Pagination
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        totalPage
    };
}