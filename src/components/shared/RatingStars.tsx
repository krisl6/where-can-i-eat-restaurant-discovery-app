import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 'md', showNumber = true }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= Math.floor(rating)
              ? 'fill-accent text-accent'
              : star - 0.5 <= rating
              ? 'fill-accent/50 text-accent'
              : 'fill-none text-muted-foreground'
          }`}
        />
      ))}
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-medium text-foreground ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
