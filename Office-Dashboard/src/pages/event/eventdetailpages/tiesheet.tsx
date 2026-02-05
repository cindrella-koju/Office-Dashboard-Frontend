import { useState } from "react";
import { usePermissions, type EventPermission } from "../../../hooks/userPermission";
import EventNavBar from "../../../components/EventNavbar";
import TiesheetModel from "../../../components/Model/TiesheetModel";
import TiesheetCard from "../../../components/pages/tiesheet/TiesheetCard";
import useFetch from "../../../hooks/useFetch";
import { RETRIEVE_TIESHEET } from "../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { CgFileDocument } from "react-icons/cg";
import type { TiesheetType } from "../../../type/tiesheet.type";
import MatchDetail from "../../../components/pages/tiesheet/MatchDetail";
import PopUp from "../../../components/ui/PopUp";


export default function Tiesheet(){
  const eventId = localStorage.getItem("eventId");
  const permissions = usePermissions<EventPermission>({withinevent : true})
//   console.log("Permissions :", permissions)
  const [showMatchDetail, setShowMatchDetail] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [tiesheetId, settiesheetId ] = useState<string | null>(null)
  const { data: tiesheet, refetch: refetchTiesheet } = useFetch<TiesheetType[] | null>(
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
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const handleEditMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setViewMode("edit");
  };

  const handleMatchDetailView = (status : string, tiesheet_id : string) => {
        {
            status === "completed" && setShowMatchDetail(true)
        }
        settiesheetId(tiesheet_id)
    }

    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="Tiesheet"
                    actions = {
                        permissions.canCreate && (
                            <>
                            <Button onClick={() => setViewMode("create")}>Create Tiesheet</Button>
                            </>
                        )
                    }
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
                                                    <div key={match.id} className="hover:scale-102 transform transition duration-300 ease-in-out cursor-pointer" onClick={() => handleMatchDetailView(match.status, match.id)}>
                                                    <TiesheetCard
                                                        id={match.id}
                                                        scheduledDate={match.scheduled_date}
                                                        scheduledTime={match.scheduled_time}
                                                        status={match.status}
                                                        players={match.player_info}
                                                        onEdit={handleEditMatch}
                                                        permissions={permissions}
                                                        tiesheetfrom="tiesheet"
                                                        tiesheetId={match.id} 
                                                        refetchMatches={refetchTiesheet}
                                                    />
                                                    </div>
                                                    
                                                </>
                                            ))}
                                        </div>

                                    </div>
                                )))}
                            </div>
            
                            {tiesheet && tiesheet.length === 0 && (
                                <EmptyMessage message="No Tiesheet Yet" submessage="Create Tiesheet to see them appear hear" icon={<CgFileDocument size={80}/>}/>
                            )}
            
                  {
                    eventId && (
                      <TiesheetModel viewMode={viewMode} eventId={eventId} setviewMode={setViewMode} matchId={selectedMatchId}/>
                    )
                  }
                  
                    {
                        showMatchDetail && tiesheetId && <MatchDetail setShowMatchDetail={setShowMatchDetail} tiesheet_id={tiesheetId}/>
                    }
                    {
                        showDelete && <PopUp popUpType="delete" pagename="tiesheet" data="user1 vs user 2" setOnClose={setShowDelete}/>
                    }
                    
            </PageContent>
        </PageLayout>


        
        
    )
}