export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceLevel: number;
  distance: number;
  address: string;
  phone: string;
  hours: string;
  image: string;
  lat: number;
  lng: number;
  isOpen: boolean;
  photos: string[];
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}
