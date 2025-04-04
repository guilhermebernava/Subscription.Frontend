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

export default function ResetPassword() {
  const { t, i18n } = useTranslation();
  const { push } = useRouter();
  const { defineToast } = useToast();
  const lang = `/${i18n.language}`;

  const [loading, setLoading] = useState(false);
  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t('pages.reset-password.form.user.required')),
      oldPassword: Yup.string().required(t('pages.reset-password.form.old-password.required')),
      newPassword: Yup.string()
        .required(t('pages.reset-password.form.new-password.required'))
        .notOneOf([Yup.ref('oldPassword')], t('pages.reset-password.form.new-password.different')),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, action: 'resetPassword' }),
        });

        const data = await res.json();
        if (res.ok) {
          push(`${lang}/login`);
        } else {
          throw new Error(data.message || 'error.unknown');
        }

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
            <CardHeader title={t('pages.reset-password.title')} />
            <ChangeLanguage />
          </Box>
          <Divider />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid2 container gap={2}>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <TextField
                    size="small"
                    label={t('pages.reset-password.user')}
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
                    label={t('pages.reset-password.old-password')}
                    type={seeOldPassword ? 'text' : 'password'}
                    fullWidth
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                    helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setSeeOldPassword(!seeOldPassword)}
                            >
                              {seeOldPassword ? <Visibility /> : <VisibilityOff />}
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
                    label={t('pages.reset-password.new-password')}
                    type={seeNewPassword ? 'text' : 'password'}
                    fullWidth
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setSeeNewPassword(!seeNewPassword)}
                            >
                              {seeNewPassword ? <Visibility /> : <VisibilityOff />}
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
                    {t('pages.reset-password.reset')}
                  </Button>
                </Grid2>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <Button href={`${lang}/login`} fullWidth disableElevation disabled={loading}>
                    {t('pages.reset-password.back-to-login')}
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
