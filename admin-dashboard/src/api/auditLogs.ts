import { api } from './client';

export const auditLogsApi = {
  list: (params?: Record<string, unknown>) => api.get('/api/v1/admin/audit-logs', { params }),
};
