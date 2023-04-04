import { useState } from 'react';
import { Form } from 'react-bootstrap';
import React from 'react';

export default function TimeSelector() {
  // create an array of hours from 0 to 23
  const hours = Array.from({ length: 24 }, (_, i) => i);
  // initialize the selected hour to the current hour in AM/PM format
  const [selectedHour, setSelectedHour] = useState(
    new Date().toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
    })
  );

  // handle the hour selection change
  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(event.target.value);
  };

  return (
    <Form.Group>
      <Form.Label>Select Time:</Form.Label>
      <Form.Select value={selectedHour} onChange={handleHourChange}>
        {hours.map((hour) => (
          <option
            key={hour}
            value={
              (hour % 12 || 12) + ':00 ' + (hour < 12 ? 'AM' : 'PM')
            }
          >
            {(hour % 12 || 12)}:00 {hour < 12 ? 'AM' : 'PM'}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
