import React from 'react';
import ReportCard from './ReportCard';
import { ReportCategoryList as ReportCategoryListType } from '../interfaces/Report';

interface ReportCategoryListProps {
  categories: ReportCategoryListType;
  title?: string;
}

const ReportCategoryList: React.FC<ReportCategoryListProps> = ({ categories, title = "Más usados" }) => {
  return (
    <div className="my-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <ReportCard 
            key={category.id} 
            category={category} 
          />
        ))}
      </div>
    </div>
  );
};

export default ReportCategoryList;