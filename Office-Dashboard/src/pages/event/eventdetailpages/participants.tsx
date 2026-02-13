import EventNavBar from "../../../components/EventNavbar";
import ParticipantsModule from "../../../components/Model/ParticipantsModel";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import { UserToolbar, UserList } from "../../../components/shared";
import type { UserCardData } from "../../../components/shared";
import { useParticipants } from "../../../hooks/participants/useParticipants";
import type React from "react";
import { useState } from "react";
import ConfirmationModal from "../../../components/Model/ConfirmationPopUp";

// Re-export getInitials for backward compatibility
export { getInitials } from "../../../components/shared";

interface ParticipantsInfo {
    id: string;
    username: string;
    email: string;
}

export interface EventParticipants {
    participants: ParticipantsInfo[];
}

// Transform participant data to UserCardData format
const transformToUserCard = (participant: ParticipantsInfo): UserCardData => ({
    user_id: participant.id,
    username: participant.username,
});

export default function Participants() {
    const{
        permissions,
        participants,
        viewMode,
        searchQuery,
        handleOpenAddModal,
        handleSearchChange,
        handleViewModeChange,
        modelType,
        selected,
        setSelected,
        setModelType,
        createParticipants,
        deleteParticipants
    } = useParticipants()
    const [popUpDelete, setPopUpDelete] = useState<boolean>(false);
    const [participantId, setParticipantId] = useState<string>("")
    const [selectedUser, setSelectedUser ] = useState<string>("")
    const userCardData = participants?.participants.map(transformToUserCard) || null;
    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        await createParticipants({ user_id : selected })
        setModelType(null)
        setSelected([])
    }
    return (
        <PageLayout sidebar={<EventNavBar />}>
            <PageContent>
                {/* Page Header */}
                <PageHeader
                    title="Participants"
                    actions={
                        permissions.canCreate && (
                            <Button 
                                varient="primary" 
                                onClick={handleOpenAddModal}
                            >
                                + Add Participants
                            </Button>
                        )
                    }
                />

                {/* Search and View Toggle Toolbar */}
                <UserToolbar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                    searchPlaceholder="Search by username..."
                />

                {/* Participants List */}
                <UserList
                    users={userCardData}
                    viewMode={viewMode}
                    searchQuery={searchQuery}
                    canDelete={permissions.canDelete}
                    emptyTitle="No Participants Yet"
                    emptyDescription="Add participants to see them appear here."
                    hoverColor="emerald"
                    title="Participants"
                    showCount={true}
                    setPopUpDelete={setPopUpDelete}
                    setSelectedUser={setSelectedUser}
                    setParticipantId={setParticipantId}
                />

                {/* Add Participant Modal */}
                { modelType!=null && (
                    <ParticipantsModule 
                        selected={selected}
                        setSelected={setSelected}
                        setModelType={setModelType}
                        handleSubmit={handleSubmit}
                    />
                )}

                {
                    participantId && 
                    <ConfirmationModal
                        isOpen={popUpDelete}
                        title="Delete"
                        message={`Are you sure you want to selete ${selectedUser} from Participants?`}
                        onCancel={() => setPopUpDelete(false)}
                        onConfirm={() => {
                        deleteParticipants(participantId)
                        setPopUpDelete(false)
                        }}
                    />
                }
            </PageContent>
        </PageLayout>
    );
}