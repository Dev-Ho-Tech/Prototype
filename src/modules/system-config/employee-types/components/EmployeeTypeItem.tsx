import React from 'react';
import { ChevronRight } from 'lucide-react';

interface EmployeeTypeItemProps {
  type: string;
  isSelected: boolean;
  onClick: () => void;
  intelliTime: boolean;
  intelliLunch: boolean;
}

export const EmployeeTypeItem: React.FC<EmployeeTypeItemProps> = ({ type, isSelected, onClick, intelliTime, intelliLunch }) => {
  return (
    <div 
      className={`border-b border-gray-200 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center p-4">
        <input
          type="checkbox"
          className="mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400"
          checked={isSelected}
          onChange={(e) => e.stopPropagation()}
        />
        <span className="flex-1 text-sm">{type}</span>
        <div className="flex items-center space-x-8">
          <div className="w-24 text-center">
            <div className={`inline-block w-6 h-6 rounded-full ${intelliTime ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          </div>
          <div className="w-24 text-center">
            <div className={`inline-block w-6 h-6 rounded-full ${intelliLunch ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};