import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SearchBar from '../components/home/SearchBar';
import MapView from '../components/home/MapView';
import RestaurantCard from '../components/home/RestaurantCard';
import { mockRestaurants, cuisineTypes } from '../data/mockData';

const Home: React.FC = () => {
  const [showList, setShowList] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const filteredRestaurants = selectedCuisine
    ? mockRestaurants.filter(r => r.cuisine === selectedCuisine)
    : mockRestaurants;

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-light mb-4">
            Discover amazing restaurants near you
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Find the perfect place to eat with personalized recommendations and real-time information
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar />

        <div className="mt-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedCuisine(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCuisine === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {cuisineTypes.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCuisine === cuisine
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div
          className={`transition-all duration-300 ${
            showList ? 'w-full lg:w-1/2' : 'w-0 lg:w-1/3'
          } overflow-hidden`}
        >
          <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-1 p-4">
          <MapView />
        </div>

        <button
          onClick={() => setShowList(!showList)}
          className="lg:hidden fixed bottom-4 right-4 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors z-10"
        >
          {showList ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default Home;
