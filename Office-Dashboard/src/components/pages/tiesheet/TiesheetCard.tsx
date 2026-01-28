import MatchHeader from "./MatchHeader";
import MatchDate from "./MatchDate";
import OneVsOneMatch from "./OneVsOneMatch";
import MultiPlayerMatch from "./MultiPlayerMatch";

interface PlayerInfo {
  user_id: string;
  is_winner: boolean;
  username: string;
  points?: number;
}

interface TiesheetCardProps {
  id: string;
  groupName?: string | null;
  scheduledDate: string;
  scheduledTime: string;
  players: PlayerInfo[];
  onEdit?: (id: string) => void;
}

export default function TiesheetCard({ 
  id, 
  groupName, 
  scheduledDate, 
  scheduledTime, 
  players,
  onEdit 
}: TiesheetCardProps) {
  const matchDate = new Date(`${scheduledDate}T${scheduledTime}`);
  const isCompleted = players.some(p => p.is_winner);
  const matchTime = matchDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors flex flex-col">
      <MatchHeader 
        groupName={groupName}
        isCompleted={isCompleted}
        matchTime={matchTime}
        onEdit={onEdit ? () => onEdit(id) : undefined}
      />

      <div className="flex flex-1">
        <div className="flex-1 p-4 flex items-center justify-center">
          {players.length === 2 ? (
            <OneVsOneMatch player1={players[0]} player2={players[1]} />
          ) : (
            <MultiPlayerMatch players={players} />
          )}
        </div>

        <MatchDate date={matchDate} isCompleted={isCompleted} />
      </div>
    </div>
  );
}