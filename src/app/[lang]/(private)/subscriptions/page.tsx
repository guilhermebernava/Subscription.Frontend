'use client';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Modal,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Form from './form';
import { useState } from 'react';

export default function Subscriptions() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <main>
      <Typography variant="h1">{t('pages.subscriptions.title')}</Typography>
      <Typography variant="subtitle2">{t('pages.subscriptions.description')}</Typography>
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
            {t('pages.subscriptions.new-subscription')}
          </Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">{t('pages.subscriptions.table.name')}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    {t('pages.subscriptions.table.created-by')}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    {t('pages.subscriptions.table.actions')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
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
    </main>
  );
}
