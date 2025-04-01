'use client';
import React from 'react';
import { LightMode, DarkMode } from '@mui/icons-material';
import { IconButton, SxProps, Theme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/store';
import { RootState } from '@/configs';

export const ChangeTheme: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    dispatch(toggleTheme());
  };

  return (
    <IconButton onClick={handleToggleTheme} sx={iconButtonSx}>
      {themeMode === 'light' ? <LightMode sx={iconSx} /> : <DarkMode sx={iconSx} />}
    </IconButton>
  );
};

const iconButtonSx: SxProps<Theme> = {
  maxHeight: 24,
  maxWidth: 24,
};

const iconSx: SxProps<Theme> = {
  maxHeight: 16,
  maxWidth: 16,
};
