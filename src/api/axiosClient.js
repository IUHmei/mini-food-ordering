import axios from 'axios';

// Helper function to create an axios instance
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to attach JWT token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

// Create separate instances for each service
export const authService = createAxiosInstance(import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:8081');
export const foodService = createAxiosInstance(import.meta.env.VITE_FOOD_SERVICE_URL || 'http://localhost:8082');
export const orderService = createAxiosInstance(import.meta.env.VITE_ORDER_SERVICE_URL || 'http://localhost:8083');
export const paymentService = createAxiosInstance(import.meta.env.VITE_PAYMENT_SERVICE_URL || 'http://localhost:8084');
