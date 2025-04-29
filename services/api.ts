import axios from 'axios';

const api = axios.create({
  baseURL: 'inquire-server-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
