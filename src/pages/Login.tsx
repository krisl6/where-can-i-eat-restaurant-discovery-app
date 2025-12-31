import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Utensils } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useUI } from '../contexts/UIContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const { addToast } = useUI();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    addToast('Successfully logged in!', 'success');
    navigate('/');
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-muted">
      <div className="w-full max-w-md px-4">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Utensils className="w-8 h-8 text-accent" />
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Where Can I Eat
            </h1>
          </div>

          <h2 className="text-2xl font-heading font-light text-foreground mb-6 text-center">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-muted border border-border rounded-lg focus-within:ring-2 focus-within:ring-accent">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-muted border border-border rounded-lg focus-within:ring-2 focus-within:ring-accent">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
