import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Navigation, Clock, Heart, Share2, MapPin } from 'lucide-react';
import { mockRestaurants, mockReviews } from '../data/mockData';
import RatingStars from '../components/shared/RatingStars';
import PriceIndicator from '../components/shared/PriceIndicator';
import { useUser } from '../contexts/UserContext';
import { useUI } from '../contexts/UIContext';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = mockRestaurants.find(r => r.id === id);
  const reviews = mockReviews.filter(r => r.restaurantId === id);
  const { user, toggleFavorite } = useUser();
  const { addToast } = useUI();
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  if (!restaurant) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Restaurant not found
          </h2>
          <Link to="/" className="text-accent hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = user?.favorites.includes(restaurant.id);

  const handleFavoriteClick = () => {
    toggleFavorite(restaurant.id);
    addToast(
      isFavorite ? 'Removed from favorites' : 'Added to favorites',
      'success'
    );
  };

  return (
    <div className="flex-1">
      <div className="relative h-96 bg-muted">
        <img
          src={restaurant.photos[selectedPhoto]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            to="/"
            className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleFavoriteClick}
              className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'
                }`}
              />
            </button>
            <button className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors">
              <Share2 className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-4xl font-heading font-light text-white mb-2">
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-4 text-white">
            <span className="text-lg">{restaurant.cuisine}</span>
            <PriceIndicator level={restaurant.priceLevel} />
            {restaurant.isOpen ? (
              <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                Open now
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                Closed
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-card border-b border-border">
        {restaurant.photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedPhoto(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedPhoto === index
                ? 'border-accent'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={photo} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-light text-foreground mb-4">
                About
              </h2>
              <div className="flex items-center gap-6 mb-4">
                <RatingStars rating={restaurant.rating} size="lg" />
                <span className="text-muted-foreground">
                  {restaurant.reviewCount} reviews
                </span>
              </div>
              <p className="text-foreground leading-relaxed">
                Experience exceptional {restaurant.cuisine} cuisine in a welcoming atmosphere. 
                Our chefs use only the finest ingredients to create memorable dishes that will 
                delight your taste buds.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-light text-foreground mb-4">
                Reviews
              </h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground">{review.userName}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <RatingStars rating={review.rating} size="sm" showNumber={false} />
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">{review.comment}</p>
                    <button className="mt-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Hours</p>
                    <p className="text-sm text-muted-foreground">{restaurant.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky top-4 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                <Navigation className="w-5 h-5" />
                Get directions
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors">
                <Phone className="w-5 h-5" />
                Call now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
