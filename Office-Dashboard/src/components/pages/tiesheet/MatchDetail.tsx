import type { Dispatch, SetStateAction } from "react";
import ModalWrapper from "../shared/ModelWrapper";

interface userDetail{
    username : string;
    user_id : string;
    points : string;
    winner : boolean
}
export interface MatchInfo{
    tiesheet_id : string,
    match_name : string,
    userinfo : userDetail[]
}
interface MatchDetailProps{
    setShowMatchDetail : Dispatch<SetStateAction<boolean>>;
    matchInfo : MatchInfo[]
}
export default function MatchDetail({setShowMatchDetail, matchInfo}:MatchDetailProps) {
  return (
    <ModalWrapper title="Match Results" onClose={() => setShowMatchDetail(false)}>
      <div className="space-y-5 py-3">
        {matchInfo && matchInfo.map((match) => {
          return (
            <div
              key={match.match_name}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="bg-gray-50 px-5 py-2.5 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-800 text-center">
                  {match.match_name}
                </h3>
              </div>

              <div className="relative flex items-stretch">
                {match.userinfo.map((player, index) => (
                  <>
                    {/* Player Card */}
                    <div
                      key={player.user_id}
                      className={`flex-1 px-4 py-5 text-center ${
                        player.winner ? "bg-green-50/60" : ""
                      }`}
                    >
                      {player.winner ? (
                        <div className="mx-auto mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-xl shadow-sm">
                          🏆
                        </div>
                      ) : (
                        <div className="mx-auto mb-2.5 h-9 w-9 " />
                      )}

                      <p className="font-semibold text-gray-900 truncate text-base">
                        {player.username}
                      </p>

                      {
                        player.points && 
                        <div className="mt-2.5">
                          <div className="text-2xl font-bold text-gray-800">{player.points}</div>
                          <div className="text-xs text-gray-500">pts</div>
                        </div>
                      }

                      {player.winner && (
                        <div className="mt-2.5 inline-block rounded-full bg-green-600 px-3 py-0.5 text-xs font-semibold text-white">
                          WINNER
                        </div>
                      )}
                    </div>

                    {/* VS separator (not shown after last player) */}
                    {index < match.userinfo.length - 1 && (
                      <div className="flex items-center justify-center bg-gray-50/40 px-3">
                        <div className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-bold text-gray-600 shadow-sm">
                          VS
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ModalWrapper>
  );
}