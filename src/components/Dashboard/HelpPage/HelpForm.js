import React, { useState } from 'react';
import axios from 'axios';
import './Help.css';
import './Help-tablet.css';

const HelpForm = () => {
  const [inquiryType, setInquiryType] = useState('');  
  const [userName, setUserName] = useState('');  
  const [email, setEmail] = useState('');  
  const [content, setContent] = useState('');  
  const [isFocused, setIsFocused] = useState(false);  
  const [screenshot, setScreenshot] = useState(null);  

  // メッセージ表示用の状態
  const [message, setMessage] = useState(''); // メッセージ内容
  const [messageType, setMessageType] = useState(''); // 'success' か 'error'

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setMessage('ファイルサイズが大きすぎます。5MB以内のファイルを選択してください。');
      setMessageType('error');
      setScreenshot(null);
    } else {
      setScreenshot(file);
      setMessage(''); // エラーメッセージをクリア
    }
  };

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('inquiryType', inquiryType);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('content', content);

    if (screenshot) {
      formData.append('screenshot', screenshot);
    }

    axios.post('https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/inquiries_image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setMessage('メールが送信されました！');
      setMessageType('success');

      // フォームをリセット
      setInquiryType('');
      setUserName('');
      setEmail('');
      setContent('');
      setScreenshot(null);
    })
    .catch(error => {
      console.error('メール送信に失敗しました:', error);
      setMessage('メール送信に失敗しました');
      setMessageType('error');
    });
  };

  return (
<form onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
  {/* メッセージ表示部分 */}
  {message && (
    <div className={`message ${messageType}`}>
      {message}
    </div>
  )}

  {/* ラジオボタン */}
  <label className="label-text"><strong>▼ご用件を選択してください。</strong></label>
  <div className="radio-option1">
    <input 
      type="radio" 
      id="bug" 
      name="inquiryType" 
      value="bug" 
      onChange={() => setInquiryType('bug')} 
    />
    <div>
      <label className="labelText"><strong>不具合について</strong></label>
    </div>
    <div className="radio-text2">
      <div className="radio-option2">
        <input 
          type="radio" 
          id="other" 
          name="inquiryType" 
          value="other" 
          onChange={() => setInquiryType('other')} 
        />
      </div>
      <label htmlFor="other"><strong>その他</strong></label>
    </div> 
  </div>
  
  {/* ユーザー名 */}
  <div className="form-group">
    <label className="labelText2" htmlFor="userName"><strong>ユーザー名</strong>
    <span className="colorLabel"><strong>*</strong></span>
  </label>
  </div>       
  <input 
    type="text" 
    id="userName" 
    value={userName} 
    onChange={(e) => setUserName(e.target.value)} 
    placeholder="ユーザー名(半角英数字)"
    required 
    className="form-input"
  />

  {/* メールアドレス */}
  <div className="form-group">
    <label className="labelText3" htmlFor="email"><strong>メールアドレス</strong>
    <span className="colorLabel"><strong>*</strong></span></label>
  </div> 
  <input 
    type="email" 
    id="email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    placeholder="stremersland@stremarsland.com"
    required 
    className="form-input"
  />

  {/* 内容 */}
  <div className="form-group">
    <label className="labelText" htmlFor="content"><strong>内容</strong>
    <span className="colorLabel"><strong>*</strong></span></label>
  </div> 
  <textarea 
    id="content" 
    value={content} 
    onChange={(e) => setContent(e.target.value)} 
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(content !== '')}
    placeholder={
      inquiryType === 'bug' && !isFocused ? 
      "どんな不具合か、わかる範囲でお書きください。不具合に関するスクリーンショットがございましたら「ファイルを選択」から画像を添付することができます。" : 
      inquiryType === 'other' && !isFocused ? 
      "不具合以外で何かお困りのことがありましたらこちらにお書きください。" : 
      ""
    }
    required
    className="form-input-context"
  ></textarea>

  {/* スクリーンショット添付*/}
  <div className={`form-group file-upload ${inquiryType === 'bug' ? 'visible' : ''}`}>
    <label className="labelText" htmlFor="screenshot"><strong>スクリーンショットを添付（任意）</strong></label>
    <label htmlFor="screenshot" className="custom-file-upload">ファイルを選択</label>
    <input 
      type="file" 
      id="screenshot" 
      accept="image/*" 
      onChange={handleFileChange} 
      className="form-input-file" 
    />
  </div>

  <div className="button-container">
    <button type="submit" className="submit-hbutton">送信する</button>
  </div>
</form>
  );
};

export default HelpForm;
