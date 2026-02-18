import type { Dispatch, SetStateAction } from "react"
import type { ParticipantsInfo } from "../pages/event/eventdetailpages/participants"
import type { Round } from "./group.type"
import type { ModelType } from "./main.type"

export interface EventRole{
    id : string,
    user_id : string,
    role_id : string
}

export interface EventRoleResponse{
    id : string,
    user_id : string,
    username : string,
    role_id : string,
    rolename : string
}

export interface EventRoleModelProps{
    mode : ModelType,
    onclose : () => void,
    participants : ParticipantsInfo[],
    role : Round[],
    eventRole : EventRole,
    setEventRole : Dispatch<SetStateAction<EventRoleResponse>>;
    handleSubmit : (e:React.FormEvent) => void;
}