import { useState } from "react";
import EventNavBar from "../../../../components/EventNavbar";
import FilterComponent from "../../../../components/Filters";
import Card from "../../../../components/ui/Card";
import useFetch from "../../../../hooks/useFetch";
import { usePermissions } from "../../../../hooks/userPermission";
import StandingColumnModule, { type RoundType } from "./StandingColumnModule";
import { RETRIEVE_ROUNDS, RETRIEVE_STANDING_COLUMN } from "../../../../constants/urls";


const DUMMY_STANDING_COLUMN = [
  {
    "stage_id": "fff42539-a573-4ae6-b7b1-25a691c5e787",
    "column_field": "Match Played",
    "default_value": "0",
    "id": "69a39161-810b-4bdf-a606-03535cd238c6"
  },
  {
    "stage_id": "fff42539-a573-4ae6-b7b1-25a691c5e787",
    "column_field": "Win",
    "default_value": "0",
    "id": "1af93744-5a06-4493-99b3-8b1fab9a4e4b"
  },
  {
    "stage_id": "fff42539-a573-4ae6-b7b1-25a691c5e787",
    "column_field": "Loss",
    "default_value": "0",
    "id": "4f8e7170-7fda-40f3-a333-146372fe3b41"
  },
  {
    "stage_id": "fff42539-a573-4ae6-b7b1-25a691c5e787",
    "column_field": "Draw",
    "default_value": "0",
    "id": "4e7bf02d-e43f-4c56-a141-0555b695e591"
  },
  {
    "stage_id": "fff42539-a573-4ae6-b7b1-25a691c5e787",
    "column_field": "Points",
    "default_value": "0",
    "id": "ee560183-134d-4dca-af28-88333f36b652"
  }
]

interface StandingColumnType{
    stage_id : string,
    column_field : string,
    default_value : string,
    id : string
}
export default function StandingColumn(){
    const eventId = localStorage.getItem("eventId")
    const permissions = usePermissions("standingcolumn")
    const [viewMode,setViewMode] = useState<"create" | "edit" | null>(null)
    const { data:rounds } = useFetch<RoundType[]>(eventId ? RETRIEVE_ROUNDS(eventId) : "")
    const roundId = rounds && rounds[0].id
    // const [roundId, setRoundId] = useState(rounds && rounds[0].id)
    const { data:standingcolumn } = useFetch<StandingColumnType[]>(roundId ? RETRIEVE_STANDING_COLUMN(roundId) : "")
    const filters = ["Round 1", "Round 2"]

    console.log("Round id:",roundId)
    return(
        <div className="flex min-h-screen bg-gray-100">
            <EventNavBar/>
            <main className="flex-1 p-6 md:p-10">
                 <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Standing Columns</h1>
                    {permissions.canCreate && (
                        <button className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                        onClick={() => setViewMode("create")}
                        >
                            + Add Column
                        </button>
                    )}
                </div>

                <Card className="mb-6">
                    <div className="p-4 sm:p-6">
                        <FilterComponent filter="Round 1" filters={filters}/>
                    </div>
                </Card>

                <Card className="flex-1 h-[70%]">
                    <div className="p-4 sm:p-6 h-full overflow-y-auto space-y-8">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Column Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Default Value
                                    </th>
                                        {(permissions.canEdit || permissions.canDelete) && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    )}

                                    
                                </tr>
                            </thead>
                            <tbody>
                                {   standingcolumn && 
                                    standingcolumn.map((col,index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {col.column_field}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {col.default_value}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {
                                                    permissions.canEdit && (
                                                        <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => {
                                                            // setRoundVal(round)
                                                            // setViewMode('edit')
                                                        }}>
                                                            Edit
                                                        </button>
                                                    )
                                                }
                                                {
                                                    permissions.canEdit && (
                                                        <button className="text-red-600 hover:text-red-900">
                                                            Delete
                                                        </button>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Card>

                {
                    viewMode != null && <StandingColumnModule viewMode={viewMode} eventId={eventId} setViewMode={setViewMode}/> 
                }
            </main>
        </div>
    )
}