'use client';
import { Add, Close, Delete, Edit, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  IconButton,
  LinearProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Form from './form';
import { ITemplate } from '@/services/template/interface';

export default function Templates() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate | null>(null);

  const [open, setOpen] = useState(false);
  const [see, setSee] = useState(false);

  const handleGetTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/templates', {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTemplates();
  }, []);

  return (
    <main>
      <Typography variant="h1">{t('pages.templates.title')}</Typography>
      <Typography variant="subtitle2">{t('pages.templates.description')}</Typography>
      <Card
        elevation={2}
        sx={{
          width: '100%',
          p: 2,
          mt: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box />
          <Button onClick={() => setOpen(true)} endIcon={<Add />} variant="outlined">
            {t('pages.templates.new-template')}
          </Button>
        </Box>
        {loading ? <LinearProgress /> : null}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">{t('pages.templates.table.id')}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    {t('pages.templates.table.created-by')}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">{t('pages.templates.table.actions')}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell align="left">
                    <Typography variant="body2">{template.id}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body2">{template.userId}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setSelectedTemplate(template);
                        setSee(true);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => {}}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => {}}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            display: 'flex',
            width: '100%',
          }}
        >
          <Form
            onClose={() => setOpen(false)}
            user={{
              id: '123',
              email: '',
            }}
          />
        </Box>
      </Modal>
      <Modal
        open={see}
        onClose={() => setSee(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            display: 'flex',
            width: '100%',
          }}
        >
          <Card
            sx={{
              width: '100%',
              maxWidth: 480,
              p: 2,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              {t('pages.templates.preview')}
              <IconButton onClick={() => setSee(false)}>
                <Close />
              </IconButton>
            </Box>
            <Card elevation={2}>
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: selectedTemplate?.templateHtml || '' }}
              />
            </Card>
          </Card>
        </Box>
      </Modal>
    </main>
  );
}
