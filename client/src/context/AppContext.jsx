import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation state: 'planner' | 'landing' | 'dashboard'
  const [currentPage, setCurrentPage] = useState('planner');
  const [activeTab, setActiveTab] = useState('overview');

  // Backend connection state
  const [serverStatus, setServerStatus] = useState(null);
  const [isServerLoading, setIsServerLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  // User state
  const [user, setUser] = useState({
    name: 'Lead Developer',
    email: 'developer@example.com',
    role: 'Frontend Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Ping backend status
  const checkServerStatus = useCallback(async () => {
    setIsServerLoading(true);
    setServerError(null);
    try {
      const data = await api.get('/status');
      setServerStatus(data);
      setLastChecked(new Date().toLocaleTimeString());
      return { success: true, data };
    } catch (err) {
      const errorMsg = err.message || 'Unable to connect to backend server';
      setServerError(errorMsg);
      setServerStatus(null);
      setLastChecked(new Date().toLocaleTimeString());
      return { success: false, error: errorMsg };
    } finally {
      setIsServerLoading(false);
    }
  }, []);

  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

  const value = {
    currentPage,
    setCurrentPage,
    activeTab,
    setActiveTab,
    serverStatus,
    isServerLoading,
    serverError,
    lastChecked,
    checkServerStatus,
    user,
    setUser,
    toast,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
