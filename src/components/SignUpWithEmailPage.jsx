// src/components/SignUpWithEmailPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function SignUpWithEmailPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');
    // 약관 동의 상태
    const [termsConsent, setTermsConsent] = useState(false); // 이용약관 동의
    const [privacyConsent, setPrivacyConsent] = useState(false); // 개인정보처리방침 동의
    const [locationConsent, setLocationConsent] = useState(false); // 위치 정보 제공 동의
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    // 비밀번호 표시/숨김 상태
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = t('name_required');
        if (!gender) newErrors.gender = t('gender_required');
        if (!email) newErrors.email = t('email_required');
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('email_error');
        if (!password) newErrors.password = t('password_required');
        else if (password.length < 6) newErrors.password = t('password_min_length');
        if (!confirmPassword) newErrors.confirmPassword = t('confirm_password_required');
        else if (password !== confirmPassword) newErrors.confirmPassword = t('passwords_do_not_match');
        if (!ageGroup) newErrors.ageGroup = t('age_group_required');
        if (!occupation) newErrors.occupation = t('occupation_required');
        if (!address.trim()) newErrors.address = t('address_required');
        
        // 필수 약관 동의 유효성 검사 
        if (!termsConsent) newErrors.termsConsent = true; // true or false
        if (!privacyConsent) newErrors.privacyConsent = true;
        if (!locationConsent) newErrors.locationConsent = true;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                alert(t('signup_completed'));
                navigate('/login');
            }, 2000);
        }
    };

    // 공통 오류 메시지 컴포넌트 
    const ErrorMessage = ({ errorText }) => (
        <p className={`block h-4 m-0 mt-1.5 ml-1 text-red-500 text-xs font-medium leading-3 text-left ${errorText ? 'visible' : 'invisible'}`}>
            {errorText || ''}
        </p>
    );

    return (
        <div className="relative flex flex-col justify-center items-center gap-5 w-screen max-w-full min-h-screen login-page-padding login-page-bg">
            <Link to="/" className="no-underline">
                <span className="text-3xl font-bold text-brand-primary">FINO</span>
            </Link>

            <div className="flex flex-col items-center justify-center gap-3 max-w-[600px] w-full text-center break-keep font-sans">
                <h1 className="text-gray-900 text-2xl font-bold leading-[160%] tracking-[-.8px] m-0">
                    {t('signup_email_title')}
                </h1>
                {/* SignUpContainer */}
                <div className="w-full max-w-[600px] h-max flex flex-col gap-5 rounded-xl p-10 bg-white tracking-[-.5px] shadow-container">
                    <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
                        {/* 성명 입력 필드 */}
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="name" className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('name_label')}
                            </label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                className={`w-full login-input-padding border ${errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-brand-primary'} rounded-md focus:outline-none`}
                                placeholder={t('name_placeholder')} autoComplete="name"
                            />
                            <ErrorMessage errorText={errors.name} />
                        </div>

                        {/* 성별 선택 버튼 */}
                        <div className="flex flex-col gap-0.5">
                            <label className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('gender_label')}
                            </label> 
                            <div className="flex gap-4 ml-1">
                                <label htmlFor="gender-male" className="flex items-center cursor-pointer">
                                    <input type="radio" id="gender-male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}
                                        className="mr-2 accent-brand-primary"
                                    />{t('gender_male')}
                                </label>
                                <label htmlFor="gender-female" className="flex items-center cursor-pointer">
                                    <input type="radio" id="gender-female" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}
                                        className="mr-2 accent-brand-primary"
                                    />{t('gender_female')}
                                </label>
                            </div>
                            <ErrorMessage errorText={errors.gender} />
                        </div>

                        {/* 이메일 입력 필드 */}
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="email" className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('email_address')}
                            </label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className={`w-full login-input-padding border ${errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-brand-primary'} rounded-md focus:outline-none`}
                                placeholder="example@email.com" autoComplete="username"
                            />
                            <ErrorMessage errorText={errors.email} />
                        </div>

                        {/* 비밀번호 입력 필드 */}
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="password" className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('password')}
                            </label>
                            <div className={`flex items-center w-full gap-2.5 rounded-md border login-input-padding ${errors.password ? 'border-red-500' : 'border-gray-300 focus-within:border-brand-primary'}`}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1 h-5 border-none overflow-clip py-0.25 px-0.5 text-gray-800 placeholder:text-gray-500 focus:outline-none"
                                    placeholder={t('enter_password_placeholder')}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="bg-transparent border-none cursor-pointer p-0"
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
                            <ErrorMessage errorText={errors.password} />
                        </div>

                        {/* 비밀번호 확인 입력 필드 */}
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('confirm_password')}
                            </label>
                            <div className={`flex items-center w-full gap-2.5 rounded-md border login-input-padding ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus-within:border-brand-primary'}`}>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="flex-1 h-5 border-none overflow-clip py-0.25 px-0.5 text-gray-800 placeholder:text-gray-500 focus:outline-none"
                                    placeholder={t('enter_confirm_password_placeholder')}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="bg-transparent border-none cursor-pointer p-0"
                                >
                                    <svg className="w-4.5 h-4.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        {/* 눈 */}
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        {/* 눈 바깥 */}
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057 .458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        {/* 사선 (비밀번호 숨김) */}
                                        {!showConfirmPassword && (
                                            <path fill="currentColor" stroke="none" d="M1 1 L21 21 L22 20 L2 0 Z" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                            <ErrorMessage errorText={errors.confirmPassword} />
                        </div>

                        {/* 연령대 선택 필드 */}
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="ageGroup" className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('age_group_label')}
                            </label> 
                            <select id="ageGroup" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}
                                className={`w-full login-input-padding bg-white border ${errors.ageGroup ? 'border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-brand-primary'} rounded-md focus:outline-none`}
                            >
                                <option value="">{t('age_group_placeholder')}</option>
                                <option value="10s">{t('age_group_10s')}</option>
                                <option value="20s">{t('age_group_20s')}</option>
                                <option value="30s">{t('age_group_30s')}</option>
                                <option value="40s">{t('age_group_40s')}</option>
                                <option value="50s">{t('age_group_50s')}</option>
                                <option value="60s+">{t('age_group_60s_plus')}</option>
                            </select>
                            <ErrorMessage errorText={errors.ageGroup} />
                        </div>

                        {/* 직업 선택 필드 */}
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="occupation" className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('occupation_label')}
                            </label>
                            <select id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)}
                                className={`w-full login-input-padding bg-white border ${errors.occupation ? 'border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-brand-primary'} rounded-md focus:outline-none`}
                            >
                                <option value="">{t('occupation_placeholder')}</option>
                                <option value="student">{t('occupation_student')}</option>
                                <option value="office-worker">{t('occupation_office_worker')}</option>
                                <option value="teacher">{t('occupation_teacher')}</option>
                                <option value="professional">{t('occupation_professional')}</option>
                                <option value="freelancer">{t('occupation_freelancer')}</option>
                                <option value="self-employed">{t('occupation_self_employed')}</option>
                                <option value="homemaker">{t('occupation_homemaker')}</option>
                                <option value="etc">{t('occupation_etc')}</option>
                            </select>
                            <ErrorMessage errorText={errors.occupation} />
                        </div>

                        {/* 주소 입력 필드 */}
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="address" className="block text-gray-700 text-15 font-semibold mb-1.5 text-left">
                                {t('address_label')}
                            </label>
                            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)}
                                className={`w-full login-input-padding border ${errors.address ? 'border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-brand-primary'} rounded-md focus:outline-none`}
                                placeholder={t('address_placeholder')} autoComplete="street-address"
                            />
                            <ErrorMessage errorText={errors.address} />
                        </div>

                        {/* 약관 동의 섹션 (회원가입 버튼 위에 배치) */}
                        <div className="mt-2 flex flex-col gap-2">
                            {/* 이용약관 동의 */}
                            <div className="flex items-start">
                                <input type="checkbox" id="termsConsent" checked={termsConsent} onChange={(e) => setTermsConsent(e.target.checked)}
                                    className="w-4 h-4 mt-1 mr-2 accent-brand-primary"
                                />
                                <label htmlFor="termsConsent"
                                    className={`text-sm text-gray-700 text-left cursor-pointer pb-0.5 border-b-1 ${errors.termsConsent ? 'border-red-500' : 'border-transparent'}`}
                                >
                                    <span className="mr-1 font-semibold text-brand-primary">[{t('required')}]</span> 
                                    {t('terms_of_service_consent')}
                                </label>
                            </div>

                            {/* 개인정보처리방침 동의 */}
                            <div className="flex items-start">
                                <input type="checkbox" id="privacyConsent" checked={privacyConsent} onChange={(e) => setPrivacyConsent(e.target.checked)}
                                    className="w-4 h-4 mt-1 mr-2 accent-brand-primary"
                                />
                                <label htmlFor="privacyConsent"
                                    className={`text-sm text-gray-700 text-left cursor-pointer pb-0.5 border-b-1 ${errors.privacyConsent ? 'border-red-500' : 'border-transparent'}`}
                                >
                                    <span className="mr-1 font-semibold text-brand-primary">[{t('required')}]</span> 
                                    {t('privacy_policy_consent')}
                                </label>
                            </div>

                            {/* 위치 정보 제공 동의 */}
                            <div className="flex flex-col items-start">
                                <div className="flex items-start">
                                    <input type="checkbox" id="locationConsent" checked={locationConsent} onChange={(e) => setLocationConsent(e.target.checked)}
                                        className="w-4 h-4 mt-1 mr-2 accent-brand-primary"
                                    />
                                    <label htmlFor="locationConsent"
                                        className={`text-sm text-gray-700 text-left cursor-pointer pb-0.5 border-b-1 ${errors.locationConsent ? 'border-red-500' : 'border-transparent'}`}
                                    >
                                        <span className="mr-1 font-semibold text-brand-primary">[{t('required')}]</span> 
                                        {t('location_info_consent')}
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 ml-5.5">
                                    {t('location_info_desc')}
                                </p>
                            </div>
                        </div>

                        {/* 회원가입 버튼 */}
                        <button type="submit" disabled={isLoading}
                            className="w-full h-10 mt-6 flex justify-center items-center rounded-sm bg-brand-primary text-white text-sm font-bold tracking-[-.084px] cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
                        >
                            {isLoading ? t('loading') : t('signup_button')}
                        </button>
                    </form>
                </div>
            </div>

            {/* 로딩 오버레이 */}
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-300/50 flex justify-center items-center z-[1000]">
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

export default SignUpWithEmailPage;
