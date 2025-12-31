import React from 'react';
import { Heart } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import RestaurantCard from '../components/home/RestaurantCard';
import { useUser } from '../contexts/UserContext';

const Favorites: React.FC = () => {
  const { user } = useUser();
  const favoriteRestaurants = mockRestaurants.filter(r => 
    user?.favorites.includes(r.id)
  );

  return (
    <div className="flex-1">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-10 h-10 fill-white" />
            <h1 className="text-4xl font-heading font-light">
              Your favorite restaurants
            </h1>
          </div>
          <p className="text-lg text-white/90">
            {favoriteRestaurants.length} saved restaurants
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              No favorites yet
            </h2>
            <p className="text-muted-foreground">
              Start exploring and save your favorite restaurants
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
