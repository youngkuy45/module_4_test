import axios from 'axios';
import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 실패 시 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API 엔드포인트 함수들
export const authAPI = {
  login: (credentials) => apiClient.post('/api/v1/auth/login', credentials),
  logout: () => apiClient.post('/api/v1/auth/logout'),
};

export const logsAPI = {
  getAll: (params) => apiClient.get('/api/v1/logs', { params }),
  getById: (id) => apiClient.get(`/api/v1/logs/${id}`),
  getStats: () => apiClient.get('/api/v1/logs/stats'),
  getRecent: (limit = 10) => apiClient.get('/api/v1/logs/recent', { params: { limit } }),
};

export const usersAPI = {
  getAll: () => apiClient.get('/api/v1/users'),
  getById: (id) => apiClient.get(`/api/v1/users/${id}`),
  create: (data) => apiClient.post('/api/v1/users', data),
  update: (id, data) => apiClient.put(`/api/v1/users/${id}`, data),
  delete: (id) => apiClient.delete(`/api/v1/users/${id}`),
};

export const settingsAPI = {
  get: () => apiClient.get('/api/v1/settings'),
  update: (data) => apiClient.put('/api/v1/settings', data),
};

export default apiClient;
