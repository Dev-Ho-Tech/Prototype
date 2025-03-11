import React from 'react';

interface ToggleSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  label, 
  isChecked, 
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          id={`toggle-${label}`}
        />
        <label
          htmlFor={`toggle-${label}`}
          className={`absolute left-0 top-0 right-0 bottom-0 rounded-full cursor-pointer transition-all duration-200 ${
            isChecked ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
              isChecked ? 'transform translate-x-6' : ''
            }`}
          />
        </label>
      </div>
    </div>
  );
};