import React from 'react';
import { DateRange } from '../interfaces/Report';

interface ReportDatePickerProps {
  dateRange: DateRange;
  onChange: (dateRange: DateRange) => void;
}

const ReportDatePicker: React.FC<ReportDatePickerProps> = ({ dateRange, onChange }) => {
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    onChange({
      startDate: newStartDate,
      endDate: dateRange.endDate
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    onChange({
      startDate: dateRange.startDate,
      endDate: newEndDate
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col">
        <label htmlFor="start-date" className="text-sm font-medium text-gray-700 mb-1">
          Fecha Inicial
        </label>
        <input
          id="start-date"
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formatDate(dateRange.startDate)}
          onChange={handleStartDateChange}
        />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="end-date" className="text-sm font-medium text-gray-700 mb-1">
          Fecha Final
        </label>
        <input
          id="end-date"
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formatDate(dateRange.endDate)}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default ReportDatePicker;