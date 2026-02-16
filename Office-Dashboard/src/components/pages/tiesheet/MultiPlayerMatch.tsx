
import type { PlayerInfoType } from "../../../type/tiesheet.type";
import PlayerAvatar from "./PlayerAvatar";



interface MultiPlayerMatchProps {
  players: PlayerInfoType[];
  handleMatchDetailView : () => void;
}

export default function MultiPlayerMatch({ players, handleMatchDetailView }: MultiPlayerMatchProps) {
  return (
    <div className="space-y-2 w-full" onClick={handleMatchDetailView}>
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
            {/* <span className={`text-lg font-bold min-w-[40px] text-center ${
              player.is_winner ? 'text-green-600' : 'text-gray-400'
            }`}>
              {extractToShowColumn(player.columns)?.value ?? 0}
            </span>
            <span className="text-xs text-gray-400">{extractToShowColumn(player.columns)?.column_field}</span> */}
          </div>
        </div>
      ))}
    </div>
  );
}