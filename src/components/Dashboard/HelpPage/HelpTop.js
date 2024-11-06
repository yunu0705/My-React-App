import React, { useState, useEffect } from 'react'; 
import Help from './Help';
import './Help.css';
import HamburgerMenu from '../HamburgerMenu';
import HeaderComponent from '../HeaderComponent';
import useMediaQuery from '@mui/material/useMediaQuery'; // メディアクエリ用のフック
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const HelpTop = ({ userName, handleLogout }) => {
  // スマホおよびタブレット表示かどうかを判定
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');
  const [drawerOpen, setDrawerOpen] = useState(false);  // ドロワー（ハンバーガーメニュー）の状態管理
  const navigate = useNavigate();

  // ログインしていない場合にリダイレクト
  useEffect(() => {
    if (!userName) {
      navigate("/login"); // ログインしていない場合はログインページにリダイレクト
    }
  }, [userName, navigate]);
  
  // ハンバーガーメニューを開閉する関数
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Helmet>
        <title>ヘルプ・お問い合わせ</title>
      </Helmet>
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
          <Help userName={userName} handleLogout={handleLogout} /> {/* userName と handleLogout を渡す */}
        </div>
      </div>
    </>
  );
};

export default HelpTop;
