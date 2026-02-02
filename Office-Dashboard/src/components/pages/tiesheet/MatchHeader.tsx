import { useState } from "react";
import type { Permission } from "../../../utils/permissions";
import StartGameModal from "../../Model/StartGameModel";
import AddMatchModel from "../../Model/AddMatchModel";
import type { PlayerInfoType } from "../../../type/tiesheet.type";

interface MatchHeaderProps {
  groupName?: string | null;
  matchTime: string;
  status: "scheduled" | "completed" | "ongoing";
  onEdit?: () => void;
  permissions: Permission;
  tiesheetfrom: string;
  tiesheetId: string;
  refetchMatches: () => void;
  player1: PlayerInfoType;
  player2: PlayerInfoType;
}

export default function MatchHeader({
  groupName,
  matchTime,
  status,
  onEdit,
  permissions,
  tiesheetfrom,
  tiesheetId,
  refetchMatches,
  player1,
  player2
}: MatchHeaderProps) {
  const [openStartGame, setOpenStartGame] = useState(false);

  const handleStart = () => setOpenStartGame(true);

  const getStatusLabel = () => {
    if (status === "scheduled") return "Scheduled";
    if (status === "completed") return "Completed";
    if (status === "ongoing") return "Live";
    return status;
  };

  const statusClass = () => {
    if (status === "scheduled") return "text-green-600";
    if (status === "completed") return "text-gray-500";
    if (status === "ongoing") return "text-yellow-500";
    return "text-gray-500";
  };

  return (
    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {groupName && (
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {groupName}
          </span>
        )}

        <span className={`text-xs font-medium px-2 py-1 rounded ${statusClass()}`}>
            {getStatusLabel()}
          </span>
      </div>
      
      <span className="text-xs text-gray-400">{matchTime}</span>

      {status === "scheduled" && permissions.canEdit && tiesheetfrom === "tiesheet" && (
        <button
          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          onClick={onEdit}
        >
          Edit
        </button>
      )}

      {status === "scheduled" &&
        permissions.canEdit &&
        tiesheetfrom === "todaystiesheet" && (
          <button
            className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            onClick={handleStart}
          >
            Add
          </button>
        )}

      {openStartGame && (
        <AddMatchModel player1={player1} player2={player2} tiesheetID={tiesheetId} setOpenStartGame={setOpenStartGame}  refetchMatches={refetchMatches}/>
        // <StartGameModal
        //   tiesheetId={tiesheetId}
        //   setOpenStartGame={setOpenStartGame}
        //   refetchMatches={refetchMatches}
        // />
      )}
    </div>
  );
}
