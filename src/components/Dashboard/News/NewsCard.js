import React from 'react';
import './NewsList.css'; 
import defaultImage from '../../../images/20200505_noimage.jpg'; // デフォルト画像をインポート

function NewsCard({ title, date, category, imageUrl, isSelected, onSelect, url }) {
  const displayedImageUrl = imageUrl || defaultImage; // defaultImageを使用
  const linkUrl = url || "/news-list"; // URLがない場合はnews-listページに設定

  return (
    <div className="news-card">
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="news-checkbox"
        />
      </div>
      <img src={displayedImageUrl} alt={title} className="news-image" />
      <div className="news-info">
        <h3>
          <a href={linkUrl} target="_blank" rel="noopener noreferrer"> {/* タイトルをリンクにする */}
            {title}
          </a>
        </h3>
        <p>{date}</p>
        <span className="news-category">{category}</span>
      </div>
    </div>
  );
}

export default NewsCard;
