import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ReportsModule from './ReportsModule';
import HotelHoursReport from './views/HotelHoursReport';
import AttendanceReport from './views/AttendanceReport'; 
import BiometricReport from './views/BiometricReport';
import NoSchedulePayrollReport from './views/NoSchedulePayrollReport';
import HotelHoursSummaryReport from './views/HotelHoursSummaryReport';
import DailyHoursConsolidatedReport from './views/DailyHoursConsolidatedReport';
import EmployeeListReport from './views/EmployeeListReport';
import MassUploadReport from './views/MassUploadReport';

const ReportsScreen: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ReportsModule />}>
        <Route index element={<Navigate to="/reports/attendance" replace />} />
        <Route path="hotel-hours" element={<HotelHoursReport />} />
        <Route path="attendance-marks" element={<AttendanceReport />} />
        <Route path="biometric-persons" element={<BiometricReport />} />
        {/* Aquí puedes agregar más rutas para los otros tipos de reportes */}
        {/* Nuevos reportes */}
        <Route path="no-schedule-payroll" element={<NoSchedulePayrollReport />} />
        <Route path="hotel-hours-summary" element={<HotelHoursSummaryReport />} />
        <Route path="daily-hours-consolidated" element={<DailyHoursConsolidatedReport />} />
        <Route path="employee-list" element={<EmployeeListReport />} />
        <Route path="mass-upload" element={<MassUploadReport />} />
        MassUploadReport
        {/* 
        <Route path="mass-upload" element={<MassUploadReport />} />
         */}
      </Route>
    </Routes>
  );
};

export default ReportsScreen;