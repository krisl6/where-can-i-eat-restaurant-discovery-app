import { env } from '@/config/env';

export interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  types?: string[];
  opening_hours?: {
    open_now?: boolean;
  };
}

export interface PlacesSearchParams {
  location: { lat: number; lng: number };
  radius?: number; // in meters
  type?: string;
  keyword?: string;
  minRating?: number;
  maxPrice?: number;
}

/**
 * Search for restaurants using Google Places API Nearby Search
 */
export async function searchNearbyRestaurants(
  params: PlacesSearchParams
): Promise<PlaceResult[]> {
  const { location, radius = 5000, keyword, type = 'restaurant' } = params;

  try {
    // Use Places API (New) via fetch
    const url = new URL('https://places.googleapis.com/v1/places:searchNearby');
    
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': env.googleMapsApiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.location,places.photos,places.types,places.currentOpeningHours,places.regularOpeningHours'
      },
      body: JSON.stringify({
        includedTypes: [type],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: {
              latitude: location.lat,
              longitude: location.lng
            },
            radius: radius
          }
        },
        ...(keyword && { textQuery: keyword })
      })
    });

    if (!response.ok) {
      throw new Error(`Places API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform new API format to our PlaceResult format
    return (data.places || []).map((place: any) => ({
      place_id: place.id,
      name: place.displayName?.text || 'Unknown',
      vicinity: place.formattedAddress || '',
      rating: place.rating,
      user_ratings_total: place.userRatingCount,
      price_level: place.priceLevel ? parsePriceLevel(place.priceLevel) : undefined,
      geometry: {
        location: {
          lat: place.location?.latitude || 0,
          lng: place.location?.longitude || 0
        }
      },
      photos: place.photos?.map((photo: any) => ({
        photo_reference: photo.name,
        height: photo.heightPx,
        width: photo.widthPx
      })),
      types: place.types,
      opening_hours: {
        open_now: place.currentOpeningHours?.openNow
      }
    }));
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}

/**
 * Convert price level string to number (1-4)
 */
function parsePriceLevel(priceLevel: string): number {
  const mapping: Record<string, number> = {
    'PRICE_LEVEL_INEXPENSIVE': 1,
    'PRICE_LEVEL_MODERATE': 2,
    'PRICE_LEVEL_EXPENSIVE': 3,
    'PRICE_LEVEL_VERY_EXPENSIVE': 4
  };
  return mapping[priceLevel] || 2;
}

/**
 * Get detailed information about a specific place
 */
export async function getPlaceDetails(placeId: string): Promise<any> {
  try {
    const url = `https://places.googleapis.com/v1/${placeId}`;
    
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': env.googleMapsApiKey,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,priceLevel,location,photos,types,currentOpeningHours,regularOpeningHours,internationalPhoneNumber,websiteUri,reviews'
      }
    });

    if (!response.ok) {
      throw new Error(`Place details error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
}

/**
 * Get photo URL from photo reference (new API format)
 */
export function getPhotoUrl(
  photoReference: string,
  maxWidth: number = 400
): string {
  // New API format: photoReference is like "places/ChIJ.../photos/..."
  return `https://places.googleapis.com/v1/${photoReference}/media?maxWidthPx=${maxWidth}&key=${env.googleMapsApiKey}`;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
