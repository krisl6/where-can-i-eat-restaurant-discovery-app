import { useJsApiLoader } from '@react-google-maps/api';
import { env } from '@/config/env';
import { ReactNode } from 'react';

const libraries: ('places' | 'geometry')[] = ['places', 'geometry'];

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: env.googleMapsApiKey,
    libraries,
  });

  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-2">
          <p className="text-destructive font-semibold">Error loading Google Maps</p>
          <p className="text-sm text-muted-foreground">
            Please check your API key configuration
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading maps...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
