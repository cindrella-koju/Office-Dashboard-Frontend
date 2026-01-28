import { useState } from "react";
import { usePermissions } from "../../../hooks/userPermission";
import EventNavBar from "../../../components/EventNavbar";
import TiesheetModel from "../../../components/Model/TiesheetModel";
import TiesheetCard from "../../../components/pages/tiesheet/TiesheetCard";
import useFetch from "../../../hooks/useFetch";
import { RETRIEVE_TIESHEET } from "../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { CgFileDocument } from "react-icons/cg";

interface PlayerInfoType{
  user_id : string,
  is_winner : boolean,
  username : string,
  points?: number
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
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="Tiesheet"
                    actions = {
                        permissions.canCreate && (
                            <>
                            <Button onClick={() => setViewMode("create")}>Individual Match</Button>
                            <Button onClick={() => setViewMode("create")}>Group vs Group</Button>
                            <Button onClick={() => setViewMode("create")}>Within Group</Button>
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
                                                <TiesheetCard
                                                    key={match.id}
                                                    id={match.id}
                                                    groupName={match.group_name}
                                                    scheduledDate={match.scheduled_date}
                                                    scheduledTime={match.scheduled_time}
                                                    players={match.player_info}
                                                    onEdit={(id) => console.log('Edit match:', id)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )))}
                            </div>
            
                            {tiesheet && tiesheet.length === 0 && (
                                <EmptyMessage message="No Tiesheet Yet" submessage="Create Tiesheet to se them appear hear" icon={<CgFileDocument size={80}/>}/>
                            )}
            
                  {
                    eventId && (
                      <TiesheetModel viewMode={viewMode} eventId={eventId} setviewMode={setViewMode}/>
                    )
                  }
            </PageContent>
        </PageLayout>


        
        
    )
}