import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useSearchPreferences } from '@/contexts/SearchPreferencesContext';
import { RestaurantCard } from '@/components/RestaurantCard';
import { RestaurantFilters } from '@/components/RestaurantFilters';
import { MapView } from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Map, List, LayoutGrid, MapPin } from 'lucide-react';

type ViewMode = 'list' | 'map' | 'split';

export function Results() {
  const [searchParams] = useSearchParams();
  const { saveSearch } = useSearchPreferences();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);

  const location = searchParams.get('location') || '';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const cuisine = searchParams.get('cuisine') || '';

  const coordinates = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined;

  useEffect(() => {
    if (location) {
      saveSearch(location, coordinates);
    }
  }, [location, coordinates, saveSearch]);

  useEffect(() => {
    if (cuisine) {
      setSelectedCuisine(cuisine);
    }
  }, [cuisine]);

  const { data: restaurants, isLoading, error } = useRestaurants({
    location: coordinates || { lat: 0, lng: 0 },
    cuisine: selectedCuisine === 'all' ? '' : selectedCuisine,
    radius: 5000,
  });

  const filteredRestaurants = restaurants?.filter((restaurant) => {
    if (minRating > 0 && (restaurant.rating || 0) < minRating) return false;
    if (priceRange !== 'all' && restaurant.priceLevel !== parseInt(priceRange)) return false;
    return true;
  });

  const handleCuisineChange = (value: string) => {
    setSelectedCuisine(value);
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
  };

  if (!coordinates && !location) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
        <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">No location provided</h2>
        <p className="text-muted-foreground mb-6">
          Please provide a location to see restaurants near you
        </p>
        <Button onClick={() => window.history.back()}>Go back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Restaurants near you</h1>
              {location && (
                <p className="text-sm text-muted-foreground">
                  Showing results for: {location}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
              <Button
                variant={viewMode === 'split' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('split')}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Split
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {(viewMode === 'list' || viewMode === 'split') && (
            <aside className="lg:w-64 shrink-0">
              <RestaurantFilters
                selectedCuisine={selectedCuisine}
                onCuisineChange={handleCuisineChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                minRating={minRating}
                onMinRatingChange={setMinRating}
              />
            </aside>
          )}

          <div className="flex-1 min-w-0">
            {viewMode === 'split' ? (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-64 w-full" />
                    ))
                  ) : error ? (
                    <div className="text-center py-8">
                      <p className="text-destructive">Failed to load restaurants</p>
                    </div>
                  ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No restaurants found</p>
                    </div>
                  )}
                </div>
                <div className="sticky top-24 h-[calc(100vh-8rem)]">
                  {coordinates && filteredRestaurants && (
                    <MapView
                      center={coordinates}
                      restaurants={filteredRestaurants}
                      className="h-full rounded-lg"
                    />
                  )}
                </div>
              </div>
            ) : viewMode === 'map' ? (
              <div className="h-[calc(100vh-12rem)]">
                {coordinates && filteredRestaurants && (
                  <MapView
                    center={coordinates}
                    restaurants={filteredRestaurants}
                    className="h-full rounded-lg"
                  />
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-destructive">Failed to load restaurants</p>
                  </div>
                ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No restaurants found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
