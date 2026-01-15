import EventNavBar from "../../../components/EventNavbar";
import { usePermissions } from "../../../hooks/userPermission";

export default function Tiesheet(){
    const permissions = usePermissions("tiesheet")
    const tiesheets = [
  {
    "id": "b7f91379-2945-470f-9bb0-aa65b93dc735",
    "scheduled_date": "2026-01-15",
    "scheduled_time": "05:12:05.074000",
    "stage_name": "Round 1",
    "player_info": [
      {
        "user_id": "cd3932de-cc16-4868-9c96-998c681d1a80",
        "is_winner": false,
        "username": "dummy"
      },
      {
        "user_id": "26c4bbac-3673-467a-b089-c36839d77e96",
        "is_winner": true,
        "username": "changed username"
      }
    ],
    "group_name": "Group A"
  },
  {
    "id": "3d8c1331-c81d-49d2-87af-0670c913ae1a",
    "scheduled_date": "2026-01-15",
    "scheduled_time": "06:04:48.224000",
    "stage_name": "Round 2",
    "player_info": [
      {
        "user_id": "26c4bbac-3673-467a-b089-c36839d77e96",
        "is_winner": false,
        "username": "changed username"
      },
      {
        "user_id": "cd3932de-cc16-4868-9c96-998c681d1a80",
        "is_winner": true,
        "username": "dummy"
      }
    ]
  },
  {
    "id": "9aaaa270-545a-48c2-a5fb-6b29ae340095",
    "scheduled_date": "2026-01-15",
    "scheduled_time": "06:12:18.699000",
    "stage_name": "Round 1",
    "player_info": [
      {
        "user_id": "c397aa12-2214-4796-a1d0-4d1dc8c28974",
        "is_winner": false,
        "username": "user 3"
      },
      {
        "user_id": "04d36c46-d7c1-4e06-8250-cdfd4bbb80f3",
        "is_winner": false,
        "username": "user 4"
      }
    ],
    "group_name": "Group B"
  }
]

    const headers = tiesheets.length > 0 
    return(
        <div className="flex min-h-screen bg-gray-100">
            <EventNavBar/>
            <main className="flex-1 p-6 md:p-10">
                {
                    permissions.canCreate && (
                        <div>
                            <button
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                            >
                                Create Tiesheet
                            </button>
                        </div>
                    )
                }
            </main>
        </div>
    )
}