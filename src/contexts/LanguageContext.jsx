// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';
import translations from '../translations'; // 번역 데이터 임포트

// 1. Context 생성
const LanguageContext = createContext();

// 2. Provider 컴포넌트 생성
export const LanguageProvider = ({ children }) => {
  // 초기 언어 설정 (브라우저 언어 또는 기본값 'ko' 사용)
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  // 언어 변경 함수
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang); // 로컬 스토리지에 저장하여 새로고침 시 유지
  };

  // 번역된 텍스트를 가져오는 함수
  const t = (key) => {
    return translations[language][key] || key; // 현재 언어의 번역 없으면 key 반환
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Custom Hook 생성 (컴포넌트에서 사용하기 편리하도록)
export const useLanguage = () => {
  return useContext(LanguageContext);
};