import React, { useState } from 'react';
import { Shuffle, MapPin, DollarSign, Utensils } from 'lucide-react';
import { mockRestaurants, cuisineTypes, priceRanges } from '../data/mockData';
import RestaurantCard from '../components/home/RestaurantCard';

const PickForMe: React.FC = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]);
  const [maxDistance, setMaxDistance] = useState(5);
  const [pickedRestaurant, setPickedRestaurant] = useState<typeof mockRestaurants[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const togglePrice = (price: number) => {
    setSelectedPrice(prev =>
      prev.includes(price)
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };

  const pickRestaurant = () => {
    setIsSpinning(true);
    
    let filtered = mockRestaurants.filter(r => r.distance <= maxDistance);
    
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter(r => selectedCuisines.includes(r.cuisine));
    }
    
    if (selectedPrice.length > 0) {
      filtered = filtered.filter(r => selectedPrice.includes(r.priceLevel));
    }

    setTimeout(() => {
      if (filtered.length > 0) {
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        setPickedRestaurant(random);
      }
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="flex-1">
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-light mb-4">
            Can't decide? Let us pick for you
          </h1>
          <p className="text-lg text-accent-foreground/90">
            Set your preferences and we'll find the perfect restaurant
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Cuisine preferences
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => toggleCuisine(cuisine)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCuisines.includes(cuisine)
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Price range
              </h2>
            </div>
            <div className="flex gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => togglePrice(range.value)}
                  className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
                    selectedPrice.includes(range.value)
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Maximum distance
              </h2>
            </div>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <p className="text-center text-lg font-medium text-foreground">
                Within {maxDistance} miles
              </p>
            </div>
          </div>

          <button
            onClick={pickRestaurant}
            disabled={isSpinning}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Picking...' : 'Pick a restaurant for me'}
          </button>

          {pickedRestaurant && !isSpinning && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-heading font-light text-center text-foreground mb-6">
                We picked this for you!
              </h3>
              <RestaurantCard restaurant={pickedRestaurant} />
              <button
                onClick={pickRestaurant}
                className="w-full mt-4 px-4 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Pick another one
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickForMe;
