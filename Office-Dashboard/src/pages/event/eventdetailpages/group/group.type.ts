export interface Round {
    id: string;
    name: string;
}

export interface Participant {
    id: string;
    username: string;
}

export interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId?: string | null;
    mode: 'create' | 'edit';
    eventId: string;
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

export interface Group {
    group_id: string;
    group_name: string;
    members: GroupMember[];
}