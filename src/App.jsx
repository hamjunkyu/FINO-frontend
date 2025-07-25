// src/App.jsx
import React from 'react';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans text-14">
        <Header />
        <main className="flex-grow pt-header-h">
          <MainSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;