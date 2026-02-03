import { usePermissions } from "../../../hooks/userPermission";
import EventNavBar from "../../../components/EventNavbar";
import TiesheetCard from "../../../components/pages/tiesheet/TiesheetCard";
import useFetch from "../../../hooks/useFetch";
import { RETRIEVE_TODAY_TIESHEET } from "../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { CgFileDocument } from "react-icons/cg";
import type { TiesheetType } from "../../../type/tiesheet.type";
import MatchDetail from "../../../components/pages/tiesheet/MatchDetail";
import { useState } from "react";
import AddMatchModal from "../../../components/Model/AddMatchModel";


export default function TodayGame(){

  const eventId = localStorage.getItem("eventId");
  const permissions = usePermissions("tiesheet")
  const [showMatchDetail, setShowMatchDetail] = useState<boolean>(false)
  const [showAddDetail, setShowAddDetail] = useState<boolean>(false)
  const { data: tiesheet, refetch:refetchTiesheet } = useFetch<TiesheetType[] | null>(
    eventId ? RETRIEVE_TODAY_TIESHEET(eventId) : ""
  );

  const groupedByStage = tiesheet && (tiesheet.reduce((acc, tiesheet) => {
        const stage = tiesheet.stage_name;
        if (!acc[stage]) {
            acc[stage] = [];
        }
        acc[stage].push(tiesheet);
        return acc;
    }, {} as Record<string, typeof tiesheet>));

    const handleMatchDetailView = (status : string) => {
        status === "completed" && setShowMatchDetail(true)
    }

    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="Todays Game"
                />
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
                                            {matches.map((match) => (
                                                <>
                                                <div key={match.id} className="hover:scale-102 transform transition duration-300 ease-in-out cursor-pointer" onClick={() => handleMatchDetailView(match.status)}>
                                                    <TiesheetCard
                                                        key={match.id}
                                                        id={match.id}
                                                        // groupName={match.group_name}
                                                        scheduledDate={match.scheduled_date}
                                                        scheduledTime={match.scheduled_time}
                                                        status={match.status}
                                                        players={match.player_info}
                                                        permissions={permissions}
                                                        tiesheetfrom="todaystiesheet"
                                                        tiesheetId={match.id}
                                                        refetchMatches={refetchTiesheet}
                                                        setShowAddDetail={setShowAddDetail}
                                                    />
                                                </div>
                                                {
                                                    showAddDetail &&
                                                    <AddMatchModal player1={match.player_info[0]} player2={match.player_info[1]} tiesheetID={match.id} setOpenStartGame={setShowAddDetail}/>
                                                }
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                )))}
                            </div>
            
                            {tiesheet && tiesheet.length === 0 && (
                                <EmptyMessage message="No Game for Today" submessage="Create Tiesheet to see them appear hear" icon={<CgFileDocument size={80}/>}/>
                            )}
                            {
                                showMatchDetail && <MatchDetail setShowMatchDetail={setShowMatchDetail}/>
                            }
            </PageContent>
        </PageLayout>


        
        
    )
}