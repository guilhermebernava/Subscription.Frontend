'use client';
import { CSSProperties } from 'react';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material';

export default function Page() {
  return (
    <main style={mainStyle}>
      <ErrorOutlineRounded sx={iconSx} />
    </main>
  );
}

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
