import { useState } from "react";
import { usePermissions } from "../../../../hooks/userPermission";
import EventNavBar from "../../../../components/EventNavbar";
import TiesheetModel from "./components/TiesheetModel";
import useFetch from "../../../../hooks/useFetch";
import { RETRIEVE_TIESHEET } from "../../../../constants/urls";


interface PlayerInfoType{
  user_id : string,
  is_winner : boolean,
  username : string
}

interface TiesheetType{
  id : string,
  scheduled_date : string,
  scheduled_time : string,
  stage_name : string,
  player_info : PlayerInfoType[]
  group_name : string | null
}

export default function Tiesheet(){

  const eventId = localStorage.getItem("eventId");
  const permissions = usePermissions("tiesheet")

  const { data: tiesheet } = useFetch<TiesheetType[] | null>(
    eventId ? RETRIEVE_TIESHEET(eventId) : ""
  );

  const groupedByStage = tiesheet && (tiesheet.reduce((acc, tiesheet) => {
        const stage = tiesheet.stage_name;
        if (!acc[stage]) {
            acc[stage] = [];
        }
        acc[stage].push(tiesheet);
        return acc;
    }, {} as Record<string, typeof tiesheet>));


  const [viewMode, setViewMode] = useState<'create' | 'edit' | null>(null);

    return(
        <div className="flex min-h-screen bg-gray-100">
                    <EventNavBar/>
                    <main className="flex-1 p-6 md:p-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Tiesheet</h1>
                            {permissions.canCreate && (
                                <button className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                                onClick={() => setViewMode("create")}>
                                    + Create Match
                                </button>
                            )}
                        </div>
        
                        {/* Matches by Stage */}
                        <div className="space-y-6">
                            {groupedByStage && (Object.entries(groupedByStage).map(([stageName, matches]) => (
                                <div key={stageName}>
                                    {/* Stage Label */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                            {stageName}
                                        </h2>
                                        <div className="flex-1 h-px bg-gray-200"></div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(matches[0]?.scheduled_date).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
        
                                    {/* Match Cards */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {matches.map((match) => {
                                            const matchDate = new Date(`${match.scheduled_date}T${match.scheduled_time}`);
                                            const isCompleted = match.player_info.some(p => p.is_winner);
                                            
                                            return (
                                                <div 
                                                    key={match.id} 
                                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                                                >
                                                    {/* Card Header */}
                                                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {match.group_name && (
                                                                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                                    {match.group_name}
                                                                </span>
                                                            )}
                                                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                                                                isCompleted 
                                                                    ? 'text-green-600' 
                                                                    : 'text-gray-500'
                                                            }`}>
                                                                {isCompleted ? 'Completed' : 'Scheduled'}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-gray-400">
                                                            {matchDate.toLocaleTimeString('en-US', { 
                                                              hour: '2-digit', 
                                                              minute: '2-digit',
                                                              hour12: true
                                                            })}
                                                        </span>
                                                          <button className="text-xs font-medium" onClick={() => console.log(match.id)}>Edit</button>
                                                    </div>
        
                                                    {/* Match Content with Partition */}
                                                    <div className="flex">
                                                        {/* Left - Players */}
                                                        <div className="flex-1 p-4">
                                                            <div className="space-y-2">
                                                                {match.player_info.map((player, idx) => (
                                                                    <div 
                                                                        key={player.user_id}
                                                                        className={`flex items-center justify-between p-3 rounded-lg ${
                                                                            player.is_winner 
                                                                                ? 'bg-green-50 border border-green-200' 
                                                                                : 'bg-gray-50'
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold ${
                                                                                player.is_winner 
                                                                                    ? 'bg-green-600 text-white' 
                                                                                    : 'bg-gray-200 text-gray-600'
                                                                            }`}>
                                                                                {player.username.substring(0, 2).toUpperCase()}
                                                                            </div>
                                                                            <div>
                                                                                <span className={`text-sm font-medium ${
                                                                                    player.is_winner ? 'text-gray-900' : 'text-gray-600'
                                                                                }`}>
                                                                                    {player.username}
                                                                                </span>
                                                                                {player.is_winner && (
                                                                                    <span className="ml-2 text-xs text-green-600 font-medium">Winner</span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <span className={`text-lg font-bold ${
                                                                            player.is_winner ? 'text-green-600' : 'text-gray-300'
                                                                        }`}>
                                                                            {player.is_winner ? '2' : idx === 0 ? '1' : '0'}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
        
                                                        {/* Partition Line */}
                                                        <div className={`w-1 ${isCompleted ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
        
                                                        {/* Right - Date & Time */}
                                                        <div className="w-50 flex flex-col items-center justify-center py-4 text-center">
                                                            <span className="text-xs text-gray-400 uppercase tracking-wide">
                                                                {matchDate.toLocaleDateString('en-US', { month: 'short' })}
                                                            </span>
                                                            <span className="text-2xl font-bold text-gray-800">
                                                                {matchDate.getDate()}
                                                            </span>
                                                            <span className="text-xs text-gray-500 mt-1">
                                                                {matchDate.toLocaleTimeString('en-US', { 
                                                                    hour: '2-digit', 
                                                                    minute: '2-digit',
                                                                    hour12: true
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )))}
                        </div>
        
                        {tiesheet && tiesheet.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-sm">No matches scheduled yet</p>
                            </div>
                        )}
                    </main>
        
              {
                eventId && (
                  <TiesheetModel viewMode={viewMode} eventId={eventId}/>
                )
              }
        
        
                </div>
    )
}