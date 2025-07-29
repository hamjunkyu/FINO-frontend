// src/components/SignUpPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function SignUpPage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoSignUp = () => {
    setIsLoading(true);
    // 실제 카카오 회원가입 로직 추가
    setTimeout(() => {
      setIsLoading(false);
      alert(t('kakao_signup_initiated'));
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // 실제 구글 회원가입 로직 추가
    setTimeout(() => {
      setIsLoading(false);
      alert(t('google_signup_initiated'));
    }, 1500);
  };

  const handleEmailSignUp = () => {
    setIsLoading(true);
    // 실제 이메일 회원가입 로직 추가
    setTimeout(() => {
      setIsLoading(false);
      alert(t('email_signup_initiated'));
      // navigate('/signup/email'); // 이메일 가입 상세 페이지로 이동
    }, 1500);
  };

  return (
    // 회원가입 페이지 전체 컨테이너
    <div className="relative flex flex-col justify-center items-center gap-5 w-screen max-w-full min-h-screen login-page-padding login-page-bg">
      {/* Logo */}
      <Link to="/" className="no-underline box-border">
        {/* FINO 로고 */}
        <span className="text-3xl font-bold text-brand-primary">FINO</span>
      </Link>

      {/* SignUpPageWrapper */}
      <div className="box-border flex flex-col items-center justify-center gap-3 max-w-[600px] w-full text-center break-keep font-sans">
        {/* Title */}
        <h1 className="text-gray-900 text-2xl font-bold leading-[160%] tracking-[-.8px] m-0">
          {t('signup_title_fino')} 
        </h1>

        {/* SignUpPageContainer */}
        <div className="w-full max-w-[600px] h-max flex flex-col gap-5 rounded-xl p-10 bg-white shadow-lg">
          {/* OAuth 버튼들 */}
          {/* 카카오 가입 */}
          <button
            onClick={handleKakaoSignUp}
            disabled={isLoading}
            className="bg-[#fedf32] border-none font-bold w-full h-10 flex justify-center items-center gap-4 rounded-sm py-2 px-0 text-gray-800 text-sm tracking-[-.084px] cursor-pointer hover:opacity-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="overflow-hidden">
              <g fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.00039 1.80005C4.52649 1.80005 0.900391 4.63473 0.900391 8.13165C0.900391 10.305 2.30259 12.2229 4.43919 13.3634L3.54009 16.6846C3.46089 16.979 3.79209 17.2128 4.04679 17.0425L7.98609 14.4116C8.31909 14.4442 8.65659 14.4623 9.00039 14.4623C13.4734 14.4623 17.1004 11.6277 17.1004 8.13165C17.1004 4.63473 13.4734 1.80005 9.00039 1.80005Z" fill="#3C1E1E"></path>
              </g>
            </svg>
            <div>{t('signup_with_kakao')}</div> 
          </button>

          {/* 구글 가입 */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="font-bold w-full h-10 flex justify-center items-center gap-4 rounded-sm border border-gray-300 py-2 px-0 text-gray-800 text-sm tracking-[-.084px] cursor-pointer transition-colors duration-200 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" className="overflow-hidden">
                <path fill="#4285F4" d="M23.841 12.267c0-.987-.08-1.707-.255-2.454H12.232v4.454h6.665c-.134 1.106-.86 2.773-2.472 3.893l-.023.149 3.59 2.76.249.024c2.284-2.093 3.6-5.173 3.6-8.826z"></path>
                <path fill="#34A853" d="M12.233 24c3.265 0 6.006-1.067 8.008-2.907l-3.816-2.933c-1.021.707-2.392 1.2-4.192 1.2-3.198 0-5.912-2.093-6.88-4.987l-.142.012-3.733 2.867-.048.135A12.094 12.094 0 0 0 12.233 24z"></path>
                <path fill="#FBBC05" d="M5.353 14.373A7.336 7.336 0 0 1 4.95 12c0-.827.148-1.627.39-2.373l-.007-.16-3.78-2.912-.123.058A11.936 11.936 0 0 0 .14 12c0 1.933.47 3.76 1.29 5.387l3.923-3.014z"></path>
                <path fill="#EB4335" d="M12.233 4.64c2.27 0 3.802.973 4.675 1.787l3.413-3.307C18.225 1.187 15.498 0 12.233 0 7.503 0 3.418 2.693 1.43 6.613l3.91 3.014c.98-2.894 3.695-4.987 6.893-4.987z"></path>
            </svg>
            <div>{t('signup_with_google')}</div>
          </button>

          {/* 또는 구분선 */}
          <div className="relative block">
            <div className="absolute w-full h-1/2 border-b border-gray-300"></div>
            <div className="relative ml-32 mr-32 bg-white block">{t('or')}</div>
          </div>

          {/* 이메일로 가입하기 */}
          <button
            onClick={handleEmailSignUp}
            disabled={isLoading}
            className="font-bold w-full h-10 flex justify-center items-center gap-4 rounded-sm border border-gray-300 py-2 px-0 bg-brand-primary text-white text-sm tracking-[-.084px] cursor-pointer hover:opacity-90"
          >
            {t('signup_with_email')}
          </button>

          {/* 이미 가입하셨나요? 로그인하기 */}
          <div className="flex justify-center gap-1 tracking-[-.7px]"> 
            <span className="text-gray-700">
              {t('already_have_account')}
            </span>
            <Link to="/login" className="text-brand-primary no-underline ml-1 hover:underline">
              {t('login_here')}
            </Link>
          </div>
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300/50 flex justify-center items-center z-overlay">
          <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" width="64" height="64" stroke="#000">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".25" cx="18" cy="18" r="18"></circle>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite"></animateTransform>
                </path>
              </g>
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
