import React from "react";
import ModalWrapper from "../pages/shared/ModelWrapper";
import type { AddMatchModalProps } from "../../type/tiesheet.type";
import Button from "../ui/Button";  
import SelectField from "../pages/shared/SelectField";
import { useAddMAtch } from "../../hooks/tiesheet/useAddMatch";



export default function AddMatchModal({
  player1,
  player2,
  tiesheetID,
  scoreView,
  status,
  setScoreView,
  setDeleteMatchId,
  setShowDeleteMatch,
}: AddMatchModalProps) {

  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "Completed", value: "completed" },
    { label : "Ongoing", value : "ongoing"}
  ] as const

  const winnerOptions = [
    { label: player1.username, value: player1.user_id },
    { label: player2.username, value: player2.user_id },
  ] as const

  const { 
    matchDetail,
    setMatchDetail,
    showPoints,
    setShowPoints,
    showWinner,
    setShowWinner,
    addMatch,
    updateMatchName,
    removeMatch,
    updatePoints,
    updateWinner,
    createMatch,
    updateMatch
  } = useAddMAtch(player1, player2, tiesheetID, scoreView, status, setScoreView)
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    // If status is completed, overall winner must be selected
    if (matchDetail.status === "completed" && !matchDetail.overallwinner) {
      alert("Please select an overall winner for completed matches");
      return;
    }

    //Check if all matches have names
    const hasEmptyMatchName = matchDetail.matchDetail.some(
      (match) => !match.match_name.trim()
    );
    if (hasEmptyMatchName) {
      alert("Please provide names for all matches");
      return;
    }

    console.log("Match Detail to send:", matchDetail);
    if(scoreView === "create"){
      await createMatch(matchDetail)
    }
    if(scoreView === "edit"){
      await updateMatch(matchDetail)
    }
  };


  return (
    <ModalWrapper
      title={`${scoreView === "create" ? "Add" : "Edit"} Match Information`}
      onClose={() => setScoreView(null)}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <SelectField
          label="Status"
          value={matchDetail.status}
          options={[...statusOptions]}
          onChange={(val) => {
            setMatchDetail((prev) => ({ ...prev, status: val }));
            console.log("Status value:", val);
          }}
        />

        <SelectField
          label="Overall Winner"
          required = {matchDetail.status === "completed"}
          value={matchDetail.overallwinner}
          options={[...winnerOptions]}
          onChange={(val) => {
            setMatchDetail((prev) => ({ ...prev, overallwinner: val }));
            console.log("Overall Winner value:", val);
          }}
        />
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
            {
              scoreView === "create" && 
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
            }
          </div>

          <div className="space-y-4">
            {matchDetail.matchDetail.map((match, index) => (
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

                  {matchDetail.matchDetail.length > 1  && (
                    <button
                      type="button"
                      onClick={() => {
                        if (scoreView === "create") {
                          removeMatch(index);
                        } else if (scoreView === "edit") {
                          setShowDeleteMatch(true);
                          setDeleteMatchId(match.match_id);
                          setScoreView(null);
                        }
                      }}
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
                          value={match.userDetail[0].points}
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
                          value={match.userDetail[1].points}
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
                        checked={match.userDetail[0].winner}
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
                        checked={match.userDetail[1].winner}
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
          {scoreView === "create" ? "Add Match" : "Edit Match"}
        </Button>
      </form>
    </ModalWrapper>
  );
}
