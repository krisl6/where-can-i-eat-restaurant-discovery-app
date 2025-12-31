import { useQuery } from '@tanstack/react-query';
import { searchNearbyRestaurants, PlacesSearchParams } from '@/services/googlePlaces';

export function useRestaurants(params: PlacesSearchParams) {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: () => searchNearbyRestaurants(params),
    enabled: !!(params.location.lat && params.location.lng),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
