import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { CustomButton } from '@/components';
import { Close } from '@mui/icons-material';

interface FormProps {
  onClose: () => void;
  user: {
    id: string;
    email: string;
  };
}

const Form: FC<FormProps> = ({ user, onClose }) => {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      userId: user.id,
      subscriptionType: 0,
      email: '',
      customTemplate: '',
    },
    validationSchema: Yup.object({
      userId: Yup.string().required(t('pages.subscriptions.form.user-id.required')),
      email: Yup.string().required(t('pages.subscriptions.form.email.required')),
      customTemplate: Yup.string().required(t('pages.subscriptions.form.custom-template.required')),
      subscriptionType: Yup.number().required(
        t('pages.subscriptions.form.subscription-type.required'),
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: 480,
      }}
    >
      <Card sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2
              size={{
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {t('pages.subscriptions.form.title')}
                <IconButton onClick={onClose}>
                  <Close />
                </IconButton>
              </Box>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
              }}
            >
              <Box>
                <Select
                  fullWidth
                  labelId="subscriptionType"
                  id="subscriptionType"
                  name="subscriptionType"
                  value={formik.values.subscriptionType}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={0}>
                    {t('pages.subscriptions.form.subscriptions-type.option1')}
                  </MenuItem>
                  <MenuItem value={1}>
                    {t('pages.subscriptions.form.subscriptions-type.option2')}
                  </MenuItem>
                </Select>
                {formik.touched.subscriptionType && formik.errors.subscriptionType ? (
                  <Box>{formik.errors.subscriptionType}</Box>
                ) : null}
              </Box>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  id="email"
                  label={t('pages.subscriptions.form.email.label')}
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Box>{formik.errors.email}</Box>
                ) : null}
              </Box>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  id="customTemplate"
                  label={t('pages.subscriptions.form.custom-template.label')}
                  name="customTemplate"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.customTemplate}
                />
                {formik.touched.customTemplate && formik.errors.customTemplate ? (
                  <Box>{formik.errors.customTemplate}</Box>
                ) : null}
              </Box>
            </Grid2>

            <Grid2
              size={{
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
              }}
            >
              <CustomButton
                label={t('pages.subscriptions.form.submit')}
                fullWidth
                type="submit"
                disabled={loading}
              />
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </Box>
  );
};

export default Form;
