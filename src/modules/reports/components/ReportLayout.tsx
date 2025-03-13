import React, { ReactNode } from 'react';
import { ReportFilter as FilterInterface } from '../interfaces/Report';
import { EmployeeList } from '../interfaces/Employee';
import ReportFilter from './ReportFilter';

interface ReportLayoutProps {
  title: ReactNode | string;
  description?: string;
  filter: FilterInterface;
  employees: EmployeeList;
  onFilterChange: (filter: FilterInterface) => void;
  exportFormats?: ('pdf' | 'excel' | 'csv' | 'xml')[];
  onExport?: (format: 'pdf' | 'excel' | 'csv' | 'xml') => void;
  children: ReactNode;
}

const ReportLayout: React.FC<ReportLayoutProps> = ({
  title,
  description,
  filter,
  employees,
  onFilterChange,
  exportFormats,
  onExport,
  children
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        {typeof title === 'string' ? (
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        ) : (
          title
        )}
        {description && (
          <p className="mt-2 text-gray-600">{description}</p>
        )}
      </div>

      <ReportFilter
        filter={filter}
        employees={employees}
        onFilterChange={onFilterChange}
        exportFormats={exportFormats}
        onExport={onExport}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {children}
      </div>
    </div>
  );
};

export default ReportLayout;