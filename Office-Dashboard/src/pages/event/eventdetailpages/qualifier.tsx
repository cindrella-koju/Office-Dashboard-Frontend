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
        handleRemoveQualifier,
        createQualifier,
        roundId,
        selected,
        setSelected
    } = useQualifier()
    
    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault()
        await createQualifier(roundId, { user_id: selected })
    }

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
                                                user={q as UserCardData}
                                                onRemove={handleRemoveQualifier}
                                                canDelete={permissions.canDelete}
                                                hoverColor="blue"
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
                    />
                )}
            </PageContent>
        </PageLayout>
    );
}