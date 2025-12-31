import React from 'react';
import { User, Mail, MapPin, Calendar } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Profile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-light mb-2">
            Profile
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Manage your account settings
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  {user.name}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full name
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
                <User className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue={user.name}
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  defaultValue={user.email}
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Default location
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue="Times Square, New York, NY"
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Save changes
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Account statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-heading font-semibold text-accent mb-1">
                {user.favorites.length}
              </p>
              <p className="text-sm text-muted-foreground">Favorite restaurants</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-heading font-semibold text-accent mb-1">
                12
              </p>
              <p className="text-sm text-muted-foreground">Reviews written</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-heading font-semibold text-accent mb-1">
                45
              </p>
              <p className="text-sm text-muted-foreground">Restaurants visited</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
