import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-8 h-8 text-accent" />
              <span className="text-xl font-heading font-semibold text-foreground">
                Where Can I Eat
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover your next favorite restaurant with personalized recommendations and real-time information.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Discover restaurants
                </Link>
              </li>
              <li>
                <Link to="/pick" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Pick for me
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  My favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Where Can I Eat. All rights reserved. v1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
