import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ schedules, onEventClick, onDateClick, selectedSchedules }) => {
  const isDesktop = useMediaQuery('(min-width:768px)');
  const location = useLocation(); // ページのパスを検出
  const [key, setKey] = useState(0); // 再レンダリング用のキー

  useEffect(() => {
    // ページ遷移時にカレンダーを強制的に再レンダリング
    setKey((prevKey) => prevKey + 1); // key を変更して強制再レンダリング
  }, [location.pathname]); // locationの変更を検出

  const calendarEvents = schedules.map(schedule => {
    let start, end;
    if (schedule.time_range && schedule.time_range !== '') {
      [start, end] = schedule.time_range.split('〜');
    } else {
      start = '00:00:00';
      end = '23:59:59';
    }

    return {
      id: schedule.id.toString(),
      title: schedule.description || 'No title',
      start: new Date(`${schedule.date}T${start}`),
      end: new Date(`${schedule.date}T${end}`),
      allDay: !schedule.time_range || schedule.time_range === '',
      selected: selectedSchedules?.has(schedule.id.toString()) || false,
    };
  });

  const handleSelectSlot = (slotInfo) => {
    const clickedTime = new Date(slotInfo.start).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Tokyo'
    });

    const clickedDate = new Date(slotInfo.start).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'Asia/Tokyo'
    });

    onDateClick(slotInfo.start, clickedTime, clickedDate);
  };

  return (
    <div className="fullcalendar-container">
      <Calendar
        key={key} // key を使ってカレンダーを強制再レンダリング
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={event => onEventClick(event.id)}
        views={['month']}
        defaultView="month"
        style={{ height: isDesktop ? 700 : 500, width: '100%', maxWidth: isDesktop ? '1200px' : '100%', margin: '0 auto' }}
      />
    </div>
  );
};

export default CalendarComponent;
