import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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
import axios from 'axios';
import PasswordReset from './components/Login/PasswordReset';
import HeaderComponent from './components/Dashboard/HeaderComponent';
import HamburgerMenu from './components/Dashboard/HamburgerMenu'; // 必要に応じてパスを修正

// ルート要素を設定（通常、index.htmlのid="root"を指します）
Modal.setAppElement('#root');

function App() {
  // 初期値としてlocalStorageから取得
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await axios.delete('https://alc-streamersland.com/logout');
      localStorage.removeItem('userName'); // ログアウト時にユーザー名を削除
      setUserName(''); // ローカルの状態もクリア
      window.location.href = '/login'; // ログインページにリダイレクト
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // ユーザー名をlocalStorageから取得
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

// AppContentをRouter内で使用するコンポーネントとして分離
function AppContent({ userName, handleLogout }) {
  const location = useLocation();

  // ヘッダーを表示しないパスのリスト
  const pathsWithoutHeader = ['/', '/login', '/register', '/registration-success', '/forgotpassword', '/passwordreset'];

  return (
    <>
      {/* ログインページ以外でヘッダーメニューを表示 */}
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
      </Routes>
    </>
  );
}


export default App;
