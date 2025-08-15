import axios from 'axios';

export const API_BASE_URL = 'https://boasorte.teddybackoffice.com.br';

export const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
