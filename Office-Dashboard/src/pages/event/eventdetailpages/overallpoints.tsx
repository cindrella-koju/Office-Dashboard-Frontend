import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Card from "../../../components/ui/Card";
import { GET_ROUNDS_BY_EVENT, RETRIEVE_OVERALL_TIESHEET_BY_ROUND, RETRIEVE_ROUNDS } from "../../../constants/urls";
import useFetch from "../../../hooks/useFetch";
import OverallPointTable, { type UserType } from "../../../components/pages/overallpoints/OverallPointTable";
import type { Round } from "../../../type/group.type";
import { useEffect, useState } from "react";
import Filters from "../../../components/Filters";
import type { RoundType } from "../../../components/Model/StandingColumnModel";



interface OverallPointResponse{
    round_name : string,
    users : UserType[]
}
export default function OverallPoints(){
    const eventId = localStorage.getItem("eventId");
    const [overallpoints, setOverAllPoints] = useState<OverallPointResponse[]>([])
    const { data : round_by_event } = useFetch<Round[]>(GET_ROUNDS_BY_EVENT(eventId ? eventId : ""))
    const [selectedRound, setSelectedRound] = useState<Round | null>(null);

    const { data: rounds } = useFetch<RoundType[]>(eventId ? RETRIEVE_ROUNDS(eventId) : "");
    const roundId = selectedRound ? selectedRound.id : rounds?.[0]?.id;
    const {data : overalltiesheet} = useFetch<OverallPointResponse[]>(eventId && roundId ? RETRIEVE_OVERALL_TIESHEET_BY_ROUND(eventId, roundId) : "");

    useEffect(() => {
        if (round_by_event && round_by_event.length > 0) {
        setSelectedRound(round_by_event[0]);
        }
    }, [round_by_event]);

    useEffect(() => {
        if (!overalltiesheet) return;
    
        setOverAllPoints(overalltiesheet);
      }, [overalltiesheet]);

    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="Overall Points"
                />
                {
                    selectedRound && rounds && (
                    <Card className="mb-6">
                        <div className="p-4 sm:p-6">
                            <Filters<OverallPointResponse[]>
                                defaultVal={selectedRound}
                                twoIdUrlFunction={RETRIEVE_OVERALL_TIESHEET_BY_ROUND}
                                filters={rounds}
                                label="Select Round"
                                setSelectVal={setOverAllPoints}
                                onSelectFilter={setSelectedRound} // Pass setSelectedRound to handle filter changes
                            />
        
                        </div>
                    </Card>
                    )
                }

                <Card className="flex-1 h-[70%]">
                    <div className="p-4 sm:p-6 h-full overflow-y-auto space-y-8">
                        {overallpoints && overallpoints.map((round, roundIndex) => (
                            <div key={roundIndex}>

                                <h2 className="text-lg font-semibold text-gray-800 mb-4" onClick={() => console.log(round.users?.[0]?.column_detail ?? [])}>
                                    {round.round_name}
                                </h2>
                                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                                    <OverallPointTable users={round.users}/>
                                </div>

                            </div>
                        ))}
                    </div>

                </Card>
            </PageContent>
        </PageLayout>
    )
}