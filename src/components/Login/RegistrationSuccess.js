import React from 'react';
import { useLocation } from 'react-router-dom';

const RegistrationSuccess = () => {
  const location = useLocation();
  const { email } = location.state || {}; // state経由で渡されたメールアドレスを取得

  return (
<div className="body-1">
  <div className="RegisterSuccess">
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>
        ユーザー登録が完了しました！<br />
        {email} に送信されたメールを確認してください。<br /><br />
        しばらく経ってもメールが届かない場合は、<br />
        入力頂いたメールアドレスが間違っているか、<br />
        迷惑メールフォルダに振り分けられている可能性がございます。<br />
        また、ドメイン指定をされている場合は、「@XXXX.com」からの<br />
        メールが受信できるようあらかじめ設定をお願いいたします。
      </p>
    </div>
  </div>
</div>
  );
};

export default RegistrationSuccess;
