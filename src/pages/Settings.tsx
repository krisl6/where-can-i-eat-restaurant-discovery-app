import React from 'react';
import { Bell, Globe, Moon, Shield } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useUI();

  return (
    <div className="flex-1">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-light mb-2">
            Settings
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Customize your experience
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-accent" />
              <div>
                <p className="font-medium text-foreground">Dark mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isDarkMode ? 'bg-accent' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Push notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates about new restaurants</p>
                </div>
              </div>
              <button className="relative w-12 h-6 rounded-full bg-accent">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-accent" />
                <span className="font-medium text-foreground">Language</span>
              </label>
              <select className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Privacy & Security
          </h2>
          <div className="space-y-3">
            <button className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
              <Shield className="w-5 h-5" />
              <span>Privacy policy</span>
            </button>
            <button className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
              <Shield className="w-5 h-5" />
              <span>Terms of service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
