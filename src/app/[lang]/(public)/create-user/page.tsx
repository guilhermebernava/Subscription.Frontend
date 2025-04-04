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
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Severity, useToast } from '@/contexts';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function CreateUser() {
  const { t, i18n } = useTranslation();
  const { push } = useRouter();
  const { defineToast } = useToast();
  const lang = `/${i18n.language}`;

  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t('pages.create-user.form.user.required')),
      password: Yup.string().required(t('pages.create-user.form.password.required')),
      confirmPassword: Yup.string()
        .required(t('pages.create-user.form.confirm-password.required'))
        .oneOf([Yup.ref('password')], t('pages.create-user.form.confirm-password.match')),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, action: 'createUser' }),
        });

        const data = await res.json();
        defineToast({
          severity: Severity.success,
          text: t('pages.create-user.success'),
        });
        setTimeout(() => {
          push(`${lang}/login`);
        }, 3000);
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
            <CardHeader title={t('pages.create-user.title')} />
            <ChangeLanguage />
          </Box>
          <Divider />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid2 container gap={2}>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <TextField
                    size="small"
                    label={t('pages.create-user.user')}
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
                    label={t('pages.create-user.password')}
                    type={seePassword ? 'text' : 'password'}
                    fullWidth
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setSeePassword(!seePassword)}>
                              {seePassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <TextField
                    size="small"
                    label={t('pages.create-user.confirm-password')}
                    type={seeConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                            >
                              {seeConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disableElevation
                    disabled={loading || Object.values(formik.errors).some((error: any) => error)}
                  >
                    {t('pages.create-user.signUp')}
                  </Button>
                </Grid2>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <Button href={`${lang}/login`} fullWidth disableElevation disabled={loading}>
                    {t('pages.create-user.back-to-login')}
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
