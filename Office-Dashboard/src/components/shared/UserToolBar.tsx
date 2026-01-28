import { Card } from "../ui/Card";
import SearchBar from "./SearchBar";
import type { ViewMode } from "./UserCard.types";
import ViewToggle from "./ViewToggle";


interface UserToolbarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    searchPlaceholder?: string;
}

export default function UserToolbar({
    searchQuery,
    onSearchChange,
    viewMode,
    onViewModeChange,
    searchPlaceholder = "Search by username..."
}: UserToolbarProps) {
    return (
        <Card padding="sm" className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <SearchBar
                    value={searchQuery}
                    onChange={onSearchChange}
                    placeholder={searchPlaceholder}
                />
                <ViewToggle
                    viewMode={viewMode}
                    onViewChange={onViewModeChange}
                />
            </div>
        </Card>
    );
}