import apiClient from './api';

// 사용자 위치 정보 수정
export const updateUserLocation = (userId, locationData) =>
  apiClient.put(`/api/v1/users/${userId}/location`, locationData);

// 위치 인증
export const authenticateLocation = (locationData) =>
  apiClient.post('/api/v1/auth/location', locationData); // locationData: { userId, latitude, longitude }