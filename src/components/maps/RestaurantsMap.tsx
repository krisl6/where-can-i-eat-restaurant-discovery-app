import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Restaurant } from '@/types';
import { env } from '@/config/env';

interface RestaurantsMapProps {
  restaurants: Restaurant[];
  center: { lat: number; lng: number };
  onMarkerClick?: (restaurant: Restaurant) => void;
}

export function RestaurantsMap({ restaurants, center, onMarkerClick }: RestaurantsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: env.googleMapsApiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      // Initialize map
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add user location marker
      new google.maps.Marker({
        position: center,
        map: googleMapRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#8B5CF6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        title: 'Your Location',
      });
    });
  }, [center]);

  useEffect(() => {
    if (!googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add restaurant markers
    restaurants.forEach((restaurant) => {
      const marker = new google.maps.Marker({
        position: restaurant.coordinates,
        map: googleMapRef.current,
        title: restaurant.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });

      marker.addListener('click', () => {
        onMarkerClick?.(restaurant);
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (restaurants.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(center);
      restaurants.forEach((restaurant) => {
        bounds.extend(restaurant.coordinates);
      });
      googleMapRef.current?.fitBounds(bounds);
    }
  }, [restaurants, onMarkerClick, center]);

  return <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />;
}
