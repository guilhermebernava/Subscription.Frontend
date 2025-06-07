import React, { FC, useEffect, useState } from 'react';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  FormControl,
  Grid2,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { CustomButton } from '@/components';
import { Close } from '@mui/icons-material';
import { ESubscriptionType } from '@/services/subscription/interface';
import { ITemplate } from '@/services/template/interface';
import { IUser } from '@/contexts';

interface FormProps {
  onClose: () => void;
  handleGetSubscriptions: () => void;
  user: IUser;
}

const CreateSubscription: FC<FormProps> = ({ user, onClose, handleGetSubscriptions }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [isCustomTemplate, setIsCustomTemplate] = useState(false);
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const formik = useFormik({
    initialValues: {
      userId: user.userId,
      email: '',
      subscriptionType: 0,
      idTemplate: '',
      customTemplate: '',
    },
    validationSchema: Yup.object({
      userId: Yup.string().required(t('pages.subscriptions.form.user-id.required')),
      subscriptionType: Yup.number(),
      idTemplate: Yup.string(),
      customTemplate: Yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        handleGetSubscriptions();
        onClose();
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`/api/templates/${user.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { data } = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Card sx={{ p: 2, width: '100%' }}>
        <Box display="flex" gap={2}>
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
                <TextField
                  id="email"
                  name="email"
                  label={t('pages.subscriptions.form.email.label')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                />
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
                <FormControl fullWidth>
                  <Select
                    id="subscriptionType"
                    name="subscriptionType"
                    value={formik.values.subscriptionType}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.subscriptionType && Boolean(formik.errors.subscriptionType)
                    }
                  >
                    <MenuItem value={0}>
                      {t(`pages.subscriptions.form.subscription-type.${ESubscriptionType[0]}`)}
                    </MenuItem>
                    <MenuItem value={1}>
                      {t(`pages.subscriptions.form.subscription-type.${ESubscriptionType[1]}`)}
                    </MenuItem>
                    <MenuItem value={2}>
                      {t(`pages.subscriptions.form.subscription-type.${ESubscriptionType[2]}`)}
                    </MenuItem>
                    <MenuItem value={3}>
                      {t(`pages.subscriptions.form.subscription-type.${ESubscriptionType[3]}`)}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              {!isCustomTemplate && (
                <Grid2
                  size={{
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg: 12,
                    xl: 12,
                  }}
                >
                  <FormControl fullWidth>
                    <Select
                      id="idTemplate"
                      name="idTemplate"
                      value={formik.values.idTemplate}
                      onChange={formik.handleChange}
                      error={formik.touched.idTemplate && Boolean(formik.errors.idTemplate)}
                    >
                      {templates.map((template) => (
                        <MenuItem key={template.id} value={template.id}>
                          {template.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
              )}
              <Grid2
                size={{
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Switch
                    id="isCustomTemplate"
                    name="isCustomTemplate"
                    checked={isCustomTemplate}
                    onChange={(e) => {
                      setIsCustomTemplate(e.target.checked);
                      if (!e.target.checked) {
                        formik.setFieldValue('customTemplate', '');
                      }
                      if (e.target.checked) {
                        formik.setFieldValue('idTemplate', '');
                      }
                    }}
                  />
                  <Typography variant="body1">
                    {t('pages.subscriptions.form.custom-template.label')}
                  </Typography>
                </Box>
              </Grid2>
              {isCustomTemplate && (
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
                    <TextareaAutosize
                      id="customTemplate"
                      name="customTemplate"
                      onChange={formik.handleChange}
                      value={formik.values.customTemplate}
                      style={{
                        minHeight: 280,
                        width: '100%',
                      }}
                    />
                    {formik.touched.customTemplate && formik.errors.customTemplate ? (
                      <Box>{formik.errors.customTemplate}</Box>
                    ) : null}
                  </Box>
                </Grid2>
              )}
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
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={2}
          >
            {t('pages.subscriptions.preview')}
            <Card elevation={2} sx={{ height: '100%', overflowY: 'auto', p: 2 }}>
              <Typography
                component="div"
                dangerouslySetInnerHTML={{
                  __html: isCustomTemplate
                    ? formik?.values.customTemplate
                    : templates.find((template) => template.id === formik?.values.idTemplate)
                        ?.templateHtml || '',
                }}
              />
            </Card>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CreateSubscription;
