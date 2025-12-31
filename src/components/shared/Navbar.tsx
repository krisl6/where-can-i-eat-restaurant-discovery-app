import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, User, Heart, Settings, LogOut, Utensils } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <Utensils className="w-8 h-8 text-accent" />
              <span className="text-xl font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
                Where Can I Eat
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Discover
              </Link>
              <Link to="/pick" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pick for me
              </Link>
              <Link to="/favorites" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Favorites
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4" />
                      Favorites
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <hr className="my-1 border-border" />
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/pick"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pick for me
            </Link>
            <Link
              to="/favorites"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <Link
                to="/login"
                className="block px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium text-center hover:bg-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
