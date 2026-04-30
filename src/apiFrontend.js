import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE}/api`,
  withCredentials: true,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});