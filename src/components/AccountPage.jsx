// src/components/AccountPage.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClose = () => {
    navigate('/'); // 메인 페이지로 돌아가기
  };

  const handleProfileChange = () => {
    // 프로필 사진 변경 로직
    alert('프로필 사진 변경 기능은 아직 구현되지 않았습니다.');
  };

  const handlePasswordReset = () => {
    // 비밀번호 초기화 로직
    navigate('/account/forgot-password'); // 비밀번호 초기화 페이지로 이동
  };

  const handleDeleteAccount = () => {
    // 계정 삭제 로직
    if (window.confirm(t('account_confirm_delete'))) {
      alert('계정 삭제 기능은 아직 구현되지 않았습니다.');
    }
  };

  return (
    <div className="w-screen h-screen p-6 flex flex-col justify-start items-center bg-neutral-Gray-100 font-sans">
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        aria-label={t('close')}
        className="my-0 mr-5 ml-auto border-none p-2.5 text-gray-700 hover:text-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-7 h-7">
          <path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
        </svg>
      </button>

      {/* 계정 정보 컨테이너 */}
      <div className="max-w-[525px] min-w-[500px] flex flex-col items-center rounded-xl my-auto mx-0 p-10 bg-white shadow-lg">
        {/* 프로필 사진 */}
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocLOl6kHYZ5ZCT7P03XRehqy7NpC1iwl6H3Q25oYYmm8XY_WeA=s96-c" // 실제 사용자 프로필 이미지 URL로 변경
          alt="profile"
          className="w-27 h-27 rounded-full border border-gray-300 mb-5 object-cover" 
        />
        {/* 프로필 사진 변경 */}
        <button
          className="flex items-center space-x-2 px-4 py-2 mb-6 bg-neutral-Gray-100 text-gray-700 text-14 font-semibold rounded-md tracking-[-.8px] cursor-pointer hover:bg-gray-200"
          onClick={handleProfileChange}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
            <path fill="currentColor" d="M490.3 64.71c-12.5-12.5-32.75-12.5-45.25 0L331.4 178.6c-12.5 12.5-12.5 32.75 0 45.25l24.75 24.75c12.5 12.5 32.75 12.5 45.25 0l105.4-105.4c12.5-12.5 12.5-32.75 0-45.25L490.3 64.71zm-215.1 184.9L30.63 473.2C24.38 479.5 16.19 482.6 8 482.6S-0.375 479.5-6.625 473.2C-12.88 466.1-12.88 456.9-6.625 450.6L246.7 187.3C253 181.1 261.2 178 269.4 178s16.38 3.125 22.62 9.375l24.75 24.75c12.5 12.5 12.5 32.75 0 45.25L275.2 249.6zM207.2 289.4c-12.5-12.5-32.75-12.5-45.25 0L8.75 442.7C2.5 449 2.5 458.2 8.75 464.4L35 490.7c6.25 6.25 14.44 9.375 22.62 9.375s16.38-3.125 22.62-9.375L207.2 334.6c12.5-12.5 12.5-32.75 0-45.25z"/>
          </svg>
          <span>{t('account_profile_change')}</span>
        </button>

        {/* 이메일 정보 */}
        <div className="flex justify-start items-center flex-wrap gap-5 w-full mt-4 font-medium text-gray-800 text-16 leading-[160%] tracking-[-.32px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="w-5 h-5">
            <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M4 6l8 6 8-6"></path>
          </svg>
          <div className="text-gray-700">{t('account_email_label')}</div>
          <div className="ml-auto text-center w-56 font-semibold">
            hamjunkyu2882@gmail.com {/* 실제 사용자 이메일로 변경 */}
          </div>
        </div>

        {/* 비밀번호 정보 */}
        <div className="flex justify-start items-center flex-wrap gap-5 w-full mt-4 font-medium text-gray-800 text-16 leading-[160%] tracking-[-.32px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="w-5 h-5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <div className="text-gray-700">{t('account_password_label')}</div>
          {/* 비밀번호 초기화 */}
          <button
            className="ml-auto text-center w-56 flex justify-center items-center gap-1 py-2 px-3 border-none rounded-sm bg-neutral-Gray-100 text-14 cursor-pointer hover:bg-gray-100"
            onClick={handlePasswordReset}
          >
            {t('account_password_reset')}
          </button>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px mt-8 mx-0 mb-3 bg-gray-300" />

        {/* 계정 삭제 */}
        <div className="w-full items-start">
          <div className="text-gray-900 text-16 leading-[160%] tracking-[-.32px] mt-5 mr-auto mb-0 ml-0 font-semibold">
            {t('account_delete_title')}
          </div>
          <div className="mt-2 mx-0 mb-4 text-gray-700 text-xs font-medium leading-relaxed tracking-[-.32px]">
            {t('account_delete_desc')}
          </div>
          <button
            onClick={handleDeleteAccount}
            className="bg-delete-button-bg text-red-500 w-56 ml-auto flex justify-center items-center gap-1 py-2 px-3 border-none rounded-sm leading-relaxed tracking-[-.32px] cursor-pointer hover:bg-red-600"
          >
            {t('account_delete_button')}
          </button>     
        </div>
      </div>
    </div>
  );
}

export default AccountPage;