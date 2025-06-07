import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Box, Card, Grid2, IconButton, TextareaAutosize, Typography } from '@mui/material';
import { CustomButton } from '@/components';
import { Close } from '@mui/icons-material';
import { ITemplate } from '@/services/template/interface';
import { IUser } from '@/contexts';

interface FormProps {
  onClose: () => void;
  handleGetTemplates: () => void;
  template: ITemplate | null;
  user: IUser;
}

const EditTemplate: FC<FormProps> = ({ user, onClose, handleGetTemplates, template }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      userId: user.userId,
      templateHtml: template?.templateHtml ?? '',
    },
    validationSchema: Yup.object({
      userId: Yup.string().required(t('pages.templates.form.user-id.required')),
      templateHtml: Yup.string().required(t('pages.templates.form.custom-template.required')),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/templates`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            id: template?.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        await response.json();
        handleGetTemplates();
        onClose();
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
                  {t('pages.templates.form.edit-title')}
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
                  <TextareaAutosize
                    id="templateHtml"
                    name="templateHtml"
                    onChange={formik.handleChange}
                    value={formik.values.templateHtml}
                    style={{
                      minHeight: 280,
                      width: '100%',
                    }}
                  />
                  {formik.touched.templateHtml && formik.errors.templateHtml ? (
                    <Box>{formik.errors.templateHtml}</Box>
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
                  label={t('pages.templates.form.submit-edit')}
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
            {t('pages.templates.preview')}
            <Card elevation={2} sx={{ height: '100%', overflowY: 'auto', p: 2 }}>
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: formik?.values.templateHtml || '' }}
              />
            </Card>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default EditTemplate;
