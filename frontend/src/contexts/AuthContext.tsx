import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('pawkit_token');
      if (token) {
        try {
          const res = await apiClient.get('/auth/me');
          setUser(res.data.user);
        } catch (error) {
          localStorage.removeItem('pawkit_token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('pawkit_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('pawkit_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
