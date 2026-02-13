import EventNavBar from "../../../components/EventNavbar";
import TiesheetModel from "../../../components/Model/TiesheetModel";
import TiesheetCard from "../../../components/pages/tiesheet/TiesheetCard";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { CgFileDocument } from "react-icons/cg";
import MatchDetail from "../../../components/pages/tiesheet/MatchDetail";
import PopUp from "../../../components/ui/PopUp";
import { useTiesheet } from "../../../hooks/tiesheet/useTiesheet";
import AddMatchModal from "../../../components/Model/AddMatchModel";


export default function Tiesheet(){
    const {
        permissions,
        setViewMode,
        groupedByStage,
        handleEditMatch,
        tiesheet,
        viewMode, 
        eventId,
        showMatchDetail,
        showDelete,
        setShowMatchDetail,
        tiesheetId,
        setShowDelete,
        selectedMatchId,
        handleMatchDetailView,


        roundId,
        setRoundID,
        setRoundName,
        setGroupName,
        setGroupId,
        groupId,
        setSelectedUsers,
        selectedUsers,
        selectedMatch,
        setSelectedMatch,
        setMatchDetails,
        setUsers,
        users,

        createTiesheet,
        updateTiesheet,

        showAddDetail,
        setShowAddDetail
    } = useTiesheet()

    const handleClose = () => {
        setSelectedMatch({
            stage_id: "",
            group_id :"",
            players: [],
            scheduled_date: "",
            scheduled_time: "",
            status: "scheduled"
        })
        setGroupName(null)
        setMatchDetails(null)
        setUsers([])
        setRoundID("")
        setViewMode(null)
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()

        if (selectedMatch.players.length < 2) {
            alert("Please select at least 2 players")
            return
        }

        const payload = {
            ...selectedMatch,
            status: selectedMatch.status.toLowerCase()
        }

        if (viewMode === "create"){ 
            await createTiesheet(payload)
        }
        if (viewMode === "edit") {
            if(!selectedMatchId) return;
            await updateTiesheet(selectedMatchId,payload)
        }
        handleClose()  
    }

    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="Tiesheet"
                    actions = {
                        permissions.canCreate && (
                            <>
                            <Button onClick={() => setViewMode("create")}>Create Tiesheet</Button>
                            </>
                        )
                    }
                />
                            {/* Matches by Stage */}
                <div className="space-y-6">
                    {groupedByStage && (Object.entries(groupedByStage).map(([stageName, matches]) => (
                        <div key={stageName}>
                            {/* Stage Label */}
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                    {stageName}
                                </h2>
                                <div className="flex-1 h-px bg-gray-200"></div>
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
                                    <>
                                        <div key={match.id} className="hover:scale-102 transform transition duration-300 ease-in-out cursor-pointer" onClick={() => handleMatchDetailView(match.status, match.id)}>
                                        <TiesheetCard
                                            id={match.id}
                                            scheduledDate={match.scheduled_date}
                                            scheduledTime={match.scheduled_time}
                                            status={match.status}
                                            players={match.player_info}
                                            onEdit={handleEditMatch}
                                            permissions={permissions}
                                            tiesheetId={match.id} 
                                            setShowAddDetail={setShowAddDetail}
                                        />
                                        </div>

                                        {/* Yeta sabai user gairaxa kina ki loop bhitra xa:- solve this */}
                                        {
                                            showAddDetail &&
                                            <AddMatchModal player1={match.player_info[0]} player2={match.player_info[1]} tiesheetID={match.id} setOpenStartGame={setShowAddDetail}/>
                                        }
                                                                
                                    </>
                                ))}
                            </div>

                        </div>
                    )))}
                </div>

                {tiesheet && tiesheet.length === 0 && (
                    <EmptyMessage 
                        message="No Tiesheet Yet" 
                        submessage="Create Tiesheet to see them appear hear" 
                        icon={<CgFileDocument size={80}/>}
                    />
                )}
            
                {
                eventId && viewMode && (
                    <TiesheetModel 
                        viewMode={viewMode} 
                        roundId={roundId}
                        setGroupId={setGroupId}
                        setRoundName={setRoundName}
                        setGroupName={setGroupName}
                        groupId={groupId}
                        setSelectedUsers={setSelectedUsers}
                        selectedUsers={selectedUsers}
                        setRoundID={setRoundID}
                        selectedMatch={selectedMatch}
                        setSelectedMatch={setSelectedMatch}
                        users={users}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                    />
                )
                }
                
                {
                    showMatchDetail && tiesheetId && 
                    <MatchDetail 
                        setShowMatchDetail={setShowMatchDetail} 
                        tiesheet_id={tiesheetId}
                    />
                }
                {
                    showDelete && 
                    <PopUp 
                        popUpType="delete" 
                        pagename="tiesheet" 
                        data="user1 vs user 2" 
                        setOnClose={setShowDelete}
                    />
                }
                    

            </PageContent>
        </PageLayout>


        
        
    )
}
