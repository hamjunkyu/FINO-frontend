// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError('');
    setPasswordError('');

    let isValid = true;
    if (!email) {
      setEmailError(t('email_required'));
      isValid = false;
    }
    if (!password) {
      setPasswordError(t('password_required'));
      isValid = false;
    }

    if (isValid) {
      // 실제 로그인 로직 추가
      setTimeout(() => {
        setIsLoading(false);
        if (email === 'test@example.com' && password === 'password123') {
          alert(t('login_success'));
          // 로그인 성공 후 리다이렉션 (예: 홈 페이지)
          // navigate('/');
        } else {
          alert(t('login_fail'));
        }
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  return (
    // 로그인 페이지 전체 컨테이너
    <div className="relative flex flex-col justify-center items-center gap-5 w-screen max-w-full min-h-screen login-page-padding login-page-bg">
      {/* Logo */}
      <Link to="/" className="no-underline box-border">
        {/* FINO 로고 */}
        <span className="text-3xl font-bold text-brand-primary">FINO</span>
      </Link>

      {/* LogInPageContainer */}
      <div className="box-border flex flex-col items-center justify-center gap-2 max-w-[600px] w-full text-center break-keep font-sans">
        {/* Title */} 
        <h1 className="text-2xl font-bold leading-[160%] tracking-[-.48px] text-gray-900 m-0">
          {t('login_title_fino')}
        </h1>
        {/* Desc */}
        <h2 className="text-14 font-medium leading-[160%] tracking-[-.28px] text-gray-700 mb-8">
          {t('login_desc_fino')} 
        </h2>

        {/* LogInFormContainer */}
        <div className="w-full max-w-[600px] h-max flex flex-col gap-3.5 rounded-xl p-10 bg-white shadow-lg">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Input */}
            <span className="w-full">
              {/* AuthInputContainer */}
              <div className="flex flex-col items-start gap-2 w-full">
                {/* Title */}
                <div className="text-gray-900 text-15 font-medium leading-[160%] tracking-[-.32px]">
                  <label htmlFor="email" className="cursor-default">{t('email_address')}</label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                {/* InputWrapper */}
                <div className="flex items-center w-full gap-2.5 rounded-md border border-gray-300 login-input-padding">
                  <input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`flex-1 h-5 border-none overflow-clip py-0.25 px-0.5 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-brand-primary shadow-input-focus ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {emailError && ( // 이메일 형식 X
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                      className="w-4.5 h-4.5 overflow-visible box-content text-red-500">
                      <path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"></path>
                    </svg>
                  )}
                  {!emailError && email && ( // 이메일 형식 O
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                      className="w-4.5 h-4.5 overflow-visible box-content text-green-500">
                      <path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"></path>
                    </svg>
                  )}
                </div>
                <p className={`block h-4 m-0 ml-1 text-red-500 text-sm font-medium leading-3 ${emailError ? 'visible' : 'invisible'}`}>
                  {emailError ? t('email_error') : ''}
                </p>
              </div>
            </span>

            {/* Password Input */}
            <span className="w-full">
              {/* AuthInputContainer */}
              <div className="flex flex-col items-start gap-2 w-full">
                {/* Title */}
                <div className="text-gray-900 text-15 font-medium leading-[160%] tracking-[-.32px]">
                  <label htmlFor="password" className="cursor-default">{t('password')}</label>
                  <span className="text-red-500 text-sm">*</span>
                </div>
                {/* InputWrapper */}
                <div className="flex items-center w-full gap-2.5 rounded-md border border-gray-300 login-input-padding">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('enter_password_placeholder')}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                    }}
                    className={`flex-1 h-5 border-none overflow-clip py-0.25 px-0.5 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-brand-primary shadow-input-focus ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="bg-transparent border-none cursor-pointer p-0" // absolute right-3 추가
                  >
                    <svg className="w-4.5 h-4.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      {/* 눈 */}
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      {/* 눈 바깥 */} 
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057 .458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      {/* 사선 (비밀번호 숨김) */}
                      {!showPassword && (
                        <path fill="currentColor" stroke="none" d="M1 1 L21 21 L22 20 L2 0 Z" />
                      )}
                    </svg>
                  </button>
                </div>
                {/* passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p> */}
              </div>
            </span>

            {/* 비밀번호 찾기 */}
            <div className="block text-gray-700 leading-6 text-sm text-center tracking-[-.8px]">
              {t('forgot_password')}
              <Link to="/account/forgot-password" className="text-brand-primary no-underline ml-1 hover:underline">
                {t('reset_password')}
              </Link>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 flex items-center justify-center rounded-sm text-sm font-bold tracking-[-.084px] 
                          cursor-pointer text-center py-1 px-2 transition-colors duration-200 overflow-ellipsis whitespace-nowrap overflow-hidden
                        bg-brand-primary text-white border-none hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                t('login')
              )}
            </button>
          </form>

          {/* 또는 구분선 */}
          <div className="flex items-center gap-15 text-gray-600 leading-6 text-center text-sm tracking-[-.084px]">
            <div className="flex-1 m-0 flex-grow border border-gray-300 block"></div>
            <div className="">{t('or')}</div>
            <div className="flex-1 m-0 flex-grow border border-gray-300 block"></div>
          </div>

          {/* OAuth 버튼들 */}
          {/* 카카오 로그인 */}
          <button className="bg-[#fedf32] border-none font-bold w-full h-10 flex justify-center items-center gap-4 rounded-sm py-2 px-0 text-gray-800 text-sm tracking-[-.084px] cursor-pointer hover:opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="overflow-hidden">
              <g fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.00039 1.80005C4.52649 1.80005 0.900391 4.63473 0.900391 8.13165C0.900391 10.305 2.30259 12.2229 4.43919 13.3634L3.54009 16.6846C3.46089 16.979 3.79209 17.2128 4.04679 17.0425L7.98609 14.4116C8.31909 14.4442 8.65659 14.4623 9.00039 14.4623C13.4734 14.4623 17.1004 11.6277 17.1004 8.13165C17.1004 4.63473 13.4734 1.80005 9.00039 1.80005Z" fill="#3C1E1E"></path> {/* 카카오 색상으로 변경 */}
              </g>
            </svg>
            <div>{t('continue_with_kakao')}</div>
          </button>
          {/* 구글 로그인 */}
          <button className="font-bold w-full h-10 flex justify-center items-center gap-4 rounded-sm border border-gray-300 py-2 px-0 text-gray-800 text-sm tracking-[-.084px] cursor-pointer transition-colors duration-200 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" className="overflow-hidden">
              <path fill="#4285F4" d="M23.841 12.267c0-.987-.08-1.707-.255-2.454H12.232v4.454h6.665c-.134 1.106-.86 2.773-2.472 3.893l-.023.149 3.59 2.76.249.024c2.284-2.093 3.6-5.173 3.6-8.826z"></path>
              <path fill="#34A853" d="M12.233 24c3.265 0 6.006-1.067 8.008-2.907l-3.816-2.933c-1.021.707-2.392 1.2-4.192 1.2-3.198 0-5.912-2.093-6.88-4.987l-.142.012-3.733 2.867-.048.135A12.094 12.094 0 0 0 12.233 24z"></path>
              <path fill="#FBBC05" d="M5.353 14.373A7.336 7.336 0 0 1 4.95 12c0-.827.148-1.627.39-2.373l-.007-.16-3.78-2.912-.123.058A11.936 11.936 0 0 0 .14 12c0 1.933.47 3.76 1.29 5.387l3.923-3.014z"></path>
              <path fill="#EB4335" d="M12.233 4.64c2.27 0 3.802.973 4.675 1.787l3.413-3.307C18.225 1.187 15.498 0 12.233 0 7.503 0 3.418 2.693 1.43 6.613l3.91 3.014c.98-2.894 3.695-4.987 6.893-4.987z"></path>
            </svg>
            <div>{t('continue_with_google')}</div>
          </button>

          {/* 처음 오셨나요? 가입하기 */}
          <div className="text-gray-700 leading-6 text-center text-sm font-medium tracking-[-.8px] block">
            {t('first_time_here')}
            <Link to="/signup" className="text-[#7321b2] no-underline ml-1 hover:underline">
              {t('sign_up')}
            </Link>
          </div>
        </div>  
      </div>     
    </div>
  )
}     

export default LoginPage;
