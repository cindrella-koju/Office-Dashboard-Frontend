import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import type { ViewMode } from "./UserCard.types";

interface ViewToggleProps {
    viewMode: ViewMode;
    onViewChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
                onClick={() => onViewChange("grid")}
                className={`px-3 sm:px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    viewMode === "grid"
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                }`}
                aria-label="Grid view"
            >
                <BsGrid3X3GapFill className="w-5 h-5" />
            </button>
            <button
                onClick={() => onViewChange("list")}
                className={`px-3 sm:px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    viewMode === "list"
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                }`}
                aria-label="List view"
            >
                <BsListUl className="w-5 h-5" />
            </button>
        </div>
    );
}