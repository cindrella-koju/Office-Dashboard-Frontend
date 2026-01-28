import { useMemo } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getInitials, getRandomAvatarColor } from "./avatarUtils";
import type { UserCardData } from "./userCard.types";

interface UserCardProps {
    user: UserCardData;
    onRemove?: (userId: number | string) => void;
    canDelete?: boolean;
    hoverColor?: string;
}

export default function UserCard({ 
    user, 
    onRemove,
    canDelete = true,
    hoverColor = "blue"
}: UserCardProps) {
    // Random color generated once per component mount
    const avatarColor = useMemo(() => getRandomAvatarColor(), []);
    const hoverBorderClass = `hover:border-${hoverColor}-200`;
    const hoverTextClass = `group-hover:text-${hoverColor}-600`;

    return (
        <div 
            className={`relative group bg-gradient-to-br from-gray-50 to-white 
                       border-2 border-gray-100 rounded-xl p-4 sm:p-5 
                       hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105 
                       transition-all duration-300 ${hoverBorderClass}`}
        >
            <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Avatar */}
                <div 
                    className={`${avatarColor} rounded-full 
                               w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0 
                               flex items-center justify-center text-white 
                               font-bold text-sm sm:text-lg shadow-md 
                               group-hover:scale-110 transition-transform duration-300`}
                >
                    {getInitials(user.username)}
                </div>
                
                {/* Username */}
                <div className="flex-1 min-w-0">
                    <p className={`text-base sm:text-lg font-bold text-gray-800 
                                truncate ${hoverTextClass}
                                transition-colors duration-200`}>
                        {user.username}
                    </p>
                </div>

                {/* Delete Button */}
                {canDelete && onRemove && (
                    <button
                        onClick={() => onRemove(user.user_id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 
                                 p-1.5 sm:p-2 rounded-lg transition-colors duration-200
                                 opacity-0 group-hover:opacity-100"
                        title="Remove"
                        aria-label={`Remove ${user.username}`}
                    >
                        <RiDeleteBin6Fill className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}