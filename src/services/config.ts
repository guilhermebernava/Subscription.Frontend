import { apiConfig } from '@/configs';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: apiConfig.ambient !== 'DEV',
});

const authApi = axios.create({
  baseURL: apiConfig.authApiUrl,
  httpsAgent,
  headers: {
    'Content-Type': 'application/json',
  },
});

const subscriptionsApi = axios.create({
  baseURL: apiConfig.subscriptionsApiUrl,
  httpsAgent,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { authApi, subscriptionsApi, httpsAgent };
