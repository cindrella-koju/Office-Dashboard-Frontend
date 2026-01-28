interface MatchHeaderProps {
  groupName?: string | null;
  isCompleted: boolean;
  matchTime: string;
  onEdit?: () => void;
}

export default function MatchHeader({ groupName, isCompleted, matchTime, onEdit }: MatchHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {groupName && (
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {groupName}
          </span>
        )}
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          isCompleted ? 'text-green-600' : 'text-gray-500'
        }`}>
          {isCompleted ? 'Completed' : 'Scheduled'}
        </span>
      </div>
      <span className="text-xs text-gray-400">{matchTime}</span>
      {onEdit && (
        <button 
          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors" 
          onClick={onEdit}
        >
          Edit
        </button>
      )}
    </div>
  );
}