'use client';
import { CSSProperties } from 'react';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { Box, Button, CircularProgress, SxProps, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { i18n } = useTranslation();
  const lang = `/${i18n.language}`;

  return (
    <Box style={{ ...boxStyle }}>
      <ErrorOutlineRounded sx={iconSx} />
      <Typography variant="overline" fontSize={24}>
        <strong>404</strong> - Page not found
      </Typography>
      <Button href={`${lang}/`} variant="contained" sx={{ mt: 2 }} disableElevation>
        Back to home
      </Button>
    </Box>
  );
}

const boxStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  height: '100vh',
};

const iconSx: SxProps<Theme> = {
  fontSize: '8rem',
};
