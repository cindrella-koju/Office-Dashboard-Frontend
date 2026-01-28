import { useEffect, useState } from "react";
import EventNavBar from "../../../../components/EventNavbar";
import FilterComponent from "../../../../components/Filters";
import Card from "../../../../components/ui/Card";
import useFetch from "../../../../hooks/useFetch";
import { usePermissions } from "../../../../hooks/userPermission";
import StandingColumnModule, { type RoundType } from "./StandingColumnModule";
import { RETRIEVE_ROUNDS, RETRIEVE_STANDING_COLUMN } from "../../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../../components/layout/PageLayout";
import Button from "../../../../components/ui/Button";
import extractHeaders from "../../../../utils/extractHeader";
import Table from "../../../../components/Tables";
import EmptyMessage from "../../../../components/ui/EmptyMessage";
import { FaChartBar } from "react-icons/fa";
import type { StandingColumnType } from "../../../../type/standingcolumn.type";


export default function StandingColumn(){
    const eventId = localStorage.getItem("eventId")
    const permissions = usePermissions("standingcolumn")
    const [viewMode,setViewMode] = useState<"create" | "edit" | null>(null)
    const { data:rounds } = useFetch<RoundType[]>(eventId ? RETRIEVE_ROUNDS(eventId) : "")
    const roundId = rounds && rounds[0].id
    // const [roundId, setRoundId] = useState(rounds && rounds[0].id)
    const { data:retrieve_standingcolumn, loading, error } = useFetch<StandingColumnType[]>(roundId ? RETRIEVE_STANDING_COLUMN(roundId) : "")
    const [tablehead, setTableHead] = useState<string[]>([])
    const [standingcolumn, setStandingColumn] = useState<StandingColumnType[]>([])
    const [colVal, setColVal] = useState<StandingColumnType>()
    const filters = ["Round 1", "Round 2"]

    useEffect(() => {
        if (!retrieve_standingcolumn) return;

        const headers = extractHeaders(retrieve_standingcolumn);
        setTableHead(headers)
        setStandingColumn(retrieve_standingcolumn)
    },[retrieve_standingcolumn])
    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="Standing Columns"
                    actions = {permissions.canCreate && (
                        <Button varient="primary" onClick={() => setViewMode("create")}>Add Column</Button>
                    )}
                />
                <Card className="mb-6">
                    <div className="p-4 sm:p-6">
                        <FilterComponent filter="Round 1" filters={filters}/>
                    </div>
                </Card>

                <Card className="p-4 sm:p-6" >
                    {
                        rounds &&
                        <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
                            {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                            </div>
                            ) : error ? (
                            <div className="text-center py-12 text-red-500">
                                Error loading users: {error}
                            </div>
                            ) : (
                                standingcolumn.length > 0 ? (
                                    <Table
                                        tablehead={tablehead}
                                        tabledata={standingcolumn}
                                        permissions={permissions}
                                        setModelType={setViewMode}
                                        setValue={setColVal}
                                    />

                                ) : <EmptyMessage message="No Standing Column Yet" submessage="Create Standing Column Based on Round" icon={<FaChartBar size={80} />}/>
                            )}
                        </div>
                    }
                </Card>
                {
                    viewMode != null  && <StandingColumnModule viewMode={viewMode} eventId={eventId} setViewMode={setViewMode} colVal={colVal}/> 
                }
            </PageContent>

        </PageLayout>


    )
}