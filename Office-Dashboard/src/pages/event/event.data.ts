import type { EventDetail, EventHistoryItem } from "./event.type";

export const DUMMY_EVENT_DATA: EventDetail[] = [
    {
        id: 1,
        title : "Table Tennis",
        description : "Table Tennis of Boys and Girls",
        startdate : "2026-01-11",
        enddate : "2026-01-12",
        status : "Completed",
        participants : [
            {
                id : 1,
                fullname : "John Doe"
            },
            {
                id : 2,
                fullname : "Anna Doe"
            }
        ],
        note : "Winner 1 : Dummy 1 . Winner 2: Dummy2"
    },
    {
        id: 2,
        title : "Table Tennis",
        description : "Table Tennis of Boys and Girls",
        startdate : "2026-01-11",
        enddate : "2026-01-12",
        status : "Completed",
        participants : [
            {
                id : 1,
                fullname : "John Doe"
            },
            {
                id : 2,
                fullname : "Anna Doe"
            }
        ],
        note : "Winner 1 : Dummy 1 . Winner 2: Dummy2"
    }
]

export const eventHistory: EventHistoryItem[] = [
        {
            id: 1,
            date: "Jan 6, 2026",
            time: "10:20 AM",
            user1: "John Doe",
            user1Score: 20,
            user2: "Anna Smith",
            user2Score: 30,
            winner: "Anna Smith",
            round: "Quarter Final"
        },
        {
            id: 2,
            date: "Jan 6, 2026",
            time: "2:30 PM",
            user1: "Mike Johnson",
            user1Score: 25,
            user2: "Sarah Williams",
            user2Score: 22,
            winner: "Mike Johnson",
            round: "Semi Final"
        },
        {
            id: 3,
            date: "Jan 7, 2026",
            time: "9:00 AM",
            user1: "Anna Smith",
            user1Score: 28,
            user2: "Mike Johnson",
            user2Score: 26,
            winner: "Anna Smith",
            round: "Final"
        },
        {
            id: 4,
            date: "Jan 5, 2026",
            time: "4:15 PM",
            user1: "David Lee",
            user1Score: 18,
            user2: "John Doe",
            user2Score: 21,
            winner: "John Doe",
            round: "Round 1"
        }
    ];
