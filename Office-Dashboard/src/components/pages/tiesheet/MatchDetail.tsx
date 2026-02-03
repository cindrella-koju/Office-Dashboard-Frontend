import type { Dispatch, SetStateAction } from "react";
import ModalWrapper from "../shared/ModelWrapper";

const DUMMY_DATA = [
  {
    match_name: "Match 1",
    userinfo: [
      { username: "user 3", user_id: "c397aa12-2214-4796-a1d0-4d1dc8c28974", points: "5", winner: false },
      { username: "user 4", user_id: "04d36c46-d7c1-4e06-8250-cdfd4bbb80f3", points: "6", winner: true },
    ],
  },
  {
    match_name: "Match 3",
    userinfo: [
      { username: "user 3", user_id: "c397aa12-2214-4796-a1d0-4d1dc8c28974", points: "6", winner: true },
      { username: "user 4", user_id: "04d36c46-d7c1-4e06-8250-cdfd4bbb80f3", points: "5", winner: false },
    ],
  },
];
interface MatchDetailProps{
    setShowMatchDetail : Dispatch<SetStateAction<boolean>>
}
export default function MatchDetail({setShowMatchDetail}:MatchDetailProps) {
  return (
    <ModalWrapper title="Match Results" onClose={() => setShowMatchDetail(false)}>
      <div className="space-y-5 py-3">
        {DUMMY_DATA.map((match) => {
          const [playerA, playerB] = match.userinfo;
          const left = playerA.winner ? playerA : playerB;
          const right = playerA.winner ? playerB : playerA;

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

                  <div className="mt-2.5">
                    <div className="text-2xl font-bold text-gray-800">{left.points}</div>
                    <div className="text-xs text-gray-500">pts</div>
                  </div>

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

                  <div className="mt-2.5">
                    <div className="text-2xl font-bold text-gray-800">{right.points}</div>
                    <div className="text-xs text-gray-500">pts</div>
                  </div>

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