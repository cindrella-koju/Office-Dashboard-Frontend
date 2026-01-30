import MatchHeader from "./MatchHeader";
import MatchDate from "./MatchDate";
import OneVsOneMatch from "./OneVsOneMatch";
import MultiPlayerMatch from "./MultiPlayerMatch";
import type { PlayerInfoType } from "../../../pages/event/eventdetailpages/tiesheet";


interface TiesheetCardProps {
  id: string;
  status : "scheduled" | "completed";
  scheduledDate: string;
  scheduledTime: string;
  players: PlayerInfoType[];
  onEdit?: (id: string) => void;
}

export default function TiesheetCard({ 
  id, 
  status,
  // groupName, 
  scheduledDate, 
  scheduledTime, 
  players,
  onEdit 
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
        // groupName={groupName}
        matchTime={matchTime}
        onEdit={onEdit ? () => onEdit(id) : undefined}
        status = {status}
      />

      <div className="flex flex-1">
        <div className="flex-1 p-4 flex items-center justify-center">
          {players.length === 2 ? (
            <OneVsOneMatch player1={players[0]} player2={players[1]} />
          ) : (
            <MultiPlayerMatch players={players} />
          )}
        </div>

        <MatchDate date={matchDate} status={status} />
      </div>
    </div>
  );
}