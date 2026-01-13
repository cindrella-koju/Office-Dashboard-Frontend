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
// export type DisplayType = 'overalltiesheet' | 'history' | 'todaysgame'| 'ongoinggame' | 'eventimage'


export type EventHistoryItem = {
    id: number;
    date: string;
    time: string;
    user1: string;
    user1Score: number;
    user2: string;
    user2Score: number;
    winner: string;
    round: string;
};

export type OngoingMatch = {
    id: number;
    player1: string;
    player2: string;
    currentScore1: number;
    currentScore2: number;
    round: string;
    court: string;
};