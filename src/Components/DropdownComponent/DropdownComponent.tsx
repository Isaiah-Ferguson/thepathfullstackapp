import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import React from 'react';
import UserContext from '../../UserContext/UserContext';
interface DateDropdownProps {
  selectedDay?: number;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDate?: string;
}

export default function DateSelector(props: DateDropdownProps) {
  const { selectedDate, setSelectedDate } = props;
  let timeData = useContext(UserContext);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({length: 31}, (_, i) => i + 1);

  // Handle the month and day selection events
  const handleMonthSelect = (event : React.ChangeEvent<HTMLSelectElement>) => {
    timeData.setSelectedMonth(event.target.value);
  };

  const handleDaySelect = (event : React.ChangeEvent<HTMLSelectElement>) => {
    timeData.setSelectedDay(parseInt(event.target.value));
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Select a date:</Form.Label>
        <div className="d-flex">
        <Form.Select className="px-2" value={timeData?.selectedMonth} onChange={handleMonthSelect}>
  {months.map((month) => ( <option key={month} value={month}>{month}</option> ))}
</Form.Select>
          <Form.Select value={timeData.selectedDay} onChange={handleDaySelect}>
            {days.map((day) => ( <option key={day} value={day.toString()}>{day}</option> ))}
          </Form.Select>
        </div>
      </Form.Group>
    </Form>
  );
}