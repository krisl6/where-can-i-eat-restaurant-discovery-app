export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  distance: number;
  address: string;
  phone: string;
  image: string;
  isOpen: boolean;
  hours: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  photos: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

export interface Cuisine {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
  history: string[];
}

// Stock photos for different cuisine types
const STOCK_PHOTOS: Record<string, string> = {
  'Italian': 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&q=80',
  'Chinese': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
  'Japanese': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
  'Mexican': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
  'Indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  'Thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
  'French': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'American': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
  'Seafood': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  'Steakhouse': 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
  'Vegetarian': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'Vegan': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'Fast Food': 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80',
  'Cafe': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
  'Bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
  'Bar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
  'Restaurant': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
};

// Helper function to convert PlaceResult to Restaurant
export function placeToRestaurant(
  place: any,
  userLocation: { lat: number; lng: number }
): Restaurant {
  const priceLevel = place.price_level || 2;
  const priceRange = ['$', '$$', '$$$', '$$$$'][priceLevel - 1] as Restaurant['priceRange'];
  
  // Calculate distance from user location
  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    place.geometry.location.lat,
    place.geometry.location.lng
  );

  // Determine cuisine from types
  const cuisine = determineCuisine(place.types || []);

  // Get opening hours text
  const isOpen = place.opening_hours?.open_now ?? false;
  const hours = isOpen ? 'Open now' : 'Closed';

  // Get first photo or use stock photo based on cuisine
  const image = place.photos?.[0]?.photo_reference 
    ? getPhotoUrl(place.photos[0].photo_reference, 800)
    : STOCK_PHOTOS[cuisine] || STOCK_PHOTOS['Restaurant'];

  // Get all photos or use stock photo
  const photos = place.photos?.length > 0
    ? place.photos.map((p: any) => getPhotoUrl(p.photo_reference, 800))
    : [image];

  return {
    id: place.place_id,
    name: place.name,
    cuisine,
    rating: place.rating || 0,
    reviewCount: place.user_ratings_total || 0,
    priceRange,
    distance: Math.round(distance * 10) / 10, // Round to 1 decimal
    address: place.vicinity,
    phone: '', // Will be populated from place details
    image,
    isOpen,
    hours,
    description: `${cuisine} restaurant in ${place.vicinity}`,
    coordinates: {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    },
    photos,
    reviews: [] // Will be populated from place details
  };
}

function calculateDistance(
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

function getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
  return `https://places.googleapis.com/v1/${photoReference}/media?maxWidthPx=${maxWidth}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
}

function determineCuisine(types: string[]): string {
  const cuisineMap: Record<string, string> = {
    'italian_restaurant': 'Italian',
    'chinese_restaurant': 'Chinese',
    'japanese_restaurant': 'Japanese',
    'mexican_restaurant': 'Mexican',
    'indian_restaurant': 'Indian',
    'thai_restaurant': 'Thai',
    'french_restaurant': 'French',
    'american_restaurant': 'American',
    'pizza_restaurant': 'Pizza',
    'seafood_restaurant': 'Seafood',
    'steakhouse': 'Steakhouse',
    'vegetarian_restaurant': 'Vegetarian',
    'vegan_restaurant': 'Vegan',
    'fast_food_restaurant': 'Fast Food',
    'cafe': 'Cafe',
    'bakery': 'Bakery',
    'bar': 'Bar'
  };

  for (const type of types) {
    if (cuisineMap[type]) {
      return cuisineMap[type];
    }
  }

  return 'Restaurant';
}
