import { api } from './client';

export const announcementsApi = {
  create:  (data: unknown)                               => api.post('/api/v1/admin/announcements', data),
  update:  (announcementId: string, data: unknown)       => api.put(`/api/v1/admin/announcements/${announcementId}`, data),
  remove:  (announcementId: string)                      => api.delete(`/api/v1/admin/announcements/${announcementId}`),
  publish: (announcementId: string)                      => api.post(`/api/v1/admin/announcements/${announcementId}/publish`),
};
