import type { MatchHeaderProps } from "../../../type/tiesheet.type";

export default function MatchHeader({
  groupName,
  matchTime,
  status,
  onEdit,
  onEditScore,
  onAddScore,
  permissions,
  setShowAddDetail,
  onClick
}: MatchHeaderProps) {

  const handleStart = () => setShowAddDetail && setShowAddDetail(true);

  const getStatusLabel = () => {
    if (status === "scheduled") return "Scheduled";
    if (status === "completed") return "Completed";
    if (status === "ongoing") return "Live";
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
            onClick();
            onEditScore?.();
          }}
        >
          Edit Score
        </button>
      )}

      {
        permissions.canEdit  && (
          <button
            className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            onClick={ () => {
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
            onClick={handleStart}
          >
            Delete
          </button>
          )
        }

    </div>
  );
}
