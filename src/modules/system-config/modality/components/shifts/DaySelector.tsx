import React from 'react';

interface DaySelectorProps {
  day: string;
  label: string;
  isActive: boolean;
  onChange: (day: string, isActive: boolean) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ day, label, isActive, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(day, !isActive)}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
        isActive 
          ? 'bg-blue-500 text-white' 
          : 'bg-white border border-blue-600 text-blue-600'
      }`}
    >
      {label}
    </button>
  );
};