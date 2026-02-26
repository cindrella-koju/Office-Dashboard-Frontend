import type { Dispatch, SetStateAction } from "react";
import type { ModelType } from "./main.type";
import type { EventPermission } from "../hooks/userPermission";


export interface Round {
    id: string;
    name: string;
}

export interface Participant {
    id: string;
    username: string;
}

export interface CreateGroupModalProps {
    mode: 'create' | 'edit';
    setIsModalOpen : Dispatch<SetStateAction<ModelType>>;
    roundId : string | undefined,
    setRoundId : Dispatch<SetStateAction<string | undefined>>;
    formData : FormDataType,
    setFormData : Dispatch<SetStateAction<FormDataType>>;
    handleSubmit : (e:React.FormEvent) => void;
    participants : Participant[]
}

export interface Stage{
    stage_id : string,
    stage_name : string,
    groups : Group[]
}

export interface Group {
    group_id: string;
    group_name: string;
    members: GroupMember[];
}
export interface GroupMember {
    user_id: string;
    username: string;
    columns: ColumnData[];
}

export interface ColumnData {
    column_id: string;
    column_field: string;
    value: string | null;
}

interface EditedUserIdProps{
    groupId : string,
    userId : string
}
export interface GroupTableProps{
    groupData : Stage[],
    permissions : EventPermission,
    editingUserId : EditedUserIdProps | null,
    editedUserData : GroupMember | null,
    handleUserCellChange : (columnField: string, value: string) => void,
    handleCancel : () => void,
    handleSave : (groupId : string) => void,
    handleEditUser : ( groupId: string, member : GroupMember, stageId : string) => void,
    handleEditGroup : (groupTd : string ) => void,
    setEachGroupData : Dispatch<SetStateAction<EachGroupDetail>>;
    handleDeleteGroup : (groupTd : string ) => void,
    handleDeleteMember : ( groupId: string, member : GroupMember, stageID :  string) => void,
}

export interface EachGroupDetail{
    group_id : string,
    name : string,
    stage_id : string,
    stage_name : string,
    participants_id : string[]
}

export interface FormDataType{
    group_name : string,
    round_id : string,
    stage_id : string,
    participants_ids : string[] 
}

export interface PayloadType{
    name : string,
    round_id : string,
    participants_ids : string[] 
}