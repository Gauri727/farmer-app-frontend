import { api } from './client';

export const notificationsApi = {
  broadcast: (data: unknown) => api.post('/api/v1/admin/notifications/broadcast', data),
  sms:       (data: unknown) => api.post('/api/v1/admin/notifications/sms', data),
};
