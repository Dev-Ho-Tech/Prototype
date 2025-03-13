import React from 'react';
import { ReportCategoryList } from '../interfaces/Report';

interface ReportTabsProps {
  categories: ReportCategoryList;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ReportTabs: React.FC<ReportTabsProps> = ({ categories, activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Pestañas">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === category.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
              onClick={() => onTabChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ReportTabs;