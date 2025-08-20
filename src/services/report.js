import apiClient from './api';

// 보고서 전체 조회
export const getReports = () => apiClient.get('/api/v1/reports');

// 특정 월 보고서 조회
export const getReportByMonth = (reportMonth) =>
  apiClient.get(`/api/v1/reports/${reportMonth}`);

// 보고서 생성
export const createReport = () => apiClient.post('/api/v1/reports');

// 보고서 삭제
export const deleteReport = (reportId) =>
  apiClient.delete(`/api/v1/reports/${reportId}`);