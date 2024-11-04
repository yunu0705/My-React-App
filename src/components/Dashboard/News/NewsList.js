import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsList.css';
import noImage from '../../../images/20200505_noimage.jpg';
import NewsCard from './NewsCard';
import NewsForm from './NewsForm'; // NewsFormコンポーネントをインポート

function NewsList() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleEditSelected = () => {
    if (selectedNews.length === 1) {
      const newsToEdit = news.find((item) => item.id === selectedNews[0]);
      setEditingNews(newsToEdit);
    } else {
      alert('1つだけニュースを選択してください');
    }
  };

  const handleEditClose = () => {
    setEditingNews(null); // 編集モードを終了
    setSelectedNews([]); // 選択をクリア
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedNews.map((id) => axios.delete(`http://localhost:3001/api/news/${id}`))
      );
      setNews(news.filter((item) => !selectedNews.includes(item.id)));
      setSelectedNews([]);
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleSelectNews = (id) => {
    setSelectedNews((prev) =>
      prev.includes(id) ? prev.filter((newsId) => newsId !== id) : [...prev, id]
    );
  };

  const handleUpdateNewsList = async () => {
    // ニュースを再取得する関数
    try {
      const response = await axios.get('http://localhost:3001/api/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error updating news list:', error);
    }
  };

  return (
    <div className="news-list-container">
      {/* NewsForm コンポーネントにデータを渡す */}
      <NewsForm
        selectedNews={editingNews}
        onClose={handleEditClose}
        onUpdate={handleUpdateNewsList}
      />

      <h2>ニュース一覧</h2>
      <div className="button-container">
        <button onClick={handleDeleteSelected} disabled={selectedNews.length === 0} className="delete-button">
          選択削除
        </button>
        <button onClick={handleEditSelected} disabled={selectedNews.length !== 1} className="edit-button">
          選択編集
        </button>
      </div>
      <div className="news-list">
        {news.length > 0 ? (
          news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              date={new Date(item.date).toLocaleDateString()}
              category={item.category}
              imageUrl={item.image_url || noImage}
              isSelected={selectedNews.includes(item.id)}
              onSelect={() => handleSelectNews(item.id)}
              url={item.url}
            />
          ))
        ) : (
          <div className="n-p"><p>投稿中のニュースはありません<br /><br /></p></div>
        )}
      </div>
    </div>
  );
}

export default NewsList;
