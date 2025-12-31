import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Location } from '../types';

interface LocationContextType {
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
  searchHistory: Location[];
  addToHistory: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const defaultLocation: Location = {
  lat: 40.7589,
  lng: -73.9851,
  address: 'Times Square, New York, NY',
};

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location>(defaultLocation);
  const [searchHistory, setSearchHistory] = useState<Location[]>([defaultLocation]);

  const addToHistory = (location: Location) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(l => l.address !== location.address);
      return [location, ...filtered].slice(0, 5);
    });
  };

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation, searchHistory, addToHistory }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
