interface MatchDateProps {
  date: Date;
  isCompleted: boolean;
}

export default function MatchDate({ date, isCompleted }: MatchDateProps) {
  return (
    <>
      {/* Partition Line */}
      <div className={`w-1 ${isCompleted ? 'bg-green-400' : 'bg-yellow-400'}`}></div>

      {/* Date & Time */}
      <div className="w-50 flex flex-col items-center justify-center py-4 text-center">
        <span className="text-xs text-gray-400 uppercase tracking-wide">
          {date.toLocaleDateString('en-US', { month: 'short' })}
        </span>
        <span className="text-2xl font-bold text-gray-800">
          {date.getDate()}
        </span>
        <span className="text-xs text-gray-500 mt-1">
          {date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
          })}
        </span>
      </div>
    </>
  );
}