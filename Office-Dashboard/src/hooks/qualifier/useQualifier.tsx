import { useCallback, useEffect, useState } from "react"
import type { Round } from "../../type/group.type"
import { getRound } from "../../services/round.service";
import { type QualifierResponse, type Participant, type EachQualifier, type QualifierPayload } from "../../type/qualifier.type";
import * as qualifierServices from "../../services/qualifier.service";
import { usePermissions, type EventPermission } from "../userPermission";
import type { ViewMode } from "../../components/shared";
import type { ModelType } from "../../type/main.type";
import { useToast } from "../../context/ToastContext";

export const useQualifier = () => {
    const { showToast } = useToast()
    const eventID = localStorage.getItem("eventId");
    const permissions = usePermissions<EventPermission>({withinevent: true});
    const [rounds,setRounds] = useState<Round[]>([])
    const [loading, setLoading ] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [participants, setParticipants] = useState<Participant[]>([])
    const [qualifiers, setQualifiers] = useState<QualifierResponse[]>([])
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [modelType, setModelType] = useState<ModelType>(null);
    const [roundId, setRoundId] = useState<string>("");
    const [selected, setSelected] = useState<string[]>([])

    const fetchRound = async() => {
        if(!eventID) return;
        try{
            setLoading(true);
            const data = await getRound(eventID)
            setRounds(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchQualifier = async() => {
        if(!eventID) return;
        try{
            setLoading(true);
            const data = await qualifierServices.getQualifier(eventID)
            setQualifiers(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }
    const fetchParticipants = async( roundId : string ) => {
        if(!eventID) return;
        try{
            setLoading(true)
            const data = await qualifierServices.getUserNotInQualifier(eventID, roundId)
            setParticipants(data)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const createQualifier = async( roundID : string, payload : QualifierPayload ) => {
        if(!eventID) return;
        await qualifierServices.createQualifier(eventID, roundID, payload, showToast)
        fetchQualifier()
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

    useEffect(() => {
        fetchParticipants(roundId)
    },[roundId])
    const getFilteredQualifiers = (qualifierList: EachQualifier[]) => {
        if (!searchQuery) return qualifierList;
        return qualifierList.filter((q) =>
            q.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(q.user_id).includes(searchQuery)
        );
    };

    const hasAnyQualifiers = qualifiers?.some(
        (round) => getFilteredQualifiers(round.qualifier).length > 0
    );

    const handleRemoveQualifier = useCallback((userId: number | string) => {
        // TODO: Implement remove qualifier functionality
        console.log('Remove qualifier:', userId);
    }, []);

    useEffect(() => {
        fetchRound()
        fetchQualifier()
        // fetchParticipants()
    },[])

    return {
        permissions,
        qualifiers,
        viewMode,
        searchQuery,
        modelType,
        setModelType,
        handleViewModeChange,
        handleSearchChange,
        handleOpenAddModal,
        getFilteredQualifiers,
        hasAnyQualifiers,
        handleRemoveQualifier,
        rounds,
        participants,
        roundId,
        setRoundId,
        createQualifier,
        selected,
        setSelected,
        loading,
        error
    }
}