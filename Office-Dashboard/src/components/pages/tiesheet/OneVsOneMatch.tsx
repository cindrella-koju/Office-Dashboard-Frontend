
import type { PlayerInfoType } from "../../../type/tiesheet.type";
import PlayerAvatar from "./PlayerAvatar";



interface OneVsOneMatchProps {
  player1: PlayerInfoType;
  player2: PlayerInfoType;
  handleMatchDetailView : () => void;
}


export default function OneVsOneMatch({ player1, player2,handleMatchDetailView }: OneVsOneMatchProps) {


  return (
    <div className="flex items-center justify-center gap-6 w-full" onClick={handleMatchDetailView}>
      {/* Player 1 */}
      <div className={`flex-1 flex flex-col items-center p-4 rounded-xl ${
        player1.is_winner ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
      }`}>
        <PlayerAvatar 
          username={player1.username}
          isWinner={player1.is_winner}
          size="lg"
          playerIndex={0}
          variant="circle"
        />
        <span className={`mt-2 text-sm font-medium ${
          player1.is_winner ? 'text-gray-900' : 'text-gray-600'
        }`}>
          {player1.username}
        </span>
        {player1.is_winner && (
          <span className="text-xs text-green-600 font-medium mt-1">Winner</span>
        )}
      </div>

      {/* Score Center */}
      <div className="flex flex-col items-center justify-center px-2">
        <span className="text-xs text-black-400 mt-1 font-bold">VS</span>
      </div>

      {/* Player 2 */}
      <div className={`flex-1 flex flex-col items-center p-4 rounded-xl ${
        player2.is_winner ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
      }`}>
        <PlayerAvatar 
          username={player2.username}
          isWinner={player2.is_winner}
          size="lg"
          playerIndex={1}
          variant="circle"
        />
        <span className={`mt-2 text-sm font-medium ${
          player2.is_winner ? 'text-gray-900' : 'text-gray-600'
        }`}>
          {player2.username}
        </span>
        {player2.is_winner && (
          <span className="text-xs text-green-600 font-medium mt-1">Winner</span>
        )}
      </div>
    </div>
  );
}