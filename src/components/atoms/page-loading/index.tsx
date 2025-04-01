'use client';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { CircularProgress, SxProps, Theme } from '@mui/material';
import React, { CSSProperties } from 'react';

export const PageLoading: React.FC = () => (
  <main style={{ ...mainStyle }}>
    <ErrorOutlineRounded sx={iconSx} />
    <CircularProgress />
  </main>
);

const mainStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontSize: '2rem',
};
const iconSx: SxProps<Theme> = {
  fontSize: '8rem',
};
