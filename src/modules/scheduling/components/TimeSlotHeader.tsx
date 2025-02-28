import React from 'react';

interface TimeSlotHeaderProps {
  startHour: number;
  endHour: number;
}

const TimeSlotHeader: React.FC<TimeSlotHeaderProps> = ({ startHour, endHour }) => {
  const timeSlots = Array.from({ length: endHour - startHour }, (_, i) => {
    const hour = (i + startHour).toString().padStart(2, '0');
    return `${hour}:00 am`;
  });

  return (
    <div className="grid grid-cols-[repeat(13,minmax(80px,1fr))]">
      {timeSlots.map(time => (
        <div 
          key={time} 
          className="px-2 py-1 text-xs text-gray-500 border-r border-gray-200 last:border-r-0 text-center"
        >
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeSlotHeader;