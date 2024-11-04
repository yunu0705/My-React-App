import React, { useEffect } from 'react';
import Modal from 'react-modal';

const ScheduleModal = ({ isOpen, onRequestClose, onSave, initialStartTime, initialEndTime, clickedDate, initialDescription }) => {
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(false);

  // 日付を "yyyy-MM-dd" フォーマットに変換する関数
  const formatDate = (dateObj) => {
    return dateObj.toISOString().split('T')[0]; // "yyyy-MM-dd" フォーマットに変換
  };

  // モーダルが開かれた時に初期値をセットする
  useEffect(() => {
    if (isOpen) {
      console.log('initialStartTime:', initialStartTime);
      console.log('initialEndTime:', initialEndTime);
      console.log('initialDescription:', initialDescription);
      
      setStartTime(initialStartTime || '12:00');
      setEndTime(initialEndTime || ''); // 終了時間もセット
      setDescription(initialDescription || ''); 
    
      if (clickedDate) {
        setDate(formatDate(new Date(clickedDate)));
      } else {
        setDate('');
      }
    
      setIsMobile(window.innerWidth <= 768); 
    }
  }, [isOpen, initialStartTime, initialEndTime, clickedDate, initialDescription]);
  
  
  // 30分刻みの時間オプションを生成
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      options.push(`${hour}:00`);
      options.push(`${hour}:30`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleSave = () => {
    onSave(startTime, endTime, description, date);
  };

  const handleDayOff = () => {
    onSave('00:00', '23:59', '休み', date);
  };

  const isSaveDisabled = !startTime || !endTime || !description || !date;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="予定を作成"
      bodyOpenClassName="modal-open"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '400px',
          padding: '20px',
        },
        overlay: {
          zIndex: 1000,
        },
      }}
    >
      <h2>{`${date || '日付未選択'} の予定を作成`}</h2> {/* 日付を表示 */}
      
      {isMobile && (
        <label htmlFor="date">
          日付を選択:
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </label>
      )}
      <br />
      <label htmlFor="start-time">
        開始時間:
        <select
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        >
          <option value="">選択してください</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label htmlFor="end-time">
        終了時間:
        <select
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        >
          <option value="">選択してください</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label htmlFor="description">
        内容:
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        />
      </label>
      <br />
      <button 
        onClick={handleSave} 
        disabled={isSaveDisabled}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        保存
      </button>
      <button 
        onClick={handleDayOff}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        お休み
      </button>
      <button 
        onClick={onRequestClose} 
        style={{ width: '100%', padding: '10px', marginTop: '20px' }}
      >
        キャンセル
      </button>
    </Modal>
  );
};

export default ScheduleModal;
