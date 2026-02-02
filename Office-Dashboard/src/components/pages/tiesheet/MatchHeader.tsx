import type { Permission } from "../../../utils/permissions";

interface MatchHeaderProps {
  groupName?: string | null;
  matchTime: string;
  status : "scheduled" | "completed",
  onEdit?: () => void;
  permissions : Permission
  tiesheetfrom : string
}

export default function MatchHeader({ groupName, matchTime, onEdit, status, permissions, tiesheetfrom }: MatchHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {groupName && (
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {groupName}
          </span>
        )}
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          status === "scheduled" ? 'text-green-600' : 'text-gray-500'
        }`}>
          {status}
        </span>
      </div>
      <span className="text-xs text-gray-400">{matchTime}</span>
      {
        status === "scheduled" && permissions.canEdit && tiesheetfrom == "tiesheet" &&
        <button 
          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors" 
          onClick={onEdit}
        >
          Edit
        </button>
      }
      {
        status === "scheduled" && permissions.canEdit && tiesheetfrom == "todaystiesheet" &&
        <button 
          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors" 
        >
          Start
        </button>
      }
    </div>
  );
}