import EventNavBar from "../../../components/EventNavbar";
import QualifierModule from "../../../components/Model/QualifierModel";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { UserToolbar, UserCard } from "../../../components/shared";
import type { UserCardData } from "../../../components/shared";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { IoPeople } from "react-icons/io5";
import { useQualifier } from "../../../hooks/qualifier/useQualifier";
import { useState } from "react";
import ConfirmationModal from "../../../components/Model/ConfirmationPopUp";



export default function Qualifier() {
    const {
        permissions,
        qualifiers,
        handleViewModeChange,
        viewMode,
        handleSearchChange,
        handleOpenAddModal,
        searchQuery,
        modelType,
        setModelType,
        getFilteredQualifiers,
        hasAnyQualifiers,
        createQualifier,
        roundId,
        setRoundId,
        selected,
        setSelected, 
        participants,
        deleteQualifier
    } = useQualifier()
    
    const handleSubmit =  async (e: React.FormEvent) => {
        console.log("RoundID :", roundId)
        e.preventDefault()
        await createQualifier(roundId, { user_id: selected })
        setModelType(null)
    }

    const [popUpDelete, setPopUpDelete] = useState<boolean>(false)
    const [ selectedQualifier, setSelectedQualifier] = useState<UserCardData | null>(null)
    const [ roundName, setRoundName ] = useState<string | null>(null)

    const gridClassName = viewMode === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
        : "space-y-3";

    return (
        <PageLayout sidebar={<EventNavBar />}>
            <PageContent>
                {/* Page Header */}
                <PageHeader
                    title="Qualifier"
                    actions={
                        permissions.canCreate && (
                            <Button 
                                varient="primary" 
                                onClick={handleOpenAddModal}
                            >
                                Add Qualifier
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
                    searchPlaceholder="Search by username or ID..."
                />

                {/* Qualifiers List by Round */}
                {!qualifiers || qualifiers.length === 0 ? (
                    <EmptyMessage message="No Qualifier Yet" submessage="Add Qualifier to see them appear hear" icon={<IoPeople size={80} />}/>
                ) : searchQuery && !hasAnyQualifiers ? (
                    <Card className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg 
                                className="w-16 h-16 mx-auto" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            No Results Found
                        </h3>
                        <p className="text-gray-500">
                            No qualifiers match "{searchQuery}"
                        </p>
                    </Card>
                ) : (
                    <Card>
                        {qualifiers.map((round, roundIndex) => {
                            const filteredQualifiers = getFilteredQualifiers(round.qualifier);
                            if (filteredQualifiers.length === 0) return null;
                            
                            return (
                                <section 
                                    key={round.round_name} 
                                    className={roundIndex === 0 ? "" : "mt-8 sm:mt-10"}
                                >
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                                        <span className="w-1 h-6 sm:h-8 bg-indigo-500 rounded-full mr-3" />
                                        {round.round_name}
                                        <span className="ml-3 text-sm font-normal text-gray-500">
                                            ({filteredQualifiers.length} {filteredQualifiers.length === 1 ? 'qualifier' : 'qualifiers'})
                                        </span>
                                    </h2>

                                    <div className={gridClassName}>
                                        {filteredQualifiers.map((q) => (
                                            <UserCard
                                                key={q.user_id}
                                                user={q}
                                                canDelete={permissions.canDelete}
                                                hoverColor="blue"
                                                setPopUpDelete={setPopUpDelete}
                                                onClick = {() => {
                                                    setRoundName(round.round_name)
                                                    setSelectedQualifier(q)
                                                }}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </Card>
                )}

                {/* Add Qualifier Modal */}
                {modelType!=null && (
                    <QualifierModule 
                        selected={selected}
                        setModelType={setModelType}
                        setSelected={setSelected}
                        handleSubmit={handleSubmit}
                        roundId={roundId}
                        setRoundId={setRoundId}
                        participants={participants}
                    />
                )}

                {
                    selectedQualifier  && 
                    <ConfirmationModal
                        isOpen={popUpDelete}
                        title="Delete"
                        message={`Are you sure you want to delete ${selectedQualifier.username} from round ${roundName}`}
                        onCancel={() => setPopUpDelete(false)}
                        onConfirm={() => {
                        deleteQualifier(selectedQualifier.qualifier_id ? selectedQualifier.qualifier_id : "")
                        setPopUpDelete(false)
                        }}
                    />
                }
            </PageContent>
        </PageLayout>
    );
}