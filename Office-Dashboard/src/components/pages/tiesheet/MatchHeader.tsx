import type { MatchHeaderProps } from "../../../type/tiesheet.type";
import { useToast } from "../../../context/ToastContext";

export default function MatchHeader({
  groupName,
  matchTime,
  status,
  onEdit,
  onEditScore,
  onAddScore,
  permissions,
  onClick,
  onDeleteTiesheet,
  players
}: MatchHeaderProps) {
  const { showToast } = useToast();

  const hasTBD = players?.some(player => player.user_id === null) ?? false;

  const getStatusLabel = () => {
    if (status === "scheduled") return "Scheduled";
    if (status === "completed") return "Completed";
    if (status === "ongoing") return "Ongoing";
    return status;
  };

  const statusClass = () => {
    if (status === "scheduled") return "text-green-600";
    if (status === "completed") return "text-yellow-500";
    if (status === "ongoing") return "text-red-500";
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

      {permissions.canEdit && (
        <button
          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          onClick={onEdit}
        >
          Edit Schedule
        </button>
      )}

      {permissions.canEdit && (
        <button
          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          onClick={() => {
            if (hasTBD) {
              showToast("Cannot edit score when there is a TBD player", "error");
              return;
            }
            onClick();
            onEditScore?.();
          }}
        >
          Edit Score
        </button>
      )}

      {
        permissions.canEdit && (
          <button
            className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            onClick={ () => {
              if (hasTBD) {
                showToast("Cannot add match when there is a TBD player", "error");
                return;
              }
              onClick();
              onAddScore?.();
            }}
          >
            Add
          </button>
        )}
        {
          permissions.canDelete && (
            <button
            className="text-xs font-medium text-red-600 hover:text-red-800 hover:underline transition-colors"
            onClick={onDeleteTiesheet}
          >
            Delete
          </button>
          )
        }

    </div>
  );
}
