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
  console.log("Match Info:", matchInfo)
  return (
    <ModalWrapper title="Match Results" onClose={() => setShowMatchDetail(false)}>
      <div className="space-y-5 py-3">
        {matchInfo && matchInfo.map((match) => {
          const [playerA, playerB] = match.userinfo;
          const left = playerA;
          const right =  playerB;

          return (
            <div
              key={match.match_name}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
                {/* <h1>{tiesheet_id}</h1> */}
              <div className="bg-gray-50 px-5 py-2.5 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-800 text-center">
                  {match.match_name}
                </h3>
              </div>

              <div className="relative grid grid-cols-[1fr_auto_1fr] items-stretch">
                {/* Left player */}
                <div
                  className={`px-4 py-5 text-center ${
                    left.winner ? "bg-green-50/60" : ""
                  }`}
                >
                  {left.winner ? (
                    <div className="mx-auto mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-xl shadow-sm">
                      🏆
                    </div>
                  ) : (
                    <div className="mx-auto mb-2.5 h-9 w-9 " />
                  )}

                  <p className="font-semibold text-gray-900 truncate text-base">
                    {left.username}
                  </p>

                  {
                    left.points && 
                    <div className="mt-2.5">
                      <div className="text-2xl font-bold text-gray-800">{left.points}</div>
                      <div className="text-xs text-gray-500">pts</div>
                    </div>
                  }

                  {left.winner && (
                    <div className="mt-2.5 inline-block rounded-full bg-green-600 px-3 py-0.5 text-xs font-semibold text-white">
                      WINNER
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center bg-gray-50/40 px-3">
                  <div className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-bold text-gray-600 shadow-sm">
                    VS
                  </div>
                </div>

                {/* Right player */}
                <div
                  className={`px-4 py-5 text-center ${
                    right.winner ? "bg-green-50/60" : ""
                  }`}
                >
                  {right.winner ? (
                    <div className="mx-auto mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-xl shadow-sm">
                      🏆
                    </div>
                  ) : (
                    <div className="mx-auto mb-2.5 h-9 w-9 " />
                  )}

                  <p className="font-semibold text-gray-900 truncate text-base">
                    {right.username}
                  </p>

                  {
                    right.points && 
                      <div className="mt-2.5">
                        <div className="text-2xl font-bold text-gray-800">{right.points}</div>
                        <div className="text-xs text-gray-500">pts</div>
                      </div>
                  }

                  {right.winner && (
                    <div className="mt-2.5 inline-block rounded-full bg-green-600 px-3 py-0.5 text-xs font-semibold text-white">
                      WINNER
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ModalWrapper>
  );
}