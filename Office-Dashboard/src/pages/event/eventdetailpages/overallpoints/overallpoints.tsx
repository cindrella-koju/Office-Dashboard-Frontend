import EventNavBar from "../../../../components/EventNavbar";
import FilterComponent from "../../../../components/Filters";
import Card from "../../../../components/ui/Card";
import { RETRIEVE_OVERALL_TIESHEET } from "../../../../constants/urls";
import useFetch from "../../../../hooks/useFetch";
import OverallPointTable, { type UserType } from "./OverallPointTable";


interface OverallPointResponse{
    round_name : string,
    users : UserType[]
}
export default function OverallPoints(){
    const eventId = localStorage.getItem("eventId");
    const {data : overalltiesheet} = useFetch<OverallPointResponse[]>(eventId ? RETRIEVE_OVERALL_TIESHEET(eventId) : "");
    const filters = ["All", "Round 1", "Round 2"];
    return(
        <div className="flex min-h-screen bg-gray-100">
            <EventNavBar/>
            <main className="flex-1 p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Overall Points</h1>
                </div>

                <Card className="mb-6">
                    <div className="p-4 sm:p-6">
                        <FilterComponent filter="All" filters={filters}/>
                    </div>
                </Card>

                <Card className="flex-1 h-[70%]">
                    <div className="p-4 sm:p-6 h-full overflow-y-auto space-y-8">
                        {overalltiesheet && overalltiesheet.map((round, roundIndex) => (
                            <div key={roundIndex}>

                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    {round.round_name}
                                </h2>

                                {/* Table */}
                                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                                    {/* <button onClick={() => console.log(round.users)}>HEHEEH</button> */}
                                    <OverallPointTable users={round.users}/>
                                </div>

                            </div>
                        ))}
                    </div>

                </Card>
            </main>
        </div>
    )
}