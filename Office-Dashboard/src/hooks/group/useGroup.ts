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
    const [editingUserId, setEditingUserId] = useState<{ groupId: string; userId: string } | null>(null);
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
        participants_ids : [] as string[],
    });

    useEffect(() => { 
        if (!eachGroupData) return;

        setFormData({
        group_name: eachGroupData.name,
        round_id: eachGroupData.stage_id,
        participants_ids: eachGroupData.participants_id,
        });

        setRoundId(eachGroupData.stage_id);
    }, [eachGroupData]);

    const fetchGroup = async() => {
        if (!eventId) return;

        try{
            setLoading(true);
            const data = await groupService.getGroup(eventId);
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
            setSelectedFilterRound(data[0])
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
        fetchGroup()
    }

    useEffect(() => {
        fetchGroup();
        fetchRounds();
        fetchFilterRound()
    },[])

    const handleUserCellChange = (columnField: string, value: string) => {
        if (!editedUserData) return;
        const updatedUser = { ...editedUserData };
        const columnIndex = updatedUser.columns.findIndex((col) => col.column_field === columnField);
        
        if (columnIndex !== -1) {
            updatedUser.columns[columnIndex].value = value;
        }        
        setEditedUserData(updatedUser);
    };

    const handleEditUser = (groupId: string, member: GroupMember) => {
        setEditingUserId({ groupId, userId: member.user_id });
        setEditedUserData(JSON.parse(JSON.stringify(member)));
    };

    const createGroup = async( payload: PayloadType) => {
        if (!eventId) return;
        await groupService.createGroup(eventId, payload, showToast)
        fetchGroup()
    } 

    const updateGroup = async( groupId:string, payload:PayloadType) => {
        await groupService.updateGroup(groupId,payload, showToast)
        fetchGroup()
    }

    const deleteGroup = async(group_id : string) => {
        await groupService.deleteGroup(group_id,showToast)
        fetchGroup()
    }

    const deleteGroupMember = async(group_id : string, user_id : string) => {
        await groupService.deleteGroupMember(user_id,group_id,showToast)
        fetchGroup()
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
    }

    const handleDeleteMember = (groupId: string, member: GroupMember) => {
        setPopUpDelete(true)
        setDeleteType("member")
        setEditingUserId({ groupId, userId: member.user_id });
        setEditedUserData(JSON.parse(JSON.stringify(member)));
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