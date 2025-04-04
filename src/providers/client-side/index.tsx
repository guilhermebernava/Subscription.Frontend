'use client';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/configs';
import { darkTheme, lightTheme } from '@/themes';
import { MainLayout } from '@/components';
import { Providers } from '@/providers';
import { ReduxInitializer } from '@/initializers';
import { ThemeProvider } from '@mui/material';

export const ClientSide: FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ReduxInitializer>
      <Providers providers={[{ component: ThemeProvider, props: { theme: currentTheme } }]}>
        <MainLayout>{children}</MainLayout>
      </Providers>
    </ReduxInitializer>
  );
};
