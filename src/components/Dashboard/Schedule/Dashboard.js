import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CalendarComponent from './CalendarComponent';
import ScheduleModal from './ScheduleModal';
import ScheduleList from './ScheduleList';
import axios from 'axios';
import HamburgerMenu from '../HamburgerMenu';
import './Dashboard.css';
import './ModalStyles.css';
import '../HamburgerMenu.module.css';
import HeaderComponent from '../HeaderComponent';
import { Helmet } from 'react-helmet';

const Dashboard = ({ userName }) => {
  const [state, setState] = useState({
    allSchedules: [],
    paginatedSchedules: [],
    selectedSchedules: new Set(),
    selectedScheduleForEdit: null,
    error: null,
    modalIsOpen: false,
    clickedDate: '',
    startTime: '',
    endTime: '',
    description: '',
    currentPage: 1,
    totalPages: 1
  });

  const [key, setKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = 1;
  const scheduleListRef = useRef(null);
  

  // ログインしていない場合にリダイレクト
  useEffect(() => {
    if (!userName) {
      navigate("/login"); // ログインしていない場合はログインページにリダイレクト
    }
  }, [userName, navigate]);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [location.pathname]);

  useEffect(() => {
    fetchAllSchedules();
  }, [userId]);

  useEffect(() => {
    paginateSchedules();
  }, [state.allSchedules, state.currentPage]);

  const fetchAllSchedules = async () => {
    try {
      const response = await axios.get('https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/schedules', {
        params: { user_id: userId },
        withCredentials: true
      });
      setState(prev => ({
        ...prev,
        allSchedules: response.data.schedules,
        totalPages: Math.ceil(response.data.schedules.length / 7)
      }));
    } catch (error) {
      console.error('Error fetching schedules:', error.response ? error.response : error);
      setState(prev => ({ ...prev, error: '全てのスケジュールの取得に失敗しました。' }));
    }
  };

  const paginateSchedules = () => {
    const startIndex = (state.currentPage - 1) * 7;
    const paginated = state.allSchedules.slice(startIndex, startIndex + 7);
    setState(prev => ({ ...prev, paginatedSchedules: paginated }));
  };

  const handleEventClick = (id) => {
    setState(prev => {
      const newSelection = new Set(prev.selectedSchedules);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { ...prev, selectedSchedules: newSelection };
    });
  };

  const handleDeleteSchedule = async () => {
    if (state.selectedSchedules.size === 0) {
      alert('削除するスケジュールを選択してください。');
      return;
    }

    if (!window.confirm('選択したスケジュールを削除してもよろしいですか？')) {
      return;
    }

    try {
      for (let scheduleId of state.selectedSchedules) {
        await axios.delete(`https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/schedules/${scheduleId}`, {
          withCredentials: true
        });
      }
      fetchAllSchedules();
      setState(prev => ({ ...prev, selectedSchedules: new Set() }));
      alert('選択したスケジュールを削除しました。');
    } catch (error) {
      console.error("Error deleting schedules:", error.response ? error.response : error);
      setState(prev => ({ ...prev, error: 'スケジュールの削除に失敗しました。' }));
    }
  };

  const handleEditSchedule = () => {
    if (state.selectedSchedules.size !== 1) {
      alert('編集するスケジュールを1つ選択してください。');
      return;
    }

    const selectedId = Array.from(state.selectedSchedules)[0];
    const selectedSchedule = state.allSchedules.find(schedule => schedule.id === selectedId);

    if (selectedSchedule) {
      const [startTime, endTime] = selectedSchedule.time_range.split('〜');
      setState(prev => ({
        ...prev,
        selectedScheduleForEdit: selectedSchedule,
        modalIsOpen: true,
        clickedDate: selectedSchedule.date,
        startTime: startTime || '',
        endTime: endTime || '',
        description: selectedSchedule.description || ''
      }));
    }
  };

  const scrollToScheduleList = () => {
    if (scheduleListRef.current) {
      scheduleListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openNewScheduleModal = () => {
    setState(prev => ({
      ...prev,
      modalIsOpen: true,
      clickedDate: new Date().toISOString(),
      startTime: '12:00',
      endTime: '',
      description: '',
      selectedScheduleForEdit: null
    }));
    console.log('openNewScheduleModal called. Default startTime set to 12:00');
  };

  const goToPreviousPage = () => {
    if (state.currentPage > 1) {
      setState(prev => ({ ...prev, currentPage: state.currentPage - 1 }));
    }
  };

  const goToNextPage = () => {
    if (state.currentPage < state.totalPages) {
      setState(prev => ({ ...prev, currentPage: state.currentPage + 1 }));
    }
  };

  const handleDateClick = (dateStr, clickedTime, clickedDate) => {
    const localDate = new Date(dateStr);
    const jstOffset = 9 * 60 * 60 * 1000;
    const jstDate = new Date(localDate.getTime() + jstOffset);
    const correctedDate = jstDate.toISOString().split("T")[0];

    const timeToSet = clickedTime === '00:00' ? '12:00' : clickedTime;

    setState(prev => ({
      ...prev,
      clickedDate: correctedDate,
      startTime: timeToSet,
      modalIsOpen: true,
      selectedScheduleForEdit: null
    }));
  };

  const handleSaveSchedule = async (startTime, endTime, description, date) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const scheduleDate = date || state.clickedDate.split("T")[0] || currentDate;

    const newSchedule = {
      date: scheduleDate,
      day_of_week: new Date(scheduleDate).toLocaleString('en-US', { weekday: 'short' }),
      time_range: description === '休み' ? '' : `${startTime}〜${endTime}`,
      description: description,
      user_id: userId
    };

    try {
      if (state.selectedScheduleForEdit) {
        await axios.put(`https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/schedules/${state.selectedScheduleForEdit.id}`, { schedule: newSchedule }, { withCredentials: true });
      } else {
        await axios.post('https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/schedules', { schedule: newSchedule }, { withCredentials: true });
      }
      fetchAllSchedules();
    } catch (error) {
      console.error('Error saving schedule:', error.response ? error.response : error);
      setState(prev => ({ ...prev, error: 'スケジュールの作成/編集に失敗しました。' }));
    } finally {
      setState(prev => ({ ...prev, modalIsOpen: false, selectedScheduleForEdit: null }));
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('https://test-app-peche-c2666ebb3dc5.herokuapp.com/logout', { withCredentials: true });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>スケジュール作成・編集（管理画面)</title>
      </Helmet>
      <div className="dashboard-container">
        <HamburgerMenu userName={userName} handleLogout={handleLogout} />
        <HeaderComponent userName={userName} handleLogout={handleLogout} />
        <div className="active-page-line">
          <div className="activePageLine-container">
            <div className="page-line-text">スケジュール作成・編集</div>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#b534e8', color: 'white' }}
              onClick={handleDeleteSchedule}
              className="delete-button"
            >
              削除
            </Button>

            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#2196F3', color: 'white' }}
              onClick={handleEditSchedule}
              className="edit-button2"
            >
              編集
            </Button>

            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#4CAF50', color: 'white' }}
              onClick={scrollToScheduleList}
              className="schedule-list-button"
            >
              配信スケジュール一覧
            </Button>
          </div>
        </div>

        {state.error && <Alert severity="error" style={{ marginBottom: 20 }}>{state.error}</Alert>}
        <div className="fullcalendar-container">
          <CalendarComponent 
            key={key} 
            schedules={state.allSchedules}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
            selectedSchedules={state.selectedSchedules}
          />
        </div>
        <div ref={scheduleListRef} className="schedule-list-container">
          <Typography variant="h6" style={{ marginTop: 40 }}>配信スケジュール一覧</Typography>
          <ScheduleList
            schedules={state.paginatedSchedules}
            selectedSchedules={state.selectedSchedules}
            onSelectSchedule={handleEventClick}
          />
          <div className="pagination-controls">
            <Button onClick={goToPreviousPage} disabled={state.currentPage === 1}>Previous</Button>
            <span>Page {state.currentPage} of {state.totalPages}</span>
            <Button onClick={goToNextPage} disabled={state.currentPage === state.totalPages}>Next</Button>
          </div>
        </div>

        <div className="footer-menu">
          <Button className="menu-button1" onClick={handleDeleteSchedule}>削除</Button>
          <Button className="menu-button1" onClick={handleEditSchedule}>編集</Button> 
          <Button className="menu-button1" onClick={scrollToScheduleList}>配信スケジュール一覧</Button>
          <Button className="menu-button1" onClick={openNewScheduleModal}>＋</Button>
        </div>

        <ScheduleModal
          isOpen={state.modalIsOpen}
          onRequestClose={() => setState(prev => ({ ...prev, modalIsOpen: false }))}
          onSave={handleSaveSchedule}
          initialStartTime={state.startTime}
          initialEndTime={state.endTime}
          initialDescription={state.description}
          clickedDate={state.clickedDate}
        />
      </div>
    </>
  );
};

export default Dashboard;
