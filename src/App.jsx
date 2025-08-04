// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import SignUpWithEmailPage from './components/SignUpWithEmailPage';
import AccountPage from './components/AccountPage';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function AppContent() {
    const location = useLocation();
    // /login, /signup, /signup-email, /account 경로가 아닐 때만 true
    const showHeaderAndFooter = location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/account' && location.pathname !== '/signup-email';

    return (
        <div className="flex flex-col min-h-screen text-14 bg-white text-gray-900 font-sans">
            {showHeaderAndFooter && <Header />}
            <main className={`flex-grow overflow-y-auto ${showHeaderAndFooter ? 'pt-header-h' : ''}`}>
                <Routes>
                    <Route path="/" element={<MainSection />} /> {/* 메인 페이지 */}
                    <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
                    <Route path="/signup" element={<SignUpPage />} /> {/* 회원가입 페이지 */}
                    <Route path="/signup-email" element={<SignUpWithEmailPage />} /> {/* 이메일 회원가입 페이지 */}
                    <Route path="/account" element={<AccountPage />} /> {/* 계정 정보 페이지 */}
                </Routes>
            </main>
            {showHeaderAndFooter && <Footer />}
        </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <Router>
                <AppContent />
            </Router>
        </LanguageProvider>
    );
}

export default App;