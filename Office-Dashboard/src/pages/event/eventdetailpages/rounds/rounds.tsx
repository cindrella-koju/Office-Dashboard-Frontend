import { useState } from "react";
import EventNavBar from "../../../../components/EventNavbar";
import { usePermissions } from "../../../../hooks/userPermission";
import RoundModule, { type RoundData } from "./RoundModule";
import useFetch from "../../../../hooks/useFetch";
import { RETRIEVE_ROUNDS } from "../../../../constants/urls";

export default function Rounds(){
    const eventId = localStorage.getItem("eventId");
    const permissions = usePermissions("rounds")
    const {data : rounds } = useFetch<RoundData[]>( eventId ? RETRIEVE_ROUNDS(eventId) : "") 
    const [viewMode, setViewMode] = useState<"create" | "edit" | null>(null)
    const [roundVal, setRoundVal] = useState<RoundData | null>(null)
    // const rounds = DUMMY_ROUNDS 
    return(
        <div className="flex min-h-screen bg-gray-100">
            <EventNavBar/>
            <main className="flex-1 p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Tiesheet</h1>
                    {permissions.canCreate && (
                        <button className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                            onClick={() => setViewMode("create")}
                        >
                            + Create Round
                        </button>
                    )}
                </div>

                <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                    { rounds && 
                        rounds.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <p className="text-lg">No rounds available</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Round Name
                                            </th>
                                             {(permissions.canEdit || permissions.canDelete) && (
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            )}

                                            
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        { rounds && 
                                            rounds.map((round,index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                                                            {round.round_order}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {round.name}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {
                                                            permissions.canEdit && (
                                                                <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => {
                                                                    setRoundVal(round)
                                                                    setViewMode('edit')
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
                        )
                    }
                </div>
            </main>

            <RoundModule viewMode={viewMode} setViewMode={setViewMode} eachRoundValue={roundVal} eventId={eventId}/>
        </div>
    )
}