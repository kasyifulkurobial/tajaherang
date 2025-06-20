// src/axios/http.js
import axios from 'axios';

const http = axios.create({
  // baseURL: 'https://dummyjson.com', // base URL
  baseURL: import.meta.env.VITE_BASE_URL, // Mengambil URL dari .env
  timeout: 10000, // Set timeout sesuai kebutuhan
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menangani error atau menambahkan token (opsional)
http.interceptors.request.use(
  config => {
    // Tambahkan token ke header jika diperlukan
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

http.interceptors.response.use(
  response => response,
  error => {
    // Tangani error response seperti redirect ke login jika unauthorized
    if (error.response && error.response.status === 401) {
      // Redirect atau lakukan sesuatu
    }
    return Promise.reject(error);
  }
);

export default http;
