import { useEffect, useState } from "react"
import { type Participant, type EachGroupDetail, type GroupMember, type Round, type Stage, type FormDataType, type PayloadType } from "../../type/group.type"
import * as groupService from "../../services/group.service";
import { usePermissions, type EventPermission } from "../userPermission";
import { useToast } from "../../context/ToastContext";
import type { ModelType } from "../../type/main.type";
import { getRound, getRoundHavingGroup } from "../../services/round.service";
import { type RoundData } from "../../type/round.type";

export const useGroup = () => {
    const { showToast } = useToast()
    const eventId = localStorage.getItem("eventId");
    const permissions = usePermissions<EventPermission>({withinevent :true});
    const [groupdata, setGroupData] = useState<Stage[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingUserId, setEditingUserId] = useState<{ groupId: string; userId: string, stageId : string } | null>(null);
    const [editedUserData, setEditedUserData] = useState<GroupMember | null>(null);
    const [modalMode, setModalMode] = useState<ModelType>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [rounds, setRounds] = useState<Round[]>();
    const [roundId, setRoundId] = useState<string>();
    const [participants, setParticipants] = useState<Participant[]>()
    const [popUpDelete, setPopUpDelete] = useState<boolean>(false)
    const [deleteType, setDeleteType] = useState<"group" | "member" | null>(null)
    const [filterRounds, setFilterRounds] = useState<RoundData[]>()
    const [selectedFilterRound,setSelectedFilterRound] = useState<Round | null>(null)
    const [eachGroupData,setEachGroupData] = useState<EachGroupDetail>({
        group_id : "",
        name : "",
        stage_id : "",
        stage_name : "",
        participants_id : []
    })

    const [formData, setFormData] = useState<FormDataType>({
        group_name: "",
        round_id: "",
        stage_id : "",
        participants_ids : [] as string[],
    });

    useEffect(() => { 
        if (!eachGroupData) return;

        setFormData({
        group_name: eachGroupData.name,
        round_id: eachGroupData.stage_id,
        participants_ids: eachGroupData.participants_id,
        stage_id : eachGroupData.stage_id
        });

        setRoundId(eachGroupData.stage_id);
    }, [eachGroupData]);

    // const fetchGroup = async() => {
    //     if (!eventId) return;

    //     try{
    //         setLoading(true);
    //         const data = await groupService.getGroup(eventId);
    //         setGroupData(data)
    //     } catch(err:any){
    //         setError(err.message)
    //     } finally{
    //         setLoading(false)
    //     }
    // }

    const fetchGroupByRound = async() => {
        if (!eventId) return;
        if (!selectedFilterRound?.id) return;
        
        try{
            setLoading(true);
            const data = await groupService.getGroupByRound(eventId, selectedFilterRound?.id);
            setGroupData(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }
    
    const fetchFilterRound = async() => {
        if (!eventId) return;

        try{
            setLoading(true);
            const data = await getRoundHavingGroup(eventId);
            setFilterRounds(data)
            if(selectedFilterRound === null){
                setSelectedFilterRound(data[0])
            }
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchRounds = async() => {
        if(!eventId) return;

        try{
            setLoading(true);
            const data = await getRound(eventId)
            setRounds(data)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchQualifierNotInGroupInGroup = async(roundId : string) => {
        if(!eventId) return;
        if(!roundId) return;

        try{
            setLoading(true);
            const data = await groupService.getQualifierNotInGroup(eventId, roundId)
            setParticipants(data)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchQualifierNotInGroupInGroupForEdits = async(roundId: string,groupId : string) => {
        if(!eventId) return;
        if(!roundId) return;
        if(!groupId) return;

        try{
            setLoading(true);
            const data = await groupService.getQualifierNotInGroupForEdit(eventId, roundId,groupId)
            setParticipants(data)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const updateGroupTable = async( groupId : string, payload:any) => {
        await groupService.updateGroupTable(groupId, payload, showToast );
        fetchGroupByRound()
    }

    useEffect(() => {
        fetchRounds();
        fetchFilterRound();
    },[])

    useEffect(() => {
        fetchGroupByRound()
    },[selectedFilterRound])

    const handleUserCellChange = (columnField: string, value: string) => {
        if (!editedUserData) return;
        const updatedUser = { ...editedUserData };
        const columnIndex = updatedUser.columns.findIndex((col) => col.column_field === columnField);
        
        if (columnIndex !== -1) {
            updatedUser.columns[columnIndex].value = value;
        }        
        setEditedUserData(updatedUser);
    };

    const handleEditUser = (groupId: string, member: GroupMember, stageId : string) => {
        setEditingUserId({ groupId, userId: member.user_id, stageId : stageId });
        setEditedUserData(JSON.parse(JSON.stringify(member)));
    };

    const createGroup = async( payload: PayloadType) => {
        if (!eventId) return;
        await groupService.createGroup(eventId, payload, showToast)
        fetchGroupByRound()
        
        fetchGroupByRound();
        fetchFilterRound();
        setFormData({
            group_name: "",
            round_id: "",
            stage_id : "",
            participants_ids : [] as string[],
        })
        setParticipants([])
    } 

    const updateGroup = async( groupId:string, stageId : string, payload:PayloadType) => {
        await groupService.updateGroup(groupId, stageId,payload, showToast)
        fetchGroupByRound()
        fetchFilterRound();
        setEditingUserId(null); 
    }

    const deleteGroup = async(group_id : string) => {
        await groupService.deleteGroup(group_id,showToast)
        fetchGroupByRound()
        fetchFilterRound();
    }

    const deleteGroupMember = async(group_id : string, user_id : string, stage_id : string) => {
        await groupService.deleteGroupMember(user_id,group_id, stage_id,showToast)
        fetchGroupByRound()
    }

    const handleSave = async (groupId : string) => {
        if (!editedUserData) return;

        const membersData = [{
            user_id: editedUserData.user_id,
            columns: editedUserData.columns.map((col) => ({
                column_id: col.column_id,
                value: col.value
            }))
        }];
        
        
        updateGroupTable(groupId,{ members: membersData })            
        setEditingUserId(null);
        setEditedUserData(null);
    }

    const handleCancel = () => {
        setEditingUserId(null);
        setEditedUserData(null);
    }

    const handleCreateGroup = () => {
        setModalMode('create');
        setSelectedGroupId(null);
    };

    const handleEditGroup = (groupId: string) => {
        setModalMode('edit');
        setSelectedGroupId(groupId);
    };

    const handleDeleteGroup = (groupID:string) => {
        setPopUpDelete(true)
        setDeleteType("group")
        setSelectedGroupId(groupID);
        fetchGroupByRound()
    }

    const handleDeleteMember = (groupId: string, member: GroupMember, stageId : string) => {
        setPopUpDelete(true)
        setDeleteType("member")
        setEditingUserId({ groupId, userId: member.user_id, stageId : stageId });
        setEditedUserData(JSON.parse(JSON.stringify(member)));
        fetchGroupByRound()
    }
    useEffect(() => {
        if(!roundId) return;
        fetchQualifierNotInGroupInGroup(roundId)
    },[roundId])
    return{
        rounds,
        groupdata,
        updateGroupTable,
        setEditingUserId,
        handleUserCellChange,
        handleEditUser,
        handleSave,
        handleCancel,
        handleCreateGroup,
        handleEditGroup,
        handleDeleteGroup,
        handleDeleteMember,
        setModalMode,
        createGroup,
        updateGroup,
        deleteGroup,
        deleteGroupMember,
        modalMode,
        roundId, 
        setRoundId,
        selectedGroupId,
        editingUserId,
        editedUserData,
        permissions,
        eachGroupData,
        setEachGroupData,
        loading,
        fetchQualifierNotInGroupInGroup,
        fetchQualifierNotInGroupInGroupForEdits,
        participants,
        formData,
        setFormData,
        popUpDelete,
        setPopUpDelete,
        deleteType,
        setDeleteType,
        setEditedUserData,
        error,

        setGroupData,
        selectedFilterRound,
        setSelectedFilterRound,
        filterRounds
    }
}