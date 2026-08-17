import { api } from './client';

export const categoriesApi = {
  create: (data: unknown)                        => api.post('/api/v1/admin/categories', data),
  update: (categoryId: string, data: unknown)    => api.put(`/api/v1/admin/categories/${categoryId}`, data),
  remove: (categoryId: string)                   => api.delete(`/api/v1/admin/categories/${categoryId}`),
};
