'use client';
import { Add, Close, Delete, Edit } from '@mui/icons-material';
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
import CreateSubscription from './create';
import EditSubscription from './edit';
import { ESubscriptionType, ISubscription } from '@/services/subscription/interface';
import dayjs from 'dayjs';
import { useAuth } from '@/contexts';

export default function Subscriptions() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<ISubscription | null>(null);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteSubscription, setDeleteSubscription] = useState(false);

  const handleGetSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/subscriptions/${user.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleGetSubscriptions();
    } catch (error) {
      console.error('Error deleting subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
    console.log('user', user);
  }, []);

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
          <Button onClick={() => setCreate(true)} endIcon={<Add />} variant="outlined">
            {t('pages.subscriptions.new-subscription')}
          </Button>
        </Box>
        {loading ? <LinearProgress /> : null}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">{t('pages.subscriptions.table.id')}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    {t('pages.subscriptions.table.subscriptionType')}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    {t('pages.subscriptions.table.lastSended')}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {t('pages.subscriptions.table.actions')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell align="left">
                    <Typography variant="body2">{subscription.id}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body2">
                      {ESubscriptionType[subscription.subscriptionType]}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body2">
                      {dayjs(subscription.lastSended).format('DD/MM/YYYY HH:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setSelectedSubscription(subscription);
                        setEdit(true);
                      }}
                    >
                      <Edit color="info" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedSubscription(subscription);
                        setDeleteSubscription(true);
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={create}
        onClose={() => setCreate(false)}
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
          <CreateSubscription
            handleGetSubscriptions={handleGetSubscriptions}
            onClose={() => setCreate(false)}
            user={user}
          />
        </Box>
      </Modal>
      <Modal
        open={edit}
        onClose={() => {
          setEdit(false);
          setSelectedSubscription(null);
        }}
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
          <EditSubscription
            subscription={selectedSubscription}
            handleGetSubscriptions={handleGetSubscriptions}
            onClose={() => {
              setEdit(false);
              setSelectedSubscription(null);
            }}
            user={user}
          />
        </Box>
      </Modal>
      <Modal
        open={deleteSubscription}
        onClose={() => {
          setDeleteSubscription(false);
          setSelectedSubscription(null);
        }}
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
              {t('pages.subscriptions.delete')}
              <IconButton
                onClick={() => {
                  setDeleteSubscription(false);
                  setSelectedSubscription(null);
                }}
              >
                <Close />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setSelectedSubscription(null);
                  setDeleteSubscription(false);
                }}
              >
                {t('pages.subscriptions.cancel')}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeleteSubscription(selectedSubscription?.id || '');
                  setDeleteSubscription(false);
                  setSelectedSubscription(null);
                }}
              >
                {t('pages.subscriptions.delete')}
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    </main>
  );
}
