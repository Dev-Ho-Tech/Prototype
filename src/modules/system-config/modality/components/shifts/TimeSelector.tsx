import React from 'react';
import { ChevronDown } from 'lucide-react';

interface TimeSelectorProps {
  hours: string[];
  minutes: string[];
  ampm: string[];
  selectedHour: string;
  selectedMinute: string;
  selectedAmPm: string;
  onHourChange: (value: string) => void;
  onMinuteChange: (value: string) => void;
  onAmPmChange: (value: string) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  hours,
  minutes,
  ampm,
  selectedHour,
  selectedMinute,
  selectedAmPm,
  onHourChange,
  onMinuteChange,
  onAmPmChange
}) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <select
          value={selectedHour}
          onChange={(e) => onHourChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      
      <span className="mx-1">:</span>
      
      <div className="relative">
        <select
          value={selectedMinute}
          onChange={(e) => onMinuteChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      
      <div className="relative ml-1">
        <select
          value={selectedAmPm}
          onChange={(e) => onAmPmChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {ampm.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};
