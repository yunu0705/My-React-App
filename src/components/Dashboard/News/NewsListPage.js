import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsList.css';
import noImage from '../../../images/20200505_noimage.jpg'; // デフォルト画像をインポート
import homeIcon from '../../../images/家の無料アイコン.png'; 
import { Helmet } from 'react-helmet';


function NewsListPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // ローディング状態の管理

  // ニュースを取得する関数
  const fetchNews = async () => {
    try {
      const response = await axios.get('https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false); // データ取得完了後、ローディングを終了
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const isTwoColumns = news.length >= 2;

  return (
    <>
    <Helmet>
    <title>ニュース一覧</title>
  </Helmet>
    <div>
      <div className="home-link">
        <a href="https://alc-streamersland.com/custom-page" rel="noopener noreferrer">
          <img src={homeIcon} alt="ホームへ戻る" className="home-icon" />
        </a>
      </div>

      <div className="news-list-container">
        <div className="titleNews">
          <h2>News</h2>
        </div>

        {/* ローディング中の表示 */}
        {loading ? (
          <div className="loading">読み込み中...</div> // 読み込み中の表示
        ) : (
          <div className={`wp-news-list ${isTwoColumns ? 'two-columns' : ''}`}>
            {news.length > 0 ? (
              news.map((item) => (
                <div className="news-item" key={item.id}>
                  <div className="news-content">
                    <img
                      src={item.image_url || noImage}
                      alt={item.title}
                      className="news-image"
                    />
                    <div className="news-title">
                      <a 
                        href={item.url || "/news-list"} // URLがない場合は"more"のページに飛ばす
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
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
        )}
      </div>
    </div>
    </>
  );
}

export default NewsListPage;
