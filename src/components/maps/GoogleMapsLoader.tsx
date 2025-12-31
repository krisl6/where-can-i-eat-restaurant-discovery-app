import { ReactNode } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { env } from '@/config/env';
import { Loader2 } from 'lucide-react';

interface GoogleMapsLoaderProps {
  children: ReactNode;
}

const libraries: ('places' | 'geometry')[] = ['places', 'geometry'];

/**
 * GoogleMapsLoader component
 * Handles loading the Google Maps JavaScript API with proper error handling
 * Wraps children and only renders them once the script is loaded
 */
export function GoogleMapsLoader({ children }: GoogleMapsLoaderProps) {
  if (!env.googleMapsApiKey || env.googleMapsApiKey === 'your_google_maps_api_key_here') {
    return (
      <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Google Maps API key not configured
          </p>
          <p className="text-xs text-muted-foreground">
            Add VITE_GOOGLE_MAPS_API_KEY to your .env.local file
          </p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={env.googleMapsApiKey}
      libraries={libraries}
      loadingElement={
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      {children}
    </LoadScript>
  );
}
