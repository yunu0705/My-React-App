import React, { useState } from 'react';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './Register.css';
import './setting.css';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import logo from '../../images/IMG_5602.png'; // 画像をimport

const RegistrationForm = () => {
  const [landAccountName, setLandAccountName] = useState('');
  const [landEmailAddress, setLandEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigateの初期化
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMessage('パスワードは最低6文字以上必要です。');
      return;
    }

    if (!isAgreed) {
      setErrorMessage('利用規約とプライバシーポリシーに同意する必要があります。');
      return;
    }

    try {
      const response = await axios.post('https://alc-streamersland.com/register', {
        landAccount_name: landAccountName,
        landEmail_address: landEmailAddress,
        password: password,
      });

      if (response.status === 201) {
        // 登録が成功したら、確認ページにリダイレクト
        navigate('/registration-success', { state: { email: landEmailAddress } });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessage(error.response.data.errors.join(', '));
      } else {
        setErrorMessage('登録に失敗しました。再度お試しください。');
      }
    }
  };

  return (
    <div className="setting">
    <div className="body-1">
      <div className="RegisterFormTop">
      <img src={logo} className="image-styleSL" alt="ロゴ" /> {/* 修正済み */}
        <div className="p-text">
        ユーザー登録
          </div>
        <form onSubmit={handleSubmit}>
          <div className="formFont">
            <label htmlFor="land_account">
              <strong>ユーザー名</strong> <span className="required"><strong>（必須）</strong></span>
            </label><br />
            <input
              type="text"
              id="land_account"
              name="landAccount_name"
              size="30"
              value={landAccountName}
              onChange={(e) => setLandAccountName(e.target.value)}
              placeholder="半角英数字"
              required
              autoComplete="off"
            />
          </div>

          <div className="formFont">
            <label htmlFor="land_email">
              <strong>メールアドレス</strong> <span className="required"><strong>（必須）</strong></span>
            </label><br />
            <input
              type="email"
              id="land_email"
              name="landEmail_address"
              size="30"
              value={landEmailAddress}
              onChange={(e) => setLandEmailAddress(e.target.value)}
              placeholder="sample@sample.com"
              required
              autoComplete="off"
            />
          </div>

          <div className="formFont password-container">
            <label htmlFor="land_password">
              <strong>パスワード</strong> <span className="required"><strong>（必須）</strong></span>
            </label><br />
            <input
              type={showPassword ? "text" : "password"}
              id="land_password"
              name="password"
              size="30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="半角英数字"
              required
            />
            <span className="password-toggle-register" onClick={togglePasswordVisibility}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          <div className="formFont">
            <label>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              利用規約・プライバシーポリシーに同意する
            </label>
          </div>

          {errorMessage && (
            <div className="error-message" style={{ color: 'red' }}>
              {errorMessage}
            </div>
          )}

          <div className="submit">
            <button type="submit">登録</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;
