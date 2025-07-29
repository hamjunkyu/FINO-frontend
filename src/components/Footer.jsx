import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Footer() {
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <footer className="w-full mt-auto footer-padding box-border bg-gray-100 text-gray-900 font-sans">
      {/* .footer-top */}
      <div className="flex justify-between flex-wrap gap-3">
        {/* .footer-brand */}
        <div className="flex-[2] min-w-[250px]">
          {/* .footer-brand .footer-logo */}
          <span className="block mb-4 text-3xl font-bold text-brand-primary">FINO</span>
          {/* .footer-brand .copyright */}
          <p className="text-14 text-gray-600 mb-2.5">© 2025 FINO. All Rights Reserved</p>
          {/* .footer-brand .terms-privacy */}
          <div className="terms-privacy">
            <a href="#terms" className="no-underline text-14 mr-2 text-brand-primary hover:underline">
              Terms of Service</a>|
            <a href="#privacy" className="no-underline text-14 ml-2 text-brand-primary hover:underline">
              Privacy Policy</a>
          </div>
          {/* 소셜 미디어 아이콘 */}
          <div className="flex mt-5 gap-3.5">
            <a href="https://www.linkedin.com/company/waveon-io" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 text-gray-600 transition-colors duration-200 hover:text-brand-primary"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
            </a>
            <a href="https://twitter.com/waveon_io" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-gray-600 transition-colors duration-200 hover:text-brand-primary"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
            </a>
            <a href="https://www.instagram.com/waveon.io/" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 text-gray-600 transition-colors duration-200 hover:text-brand-primary"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
            </a>
            <a href="https://www.youtube.com/channel/UCs0zrsgpU6LmkH4b4X3Btog" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 text-gray-600 transition-colors duration-200 hover:text-brand-primary"><path fill="currentColor" d="M549.7 124.1c-6.281-23.65-24.79-42.28-48.28-48.6C458.8 64 288 64 288 64S117.2 64 74.63 75.49c-23.5 6.322-42 24.95-48.28 48.6-11.41 42.87-11.41 132.3-11.41 132.3s0 89.44 11.41 132.3c6.281 23.65 24.79 41.5 48.28 47.82C117.2 448 288 448 288 448s170.8 0 213.4-11.49c23.5-6.321 42-24.17 48.28-47.82 11.41-42.87 11.41-132.3 11.41-132.3s0-89.44-11.41-132.3zm-317.5 213.5V175.2l142.7 81.21-142.7 81.2z"></path></svg>
            </a>
          </div>
        </div>
        {/* .footer-links */}
        <div className="flex-1 min-w-[150px]">
          {/* .footer-links h4 */}
          <h4 className="text-18 font-bold mb-footer-list-mb text-gray-900">Features</h4>
          {/* .footer-links ul */}
          <ul className="list-none p-0 m-0">
            {/* .footer-links li */}
            <li className="mb-footer-list-item-mb">
              <a href="#features1" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">
                {t('database')}</a></li>
            <li className="mb-footer-list-item-mb">
              <a href="#features2" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">
                {t('logic')}</a></li>
            <li className="mb-footer-list-item-mb">
              <a href="#features3" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">
                {t('message')}</a></li>
            <li className="mb-footer-list-item-mb">
              <a href="#features4" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">
                {t('templates')}</a></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h4 className="text-18 font-bold mb-footer-list-mb text-gray-900">Solutions</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-footer-list-item-mb"><a href="#solutions1" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('inventory_management')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#solutions2" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('purchase_management')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#solutions3" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('distributor_management')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#solutions4" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('landing_page')}</a></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h4 className="text-18 font-bold mb-footer-list-mb text-gray-900">Resources</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-footer-list-item-mb"><a href="#resources1" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('customer_cases')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#resources2" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('templates')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#resources3" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('guides')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#resources4" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('blog')}</a></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h4 className="text-18 font-bold mb-footer-list-mb text-gray-900">Support</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-footer-list-item-mb"><a href="#support1" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('help_center')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#support2" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('contact_sales')}</a></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h4 className="text-18 font-bold mb-footer-list-mb text-gray-900">Company</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-footer-list-item-mb"><a href="#company1" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('pricing')}</a></li>
            <li className="mb-footer-list-item-mb"><a href="#company2" className="no-underline text-gray-700 text-15 transition-colors duration-300 hover:text-brand-primary">{t('guest_posting')}</a></li>
          </ul>
        </div>

        {/* 언어 설정 드롭다운 추가 */}
        <div className="flex-1 min-w-[150px] flex justify-end items-start">
          {/* .language-selector select */}
          <select value={language} onChange={handleLanguageChange}
            className="w-28 lang-select-padding text-15 text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer appearance-none
                       bg-custom-select-arrow bg-no-repeat bg-[position:right_10%_bottom_50%] bg-[length:12px_auto] min-w-[100px]
                       focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-new-sky-blue focus:ring-opacity-50">
            <option value="en">EN</option>
            <option value="ko">KO</option>
          </select>
        </div>
      </div>
    </footer>
  );
}

export default Footer;