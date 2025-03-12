import React from "react";

interface ToggleProps {
  label?: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, isChecked, onChange }) => {
  return (
    <div className="flex items-center space-x-2 mt-1">
      <button
        onClick={() => onChange(!isChecked)}
        className={`relative w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
          isChecked ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            isChecked ? "translate-x-4" : "translate-x-0"
          }`}
        ></div>
      </button>
      {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
    </div>
  );
};
