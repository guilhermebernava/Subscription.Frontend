'use client';
import { setTheme, ThemeMode } from '@/store';
import React, { useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

interface ThemeInitializerProps {
  children: React.ReactNode;
}

export const ThemeInitializer: React.FC<ThemeInitializerProps> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      dispatch(setTheme(storedTheme as ThemeMode));
    }
    setInitialized(true);
  }, [dispatch]);

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};
