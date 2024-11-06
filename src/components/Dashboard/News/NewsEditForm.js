import React, { useState } from 'react';
import axios from 'axios';
import './editForm.css'; // editFormのCSSを適用

function NewsEditForm({ selectedNews, onClose, onUpdate }) {
  const [date, setDate] = useState(selectedNews?.date || '');
  const [title, setTitle] = useState(selectedNews?.title || '');
  const [category, setCategory] = useState(selectedNews?.category || '');
  const [image, setImage] = useState(null); // 新しい画像を選択
  const [url, setUrl] = useState(selectedNews?.url || ''); // URLフィールドを追加

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('news[date]', date);
    formData.append('news[title]', title);
    formData.append('news[category]', category);
    formData.append('news[url]', url || ''); // URLが空の場合は空文字列を設定
    if (image) formData.append('news[image]', image);

    try {
      await axios.put(`https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/news/${selectedNews.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUpdate(); // 更新後の処理
      onClose(); // フォームを閉じる
    } catch (error) {
      console.error('ニュースの更新に失敗しました:', error);
      alert('ニュースの更新に失敗しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>日程</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>カテゴリー</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="コラボ">コラボ</option>
          <option value="イベント">イベント</option>
        </select>
      </div>
      <div>
        <label>URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URLがあれば入力" // URLがない場合のヒントを表示
        />
      </div>
      <div>
        <label>画像</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
      </div>
      <button type="submit">更新</button>
      <button type="button" onClick={onClose}>キャンセル</button>
    </form>
  );
}

export default NewsEditForm;
