import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  toggleFavorite: (restaurantId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    favorites: ['1', '2'],
  });

  const login = (email: string, password: string) => {
    setUser({
      id: 'u1',
      name: 'John Doe',
      email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      favorites: ['1', '2'],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (restaurantId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      favorites: user.favorites.includes(restaurantId)
        ? user.favorites.filter(id => id !== restaurantId)
        : [...user.favorites, restaurantId],
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
