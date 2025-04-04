'use client';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main>
      <Typography variant="h1">{t('pages.home.title')}</Typography>
      <Typography variant="subtitle2">{t('pages.home.description')}</Typography>
    </main>
  );
}
