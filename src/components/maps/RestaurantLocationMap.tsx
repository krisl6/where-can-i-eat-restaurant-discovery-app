import { GoogleMap, Marker } from '@react-google-maps/api';
import { Restaurant } from '@/types';

interface RestaurantLocationMapProps {
  restaurant: Restaurant;
  zoom?: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

/**
 * RestaurantLocationMap component
 * Displays a single restaurant location on a map
 * Used in the restaurant details page sidebar
 */
export function RestaurantLocationMap({
  restaurant,
  zoom = 15,
}: RestaurantLocationMapProps) {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={restaurant.coordinates}
      zoom={zoom}
      options={mapOptions}
    >
      <Marker
        position={restaurant.coordinates}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }}
        title={restaurant.name}
      />
    </GoogleMap>
  );
}
