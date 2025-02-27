import React from 'react';

interface ToggleSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, isChecked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          isChecked ? 'bg-blue-500' : 'bg-gray-200'
        }`}
        onClick={() => onChange(!isChecked)}
      >
        <span
          className={`${
            isChecked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </button>
    </div>
  );
};