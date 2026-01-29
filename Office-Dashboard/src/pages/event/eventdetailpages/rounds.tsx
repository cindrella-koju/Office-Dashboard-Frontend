import { useEffect, useState } from "react";
import EventNavBar from "../../../components/EventNavbar";
import { usePermissions } from "../../../hooks/userPermission";

import useFetch from "../../../hooks/useFetch";
import { CREATE_ROUND, EDIT_ROUND, RETRIEVE_ROUNDS } from "../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import extractHeaders from "../../../utils/extractHeader";
import CreateModel from "../../../components/Model/CreateModel";
import { roundFields } from "../../../constants/fields";
import useCreateResource from "../../../hooks/useSubmit";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { GrGroup } from "react-icons/gr";
import Table from "../../../components/table/Tables";
// import type { RoundData } from "../../../type/round.type";


interface RoundData{
    id : string,
    name : string,
    round_order : number
}

export default function Rounds(){
    const eventId = localStorage.getItem("eventId");
    const permissions = usePermissions("rounds")
    const {data : retrieve_rounds, loading, error } = useFetch<RoundData[]>( eventId ? RETRIEVE_ROUNDS(eventId) : "") 
    const [rounds, setRounds] = useState<RoundData[]>()
    const [originalRounds, setOriginalRounds] = useState<RoundData | null>(null)
    const [viewMode, setViewMode] = useState<"create" | "edit" | null>(null)
    const [roundVal, setRoundVal] = useState<RoundData | null>(null)
    const [tablehead, setTableHead] = useState<string[]>([])
    const [submitRound, setSubmitRound] = useState<"create" | "edit" | null>(null);
    const [roundDetail, setRoundDetail] = useState<RoundData>({
        id : "",
        name : "",
        round_order : 0
    })

    // Extract Table head and set rounds
    useEffect(() => {
        if(!retrieve_rounds) return;
        const headers = extractHeaders(retrieve_rounds);
        setTableHead(headers)
        setRounds(retrieve_rounds)
    },[retrieve_rounds])

    // set edit data
    useEffect(() => {
        if (!roundVal) return;

        setOriginalRounds(roundVal)
        setRoundDetail({
            id : roundVal.id,
            name :  roundVal.name,
            round_order : roundVal.round_order
        })
    },[roundVal])

    const getChangedFields = (
        original: RoundData | null,
        current: typeof roundDetail
    ) => {
        // Early return if original is null
        if (!original) return {}; 

        const changed: Partial<typeof roundDetail> = {};

        (Object.keys(current) as (keyof typeof roundDetail)[]).forEach((key) => {
            if (
                key !== "id" &&
                current[key] !== (original as any)[key]
            ) {
                changed[key] = current[key] as any;
            }
        });

        return changed;
    };

    useCreateResource({
        trigger : submitRound,
        method: submitRound === "create" ? "POST" : "PATCH",
        endpoint:
            submitRound === "create" ? CREATE_ROUND(eventId ? eventId:"") : EDIT_ROUND(roundDetail.id),

        payload:
            submitRound === "create" ? roundDetail : getChangedFields(originalRounds, roundDetail),

        page: "Round",
        onSuccess: () => {
            setRoundDetail({
                id : "",
                name : "",
                round_order : 0
            });
            setViewMode(null)
            setOriginalRounds(null)
        },
        resetTrigger: () => setSubmitRound(null)

    })
    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="All Rounds"
                    actions = {
                        permissions.canCreate && (
                            <Button varient="primary" onClick={() => setViewMode("create")}>Add Round</Button>
                        )
                    }
                />

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
                            <Table
                                tablehead={tablehead}
                                tabledata={rounds}
                                permissions={permissions}
                                setModelType={setViewMode}
                                setValue={setRoundVal}
                            />
                            )}
                        </div>
                    }
                </Card>
                {
                    !rounds || rounds.length === 0 && (
                        <EmptyMessage message="No Rounds Yet" submessage="Add Rounds to see them appear hear" icon={<GrGroup size={80}/>}/>
                    )
                }

                {
                    viewMode && (
                        <CreateModel
                            modelType={viewMode}
                            setModelType={setViewMode}
                            title="Round"
                            formData={roundDetail}
                            setFormData={setRoundDetail}
                            setSubmit={setSubmitRound}
                            fields={roundFields}
                        />
                    )
                }
            </PageContent>
        </PageLayout>

    )
}