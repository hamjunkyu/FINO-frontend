import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import '../App.css';

// Portal 컴포넌트
function DropdownPortal({ children, isOpen, targetId }) {
  if (!isOpen) return null;
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return null;
  return createPortal(children, targetElement);
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'features' 또는 'solutions'
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1300); // 데스크톱 여부 상태

  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null); // 모바일 메뉴를 닫을 때 드롭다운도 닫기
  };

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleDocumentClick = (e) => {
    // 데스크톱일 때만 외부 클릭으로 드롭다운 닫기
    if (isDesktop && activeDropdown && !e.target.closest('.header-dropdown-trigger') && !e.target.closest('.header-dropdown-container')) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1300);
      if (window.innerWidth >= 1300 && isMenuOpen) {
        setIsMenuOpen(false); // 데스크톱으로 전환 시 모바일 메뉴 닫기
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [activeDropdown, isMenuOpen, isDesktop]);

  return (
    <header className="fixed top-0 z-999 w-full h-header-h flex flex-row justify-start items-center px-header-px bg-white shadow-header">
      {/* Logo */}
      <a href="/" aria-current="page" className="flex items-center no-underline">
        <span className="text-2xl font-bold ml-2 text-brand-primary">FINO</span>
      </a>

      {/* Hamburger 버튼 */}
      <button
        type="button"
        onClick={toggleMenu}
        className="desktop:hidden flex bg-none border-none ml-auto p-0 cursor-pointer text-gray-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" aria-labelledby="hamburger" className="w-6 h-6">
          <g fill="currentColor">
            <path d="M1.125 13.375H16.875M1.125 7.375H16.875M1.125 1.375H16.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </g>
        </svg>
      </button>

      {/* Navbar */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} 
                        ${isMenuOpen ? 'max-h-auto overflow-y-scroll' : 'overflow-hidden'}
                        flex-1 absolute h-auto ml-0 top-header-h left-0 w-full p-0 bg-white shadow-lg
                        desktop:flex desktop:relative desktop:h-full desktop:ml-logo-nav-ml-desktop desktop:top-0 desktop:shadow-none`}>
        {/* List */}
        <ul className="list-none w-full flex justify-start m-0 flex-col items-start px-[16px] py-[10px] gap-nav-gap-mobile
                       desktop:flex-row desktop:items-center desktop:p-0 desktop:gap-nav-gap-desktop">
          {/* 기능소개 */}
          <li className="group flex flex-col w-full relative justify-start items-start nav-list-item-padding
                         desktop:flex-row desktop:w-auto desktop:justify-center desktop:items-center">
            <a className="no-underline flex flex-row justify-center items-center text-15 text-gray-800 font-medium cursor-pointer header-dropdown-trigger"
               role="button"
               onClick={(e) => { e.stopPropagation(); handleDropdownClick('features'); }}>
              {t('function_introduction')} ▼
            </a>
            {/* 기능소개 드롭다운 (desktop 미만) */}
            {!isDesktop && activeDropdown === 'features' && (
              <ul className="static w-full border-none z-1000 mt-0.5 mx-0 mb-0 rounded-sm p-0 list-none bg-white text-14 text-gray-900">
                <li className="group/dropdown-item whitespace-">
                  <a href="/design" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('design')}</div>
                    </div>
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/database" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="database" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M448 80V128C448 172.2 347.7 208 224 208C100.3 208 0 172.2 0 128V80C0 35.82 100.3 0 224 0C347.7 0 448 35.82 448 80zM393.2 214.7C413.1 207.3 433.1 197.8 448 186.1V288C448 332.2 347.7 368 224 368C100.3 368 0 332.2 0 288V186.1C14.93 197.8 34.02 207.3 54.85 214.7C99.66 230.7 159.5 240 224 240C288.5 240 348.3 230.7 393.2 214.7V214.7zM54.85 374.7C99.66 390.7 159.5 400 224 400C288.5 400 348.3 390.7 393.2 374.7C413.1 367.3 433.1 357.8 448 346.1V432C448 476.2 347.7 512 224 512C100.3 512 0 476.2 0 432V346.1C14.93 357.8 34.02 367.3 54.85 374.7z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('database')}</div>
                    </div>
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/logic" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bolt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M240.5 224H352C365.3 224 377.3 232.3 381.1 244.7C386.6 257.2 383.1 271.3 373.1 280.1L117.1 504.1C105.8 513.9 89.27 514.7 77.19 505.9C65.1 497.1 60.7 481.1 66.59 467.4L143.5 288H31.1C18.67 288 6.733 279.7 2.044 267.3C-2.645 254.8 .8944 240.7 10.93 231.9L266.9 7.918C278.2-1.92 294.7-2.669 306.8 6.114C318.9 14.9 323.3 30.87 317.4 44.61L240.5 224z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('logic')}</div>
                    </div>
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/templates" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('templates')}</div>
                    </div>
                  </a>
                </li>
              </ul>
            )}
          </li>
          {/* 솔루션 */}
          <li className="group flex flex-col w-full relative justify-start items-start nav-list-item-padding
                         desktop:flex-row desktop:w-auto desktop:justify-center desktop:items-center">
            <a className="no-underline flex flex-row justify-center items-center text-15 text-gray-800 font-medium cursor-pointer header-dropdown-trigger"
               role="button"
               onClick={(e) => { e.stopPropagation(); handleDropdownClick('solutions'); }}>
              {t('solutions')} ▼
            </a>
            {/* 솔루션 드롭다운 (desktop 미만) */}
            {!isDesktop && activeDropdown === 'solutions' && (
              <ul className="static w-full border-none z-1000 mt-0.5 mx-0 mb-0 rounded-sm p-0 list-none bg-white text-14 text-gray-900">
                <li>
                  <div className="min-w-[120px] dropdown-item-padding font-bold text-14 text-gray-600 cursor-default">
                    {t('customer_cases')}
                  </div>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/inventory-management" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:text-brand-primary
                                desktop:w-auto">
                    {t('inventory_management')}
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/purchase-management" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:text-brand-primary
                     desktop:w-auto">
                    {t('purchase_management')}
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/distributor-management" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:text-brand-primary
                     desktop:w-auto">
                    {t('distributor_management')}
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/landingpages" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary
                     desktop:w-auto">
                    {t('landing_page')}
                  </a>
                </li>
              </ul>
            )}
          </li>
          {/* 템플릿 (개별 링크) */}
          <li className="flex w-full justify-start items-center nav-list-item-padding 
                         desktop:w-auto desktop:justify-center">
            <a href="/solutions/templates" 
               className="no-underline text-gray-800 text-15 font-medium block transition-colors duration-200 hover:text-brand-primary">
              {t('templates')}
            </a>
          </li>
          {/* 가격안내 */}
          <li className="flex w-full justify-start items-center nav-list-item-padding 
                         desktop:w-auto desktop:justify-center">
            <a href="/pricing"
               className="no-underline text-gray-800 text-15 font-medium block transition-colors duration-200 hover:text-brand-primary">
              {t('price_info')}
            </a>
          </li>
          {/* 사용가이드 (외부 링크) */}
          <li className="flex w-full justify-start items-center nav-list-item-padding 
                         desktop:w-auto desktop:justify-center">
            <a href="https://docs.waveon.io/ko" target="_blank" 
               className="no-underline text-gray-800 text-15 font-medium block transition-colors duration-200 hover:text-brand-primary">
              {t('guides')}
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 ml-10px align-middle">
                <path fill="currentColor" d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z"></path>
              </svg>
            </a>
          </li>
          {/* 블로그 */}
          <li className="flex w-full justify-start items-center nav-list-item-padding 
                         desktop:w-auto desktop:justify-center">
            <a href="/blog"
               className="no-underline text-gray-800 text-15 font-medium block transition-colors duration-200 hover:text-brand-primary">
              {t('blog')}
            </a>
          </li>
          {/* 로그인 버튼 */}
          <Link to="/login" className="no-underline flex w-full justify-start ml-0 p-0 items-center text-brand-primary bg-white rounded-md
                                       desktop:w-auto desktop:justify-center desktop:ml-auto desktop:nav-list-item-padding">
            <div className="w-full h-10.5 px-4 leading-10 text-center text-15 font-medium rounded-md 
                            cursor-pointer transition-colors duration-200 bg-white text-gray-800 border border-gray-300
                            hover:bg-gray-100 hover:border-gray-200">
              {t('login')}
            </div>
          </Link>
          {/* 회원가입 버튼 */}
          <Link to="/signup" className="no-underline flex w-full justify-start ml-0 p-0 items-center text-white bg-brand-primary rounded-md
                                       desktop:w-auto desktop:justify-center desktop:ml-3 desktop:nav-list-item-padding">
            <div className="w-full h-10.5 px-4 leading-10 text-center text-15 font-medium rounded-md 
                            cursor-pointer transition-colors duration-200 bg-new-gradient text-white border-none
                            hover:opacity-90">
              {t('signup')}
            </div>
          </Link>
        </ul>
      </nav>

      {/* 드롭다운 (desktop 이상) */}
      {isDesktop && (
        <>
          <DropdownPortal isOpen={activeDropdown === 'features'} targetId="dropdown-root">
            {/* 기능소개 드롭다운 */}
            <div className={`header-dropdown-container
                              absolute z-1000 top-dropdown-h left-[calc(theme(spacing.header-px)_+_67px_+_theme(spacing.logo-nav-ml-desktop))] w-auto shadow-lg border border-gray-300 rounded-sm bg-white`}>
              <ul className="list-none p-0 m-0 text-14 text-gray-900">
                <li className="group/dropdown-item">
                  <a href="/design" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('design')}</div>
                    </div>
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/database" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="database" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M448 80V128C448 172.2 347.7 208 224 208C100.3 208 0 172.2 0 128V80C0 35.82 100.3 0 224 0C347.7 0 448 35.82 448 80zM393.2 214.7C413.1 207.3 433.1 197.8 448 186.1V288C448 332.2 347.7 368 224 368C100.3 368 0 332.2 0 288V186.1C14.93 357.8 34.02 367.3 54.85 214.7C99.66 230.7 159.5 240 224 240C288.5 240 348.3 230.7 393.2 214.7V214.7zM54.85 374.7C99.66 390.7 159.5 400 224 400C288.5 400 348.3 390.7 393.2 374.7C413.1 367.3 433.1 357.8 448 346.1V432C448 476.2 347.7 512 224 512C100.3 512 0 476.2 0 432V346.1C14.93 357.8 34.02 367.3 54.85 374.7z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('database')}</div>
                    </div>
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/logic" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bolt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M240.5 224H352C365.3 224 377.3 232.3 381.1 244.7C386.6 257.2 383.1 271.3 373.1 280.1L117.1 504.1C105.8 513.9 89.27 514.7 77.19 505.9C65.1 497.1 60.7 481.1 66.59 467.4L143.5 288H31.1C18.67 288 6.733 279.7 2.044 267.3C-2.645 254.8 .8944 240.7 10.93 231.9L266.9 7.918C278.2-1.92 294.7-2.669 306.8 6.114C318.9 14.9 323.3 30.87 317.4 44.61L240.5 224z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('logic')}</div>
                    </div>
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/templates" className="flex items-center dropdown-item-padding gap-3 no-underline text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                         className="w-[17px] h-[17px] text-gray-500 group-hover/dropdown-item:text-brand-primary">
                      <path fill="currentColor" d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"></path>
                    </svg>
                    <div className="Texts">
                      <div className="font-semibold">{t('templates')}</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </DropdownPortal>

          <DropdownPortal isOpen={activeDropdown === 'solutions'} targetId="dropdown-root">
            {/* 솔루션 드롭다운 */}
            <div className={`header-dropdown-container
                              absolute z-1000 top-dropdown-h left-[calc(theme(spacing.header-px)_+_67px_+_theme(spacing.logo-nav-ml-desktop)_+_108px)] w-auto shadow-lg border border-gray-200 rounded-sm bg-white`}>
              <ul className="list-none p-0 m-0 text-14 text-gray-900">
                <li>
                  <div className="min-w-[120px] dropdown-item-padding font-bold text-14 text-gray-600 cursor-default">
                    {t('customer_cases')}
                  </div>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/inventory-management" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:text-brand-primary
                                desktop:w-auto">
                    {t('inventory_management')}
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/purchase-management" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:text-brand-primary
                     desktop:w-auto">
                    {t('purchase_management')}
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/distributor-management" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:text-brand-primary
                     desktop:w-auto">
                    {t('distributor_management')}
                  </a>
                </li>
                <li className="group/dropdown-item">
                  <a href="/solutions/landingpages" 
                     className="w-full block min-w-[140px] m-w-[320px] text-left font-semibold text-gray-700 break-keep dropdown-item-padding no-underline transition-colors duration-200 hover:bg-gray-100 hover:text-brand-primary
                     desktop:w-auto">
                    {t('landing_page')}
                  </a>
                </li>
              </ul>
            </div>
          </DropdownPortal>
        </>
      )}
    </header>
  );
}

export default Header;