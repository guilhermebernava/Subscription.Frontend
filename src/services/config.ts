import { apiConfig } from '@/configs';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: apiConfig.ambient === 'DEV' ? false : true,
});

const api = axios.create({
  baseURL: apiConfig.apiUrl,
});

export { api, httpsAgent };
