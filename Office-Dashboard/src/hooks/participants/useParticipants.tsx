import { useCallback, useEffect, useState } from "react";
import { type EventParticipants } from "../../pages/event/eventdetailpages/participants";
import * as participantsServices from "../../services/participants.service";
import { usePermissions, type EventPermission } from "../userPermission";
import type { ViewMode } from "../../components/shared";
import type { ModelType } from "../../type/main.type";
import { type User } from "../../components/Model/ParticipantsModel";
import { useToast } from "../../context/ToastContext";

export const useParticipants = () => {
    const { showToast } = useToast()
    const eventID = localStorage.getItem("eventId");
    const [participants, setParticipants] = useState<EventParticipants>()
    const permissions = usePermissions<EventPermission>({withinevent : true});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [modelType, setModelType] = useState<ModelType>(null)
    const [users, setUsers] = useState<User[]>([])
    const [selected, setSelected] = useState<string[]>([])

    const fetchParticipants = async() => {
        if(!eventID) return;
        try{
            setLoading(true)
            const data = await participantsServices.getParticipants(eventID)
            setParticipants(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchUserNotParticipants = async() => {
        if(!eventID) return;
        try{
            setLoading(true)
            const data = await participantsServices.getNotParticipants(eventID)
            setUsers(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const createParticipants = async(payload : participantsServices.ParticipantsPayload) => {
        if(!eventID) return;
        await participantsServices.createParticipants(eventID,payload,showToast)
        fetchParticipants()
    }
    const handleViewModeChange = useCallback((mode: ViewMode) => {
        setViewMode(mode);
    }, []);

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const handleOpenAddModal = useCallback(() => {
        setModelType("create")
    }, []);
    
    const deleteParticipants = async(user_id : string) => {
        if(!eventID) return;
        await participantsServices.deleteParticipants(eventID, user_id, showToast);
        fetchParticipants()
    }

    useEffect(() => {
        fetchParticipants()
        fetchUserNotParticipants()
    },[])

    return{
        participants,
        permissions,
        viewMode,
        searchQuery,
        modelType,
        handleOpenAddModal,
        handleSearchChange,
        handleViewModeChange,
        createParticipants,
        deleteParticipants,
        selected,
        setSelected,
        setModelType,
        users,
        loading,
        error
    }
}