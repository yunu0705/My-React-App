import React from 'react';
import './HeaderComponent.css'; 

const HeaderComponent = ({ userName, handleLogout }) => {
  return (
    <header className="header-menu">
      <nav className="nav-menu">
        <ul>
          {/* 挨拶文を追加 */}
          <li className="greeting-text">
            こんにちは、{userName ? `${userName}さん` : "さん"}
          </li>
          <li className="menu-1"><a href="/HelpTop">ヘルプ</a></li>
          <li className="menu-1"><a href="/news">ニュース</a></li>
          <li className="menu-1"><a href="/dashboard">スケジュール</a></li>
          <li>
          <button onClick={handleLogout}
          className="logout-button">ログアウト
          </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
