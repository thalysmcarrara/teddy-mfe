import { useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { AuthContext } from './auth-context';
import { getUserFromLocalstorage } from '@src/utils/storage';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userName, setUserName] = useState<string>(getUserFromLocalstorage());

  const isAuthenticated = Boolean(userName && userName.trim() !== '');

  const login = useCallback((name: string) => {
    const clean = String(name).trim();
    localStorage.setItem('user', clean);
    setUserName(clean);
  }, []);

  const logout = useCallback(() => {
    console.log("called")
    localStorage.removeItem('user');
    setUserName('');
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'user') {
        const value = e.newValue && e.newValue.trim() !== '' ? e.newValue : '';
        setUserName(value);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, userName, login, logout }),
    [isAuthenticated, userName, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
