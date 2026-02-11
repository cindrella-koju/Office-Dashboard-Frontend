import {  useState } from "react";
import EventNavBar from "../../../components/EventNavbar";
import { usePermissions, type EventPermission } from "../../../hooks/userPermission";

import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { GrGroup } from "react-icons/gr";
import Table from "../../../components/table/Tables";
import { useRound } from "../../../hooks/round/useRound";
import { useRoundForm } from "../../../hooks/round/useRoundForm";
import RoundModel from "../../../components/Model/RoundModel";
import type { ModelType } from "../../../type/main.type";
import ConfirmationModal from "../../../components/Model/ConfirmationPopUp";


export default function Rounds(){
    const eventId = localStorage.getItem("eventId");
    const permissions = usePermissions<EventPermission>({withinevent :  true})

    const {
        rounds,
        tablehead,
        loading,
        error,
        editRound,
        setEditRound,
        createRound,
        updateRound,
        deleteRound
    } = useRound()

    const {
        roundDetail,
        originalRounds,
        setOriginalRounds,
        getChangedFields,
        handleChange,
        closeFunction
    } = useRoundForm(editRound)

    const [viewMode, setViewMode] = useState<ModelType>(null)
    const [popUpDelete, setPopUpDelete] = useState<boolean>(false)
    const handleSubmit = async(e:React.FormEvent) => {
        if(!eventId) return;

        e.preventDefault();
        if (viewMode === "create") await createRound(roundDetail, eventId);
        else if( viewMode === "edit" ) await updateRound(eventId, roundDetail.id, getChangedFields(originalRounds,roundDetail))
        setViewMode(null)
        setOriginalRounds(null)
    }
   
    console.log("Rounds", rounds)
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
                                setValue={setEditRound}
                                tablefor={"WithinEvent"}
                                setOnDelete={setPopUpDelete}
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
                        <RoundModel
                            mode={viewMode}
                            formData={roundDetail}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            onClose={() => 
                                {
                                    setViewMode(null)
                                    closeFunction()
                                }
                            }
                        />
                    )
                }
                {
                    editRound && 
                        <ConfirmationModal
                            isOpen = {popUpDelete}
                            title="Delete"
                            message={`Are you sure you want to delete Round ${editRound.name}`}
                            onCancel={() => setPopUpDelete(false)}
                            onConfirm={() => {
                                deleteRound(editRound.id)
                                setPopUpDelete(false)
                            }}
                        />
                }
            </PageContent>
        </PageLayout>

    )
}