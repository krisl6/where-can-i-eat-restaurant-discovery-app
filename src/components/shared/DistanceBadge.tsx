import React from 'react';
import { MapPin } from 'lucide-react';

interface DistanceBadgeProps {
  distance: number;
}

const DistanceBadge: React.FC<DistanceBadgeProps> = ({ distance }) => {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <MapPin className="w-4 h-4" />
      <span className="text-sm">{distance.toFixed(1)} mi</span>
    </div>
  );
};

export default DistanceBadge;
