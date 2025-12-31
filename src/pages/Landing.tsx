import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSearchPreferences } from '@/contexts/SearchPreferencesContext';
import { MapPin, Search, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Landing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { lastLocation, recentSearches, saveSearch } = useSearchPreferences();
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    if (location.trim()) {
      saveSearch(location.trim());
      navigate(`/results?location=${encodeURIComponent(location.trim())}`);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Geolocation not supported',
        description: 'Your browser does not support location services.',
        variant: 'destructive',
      });
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setIsLocating(false);
        
        saveSearch('Current location', { lat: latitude, lng: longitude });
        
        navigate(
          `/results?lat=${latitude}&lng=${longitude}&location=${encodeURIComponent('Current location')}`
        );
      },
      (error) => {
        setIsLocating(false);
        
        toast({
          title: 'Location access denied',
          description: 'Please enter your location manually or enable location permissions.',
          variant: 'destructive',
        });
        
        navigate(`/results?location=${encodeURIComponent('Current location')}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleRecentSearchClick = (search: string) => {
    saveSearch(search);
    navigate(`/results?location=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Minimalistic Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                WCIE
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Find great restaurants near you
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md mx-auto">
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder={lastLocation ? `Last: ${lastLocation}` : "Enter location..."}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 h-14 text-base"
              />
              <Button
                size="icon"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Primary CTA - Use Current Location */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="h-14 px-8 text-base font-semibold animate-pulse-glow"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Locating...
                  </>
                ) : (
                  <>
                    <MapPin className="h-5 w-5 mr-2" />
                    Use my current location
                  </>
                )}
              </Button>

              {/* MonstarX Attribution */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Built with MonstarX</span>
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-3">Recent searches</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Simple Value Props */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-semibold">Location-based</h3>
              <p className="text-sm text-muted-foreground">
                Find restaurants near you instantly
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-semibold">Top rated</h3>
              <p className="text-sm text-muted-foreground">
                Discover highly-rated dining spots
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-4xl mb-3">💾</div>
              <h3 className="font-semibold">Save & return</h3>
              <p className="text-sm text-muted-foreground">
                Your searches are saved for quick access
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
