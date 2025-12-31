import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SearchPreferencesProvider } from '@/contexts/SearchPreferencesContext';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Landing } from '@/pages/Landing';
import { Results } from '@/pages/Results';
import { RestaurantDetails } from '@/pages/RestaurantDetails';
import { Auth } from '@/pages/Auth';
import { Profile } from '@/pages/Profile';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SearchPreferencesProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    {/* Home page */}
                    <Route path="/" element={<Landing />} />
                    
                    {/* Search results */}
                    <Route path="/results" element={<Results />} />
                    
                    {/* Restaurant details - /restaurant/:id */}
                    <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                    
                    {/* Authentication - /auth */}
                    <Route path="/auth" element={<Auth />} />
                    
                    {/* User profile - /profile */}
                    <Route path="/profile" element={<Profile />} />
                    
                    {/* Help center - /help */}
                    <Route path="/help" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Help Center</h1></div>} />
                    
                    {/* Privacy policy - /privacy */}
                    <Route path="/privacy" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Privacy Policy</h1></div>} />
                    
                    {/* 404 Not Found */}
                    <Route path="*" element={<div className="container mx-auto px-4 py-16 text-center"><h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1></div>} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster />
            </Router>
          </SearchPreferencesProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
