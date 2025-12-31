import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { LocationProvider } from './contexts/LocationContext';
import { UIProvider } from './contexts/UIContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Toast from './components/shared/Toast';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import PickForMe from './pages/PickForMe';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  return (
    <UIProvider>
      <UserProvider>
        <LocationProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/pick" element={<PickForMe />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <Footer />
              <Toast />
            </div>
          </Router>
        </LocationProvider>
      </UserProvider>
    </UIProvider>
  );
}

export default App;
