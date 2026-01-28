interface PlayerAvatarProps {
  username: string;
  isWinner: boolean;
  size?: 'sm' | 'md' | 'lg';
  playerIndex?: number;
  variant?: 'circle' | 'square';
}

export default function PlayerAvatar({ 
  username, 
  isWinner, 
  size = 'md',
  playerIndex = 0,
  variant = 'circle'
}: PlayerAvatarProps) {
  const getColorClass = () => {
    if (isWinner) return 'bg-gradient-to-br from-green-500 to-green-600 text-white';
    
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600 text-white',
      'bg-gradient-to-br from-purple-400 to-purple-600 text-white',
      'bg-gradient-to-br from-orange-400 to-orange-600 text-white',
      'bg-gradient-to-br from-pink-400 to-pink-600 text-white',
    ];
    
    return colors[playerIndex % colors.length];
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-10 h-10 text-xs';
      case 'lg': return 'w-14 h-14 text-sm';
      default: return 'w-12 h-12 text-xs';
    }
  };

  const shapeClass = variant === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div className={`${getSizeClass()} ${shapeClass} flex items-center justify-center font-bold shadow-md ${getColorClass()}`}>
      {username.substring(0, 2).toUpperCase()}
    </div>
  );
}