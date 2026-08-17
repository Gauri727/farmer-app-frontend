import { api } from './client';

// Schemes
export const schemesApi = {
  create:       (data: unknown)                          => api.post('/api/v1/admin/schemes', data),
  update:       (schemeId: string, data: unknown)        => api.put(`/api/v1/admin/schemes/${schemeId}`, data),
  remove:       (schemeId: string)                       => api.delete(`/api/v1/admin/schemes/${schemeId}`),
  setStatus:    (schemeId: string, status: string)       => api.put(`/api/v1/admin/schemes/${schemeId}/status`, { status }),

  // Documents checklist
  addDocument:    (schemeId: string, data: unknown)      => api.post(`/api/v1/admin/schemes/${schemeId}/documents`, data),
  updateDocument: (documentId: string, data: unknown)    => api.put(`/api/v1/admin/schemes/docs/${documentId}`, data),
  removeDocument: (documentId: string)                   => api.delete(`/api/v1/admin/schemes/docs/${documentId}`),

  // FAQs
  addFaq:    (schemeId: string, data: unknown)           => api.post(`/api/v1/admin/schemes/${schemeId}/faqs`, data),
  updateFaq: (faqId: string, data: unknown)              => api.put(`/api/v1/admin/schemes/faqs/${faqId}`, data),
  removeFaq: (faqId: string)                             => api.delete(`/api/v1/admin/schemes/faqs/${faqId}`),

  // GR Documents
  addGr:    (schemeId: string, data: unknown)            => api.post(`/api/v1/admin/schemes/${schemeId}/gr`, data),
  updateGr: (grId: string, data: unknown)                => api.put(`/api/v1/admin/schemes/gr/${grId}`, data),
  removeGr: (grId: string)                               => api.delete(`/api/v1/admin/schemes/gr/${grId}`),
};
