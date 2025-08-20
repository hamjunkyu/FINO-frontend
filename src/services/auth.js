import apiClient from './api';

// 회원가입
export const signUp = (userData) => apiClient.post('/join', userData);

// 로그인 
// export const login = (loginData) => apiClient.post('/api/v1/sign/in', loginData);

// 리프레시 토큰 재발급
export const reissueToken = () => apiClient.post('/reissue');