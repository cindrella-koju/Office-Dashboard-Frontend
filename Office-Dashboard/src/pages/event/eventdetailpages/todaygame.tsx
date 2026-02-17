import EventNavBar from "../../../components/EventNavbar";
import TiesheetCard from "../../../components/pages/tiesheet/TiesheetCard";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { CgFileDocument } from "react-icons/cg";
import MatchDetail from "../../../components/pages/tiesheet/MatchDetail";
import AddMatchModal from "../../../components/Model/AddMatchModel";
import { useTodayGame } from "../../../hooks/tiesheet/useTodayGame";

export default function TodayGame() {
  const {
    permissions,
    tiesheet,
    loading,
    error,
    groupedByStage,
    showMatchDetail,
    setShowMatchDetail,
    scoreView,
    setScoreView,
    matchInfo,
    editingTiesheet,
    setEditingTiesheet,
    status,
    setStatus,
    players,
    setPlayers,
    handleMatchDetailView,
    handleAddScore,
    handleEditScore,
  } = useTodayGame();

  return (
    <PageLayout sidebar={<EventNavBar />}>
      <PageContent>
        <PageHeader title="Today's Game" />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Error loading today's games: {error}
          </div>
        ) : (
          <>
            {/* Matches by Stage */}
            <div className="space-y-6">
              {groupedByStage && Object.entries(groupedByStage).map(([stageName, matches]) => (
                <div key={stageName}>
                  {/* Stage Label */}
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {stageName}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">
                      {new Date(matches[0]?.scheduled_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Match Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {matches.map((match) => (
                      <div
                        key={match.id}
                        className="hover:scale-102 transform transition duration-300 ease-in-out cursor-pointer"
                      >
                        <TiesheetCard
                          id={match.id}
                          scheduledDate={match.scheduled_date}
                          scheduledTime={match.scheduled_time}
                          status={match.status}
                          players={match.player_info}
                          permissions={permissions}
                          tiesheetId={match.id}
                          onClick={() => {
                            setEditingTiesheet(match.id);
                            setStatus(match.status);
                            setPlayers(match.player_info);
                          }}
                          onAddScore={() => handleAddScore(match)}
                          onEditScore={() => handleEditScore(match)}
                          handleMatchDetailView={() => handleMatchDetailView(match.status, match.id)}
                          onDeleteTiesheet={() => { }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {tiesheet && tiesheet.length === 0 && (
              <EmptyMessage
                message="No Game for Today"
                submessage="Create Tiesheet to see them appear here"
                icon={<CgFileDocument size={80} />}
              />
            )}
          </>
        )}

        {/* Match Detail Modal */}
        {showMatchDetail && (
          <MatchDetail
            setShowMatchDetail={setShowMatchDetail}
            matchInfo={matchInfo}
          />
        )}

        {/* Add/Edit Match Modal */}
        {scoreView && players && editingTiesheet && status && (
          <AddMatchModal
            setScoreView={setScoreView}
            tiesheetID={editingTiesheet}
            setOpenStartGame={setScoreView}
            scoreView={scoreView}
            status={status}
            setDeleteMatchId={() => { }}
            setShowDeleteMatch={() => { }}
            players={players}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}