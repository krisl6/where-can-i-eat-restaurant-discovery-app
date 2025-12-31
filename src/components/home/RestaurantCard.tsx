import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Navigation, Clock } from 'lucide-react';
import { Restaurant } from '../../types';
import RatingStars from '../shared/RatingStars';
import PriceIndicator from '../shared/PriceIndicator';
import DistanceBadge from '../shared/DistanceBadge';
import { useUser } from '../../contexts/UserContext';
import { useUI } from '../../contexts/UIContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { user, toggleFavorite } = useUser();
  const { addToast } = useUI();
  const isFavorite = user?.favorites.includes(restaurant.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(restaurant.id);
    addToast(
      isFavorite ? 'Removed from favorites' : 'Added to favorites',
      'success'
    );
  };

  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleFavoriteClick}
            className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`}
            />
          </button>
        </div>
        {restaurant.isOpen ? (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            Open now
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
            Closed
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
          </div>
          <PriceIndicator level={restaurant.priceLevel} />
        </div>

        <div className="flex items-center justify-between mb-3">
          <RatingStars rating={restaurant.rating} size="sm" />
          <span className="text-xs text-muted-foreground">
            ({restaurant.reviewCount} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <DistanceBadge distance={restaurant.distance} />
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{restaurant.hours}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            <Navigation className="w-4 h-4" />
            Directions
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
