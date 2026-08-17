import { api } from './client';

export interface AdminLoginPayload { username: string; password: string; }
export interface AdminUser { id: string; username: string; email: string; role: string; }

export const authApi = {
  login:  (data: AdminLoginPayload)   => api.post('/api/v1/admin/auth/login', data),
  logout: ()                          => api.post('/api/v1/admin/auth/logout'),
  me:     ()                          => api.get<AdminUser>('/api/v1/admin/auth/me'),
};
