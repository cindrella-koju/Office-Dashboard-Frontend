import { useState } from "react";
import type { Permission } from "../../../utils/permissions";
import StartGameModal from "../../Model/StartGameModel";

interface MatchHeaderProps {
  groupName?: string | null;
  matchTime: string;
  status: "scheduled" | "completed" | "ongoing";
  onEdit?: () => void;
  permissions: Permission;
  tiesheetfrom: string;
  tiesheetId: string;
  refetchMatches: () => void;
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
    if (status === "ongoing") return "text-white bg-red-500 rounded";
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
        {/* {status === "ongoing" ? (
          <button
            className="text-xs font-medium px-2 py-1 rounded text-red-600 hover:text-red-800 underline"
          >
            Live
          </button>
        ) : (
          <span className={`text-xs font-medium px-2 py-1 rounded ${statusClass()}`}>
            {getStatusLabel()}
          </span>
        )} */}
      </div>
      
      {
        status === "ongoing" && 
          <span className="text-xs text-red-400">Click to view scoreboard</span>
      }
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
            Start
          </button>
        )}

      {openStartGame && (
        <StartGameModal
          tiesheetId={tiesheetId}
          setOpenStartGame={setOpenStartGame}
          refetchMatches={refetchMatches}
        />
      )}
    </div>
  );
}
