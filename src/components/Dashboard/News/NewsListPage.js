import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsList.css';
import noImage from '../../../images/20200505_noimage.jpg'; // デフォルト画像をインポート
import homeIcon from '../../../images/家の無料アイコン.png'; 

function NewsListPage() {
  const [news, setNews] = useState([]);

  // ニュースを取得する関数
  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const isTwoColumns = news.length >= 2;

  return (
    <div>
      {/* WordPressサイトへのリンクをニュースリストの上に表示 */}
      <div className="home-link">
        <a href="http://test.local/" rel="noopener noreferrer">
          <img src={homeIcon} alt="ホームへ戻る" className="home-icon" />
        </a>
      </div>

      {/* ニュースリスト */}
      <div className={`news-list-container ${isTwoColumns ? 'two-columns' : ''}`}>
        <div className="titleNews">
          <h2>News</h2>
        </div>
        <div className="wp-news-list">
          {news.length > 0 ? (
            news.map((item) => (
              <div className="news-item" key={item.id}>
                <div className="news-content">
                  {/* 画像の表示、デフォルト画像を設定 */}
                  <img
                    src={item.image_url || noImage}
                    alt={item.title}
                    className="news-image"
                  />
                  {/* タイトルをリンクに変更 */}
                  <div className="news-title">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </div>
                  <div className="news-category2">{item.category}</div>
                  <div className="news-date">日程: {new Date(item.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))
          ) : (
            <p>ニュースがありません。</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsListPage;
