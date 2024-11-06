import React, { useState } from 'react';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './setting.css';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/IMG_5602.png'; // 画像をimport
import { Helmet } from 'react-helmet';

const Login = () => {
  const [landAccountName, setLandAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ用の状態
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setErrorMessage('パスワードは最低8文字以上必要です。');
      return;
    }

    try {
      const response = await axios.post('https://test-app-peche-c2666ebb3dc5.herokuapp.com/login', {
        landAccount_name: landAccountName,
        password: password
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userName', response.data.user_name);
        setErrorMessage(''); 
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage('ログインに失敗しました。ユーザー名またはパスワードを確認してください。');
    }
  };

  return (
    <>
    <Helmet>
    <title>ログイン画面</title>
  </Helmet>
    <div className="setting">
    <div className="body-1"><div className="RegisterFormTop">
    <img src={logo} className="image-styleSL" alt="ロゴ" /> {/* 修正済み */}
      <div className="p-text3">
      <strong>ログイン画面</strong>
      </div>
      <form onSubmit={handleLogin}>
        <div className="formFont">
          <input
            type="text"
            id="land_account"
            name="landAccount_name"
            size="30"
            value={landAccountName}
            onChange={(e) => setLandAccountName(e.target.value)}
            placeholder="ユーザー名(半角英数字)"
            minLength="8"
            maxLength="20"
            required
            autoComplete="off"
          />
        </div>
        <div className="formFont password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="land_password"
            name="password"
            size="30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード(半角英数字)"
            minLength="8"
            maxLength="10"
            required
          />
          <span className="password-toggle-login" onClick={togglePasswordVisibility}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {errorMessage && (
          <div className="error-message" style={{ color: 'red' }}>
            {errorMessage}
          </div>
        )}

        <div className="submit">
          <button type="submit">ログイン</button>
        </div>
        <div className="p-text4">
        <a href="/ForgotPassword" className="forgot-password-link">パスワードをお忘れの方</a><br></br>
        <a href="/Register" className="forgot-password-link">新規登録の方</a>
      </div>
      </form>
    </div></div></div>
    </>
  );
};

export default Login;