import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import './PasswordReset.css';
import './setting.css';

const PasswordReset = () => {
  const { token } = useParams(); // React Routerを使用してトークンを取得
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // 成功メッセージ用の状態

  const handleSubmit = async (e) => {
    e.preventDefault();

    // クライアント側のエラーチェック
    if (password.length < 8 || password.length > 10) {
      setError('パスワードは8〜10文字である必要があります。');
      return;
    }
    if (password !== passwordConfirmation) {
      setError('パスワードと確認用パスワードが一致しません。');
      return;
    }

    try {
      const response = await axios.patch(`/password_resets/${token}`, {
        user: {
          password: password,
          password_confirmation: passwordConfirmation,
        },
      });

      if (response.data.message === 'パスワードが更新されました。') {
        setSuccessMessage('パスワードが正常に更新されました。5秒後にログインページへ移動します。');
        setError('');

           // 入力内容をクリア
      setPassword('');
      setPasswordConfirmation('');

        // 10秒後にログインページにリダイレクト
        setTimeout(() => {
          navigate('/login');
        }, 10000);
      }
    } catch (error) {
      setError('パスワードリセットに失敗しました。再度お試しください。');
    }
  };

  return (
    <div className="setting">
    <div className="body-1">
    <div className="ResetFormTop">
      <h2>パスワードの再設定</h2>
      <div className="p-text5">新しいパスワードを入力してください。</div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && (
        <div>
          <p style={{ color: 'green' }}>{successMessage}</p>
          <p>
            自動で読み込まれない場合は
            <a href="#" onClick={() => navigate('/login')}>こちらをクリックしてください。</a>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div  className="label1">
          <label><strong>新しいパスワード</strong></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8〜10字以内、半角英数字"
            minLength="8"
            maxLength="10"
            required
          />
        </div>
        <div>
          <label><strong>パスワードの確認</strong></label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            minLength="8"
            maxLength="10"
            required
          />
        </div>
        <div className="reset-submit">
        <button type="submit">送信する</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default PasswordReset;
