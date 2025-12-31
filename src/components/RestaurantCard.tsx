import { Restaurant } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
  isSelected?: boolean;
}

export function RestaurantCard({ restaurant, onClick, isSelected }: RestaurantCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden hover:shadow-lg transition-all cursor-pointer",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <div className="relative h-48 md:h-full">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80';
            }}
          />
          {restaurant.isOpen && (
            <Badge className="absolute top-2 left-2 bg-emerald-600">
              Open now
            </Badge>
          )}
        </div>

        <CardContent className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold mb-1">{restaurant.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {restaurant.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.address}</span>
              <span>•</span>
              <span>{restaurant.distance} km</span>
            </div>
            {restaurant.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{restaurant.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className={restaurant.isOpen ? 'text-emerald-600' : 'text-destructive'}>
                {restaurant.hours}
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
