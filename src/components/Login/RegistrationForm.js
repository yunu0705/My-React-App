import React, { useState } from 'react';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegCircleCheck } from 'react-icons/fa6';
import './Register.css';
import './setting.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/IMG_5602.png';
import { Helmet } from 'react-helmet';

const RegistrationForm = () => {
  const [landAccountName, setLandAccountName] = useState('');
  const [landEmailAddress, setLandEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountNameError, setAccountNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [agreementError, setAgreementError] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    hasNumber: false,
    hasLetter: false,
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordValidations({
      length: value.length >= 8 && value.length <= 10,
      hasNumber: /\d/.test(value),
      hasLetter: /[a-zA-Z]/.test(value),
    });
  };

  const handleAccountNameChange = (e) => {
    const value = e.target.value;
    setLandAccountName(value);

    if (value.length < 3) {
      setAccountNameError('ユーザー名は3文字以上で入力してください。');
    } else if (value.length > 10) {
      setAccountNameError('ユーザー名は10文字以内で入力してください。');
    } else {
      setAccountNameError('');
    }
  };

  // メールアドレスの変更時にフォーマットをチェック
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setLandEmailAddress(value);

    // 正しいメール形式かをチェックする正規表現
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailPattern.test(value)) {
      setEmailError('正しいメールアドレスの形式で入力してください。');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAccountNameError('');
    setEmailError('');
    setPasswordError('');
    setAgreementError('');
    setErrorMessage('');

    let hasError = false;

    if (!landAccountName || landAccountName.length < 3 || landAccountName.length > 10) {
      setAccountNameError('ユーザー名は3文字以上10文字以内で入力してください。');
      hasError = true;
    }

    if (!landEmailAddress || emailError) {
      setEmailError('正しいメールアドレスを入力してください。');
      hasError = true;
    }

    if (!passwordValidations.length || !passwordValidations.hasNumber || !passwordValidations.hasLetter) {
      setPasswordError('パスワードの要件を満たしていません。');
      hasError = true;
    }

    if (!isAgreed) {
      setAgreementError('利用規約とプライバシーポリシーに同意する必要があります。');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post('http://test-app-peche-c2666ebb3dc5.herokuapp.com/register', {
        landAccount_name: landAccountName,
        landEmail_address: landEmailAddress,
        password: password,
      });

      if (response.status === 201) {
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
    <>
    <Helmet>
    <title>新規登録</title>
  </Helmet>
    <div className="setting">
      <div className="body-1">
        <div className="RegisterFormTop">
          <img src={logo} className="image-styleSL" alt="ロゴ" />
          <div className="p-text3">
            <strong> 新規ユーザー登録</strong>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formFont">
              <label htmlFor="land_account">
                <strong>ユーザー名</strong> <span className="required"><strong>*</strong></span>
              </label><br />
              <input
                type="text"
                id="land_account"
                name="landAccount_name"
                size="30"
                value={landAccountName}
                onChange={handleAccountNameChange}
                placeholder="半角英数字"
                autoComplete="off"
                className={accountNameError ? 'error-input' : ''}
              />
              {accountNameError && <div className="error-message">{accountNameError}</div>}
            </div>

            <div className="formFont">
              <label htmlFor="land_email">
                <strong>メールアドレス</strong><span className="required"><strong>*</strong></span>
              </label><br />
              <input
                type="email"
                id="land_email"
                name="landEmail_address"
                size="30"
                value={landEmailAddress}
                onChange={handleEmailChange}
                placeholder="sample@sample.com"
                autoComplete="off"
                className={emailError ? 'error-input' : ''}
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            <div className="formFontPasswordContainer">
              <label htmlFor="land_password">
                <strong>パスワード</strong><span className="required"><strong>*</strong></span>
              </label><br />
              <input
                type={showPassword ? "text" : "password"}
                id="land_password"
                name="password"
                size="30"
                value={password}
                onChange={handlePasswordChange}
                placeholder="半角英数字"
                className={passwordError ? 'error-input' : ''}
              />
              <span className="password-toggle-register" onClick={togglePasswordVisibility}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              {passwordError && <div className="error-message">{passwordError}</div>}

              <div className="validation-messages">
                <p className={passwordValidations.length ? 'valid' : 'invalid'}>
                  {passwordValidations.length ? <FaRegCircleCheck /> : <AiOutlineCloseCircle />} 8文字以上10文字以内で入力してください。
                </p>
                <p className={passwordValidations.hasNumber ? 'valid' : 'invalid'}>
                  {passwordValidations.hasNumber ? <FaRegCircleCheck /> : <AiOutlineCloseCircle />} 半角数字を含めてください。
                </p>
                <p className={passwordValidations.hasLetter ? 'valid' : 'invalid'}>
                  {passwordValidations.hasLetter ? <FaRegCircleCheck /> : <AiOutlineCloseCircle />} 半角英字を含めてください。
                </p>
              </div>
            </div>

            <div className="formFont">
              <label>
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <div className="text6">
                  <a href="/terms-of-service" className="kiyaku-links">
                    <div className="kiyaku-link">利用規約</div>
                  </a>
                  と
                  <a href="/privacy-policy" className="privacy-links">
                    <div className="privacy-link">プライバシーポリシー</div>
                  </a>
                  に同意する
                </div>
                <div className="required2"><strong>*</strong></div>
              </label>
              {agreementError && <div className="error-message">{agreementError}</div>}
            </div>

            {errorMessage && (
              <div className="error-message" style={{ color: 'red' }}>
                {errorMessage}
              </div>
            )}

            <div className="submit">
              <button type="submit">この内容で新規登録する</button>
            </div>
            <a href="/login" className="kiyaku-links">
              <div className="login-link">ログインはこちら</div>
            </a>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegistrationForm;
