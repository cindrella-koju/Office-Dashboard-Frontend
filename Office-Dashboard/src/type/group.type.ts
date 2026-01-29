import type { Dispatch, SetStateAction } from "react";
import type { ModelType } from "./main.type";
import type { Permission } from "../utils/permissions";

export interface Round {
    id: string;
    name: string;
}

export interface Participant {
    id: string;
    username: string;
}

export interface CreateGroupModalProps {
    groupId?: string | null;
    mode: 'create' | 'edit';
    eventId: string;
    setIsModalOpen : Dispatch<SetStateAction<ModelType>>;
    eachGroupData : EachGroupDetail
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
    permissions : Permission,
    editingUserId : EditedUserIdProps | null,
    editedUserData : GroupMember | null,
    handleUserCellChange : (columnField: string, value: string) => void,
    handleCancel : () => void,
    handleSave : (groupId : string) => void,
    handleEditUser : ( groupId: string, member : GroupMember) => void,
    handleEditGroup : (groupTd : string ) => void,
    setEachGroupData : Dispatch<SetStateAction<EachGroupDetail>>
}

export interface EachGroupDetail{
    group_id : string,
    name : string,
    stage_id : string,
    stage_name : string,
    participants_id : string[]
}