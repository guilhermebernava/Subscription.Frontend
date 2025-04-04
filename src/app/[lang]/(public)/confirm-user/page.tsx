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
  InputLabel,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Severity, useNonPersistentData, useToast } from '@/contexts';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function ConfirmUser() {
  const { t, i18n } = useTranslation();
  const { push } = useRouter();
  const { defineToast } = useToast();
  const { foundData, removeData } = useNonPersistentData();

  const lang = `/${i18n.language}`;

  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [confirmationDigits, setConfirmationDigits] = useState<string[]>(['', '', '', '', '', '']);

  const handleChangeDigit = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    const newDigits = [...confirmationDigits];

    if (val === '') {
      newDigits[index] = '';
      setConfirmationDigits(newDigits);
      return;
    }

    if (!/^\d$/.test(val)) return;

    newDigits[index] = val;
    setConfirmationDigits(newDigits);

    if (index < 5) {
      const nextInput = document.querySelector(`input[name=code-${index + 1}]`);
      (nextInput as HTMLInputElement)?.focus();
    }
  };

  const handlePasteCode = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('Text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');
    if (digits.length !== 6) return;
    setConfirmationDigits(digits);
    setTimeout(() => {
      const lastInput = document.querySelector(`input[name=code-5]`);
      (lastInput as HTMLInputElement)?.focus();
    }, 0);
  };

  const handleKeyDownDigit = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && confirmationDigits[index] === '' && index > 0) {
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`);
      const newDigits = [...confirmationDigits];
      newDigits[index - 1] = '';
      setConfirmationDigits(newDigits);
      (prevInput as HTMLInputElement)?.focus();
    }
  };

  const formik = useFormik<{
    email: string;
    password: string;
    confirmationCode?: string;
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const confirmationCode = confirmationDigits.join('');
        if (!/^\d{6}$/.test(confirmationCode)) {
          formik.setFieldTouched('confirmationCode', true);
          formik.setFieldError(
            'confirmationCode',
            t('pages.confirm-user.form.confirmation-code.invalid'),
          );
          setLoading(false);
          return;
        }
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, confirmationCode, action: 'confirmUser' }),
        });
        const data = await res.json();
        if (res.ok) {
          push(`${lang}/login`);
        } else {
          throw new Error(data.message || 'error.unknown');
        }
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

  useEffect(() => {
    const data = foundData('login');
    if (!data) return;

    const user = JSON.parse(data);
    formik.setFieldValue('email', user.email);
    formik.setFieldValue('password', user.password);
    removeData('login');
  }, [foundData, removeData]);

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
            <CardHeader title={t('pages.confirm-user.title')} />
            <ChangeLanguage />
          </Box>
          <Divider />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid2 container gap={2}>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <InputLabel>{t('pages.confirm-user.confirmation-code')}</InputLabel>
                  <Box display="flex" justifyContent="space-between" gap={1}>
                    {confirmationDigits.map((digit, index) => (
                      <TextField
                        key={index}
                        size="small"
                        name={`code-${index}`}
                        value={digit}
                        onChange={(e: any) => handleChangeDigit(e, index)}
                        onKeyDown={(e: any) => handleKeyDownDigit(e, index)}
                        onPaste={handlePasteCode}
                        error={
                          formik.touched.confirmationCode && Boolean(formik.errors.confirmationCode)
                        }
                        sx={{
                          input: {
                            textAlign: 'center',
                            width: '40px',
                          },
                        }}
                      />
                    ))}
                  </Box>
                  {formik.touched.confirmationCode && formik.errors.confirmationCode && (
                    <Box mt={1} ml={1}>
                      <small style={{ color: '#d32f2f' }}>{formik.errors.confirmationCode}</small>
                    </Box>
                  )}
                </Grid2>
                <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disableElevation
                    disabled={
                      loading ||
                      Object.values(formik.errors).some((error: any) => error) ||
                      confirmationDigits.some((digit) => digit === '')
                    }
                  >
                    {t('pages.confirm-user.confirm')}
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
