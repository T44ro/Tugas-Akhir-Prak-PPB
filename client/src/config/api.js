import axios from 'axios';

// Di project nyata, ini adalah URL backend Anda.
// Karena kita belum punya backend NGO, kita bisa kosongkan atau pakai dummy.
const BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor untuk menangani error response standar
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan';
    return Promise.reject(error.response?.data || { message: errorMessage });
  }
);

export { apiClient, BASE_URL };