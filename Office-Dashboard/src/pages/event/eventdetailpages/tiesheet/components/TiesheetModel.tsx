import { useEffect, useState } from "react";
import useRound from "../../../../../hooks/useRound";
import useFetch from "../../../../../hooks/useFetch";
import { CREATE_TIESHEET, GET_ROUNDS_BY_EVENT, RETRIEVE_QUALIFIER_BY_ROUND } from "../../../../../constants/urls";

interface TiesheetProps {
  viewMode: "create" | "edit" | null;
  eventId: string;
}

interface QualifierResponse {
  id: string;
  username: string;
}

interface SelectedMatch {
  stage_id: string;
  players: string[];
  scheduled_date: string;
  scheduled_time: string;
}

interface RoundResponse{
  id : string,
  name : string
}
export default function TiesheetModel({ viewMode, eventId }: TiesheetProps) {
  const { data:rounds}= useFetch<RoundResponse[]>(eventId ? GET_ROUNDS_BY_EVENT(eventId) : "");
  const [roundId, setRoundID] = useState<string>("");
  const { data: qualifier } = useFetch<QualifierResponse[]>(
    roundId ? RETRIEVE_QUALIFIER_BY_ROUND(roundId) : ""
  );

  const [selectedUsers, setSelectedUsers] = useState<{ id: string; name: string }[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<SelectedMatch>({
    stage_id: "",
    players: [],
    scheduled_date: "",
    scheduled_time: "",
  });

  // Reset selected match when round changes
  useEffect(() => {
    setSelectedMatch({
      stage_id: roundId || "",
      players: [],
      scheduled_date: "",
      scheduled_time: "",
    });
    setSelectedUsers([]);
  }, [roundId]);

  const handleSubmit = async(e : React.MouseEvent<HTMLButtonElement>) => {
    if(viewMode == "create"){
        e.preventDefault()
        const response = await fetch(CREATE_TIESHEET,{
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stage_id : selectedMatch.stage_id,
                scheduled_date : selectedMatch.scheduled_date,
                scheduled_time : selectedMatch.scheduled_time,
                players : selectedMatch.players
            })
        })
        if (response.ok) {
            alert('Tieheet Created successfully!');
            window.location.reload(); 
        } else {
            alert('Failed create Tiesheet.');
        }
    }
  };

  if (!viewMode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 max-h-[85vh] overflow-y-auto">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {viewMode === "create" ? "Create TieSheet" : "Edit Tiesheet"}
          </h2>

          <div className="space-y-6 mt-4">
            {/* Round Selector */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Round <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
                onChange={(e) => {
                  setRoundID(e.target.value);
                  setSelectedMatch((prev) => ({ ...prev, stage_id: e.target.value }));
                }}
              >
                <option value="">Select Round</option>
                {rounds && rounds.map((round) => (
                  <option key={round.id} value={round.id}>
                    {round.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Match Between */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Match Between <span className="text-red-500">*</span>
              </label>
              <select
                multiple
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
                onChange={(e) => {
                  const members = Array.from(e.target.selectedOptions).map((option) => ({
                    id: option.value,
                    name: option.text,
                  }));

                  const playerIds = Array.from(e.target.selectedOptions).map(
                    (option) => option.value
                );


                  setSelectedUsers(members);
                  setSelectedMatch((prev) => ({
                    ...prev,
                    players: playerIds,
                }));

                }}
              >
                {qualifier?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Members */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Selected Members</label>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((member) => (
                  <span
                    key={member.id}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                  >
                    {member.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Match Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Match Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
                onChange={(e) =>
                  setSelectedMatch((prev) => ({ ...prev, scheduled_date: e.target.value }))
                }
              />
            </div>

            {/* Match Time */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Match Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
                onChange={(e) =>
                  setSelectedMatch((prev) => ({ ...prev, scheduled_time: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            onClick={() => console.log("Cancel clicked")}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            {viewMode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
