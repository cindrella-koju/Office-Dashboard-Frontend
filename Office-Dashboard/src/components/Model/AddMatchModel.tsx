import React from "react";
import ModalWrapper from "../pages/shared/ModelWrapper";
import type { AddMatchModalProps } from "../../type/tiesheet.type";
import Button from "../ui/Button";
import SelectField from "../pages/shared/SelectField";
import { useAddMAtch } from "../../hooks/tiesheet/useAddMatch";

export default function AddMatchModal({
  tiesheetID,
  scoreView,
  status,
  setScoreView,
  setDeleteMatchId,
  setShowDeleteMatch,
  players,
}: AddMatchModalProps) {
  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "Completed", value: "completed" },
    { label: "Ongoing", value: "ongoing" },
  ] as const;

  const winnerOptions = players.map((p) => ({
    label: p.username,
    value: p.user_id,
  }));

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
    updateMatch,
  } = useAddMAtch(players, tiesheetID, scoreView, status, setScoreView);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (matchDetail.status === "completed" && !matchDetail.overallwinner) {
      alert("Please select an overall winner for completed matches");
      return;
    }

    const hasEmptyMatchName = matchDetail.matchDetail.some(
      (match) => !match.match_name.trim()
    );

    if (hasEmptyMatchName) {
      alert("Please provide names for all matches");
      return;
    }

    console.log("Match Detail:", matchDetail)
    if (scoreView === "create") {
      await createMatch(matchDetail);
    }

    if (scoreView === "edit") {
      await updateMatch(matchDetail);
    }
  };

  return (
    <ModalWrapper
      title={`${scoreView === "create" ? "Add" : "Edit"} Match Information`}
      onClose={() => setScoreView(null)}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Status */}
        <SelectField
          label="Status"
          value={matchDetail.status}
          options={statusOptions}
          onChange={(val) =>
            setMatchDetail((prev) => ({ ...prev, status: val }))
          }
        />

        {/* Overall Winner */}
        <SelectField
          label="Overall Winner"
          required={matchDetail.status === "completed"}
          value={matchDetail.overallwinner}
          options={winnerOptions}
          onChange={(val) =>
            setMatchDetail((prev) => ({ ...prev, overallwinner: val }))
          }
        />

        {/* Extra Options */}
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
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-gray-800 font-medium">Points</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showWinner}
                onChange={() => setShowWinner((p) => !p)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-gray-800 font-medium">Winner</span>
            </label>
          </div>
        </div>

        {/* Matches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Matches</h3>

            {scoreView === "create" && (
              <button
                type="button"
                onClick={addMatch}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                + Add
              </button>
            )}
          </div>

          {matchDetail.matchDetail.map((match, matchIndex) => (
            <div
              key={matchIndex}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              {/* Match Name */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Match Name / Title
                  </label>

                  <input
                    type="text"
                    value={match.match_name}
                    onChange={(e) =>
                      updateMatchName(matchIndex, e.target.value)
                    }
                    placeholder={`Match ${matchIndex + 1}`}
                    className="w-full rounded-lg border-gray-300 shadow-sm py-2 px-4"
                  />
                </div>

                {matchDetail.matchDetail.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (scoreView === "create") {
                        removeMatch(matchIndex);
                      } else {
                        setShowDeleteMatch(true);
                        setDeleteMatchId(match.match_id);
                        setScoreView(null);
                      }
                    }}
                    className="mt-7 p-2 text-gray-400 hover:text-red-600"
                  >
                    ✕
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
                    {players.map((p, playerIndex) => (
                      <div key={p.user_id}>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          {p.username}
                        </label>

                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={
                            match.userDetail?.[playerIndex]?.points ?? ""
                          }
                          onChange={(e) =>
                            updatePoints(
                              matchIndex,
                              playerIndex,
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm py-2 px-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Winner */}
              {showWinner && (
                <div className="space-y-3 mt-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Winner
                  </label>

                  {players.map((p, playerIndex) => (
                    <div
                      key={p.user_id}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="radio"
                        name={`winner-${matchIndex}`}
                        id={`winner-${matchIndex}-${playerIndex}`}
                        checked={
                          match.userDetail?.[playerIndex]?.winner ?? false
                        }
                        onChange={() => {
                          updateWinner(matchIndex, playerIndex)
                          console.log("Match detail:", matchDetail)
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />

                      <label
                        htmlFor={`winner-${matchIndex}-${playerIndex}`}
                        className="text-sm font-medium text-gray-400 cursor-pointer"
                      >
                        {p.username}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Button fullWidth type="submit">
          {scoreView === "create" ? "Add Match" : "Edit Match"}
        </Button>
      </form>
    </ModalWrapper>
  );
}
