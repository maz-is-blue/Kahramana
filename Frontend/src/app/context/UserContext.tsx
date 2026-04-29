import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authAPI } from '@/app/services/api';

interface User {
  id: string;
  _id?: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  createdAt?: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('kahramana-token');
    const savedUser = localStorage.getItem('kahramana-user');
    if (token && savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      // Re-validate token with server
      authAPI.getMe().catch(() => logout());
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const data = await authAPI.login(email, password);
    localStorage.setItem('kahramana-token', data.token);
    const userData = { id: String(data.id), _id: String(data.id), email: data.email, name: data.name, role: data.role };
    localStorage.setItem('kahramana-user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const data = await authAPI.register(name, email, password);
    localStorage.setItem('kahramana-token', data.token);
    const userData = { id: String(data.id), _id: String(data.id), email: data.email, name: data.name, role: data.role };
    localStorage.setItem('kahramana-user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('kahramana-token');
    localStorage.removeItem('kahramana-user');
  };

  const updateProfile = async (data: Partial<User>) => {
    const updated = await authAPI.updateProfile(data);
    if (updated.token) localStorage.setItem('kahramana-token', updated.token);
    const userData = { id: String(updated.id), _id: String(updated.id), email: updated.email, name: updated.name, role: updated.role, phone: updated.phone };
    setUser(userData);
    localStorage.setItem('kahramana-user', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
