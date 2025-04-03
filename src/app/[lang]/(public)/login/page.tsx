'use client';
import { ChangeLanguage } from '@/components';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Severity, useToast } from '@/contexts';

export default function Login() {
  const { t, i18n } = useTranslation();
  const { push } = useRouter();
  const { defineToast } = useToast();
  const lang = `/${i18n.language}`;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t('pages.login.form.user.required')),
      password: Yup.string().required(t('pages.login.form.password.required')),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, action: 'login' }),
        });
        
        const data = await res.json();
        if (data.status !== 200) {
          throw new Error(data.error);
        }

        document.cookie = `token=${data}; path=/; max-age=3600;`;
        push(`${lang}/`);
      } catch (err: any) {
        defineToast({
          severity: Severity.error,
          text: t(`error.${err.message}`),
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <main style={{ minHeight: '100dvh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          px: 2,
        }}
      >
        <Card
          elevation={8}
          sx={{
            minWidth: 320,
            maxWidth: 480,
            width: '100%',
          }}
        >
          <Box display="flex" justifyContent="space-between" pr={2}>
            <CardHeader title={t('pages.login.title')} />
            <ChangeLanguage />
          </Box>
          <Divider />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid2 container gap={2}>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <TextField
                    size="small"
                    label={t('pages.login.user')}
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid2>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <TextField
                    size="small"
                    label={t('pages.login.password')}
                    type="password"
                    fullWidth
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid2>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Grid2>
                    <Button disabled variant="text">
                      {t('pages.login.create-user')}
                    </Button>
                  </Grid2>
                  <Grid2>
                    <Button disabled variant="text">
                      {t('pages.login.reset-password')}
                    </Button>
                  </Grid2>
                </Box>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disableElevation
                    disabled={loading}
                  >
                    {t('pages.login.signIn')}
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </CardContent>
        </Card>
      </Box>
    </main>
  );
}
