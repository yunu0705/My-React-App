import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editForm.css'; // editFormのCSSを適用
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css'; // テーマのCSSをインポート

function NewsForm({ selectedNews, onClose, onUpdate }) {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('コラボ');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (selectedNews) {
      setDate(selectedNews.date ? new Date(selectedNews.date) : new Date());
      setTitle(selectedNews.title || '');
      setCategory(selectedNews.category || 'コラボ');
      setUrl(selectedNews.url || '');
      setImage(null);
    }
  }, [selectedNews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    if (!urlPattern.test(url)) {
      alert('有効なURLを入力してください。');
      return;
    }

    const formData = new FormData();
    formData.append('news[date]', date ? date.toISOString().split('T')[0] : '');
    formData.append('news[title]', title);
    formData.append('news[category]', category);
    formData.append('news[url]', url);
    if (image) formData.append('news[image]', image);

    try {
      if (selectedNews) {
        await axios.put(`http://localhost:3001/api/news/${selectedNews.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('ニュースが更新されました！');
      } else {
        const response = await axios.post('http://localhost:3001/api/news', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.status >= 200 && response.status < 300) {
          alert('ニュースが投稿されました！');
        }
      }
      
      onUpdate();
      handleResetForm();
      onClose();
    } catch (error) {
      console.error('ニュース送信時にエラーが発生しました:', error);
      alert('ニュース送信に失敗しました。');
    }
  };

  const handleResetForm = () => {
    setDate(new Date());
    setTitle('');
    setCategory('コラボ');
    setUrl('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="news-post-form">
      <div className="form-group-news">
        <label htmlFor="date">日程</label>
        <Flatpickr
          value={date}
          onChange={(newDate) => setDate(newDate)}
          options={{ dateFormat: 'Y-m-d' }}
          className="form-control"
        />
      </div>

      <div className="form-group-news">
        <label htmlFor="category">カテゴリー</label>
        <select
          id="category"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="コラボ">コラボ</option>
          <option value="イベント">イベント</option>
        </select>
      </div>

      <div className="form-group-news">
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='ニュースタイトル'
          required
        />
      </div> 

      <div className="form-group-news">
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='https//www.news.com'
          required
        />
      </div>

      <div className="form-group-news">
        <label htmlFor="image">画像</label>
        <input
          type="file"
          id="image"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="submit-button">
          {selectedNews ? '更新' : '新規投稿'}
        </button>
        {selectedNews && (
          <button type="button" onClick={() => {
            handleResetForm();
            onClose();
          }} className="cancel-button">
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}

export default NewsForm;
