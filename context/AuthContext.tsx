'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'syeda_user_v1';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login: AuthContextType['login'] = (email, password) => {
    if (!email || !password) return { success: false, message: 'Please enter your email and password.' };
    const fakeUser = { name: email.split('@')[0], email };
    setUser(fakeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
    return { success: true, message: 'Welcome back to Syeda Clothing.' };
  };

  const register: AuthContextType['register'] = (name, email, password) => {
    if (!name || !email || !password) return { success: false, message: 'Please fill in all fields.' };
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, message: 'Your account has been created.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
