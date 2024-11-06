import React, { useState, useEffect } from 'react';
import './Help.css';
import HelpForm from './HelpForm';
import picture from '../../../images/IMG_5592_transparent.png';
import HeaderComponent from '../HeaderComponent';
import HamburgerMenu from '../HamburgerMenu';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Help = ({ userName }) => {
  const [headerText, setHeaderText] = useState("");

  useEffect(() => {
    setHeaderText("ヘルプ・お問い合わせ");
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await axios.delete('https://test-app-peche-c2666ebb3dc5.herokuapp.com/logout');
      window.location.href = '/login'; // ログインページにリダイレクト
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>ヘルプ・お問い合わせ</title>
      </Helmet>
      <div className="help-page-container">
        <HamburgerMenu userName={userName} handleLogout={handleLogout} />
        <HeaderComponent userName={userName} handleLogout={handleLogout} />
        
        <div className="image-container">
          <img src={picture} className="mascot-image" alt="Mascot" />
        </div>

        <div className="bubble-postion">
          <div className="speech-bubble">
            困った時は<br />サポート窓口まで<br />メールください！
          </div>
        </div>

        <div className="mobile-accordion">
          <div className="accordion">
            <h3 className="accordion-title">
              各機能について
            </h3>
            <div className="accordion-content-open">
              <ul>
                <li><strong>ニュース:</strong> イベント、コラボなどお知らせしたい情報を投稿します。URL、サムネイルの設定ができます。</li>
                <li><strong>配信スケジュール:</strong> カレンダーから日付を選び、配信のスケジュールを設定します。</li>
              </ul>
            </div>
          </div>

          <div className="accordion">
            <h3 className="accordion-title">
              カレンダー機能の不具合が起きた時
            </h3>
            <div className="accordion-content-open1">
              <p>日付をクリックしても予定作成・編集の画面が表示されない場合は、ページを更新すると直ります。解決しない場合やその他不具合については、サポート窓口までご連絡ください。<br />
              </p>
            </div>
          </div>

          <div className="support-table">
            <div className="labelText1"><strong>＜お問い合わせ・サポート窓口＞<br /><br /></strong></div>
            <HelpForm /> {/* 問い合わせフォームの表示 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
