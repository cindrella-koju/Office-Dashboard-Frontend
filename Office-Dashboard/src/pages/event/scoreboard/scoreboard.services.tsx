import type { IncDcrButtonProps } from "./scoreboard.type";

export const IncDcrButton: React.FC<IncDcrButtonProps> = ({ setUserScore }) => {
  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => setUserScore((prev) => prev + 1)}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition"
      >
        +1
      </button>

      <button
        onClick={() => setUserScore((prev) => prev - 1)}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition"
      >
        -1
      </button>
    </div>
  );
};
