import { api } from './client';

export const dashboardApi = {
  getStats: () => api.get('/api/v1/admin/dashboard/stats'),
};
