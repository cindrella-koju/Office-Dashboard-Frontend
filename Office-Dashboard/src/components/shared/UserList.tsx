import { Card } from "../ui/Card";
import UserCard from "./UserCard";
import type { UserCardData, ViewMode } from "./UserCard.types";

interface UserListProps<T extends UserCardData> {
    users: T[] | null;
    viewMode: ViewMode;
    searchQuery: string;
    onRemoveUser?: (userId: number | string) => void;
    canDelete?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    hoverColor?: string;
    title?: string;
    showCount?: boolean;
}

export default function UserList<T extends UserCardData>({
    users,
    viewMode,
    searchQuery,
    onRemoveUser,
    canDelete = true,
    emptyTitle = "No Users Yet",
    emptyDescription = "Add users to see them appear here.",
    hoverColor = "blue",
    title,
    showCount = true,
}: UserListProps<T>) {
    // Filter users based on search query
    const filteredUsers = users?.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(user.user_id).includes(searchQuery)
    );

    const hasAnyUsers = filteredUsers && filteredUsers.length > 0;

    // Empty state - no users
    if (!users || users.length === 0) {
        return (
            <Card className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg 
                        className="w-16 h-16 mx-auto" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {emptyTitle}
                </h3>
                <p className="text-gray-500">
                    {emptyDescription}
                </p>
            </Card>
        );
    }

    // No search results
    if (searchQuery && !hasAnyUsers) {
        return (
            <Card className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg 
                        className="w-16 h-16 mx-auto" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No Results Found
                </h3>
                <p className="text-gray-500">
                    No users match "{searchQuery}"
                </p>
            </Card>
        );
    }

    const gridClassName = viewMode === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
        : "space-y-3";

    return (
        <Card>
            {/* Optional Title with Count */}
            {title && (
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                    <span className="w-1 h-6 sm:h-8 bg-indigo-500 rounded-full mr-3" />
                    {title}
                    {showCount && (
                        <span className="ml-3 text-sm font-normal text-gray-500">
                            ({filteredUsers?.length || 0} {filteredUsers?.length === 1 ? 'user' : 'users'})
                        </span>
                    )}
                </h2>
            )}

            {/* User Grid/List */}
            <div className={gridClassName}>
                {filteredUsers?.map((user) => (
                    <UserCard
                        key={user.user_id}
                        user={user}
                        onRemove={onRemoveUser}
                        canDelete={canDelete}
                        hoverColor={hoverColor}
                    />
                ))}
            </div>
        </Card>
    );
}