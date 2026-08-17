import { api } from './client';

export const usersApi = {
  list:       (params?: Record<string, unknown>) => api.get('/api/v1/admin/users', { params }),
  getById:    (userId: string)                   => api.get(`/api/v1/admin/users/${userId}`),
  setStatus:  (userId: string, status: string)   => api.put(`/api/v1/admin/users/${userId}/status`, { status }),
};
