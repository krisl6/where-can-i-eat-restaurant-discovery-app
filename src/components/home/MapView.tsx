import React from 'react';
import { MapPin } from 'lucide-react';
import { mockRestaurants } from '../../data/mockData';

const MapView: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">Interactive Map</p>
          <p className="text-sm text-muted-foreground mt-2">
            Google Maps integration will display here
          </p>
        </div>
      </div>
      
      <div className="absolute top-4 left-4 right-4 bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm text-foreground">
          Showing <span className="font-semibold">{mockRestaurants.length}</span> restaurants nearby
        </p>
      </div>
    </div>
  );
};

export default MapView;
