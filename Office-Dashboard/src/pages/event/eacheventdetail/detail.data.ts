export const DUMMY_EVENT = {
    title: "Table Tennis Tournament",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quia illum eius veniam? Laudantium quia reiciendis et enim! Quas unde dolores voluptates animi iste rerum tempore nihil veniam illum laudantium? Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    startDate: "Jan 25, 2026",
    endDate: "Jan 26, 2026",
    status: "Active" as const
};

export const statusColors = {
    Active: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Draft: "bg-yellow-100 text-yellow-700"
};

export const overallTiesheetTableHead = ["date", "time", "game vs","rounds", "status"];
export const overallTiesheetTableData= [
    {
        id: 1,
        date: "Jan 6, 2026",
        time: "10:20 am",
        "game vs": "Team A vs Team B",
        rounds : 5,
        status: "Completed"
    },
    {
        id: 2,
        date: "Jan 6, 2026",
        time: "2:30 pm",
        "game vs": "Team C vs Team D",
        rounds : 5,
        status: "Draft"
    },
    {
        id: 3,
        date: "Jan 7, 2026",
        time: "9:00 am",
        "game vs": "Team E vs Team F",
        rounds : 5,
        status: "Upcoming"
    }
];

export const todayGameTableHead = ["date", "time", "game vs", "status"];
export const todayGameTableData= [
    {
        id: 1,
        date: "Jan 6, 2026",
        time: "10:20 am",
        "game vs": "Team A vs Team B",
        status: "Upcoming"
    },
    {
        id: 2,
        date: "Jan 6, 2026",
        time: "2:30 pm",
        "game vs": "Team C vs Team D",
        status: "Upcoming"
    },
    {
        id: 3,
        date: "Jan 7, 2026",
        time: "9:00 am",
        "game vs": "Team E vs Team F",
        status: "Upcoming"
    }
];

export const ongoingMatches= [
    {
        id: 1,
        player1: "John Doe",
        player2: "Anna Smith",
        round: "Quarter Final",
    },
    {
        id: 2,
        player1: "Mike Johnson",
        player2: "Sarah Williams",
        round: "Semi Final"
    },
    {
        id: 3,
        player1: "David Lee",
        player2: "Emma Wilson",
        round: "Quarter Final",
    },
    {
        id: 4,
        player1: "Chris Brown",
        player2: "Lisa Taylor",
        round: "Final",
    }
];

export const roundDetailHead= ["round","player1 point","player2 point","winner"];
export const roundDetailData = [
    {
        id : 1,
        round : 1,
        "player1 point" : 30,
        "player2 point" : 40,
        winner: "player 1"
    },
    {
        id : 1,
        round : 1,
        "player1 point" : 30,
        "player2 point" : 40,
        winner: "player 1"
    },
    {
        id : 1,
        round : 1,
        "player1 point" : 30,
        "player2 point" : 40,
        winner: "player 1"
    },
]
export const oneEventInfo = {
    title : "Table Tennis",
    "Event date" : "8 Jan, 2026",
    time : "10 : 30 AM",
    playerone : "User 1",
    playertwo : "User 2",
    winner : "User 2",
    rounds : [
        {
            id : 1,
            round : 1,
            "player1 point" : 30,
            "player2 point" : 40,
            winner: "player 1"
        },
        {
            id : 1,
            round : 1,
            "player1 point" : 30,
            "player2 point" : 40,
            winner: "player 1"
        },
        {
            id : 1,
            round : 1,
            "player1 point" : 30,
            "player2 point" : 40,
            winner: "player 1"
        },
        {
            id : 1,
            round : 1,
            "player1 point" : 30,
            "player2 point" : 40,
            winner: "player 1"
        },
        {
            id : 1,
            round : 1,
            "player1 point" : 30,
            "player2 point" : 40,
            winner: "player 1"
        }
    ]
}
// export const eventHistoryData = [
//     {
//         id : 1,
//         date: "Jan 6, 2026",
//         time: "10:20 am",
//         "game detail" : 
//     },
// ]