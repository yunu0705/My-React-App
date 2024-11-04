import React from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import './Dashboard.css';

const ScheduleList = ({ schedules, selectedSchedules, onSelectSchedule }) => {
  return (
    <Table className="schedule-list-table">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>日付</TableCell>
          <TableCell>曜日</TableCell>
          <TableCell>時間</TableCell>
          <TableCell>内容</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell>
              <Checkbox 
                checked={selectedSchedules.has(schedule.id)} 
                onChange={() => onSelectSchedule(schedule.id)} 
              />
            </TableCell>
            <TableCell>{schedule.date}</TableCell>
            <TableCell>{schedule.day_of_week}</TableCell>
            <TableCell>
              {schedule.description === '休み' ? '' : schedule.time_range}
            </TableCell>
            <TableCell>{schedule.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleList;
