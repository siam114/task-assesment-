"use client"

import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContextType, AuthUser } from '@/types/auth';
import { authService } from '@/utils/authService';
import { usePathname, useRouter } from 'next/navigation';
import { UserDataType } from '@/types/common';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const nonRedirectableToLoginRoutes = ["/register", "/login", "/login/forget-password", "/reset", "/500", "/404", "/401", "/"];
export const errorRoutes = ["/500", "/404", "/401"]

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathName = usePathname()
  const router = useRouter();
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errorRoutes.includes(pathName) || user) return
    setLoading(true)
    // const localUser = localStorage.getItem('userData');
    let userData = null
    authService.getMe().then(u => {
      if (u) {
        userData = u;
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        router.replace(nonRedirectableToLoginRoutes.includes(pathName) ? `/task-list` : pathName);
      } else {
        localStorage.removeItem('userData');
        setUser(null);
        router.replace(!nonRedirectableToLoginRoutes.includes(pathName) ? `/login` : pathName);
      }
      setLoading(false);
    }).catch(err => {
      if (err?.response?.status === 401) {
        localStorage.removeItem('userData');
        setUser(null);
        router.replace(`/login`);
      }
      setLoading(false);
    });

    // if (nonRedirectableToLoginRoutes.includes(pathName) && userData) {
    //   router.replace(`/task-list`);
    // };
    // if (!nonRedirectableToLoginRoutes.includes(pathName) && !userData) {
    //   router.replace(`/login`);
    // }

  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.login(email, password); // token already in cookie
      setUser(user);
      localStorage.setItem('userData', JSON.stringify(user));
      router.replace('/task-list');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.register(name, email, password);
      setUser(user);
      localStorage.setItem('userData', JSON.stringify(user));
      router.replace('/task-list');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('userData');
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{
      loading,
      user,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
