import React, { useState, type Dispatch, type SetStateAction } from "react";
import ModalWrapper from "../pages/shared/ModelWrapper";
import type { PlayerInfoType } from "../../type/tiesheet.type";
import Button from "../ui/Button";

interface AddMatchModalProps {
  player1: PlayerInfoType;
  player2: PlayerInfoType;
  tiesheetID: string;
  setOpenStartGame: Dispatch<SetStateAction<boolean>>;
  refetchMatches: () => void;
}

export default function AddMatchModal({
  player1,
  player2,
  tiesheetID,
  setOpenStartGame,
  refetchMatches,
}: AddMatchModalProps) {
  const [showPoints, setShowPoints] = useState(false);
  const [showWinner, setShowWinner] = useState(true);

  const [matchDetail, setMatchDetail] = useState([
    {
      tiesheet_id: tiesheetID,
      match_name: "",
      usersdetail: [
        {
          user_id: player1.user_id,
          points: "",
          winner: false,
        },
        {
          user_id: player2.user_id,
          points: "",
          winner: false,
        },
      ],
    },
  ]);

  // Add new match
  const addMatch = () => {
    setMatchDetail((prev) => [
      ...prev,
      {
        tiesheet_id: tiesheetID,
        match_name: "",
        usersdetail: [
          { user_id: player1.user_id, points: "", winner: false },
          { user_id: player2.user_id, points: "", winner: false },
        ],
      },
    ]);
  };

  const removeMatch = (index: number) => {
    if (matchDetail.length <= 1) return;
    setMatchDetail((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMatchName = (index: number, value: string) => {
    setMatchDetail((prev) =>
      prev.map((match, i) =>
        i === index ? { ...match, match_name: value } : match
      )
    );
  };

  const updatePoints = (
    matchIndex: number,
    userIndex: number,
    value: string
  ) => {
    setMatchDetail((prev) =>
      prev.map((match, mIdx) =>
        mIdx === matchIndex
          ? {
              ...match,
              usersdetail: match.usersdetail.map((user, uIdx) =>
                uIdx === userIndex ? { ...user, points: value } : user
              ),
            }
          : match
      )
    );
  };

  // Update winner for a match
  const updateWinner = (matchIndex: number, winnerIndex: number) => {
    setMatchDetail((prev) =>
      prev.map((match, mIdx) =>
        mIdx === matchIndex
          ? {
              ...match,
              usersdetail: match.usersdetail.map((user, uIdx) => ({
                ...user,
                winner: uIdx === winnerIndex,
              })),
            }
          : match
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(matchDetail);
  };

  return (
    <ModalWrapper
      title="Add Match Information"
      onClose={() => setOpenStartGame(false)}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Options */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Add additional fields:
          </p>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showPoints}
                onChange={() => setShowPoints((p) => !p)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800 font-medium">Points</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showWinner}
                onChange={() => setShowWinner((p) => !p)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800 font-medium">Winner</span>
            </label>
          </div>
        </div>

        {/* Matches list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Matches</h3>
            <button
              type="button"
              onClick={addMatch}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {matchDetail.map((match, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition-shadow group"
              >
                {/* Match header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Match Name / Title
                    </label>
                    <input
                      type="text"
                      value={match.match_name}
                      onChange={(e) =>
                        updateMatchName(index, e.target.value)
                      }
                      placeholder={`Match ${index + 1} • e.g. Quarterfinal A`}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-4"
                    />
                  </div>

                  {matchDetail.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMatch(index)}
                      className="mt-7 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 md:opacity-0 md:group-hover:opacity-100"
                      title="Remove this match"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Points */}
                {showPoints && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Points
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          {player1.username}
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={match.usersdetail[0].points}
                          onChange={(e) =>
                            updatePoints(index, 0, e.target.value)
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          {player2.username}
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={match.usersdetail[1].points}
                          onChange={(e) =>
                            updatePoints(index, 1, e.target.value)
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Winner */}
                {showWinner && (
                  <div className="space-y-3 mt-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Winner
                    </label>

                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`winner-${index}`}
                        id={`winner-p1-${index}`}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={match.usersdetail[0].winner}
                        onChange={() => updateWinner(index, 0)}
                      />
                      <label
                        htmlFor={`winner-p1-${index}`}
                        className="text-sm font-medium text-gray-400 cursor-pointer"
                      >
                        {player1.username}
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`winner-${index}`}
                        id={`winner-p2-${index}`}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={match.usersdetail[1].winner}
                        onChange={() => updateWinner(index, 1)}
                      />
                      <label
                        htmlFor={`winner-p2-${index}`}
                        className="text-sm font-medium text-gray-400 cursor-pointer"
                      >
                        {player2.username}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button fullWidth type="submit">
          Add Match
        </Button>
      </form>
    </ModalWrapper>
  );
}
