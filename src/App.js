// App.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Schedule/Dashboard';
import Modal from 'react-modal';
import HelpTop from './components/Dashboard/HelpPage/HelpTop';
import News from './components/Dashboard/News/News';  
import NewsListPage from './components/Dashboard/News/NewsListPage';
import Register from './components/Login/Register';
import RegistrationSuccess from './components/Login/RegistrationSuccess';
import ForgotPassword from './components/Login/ForgotPassword';
import PasswordReset from './components/Login/PasswordReset';
import HeaderComponent from './components/Dashboard/HeaderComponent';
import HamburgerMenu from './components/Dashboard/HamburgerMenu';
import AppReact from './components/AppReact';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';

// ルート要素を設定
Modal.setAppElement('#root');

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  // CSRFトークンを設定
  useEffect(() => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    }
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await axios.delete('https://alc-streamersland.com/logout'); // セッション破棄
      localStorage.clear();             // ローカルストレージをクリア
      sessionStorage.clear();           // セッションストレージをクリア
      setUserName('');
      window.location.href = '/login';   // ログインページにリダイレクト
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <Router>
      <AppContent userName={userName} handleLogout={handleLogout} />
    </Router>
  );
}

function AppContent({ userName, handleLogout }) {
  const location = useLocation();
  const pathsWithoutHeader = ['/', '/login', '/register', '/registration-success', '/forgotpassword', '/passwordreset', '/custom-page', '/news-list', '/terms-of-service', '/privacy-policy'];

  return (
    <>
      {!pathsWithoutHeader.includes(location.pathname.toLowerCase()) && (
        <>
          <HeaderComponent userName={userName} handleLogout={handleLogout} />
          <HamburgerMenu userName={userName} handleLogout={handleLogout} />
        </>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/helptop" element={<HelpTop userName={userName} handleLogout={handleLogout} />} />
        <Route path="/news" element={<News userName={userName} handleLogout={handleLogout} />} />
        <Route path="/news-list" element={<NewsListPage userName={userName} handleLogout={handleLogout} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard userName={userName} handleLogout={handleLogout} />} />
        <Route path="/custom-page" element={<AppReact />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

export default App;
