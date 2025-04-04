'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { darkPalette } from './dark';
import { lightPalette } from './light';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light' ? lightPalette : darkPalette),
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
