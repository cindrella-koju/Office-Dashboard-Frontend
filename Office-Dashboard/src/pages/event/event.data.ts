import type { EventDetail } from "./event.type";

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