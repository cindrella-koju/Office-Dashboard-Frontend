import type React from "react";
import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import EventRoleModel from "../../../components/Model/EventRoleModel";
import Button from "../../../components/ui/Button";
import { useEventRole } from "../../../hooks/useEventRole";
import Table from "../../../components/table/Tables";
import ConfirmationModal from "../../../components/Model/ConfirmationPopUp";

export default function EventRole() {
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
        editEventRole
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
                <Table
                    tablefor="WithinEvent"
                    tablehead={tablehead}
                    tabledata={eventRole}
                    permissions={permissions}
                    setModelType={setMode}
                    setValue={setFormData}
                    setOnDelete={setPopUpDelete}
                />
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