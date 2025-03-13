import React, { useState } from 'react';
import { ReportFilter as FilterInterface, DateRange } from '../interfaces/Report';
import {  EmployeeList } from '../interfaces/Employee';
import ReportDatePicker from './ReportDatePicker';
import ReportEmployeeList from './ReportEmployeeList';

interface ReportFilterProps {
  filter: FilterInterface;
  employees: EmployeeList;
  onFilterChange: (filter: FilterInterface) => void;
  exportFormats?: ('pdf' | 'excel' | 'csv' | 'xml')[];
  onExport?: (format: 'pdf' | 'excel' | 'csv' | 'xml') => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ 
  filter, 
  employees, 
  onFilterChange,
  exportFormats = ['pdf', 'excel', 'csv', 'xml'],
  onExport
}) => {
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);

  const handleDateRangeChange = (dateRange: DateRange) => {
    onFilterChange({
      ...filter,
      dateRange
    });
  };

  const handleEmployeeSelectionChange = (selectedEmployees: string[]) => {
    onFilterChange({
      ...filter,
      employees: selectedEmployees
    });
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv' | 'xml') => {
    if (onExport) {
      onExport(format);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <ReportDatePicker 
          dateRange={filter.dateRange}
          onChange={handleDateRangeChange}
        />
        
        <div className="flex space-x-2">
          <div className="relative">
            <button
              type="button"
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsEmployeeListOpen(!isEmployeeListOpen)}
            >
              <span>Empleados</span>
              <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isEmployeeListOpen && (
              <div className="absolute right-0 mt-2 w-80 z-10">
                <ReportEmployeeList 
                  employees={employees}
                  selectedEmployees={filter.employees || []}
                  onSelectionChange={handleEmployeeSelectionChange}
                />
              </div>
            )}
          </div>
          
          {exportFormats.length > 0 && (
            <div className="relative group">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span>Exportar</span>
                <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                <div className="py-1">
                  {exportFormats.map((format) => (
                    <button
                      key={format}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleExport(format)}
                    >
                      Exportar como {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportFilter;