import type React from "react";
import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import EventRoleModel from "../../../components/Model/EventRoleModel";
import Button from "../../../components/ui/Button";
import { useEventRole } from "../../../hooks/useEventRole";
import Table from "../../../components/table/Tables";
import ConfirmationModal from "../../../components/Model/ConfirmationPopUp";
import Card from "../../../components/ui/Card";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { RiAdminFill } from "react-icons/ri";
import Filters from "../../../components/Filters";
import type { EventRoleResponse } from "../../../type/eventrole.type";
import { RETRIEVE_EVENT_ROLE, RETRIEVE_EVENT_ROLE_BY_ROLEID } from "../../../constants/urls";

export default function EventRole() {
    const eventID = localStorage.getItem("eventId");
    const {
        permissions,
        mode,
        setMode,
        participant,
        role, 
        formData,
        setFormData,
        createEventRole,
        eventRole,
        tablehead,
        popUpDelete,
        setPopUpDelete,
        deleteEventRole,
        editEventRole,
        loading,
        error,
        onlyEventRole,
        selectedRole,
        setSelectedRole,
        setEventrole
    } = useEventRole()

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()

        if(mode === "create") await createEventRole(formData);
        if( mode === "edit" ) await editEventRole(formData.id, formData);
    }
    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="Event Role"
                    actions = {
                        permissions.canCreate && (
                            <Button 
                                varient="primary" 
                                onClick={() => {
                                    setMode("create")
                                }}
                            >
                                Add Qualifier
                            </Button>
                        )
                    }
                />
                {
                    selectedRole && onlyEventRole && (
                        <Card className="mb-6">
                            <div className="p-4 sm:p-6">
                                <Filters<EventRoleResponse[]>
                                    defaultVal = {selectedRole}
                                    twoIdUrlFunction={RETRIEVE_EVENT_ROLE_BY_ROLEID}
                                    filters={onlyEventRole}
                                    label = "Select Role"
                                    onSelectFilter = {setSelectedRole}
                                    setSelectVal={setEventrole}
                                    allUrl={RETRIEVE_EVENT_ROLE(eventID ? eventID : "")}
                                />
                            </div>
                        </Card>
                    )
                }
                <Card className="p-4 sm:p-6">
                    {
                        eventRole && (
                            <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-12 text-red-500">
                                    Error loading standing columns: {error}
                                    </div>
                                ) : eventRole.length > 0 ? (
                                    <Table
                                        tablefor="WithinEvent"
                                        tablehead={tablehead}
                                        tabledata={eventRole}
                                        permissions={permissions}
                                        setModelType={setMode}
                                        setValue={setFormData}
                                        setOnDelete={setPopUpDelete}
                                    />

                                ) : (
                                    <EmptyMessage
                                        message="No User with Role yet"
                                        submessage="Add Participants to assign the role"
                                        icon={<RiAdminFill size={80} />}
                                    />
                                )
                                }
                            </div>
                        )
                    }

                </Card>
                {
                    mode != null && participant && role &&(
                        <EventRoleModel
                            mode={mode}
                            onclose={() =>{
                                setMode(null)
                                setFormData({
                                    id : "",
                                    user_id : "",
                                    role_id : "",
                                    username : "",
                                    rolename : ""
                                })
                            }}
                            participants={participant?.participants}
                            role ={role}
                            eventRole={formData}
                            setEventRole={setFormData}
                            handleSubmit={handleSubmit}
                        />
                    )
                }
                {
                    formData && formData.id && 
                    <ConfirmationModal
                        isOpen={popUpDelete}
                        title="Delete"
                        message={`Are you sure you want to delete ${formData.username} role ${formData.rolename}`}
                        onCancel={() => setPopUpDelete(false)}
                        onConfirm={() => {
                            deleteEventRole(formData.id)
                            setPopUpDelete(false)
                            setFormData({
                                id : "",
                                user_id : "",
                                role_id : "",
                                username : "",
                                rolename : ""
                            })
                        }}
                    />
                }
            </PageContent>
        </PageLayout>
    )
}