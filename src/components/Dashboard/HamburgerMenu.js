import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'; // Typography を追加
import { Article, Schedule, HelpOutline } from '@mui/icons-material';
import { useLocation, Link } from 'react-router-dom'; 
import styles from './HamburgerMenu.module.css'; 
import useMediaQuery from '@mui/material/useMediaQuery';  // メディアクエリを追加

const HamburgerMenu = ({ userName, handleLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  
  // 画面サイズが1024px以下の場合（スマホ・タブレットの両方を判定）
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // ページ遷移時にドロワーを閉じる
  useEffect(() => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  }, [location]);

  // 画面サイズ変更時にメニューを強制的に閉じる
  useEffect(() => {
    if (!isMobileOrTablet && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isMobileOrTablet, drawerOpen]);  // 画面サイズ変更を監視

  return (
    <>
      {/* ハンバーガーメニューアイコン（スマホ・タブレットで表示） */}
      {isMobileOrTablet && (
        <div className={styles.HM}>
          <div 
            className={`${styles.hamburgerIcon} ${drawerOpen ? styles.open : ''}`} 
            onClick={toggleDrawer}  
            style={{ position: 'fixed', top: 20, left: 16, zIndex: 2000 }} 
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </div>
        </div>
      )}
      
      {/* ハンバーガーメニューの内容 */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer} 
        transitionDuration={600}
        classes={{ paper: styles.drawerContainer }}  
      >       
        <List>
          {/* ユーザー名の挨拶 */}
          <ListItem className={styles.greeting}>
            <Typography variant="h6">
              こんにちは、{userName}さん
            </Typography>
          </ListItem><br />
          
          <ListItem component={Link} to="/HelpTop" className={styles.listItem}>
            <ListItemIcon><HelpOutline fontSize="large" /></ListItemIcon>
            <ListItemText 
              primary="ヘルプ" 
              disableTypography  // MUIのタイポグラフィスタイルを無効化
              className={styles.listItemText}
            />
          </ListItem>
          <ListItem component={Link} to="/news" className={styles.listItem}>
            <ListItemIcon><Article fontSize="large" /></ListItemIcon>
            <ListItemText primary="ニュース" disableTypography className={styles.listItemText} />
          </ListItem>
          <ListItem component={Link} to="/dashboard" className={styles.listItem}>
            <ListItemIcon><Schedule fontSize="large" /></ListItemIcon>
            <ListItemText primary="スケジュール" disableTypography className={styles.listItemText} />
          </ListItem>
          
          {/* ログアウトボタン */}
          <ListItem className={styles.listItem}>
            <button 
              onClick={handleLogout} 
              className={styles.logoutButton}
            >
              ログアウト
            </button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
