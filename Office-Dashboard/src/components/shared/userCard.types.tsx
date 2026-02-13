import type { Dispatch, SetStateAction } from "react";

export interface UserCardData {
    qualifier_id? : string;
    user_id:  string;
    username: string;
}

export type ViewMode = 'grid' | 'list';

export interface UserCardProps {
    user: UserCardData;
    canDelete?: boolean;
    hoverColor?: string;
    setPopUpDelete : Dispatch<SetStateAction<boolean>>;
    onClick : () => void;
}