import React, { useState } from 'react';
import axios from 'axios';
import './setting.css';
import './Register.css';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/IMG_5602.png'; // 画像をimport
import { Helmet } from 'react-helmet';

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); // ユーザーのメールアドレスを取得
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ用の状態
  const [successMessage, setSuccessMessage] = useState(''); // 成功メッセージ用の状態
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  
    // 送信時にメッセージをリセット
    setSuccessMessage('');
    setErrorMessage('');
  
    if (!email.includes('@')) {
      setErrorMessage('有効なメールアドレスを入力してください。');
      return;
    }
  
    try {
      const response = await axios.post('https://test-app-peche-c2666ebb3dc5.herokuapp.com/forgot_password', {
        email: email,
      });
  
      if (response.status === 200) {
        setSuccessMessage('パスワードリセット用のリンクをメールで送信しました。');
      }
    } catch (error) {
      setErrorMessage('メールの送信に失敗しました。メールアドレスを確認してください。');
    }
  };

  return (
    <>
    <Helmet>
    <title>パスワード再発行</title>
  </Helmet>
    <div className="setting">
      <div className="body-1">
        <div className="RegisterFormTop">
        <img src={logo} className="image-styleSL" alt="ロゴ" /> {/* 修正済み */}
          <div className="p-text3">
            <strong>パスワードの再設定</strong>
          </div>
          <form onSubmit={handleForgotPassword}>
            <div className="formFont">
              <input
                type="email"
                id="email"
                name="email"
                size="30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ご登録時のメールアドレス"
                required
                autoComplete="off"
              />
            </div>

            {errorMessage && (
              <div className="error-message" style={{ color: 'red' }}>
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="success-message" style={{ color: 'green' }}>
                {successMessage}
              </div>
            )}

            <div className="submit">
              <button type="submit">送信する</button>
            </div>
            <div className="login-link-postion">
            <a href="/login" className="login-link">ログインへ戻る</a>
              </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
