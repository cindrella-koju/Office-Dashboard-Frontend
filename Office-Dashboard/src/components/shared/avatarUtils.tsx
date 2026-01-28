const AVATAR_COLORS = [
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-teal-400 to-teal-600',
    'bg-gradient-to-br from-cyan-400 to-cyan-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-rose-400 to-rose-600',
    'bg-gradient-to-br from-emerald-400 to-emerald-600',
];

/**
 * Get initials from username
 */
export const getInitials = (username: string): string => {
    const parts = username.trim().split(' ');
    return parts.map(p => p[0]?.toUpperCase() || '').join('').slice(0, 2);
};

/**
 * Get a truly random color that changes every time
 */
export const getRandomAvatarColor = (): string => {
    const index = Math.floor(Math.random() * AVATAR_COLORS.length);
    return AVATAR_COLORS[index];
};

/**
 * Get avatar color by index (for sequential coloring)
 */
export const getAvatarColorByIndex = (index: number): string => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
};