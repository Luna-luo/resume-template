// src/features/resume/TimeAndLocation.tsx
import React from 'react';

interface TimeAndLocationProps {
  date: string;
  location: string;
}

const TimeAndLocation: React.FC<TimeAndLocationProps> = ({ date, location }) => {
  return (
    <>
      <div className="time-and-location">
        <div className="date">{date}</div>
        <div className="location">{location}</div>
      </div>
      <style jsx>{`
        .time-and-location {
            color: #449399;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    `}
      </style>
    </>
  );
};

export default TimeAndLocation;
