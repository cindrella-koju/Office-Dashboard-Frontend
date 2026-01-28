import { useState, useCallback } from "react";
import EventNavBar from "../../../components/EventNavbar";
import { usePermissions } from "../../../hooks/userPermission";
import ParticipantsModule from "../../../components/Model/ParticipantsModel";
import useFetch from "../../../hooks/useFetch";
import { RETRIEVE_PARTICIPANTS } from "../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import { UserToolbar, UserList } from "../../../components/shared";
import type { ViewMode, UserCardData } from "../../../components/shared";
import type { ModelType } from "../../../type/main.type";

// Re-export getInitials for backward compatibility
export { getInitials } from "../../../components/shared";

interface ParticipantsInfo {
    id: string;
    username: string;
    email: string;
}

export interface Participants {
    participants: ParticipantsInfo[];
}

// Transform participant data to UserCardData format
const transformToUserCard = (participant: ParticipantsInfo): UserCardData => ({
    user_id: participant.id,
    username: participant.username,
});

export default function Participants() {
    const eventID = localStorage.getItem("eventId");
    const { data: participants } = useFetch<Participants>(
        eventID ? RETRIEVE_PARTICIPANTS(eventID) : ""
    );
    const permissions = usePermissions("participants");

    // Local state
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [searchQuery, setSearchQuery] = useState<string>("");
    // const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [modelType, setModelType] = useState<ModelType>(null)

    // Handlers
    const handleViewModeChange = useCallback((mode: ViewMode) => {
        setViewMode(mode);
    }, []);

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const handleOpenAddModal = useCallback(() => {
        setModelType("create")
    }, []);

    const handleRemoveParticipant = useCallback((userId: number | string) => {
        // TODO: Implement remove participant functionality
        console.log("Remove participant:", userId);
    }, []);

    // Transform participants to UserCardData format
    const userCardData = participants?.participants.map(transformToUserCard) || null;

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
                    onRemoveUser={handleRemoveParticipant}
                    canDelete={permissions.canDelete}
                    emptyTitle="No Participants Yet"
                    emptyDescription="Add participants to see them appear here."
                    hoverColor="emerald"
                    title="Participants"
                    showCount={true}
                />

                {/* Add Participant Modal */}
                { modelType!=null && (
                    <ParticipantsModule eventId={eventID} setModelType={setModelType}/>
                )}
            </PageContent>
        </PageLayout>
    );
}