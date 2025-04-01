'use client';
import { Language, setLanguage } from '@/store';
import i18n from '@/translations';
import React, { useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

interface LanguageInitializerProps {
  children: React.ReactNode;
}

export const LanguageInitializer: React.FC<LanguageInitializerProps> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang === 'br' || storedLang === 'us') {
      dispatch(setLanguage(storedLang as Language));
      i18n.changeLanguage(storedLang as Language);
    }

    setInitialized(true);
  }, [dispatch]);

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};
