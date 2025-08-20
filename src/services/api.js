import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://52.79.182.121:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;