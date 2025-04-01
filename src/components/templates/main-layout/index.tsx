'use client';
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Sidebar } from '@/components';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', maxHeight: '100dvh' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        {children}
      </Box>
    </div>
  );
};
