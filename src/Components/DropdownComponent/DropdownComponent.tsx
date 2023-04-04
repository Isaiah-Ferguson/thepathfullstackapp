import { useState } from 'react';
import { Form } from 'react-bootstrap';
import React from 'react';

export default function DateSelector() {
  // Initialize state for the selected month and day
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDay, setSelectedDay] = useState(1);

  // Define arrays for the months and days to be displayed in the selectors
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({length: 31}, (_, i) => i + 1);

  // Handle the month and day selection events
  const handleMonthSelect = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleDaySelect = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(parseInt(event.target.value));
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Select a date:</Form.Label>
        <div className="d-flex">
          <Form.Select value={selectedMonth} onChange={handleMonthSelect}>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </Form.Select>
          <Form.Select value={selectedDay} onChange={handleDaySelect}>
            {days.map((day) => (
              <option key={day} value={day.toString()}>{day}</option>
            ))}
          </Form.Select>
        </div>
      </Form.Group>
    </Form>
  );
}