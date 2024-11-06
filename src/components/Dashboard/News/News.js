import React, { useState, useEffect } from 'react';
import '../Schedule/Dashboard.css';
import NewsList from './NewsList';
import HamburgerMenu from '../HamburgerMenu';
import axios from 'axios';
import HeaderComponent from '../HeaderComponent';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const News = ({ userName }) => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const navigate = useNavigate();

  // ログインしていない場合にリダイレクト
  useEffect(() => {
    if (!userName) {
      navigate("/login"); // ログインしていない場合はログインページにリダイレクト
    }
  }, [userName, navigate]);

  // ニュースを取得する関数
  const fetchNews = async () => {
    try {
      const response = await axios.get('https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // コンポーネントがマウントされた時にニュースを取得
  useEffect(() => {
    fetchNews();
  }, []);

  const handleSelectNews = (id) => {
    setSelectedNews((prev) =>
      prev.includes(id) ? prev.filter((newsId) => newsId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedNews.map((id) => axios.delete(`https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/news/${id}`))
      );
      setNews(news.filter((item) => !selectedNews.includes(item.id)));
      setSelectedNews([]); // リセット
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

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
        <title>ニュース投稿・編集（管理画面）</title>
      </Helmet>
      <div className="dashboard-container">
        {/* ログアウトボタンを含むヘッダー */}
        <HeaderComponent userName={userName} handleLogout={handleLogout} />

        <div className="active-page-line">
          <div className="activePageLine-container">
            <div className="page-line-text">
              ニュース投稿・編集
            </div>
          </div>
        </div>

        {/* スマホ表示でのハンバーガーメニュー */}
        <HamburgerMenu userName={userName} handleLogout={handleLogout} />

        {/* ニュース一覧 */}
        <NewsList 
          news={news} 
          handleDeleteSelected={handleDeleteSelected} 
          selectedNews={selectedNews} 
          handleSelectNews={handleSelectNews} 
        />
      </div>
    </>
  );
};

export default News;
