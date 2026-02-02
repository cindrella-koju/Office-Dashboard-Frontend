import { useState, type Dispatch, type SetStateAction } from "react";
import Button from "../ui/Button";
import ModalWrapper from "../pages/shared/ModelWrapper";
import { CREATE_MATCH } from "../../constants/urls";

interface StartGameModalProps {
  tiesheetId: string;
  setOpenStartGame: Dispatch<SetStateAction<boolean>>;
  refetchMatches: () => void; // <- new prop
}

export default function StartGameModal({
  tiesheetId,
  setOpenStartGame,
  refetchMatches,
}: StartGameModalProps) {
  const [useTimer, setUseTimer] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState<number | "">("");
  const [matchNames, setMatchNames] = useState<string[]>(["", "", ""]);

  const handleMatchNameChange = (index: number, value: string) => {
    const updated = [...matchNames];
    updated[index] = value;
    setMatchNames(updated);
  };

  const addMatch = () => setMatchNames((prev) => [...prev, ""]);

  const removeMatch = (index: number) => {
    if (matchNames.length <= 1) return;
    setMatchNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedNames = matchNames.map((n) => n.trim()).filter(Boolean);

    if (cleanedNames.length === 0) {
      alert("Please provide at least one match name.");
      return;
    }

    const gameConfig = {
      timer: useTimer && timerMinutes ? Number(timerMinutes) * 60 : null,
      totalMatches: cleanedNames.length,
      matchNames: cleanedNames,
    };

    console.log("Game Configuration:", gameConfig);

    try {
      const promises = cleanedNames.map((name) =>
        fetch(CREATE_MATCH, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tiesheet_id: tiesheetId, match_name: name }),
        }).then((res) => res.json())
      );

      const responses = await Promise.all(promises);
      console.log("POST responses:", responses);

      alert("Matches created successfully!");

      // REFRESH parent matches
      refetchMatches();

      // Reset and close modal
      setMatchNames(new Array(matchNames.length).fill(""));
      setOpenStartGame(false);
    } catch (error) {
      console.error("Error creating matches:", error);
      alert("Something went wrong while creating matches.");
    }
  };

  return (
    <ModalWrapper title="Start New Game" onClose={() => setOpenStartGame(false)}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Timer Section */}
        <div className="space-y-3 rounded-lg border border-gray-200 p-4 bg-gray-50/40">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useTimer}
              onChange={(e) => {
                setUseTimer(e.target.checked);
                if (!e.target.checked) setTimerMinutes("");
              }}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-800">Use time limit</span>
          </label>
        </div>

        {useTimer && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Minutes per match
            </label>
            <input
              type="number"
              min={1}
              step={1}
              value={timerMinutes}
              onChange={(e) =>
                setTimerMinutes(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="e.g. 10"
              className="block w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                         disabled:opacity-60"
            />
          </div>
        )}

        {/* Match Names */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block font-medium text-gray-800">Match Names</label>
            <button
              type="button"
              onClick={addMatch}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              + Add match
            </button>
          </div>

          <div className="space-y-2.5">
            {matchNames.map((name, index) => (
              <div key={index} className="flex gap-2 items-center group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleMatchNameChange(index, e.target.value)}
                  placeholder={`Match ${index + 1}`}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                             placeholder:text-gray-400"
                />
                {matchNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMatch(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity
                               text-red-500 hover:text-red-700 p-1.5 rounded-md
                               hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                    title="Remove match"
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
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button type="submit" fullWidth>
            Start Game
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
