import { api } from './client';

export const eligibilityApi = {
  createQuestion: (data: unknown)                       => api.post('/api/v1/admin/eligibility/questions', data),
  updateQuestion: (questionId: string, data: unknown)   => api.put(`/api/v1/admin/eligibility/questions/${questionId}`, data),
  removeQuestion: (questionId: string)                  => api.delete(`/api/v1/admin/eligibility/questions/${questionId}`),
};
