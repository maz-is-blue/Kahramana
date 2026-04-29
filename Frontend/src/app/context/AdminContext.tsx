import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authAPI } from '@/app/services/api';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  currentUser: { email: string; name: string; role: string } | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('kahramana-token');
    const savedUser = localStorage.getItem('kahramana-user');
    if (token && savedUser) {
      const user = JSON.parse(savedUser);
      if (user.role === 'admin') {
        setCurrentUser({ email: user.email, name: user.name, role: user.role });
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const data = await authAPI.login(email, password);
    if (data.role !== 'admin') throw new Error('Admin access required');
    localStorage.setItem('kahramana-token', data.token);
    const userData = { id: data._id, _id: data._id, email: data.email, name: data.name, role: data.role };
    localStorage.setItem('kahramana-user', JSON.stringify(userData));
    setCurrentUser({ email: data.email, name: data.name, role: data.role });
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('kahramana-token');
    localStorage.removeItem('kahramana-user');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, currentUser }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
