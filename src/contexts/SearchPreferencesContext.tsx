import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface SearchPreferences {
  lastLocation: string | null;
  lastCoordinates: Coordinates | null;
  recentSearches: string[];
}

interface SearchPreferencesContextType extends SearchPreferences {
  saveSearch: (location: string, coords?: Coordinates) => void;
  clearHistory: () => void;
}

const SearchPreferencesContext = createContext<SearchPreferencesContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'wcie_search_preferences';
const MAX_RECENT_SEARCHES = 5;

export function SearchPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<SearchPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load search preferences:', error);
    }
    return {
      lastLocation: null,
      lastCoordinates: null,
      recentSearches: [],
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save search preferences:', error);
    }
  }, [preferences]);

  const saveSearch = (location: string, coords?: Coordinates) => {
    setPreferences((prev) => {
      const newRecentSearches = [
        location,
        ...prev.recentSearches.filter((s) => s !== location),
      ].slice(0, MAX_RECENT_SEARCHES);

      return {
        lastLocation: location,
        lastCoordinates: coords || prev.lastCoordinates,
        recentSearches: newRecentSearches,
      };
    });
  };

  const clearHistory = () => {
    setPreferences({
      lastLocation: null,
      lastCoordinates: null,
      recentSearches: [],
    });
  };

  return (
    <SearchPreferencesContext.Provider
      value={{
        ...preferences,
        saveSearch,
        clearHistory,
      }}
    >
      {children}
    </SearchPreferencesContext.Provider>
  );
}

export function useSearchPreferences() {
  const context = useContext(SearchPreferencesContext);
  if (!context) {
    throw new Error('useSearchPreferences must be used within SearchPreferencesProvider');
  }
  return context;
}
