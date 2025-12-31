import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { useLocation } from '../../contexts/LocationContext';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { currentLocation } = useLocation();

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-muted rounded-lg px-4 py-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search restaurants, cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>{currentLocation.address}</span>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cuisine type
              </label>
              <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground">
                <option>All cuisines</option>
                <option>Italian</option>
                <option>Japanese</option>
                <option>American</option>
                <option>Indian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Distance
              </label>
              <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground">
                <option>Within 5 miles</option>
                <option>Within 2 miles</option>
                <option>Within 1 mile</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
