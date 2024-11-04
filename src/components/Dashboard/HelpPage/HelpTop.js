import React, { useState, useEffect } from 'react'; 
import Help from './Help';
import './Help.css';
import HamburgerMenu from '../HamburgerMenu';
import HeaderComponent from '../HeaderComponent';
import useMediaQuery from '@mui/material/useMediaQuery'; // メディアクエリ用のフック

const HelpTop = ({ userName, handleLogout }) => {
  // スマホおよびタブレット表示かどうかを判定
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');
  const [drawerOpen, setDrawerOpen] = useState(false);  // ドロワー（ハンバーガーメニュー）の状態管理

  // ハンバーガーメニューを開閉する関数
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="dashboard-container">
      {/* HeaderComponent に userName を渡す */}
      <HeaderComponent userName={userName} handleLogout={handleLogout} />

      <div className="active-page-line">
        <div className="activePageLine-container">
          <div className="page-line-text">
            ヘルプ・お問い合わせ
          </div>
        </div>
      </div>
    
      {/* スマホ・タブレット表示の設定 */}
      <div>
        <HamburgerMenu
          userName={userName} // userName を渡す
          handleLogout={handleLogout}
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
        />
      </div>
      
      {/* Helpページの表示 */}
      <div className="content-area">
        <Help />
      </div>
    </div>
  );
};

export default HelpTop;
