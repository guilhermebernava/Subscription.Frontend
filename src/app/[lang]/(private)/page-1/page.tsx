'use client';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Page1() {
  const { t } = useTranslation();

  return (
    <main>
      <Typography variant="h1">{t('pages.page-1.title')}</Typography>
      <Typography variant="subtitle2">{t('pages.page-1.description')}</Typography>
    </main>
  );
}
