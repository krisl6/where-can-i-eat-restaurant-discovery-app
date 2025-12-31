import { useLoadScript } from '@react-google-maps/api';
import { RestaurantsMap } from '@/components/maps/RestaurantsMap';
import { Restaurant } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface MapViewProps {
  center: google.maps.LatLngLiteral;
  restaurants: Restaurant[];
  selectedRestaurantId?: string;
  onSelectRestaurant?: (id: string) => void;
  className?: string;
  zoom?: number;
}

const libraries: ('places' | 'geometry')[] = ['places', 'geometry'];

export function MapView({
  center,
  restaurants,
  selectedRestaurantId,
  onSelectRestaurant,
  className = '',
  zoom = 13,
}: MapViewProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  if (loadError) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Failed to load map</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <Skeleton className={className} />;
  }

  return (
    <div className={className}>
      <RestaurantsMap
        restaurants={restaurants}
        selectedRestaurantId={selectedRestaurantId}
        onSelectRestaurant={onSelectRestaurant}
        center={center}
        zoom={zoom}
      />
    </div>
  );
}
