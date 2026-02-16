import MatchHeader from "./MatchHeader";
import MatchDate from "./MatchDate";
import OneVsOneMatch from "./OneVsOneMatch";
import MultiPlayerMatch from "./MultiPlayerMatch";
import type { PlayerInfoType } from "../../../type/tiesheet.type";
import type { Dispatch, SetStateAction } from "react";
import type { EventPermission } from "../../../hooks/userPermission";


interface TiesheetCardProps {
  id: string;
  status : "scheduled" | "completed";
  scheduledDate: string;
  scheduledTime: string;
  players: PlayerInfoType[];
  onEdit?: (id: string) => void;  
  onEditScore?: () => void;
  onAddScore? :() => void;
  permissions : EventPermission,
  tiesheetId : string,
  setShowAddDetail? : Dispatch<SetStateAction<boolean>>;
  onClick : () => void;
  handleMatchDetailView : () => void;
}

export default function TiesheetCard({ 
  id, 
  status,
  scheduledDate, 
  scheduledTime, 
  players,
  onEdit,
  onAddScore,
  onEditScore,
  permissions ,
  tiesheetId,
  setShowAddDetail,
  onClick,
  handleMatchDetailView
}: TiesheetCardProps) {
  const matchDate = new Date(`${scheduledDate}T${scheduledTime}`);
  const matchTime = matchDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors flex flex-col">
      <MatchHeader 
        matchTime={matchTime}
        onEdit={onEdit ? () => onEdit(id) : undefined}
        onAddScore={onAddScore}
        onEditScore={onEditScore}
        status = {status}
        permissions={permissions}
        tiesheetId={tiesheetId}
        player1={players[0]}
        player2={players[1]}
        setShowAddDetail={setShowAddDetail}
        onClick ={onClick}
      />

      <div className="flex flex-1">
        <div className="flex-1 p-4 flex items-center justify-center">
          {players.length === 2 ? (
            <OneVsOneMatch player1={players[0]} player2={players[1]} handleMatchDetailView={handleMatchDetailView}/>
          ) : (
            <MultiPlayerMatch players={players} handleMatchDetailView={handleMatchDetailView}/>
          )}
        </div>

        <MatchDate date={matchDate} status={status} />
      </div>
    </div>
  );
}