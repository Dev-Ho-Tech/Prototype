import React, { useState } from 'react';
import { AttendanceReport } from './components/AttendanceReport';

export function ReportsScreen() {
  const [period, setPeriod] = useState('weekly');

  const handleExport = (format: string) => {
    // Handle export logic
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reportes de Asistencia</h1>
            <p className="mt-1 text-sm text-gray-500">
              Análisis detallado de asistencia y marcajes
            </p>
          </div>
        </div>

        <AttendanceReport
          period={period}
          onPeriodChange={setPeriod}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}