import React from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  label, 
  description, 
  isChecked, 
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
      <div className="relative inline-block w-10 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id={`toggle-${label}`}
          checked={isChecked}
          onChange={() => onChange(!isChecked)}
          className="sr-only"
        />
        <label
          htmlFor={`toggle-${label}`}
          className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
            isChecked ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
              isChecked ? 'translate-x-4' : 'translate-x-0'
            }`}
          ></span>
        </label>
      </div>
    </div>
  );
};