import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Article, Schedule, Description } from '@mui/icons-material';
import styles from './HamburgerMenu.module.css'; // CSS Modulesをインポート

const HamburgerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {/* ハンバーガーメニューアイコン */}
      <div 
        className={`${styles.hamburgerIcon} ${drawerOpen ? styles.open : ''}`} 
        onClick={toggleDrawer}  
        style={{ position: 'fixed', top: 20, left: 16, zIndex: 2000 }}  // 位置調整
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </div>

      {/* ハンバーガーメニューの内容 */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer} 
        transitionDuration={500}
        classes={{ paper: styles.drawerContainer }}  
      >
        <List>
          <ListItem button component="a" href="/home" className={styles.listItem}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="ホーム" />
          </ListItem>
          {/* 他のメニューアイテムも追加可能 */}
        </List>
      </Drawer>
    </>
  );
};

// ReactDOM.renderはコンポーネントの定義後に配置する必要があります
ReactDOM.render(<HamburgerMenu />, document.getElementById('hamburger-menu'));

export default HamburgerMenu;
