import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const api = axios.create({ baseURL: API_URL });

export const getCultivos = () => api.get('/cultivos');
export const createCultivo = (cultivo) => api.post('/cultivos', cultivo);
