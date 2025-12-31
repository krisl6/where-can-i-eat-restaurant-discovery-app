import React from 'react';
import { DollarSign } from 'lucide-react';

interface PriceIndicatorProps {
  level: number;
}

const PriceIndicator: React.FC<PriceIndicatorProps> = ({ level }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4].map((price) => (
        <DollarSign
          key={price}
          className={`w-4 h-4 ${
            price <= level ? 'text-accent' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
};

export default PriceIndicator;
