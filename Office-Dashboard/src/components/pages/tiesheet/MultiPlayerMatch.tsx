import PlayerAvatar from "./PlayerAvatar";


interface PlayerInfo {
  user_id: string;
  is_winner: boolean;
  username: string;
  points?: number;
}

interface MultiPlayerMatchProps {
  players: PlayerInfo[];
}

export default function MultiPlayerMatch({ players }: MultiPlayerMatchProps) {
  return (
    <div className="space-y-2 w-full">
      {players.map((player, idx) => (
        <div 
          key={player.user_id}
          className={`flex items-center justify-between p-3 rounded-lg ${
            player.is_winner 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <PlayerAvatar 
              username={player.username}
              isWinner={player.is_winner}
              size="sm"
              playerIndex={idx}
              variant="square"
            />
            <div>
              <span className={`text-sm font-medium ${
                player.is_winner ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {player.username}
              </span>
              {player.is_winner && (
                <span className="ml-2 text-xs text-green-600 font-medium">Winner</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold min-w-[40px] text-center ${
              player.is_winner ? 'text-green-600' : 'text-gray-400'
            }`}>
              {player.points ?? 0}
            </span>
            <span className="text-xs text-gray-400">pts</span>
          </div>
        </div>
      ))}
    </div>
  );
}