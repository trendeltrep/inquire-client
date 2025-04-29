import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inquire-server-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
