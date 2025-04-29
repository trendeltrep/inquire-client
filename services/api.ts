import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // тут укажешь реальный URL бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
