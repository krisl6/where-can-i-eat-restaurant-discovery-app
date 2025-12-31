import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RestaurantFiltersProps {
  selectedCuisine: string;
  onCuisineChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
}

const cuisines = [
  { value: 'all', label: 'All cuisines' },
  { value: 'italian', label: 'Italian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'indian', label: 'Indian' },
  { value: 'thai', label: 'Thai' },
  { value: 'french', label: 'French' },
  { value: 'american', label: 'American' },
  { value: 'mediterranean', label: 'Mediterranean' },
];

const priceRanges = [
  { value: 'all', label: 'Any price' },
  { value: '1', label: '$' },
  { value: '2', label: '$$' },
  { value: '3', label: '$$$' },
  { value: '4', label: '$$$$' },
];

export function RestaurantFilters({
  selectedCuisine,
  onCuisineChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
}: RestaurantFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Cuisine</Label>
          <Select value={selectedCuisine || 'all'} onValueChange={onCuisineChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine.value} value={cuisine.value}>
                  {cuisine.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Price range</Label>
          <Select value={priceRange || 'all'} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Minimum rating: {minRating > 0 ? minRating.toFixed(1) : 'Any'}</Label>
          <Slider
            value={[minRating]}
            onValueChange={(values) => onMinRatingChange(values[0])}
            min={0}
            max={5}
            step={0.5}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
