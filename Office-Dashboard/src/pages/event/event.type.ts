export type EventStatus = "Active" | "Completed" | "Draft" 

type Participants = {
    id : number,
    fullname : string 
}
export type EventDetail = {
    id : number,
    title : string,
    description : string,
    startdate : string,
    enddate : string,
    status : EventStatus,
    participants : Participants[],
    note : string
}
export type EventAction = "edit" | "create"
export type EventViewAction = "delete" | "view"



// export type PermissionType = {
//     canView : boolean,
//     canCreate : boolean,
//     canEdit : boolean,
//     canDelete : boolean,
//     canEditByOwn : boolean
// }
// export type DisplayType = 'overalltiesheet' | 'history' | 'todaysgame'| 'ongoinggame' | 'eventimage'
