import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ReportsModule from './ReportsModule';
import HotelHoursReport from './views/HotelHoursReport';
import AttendanceReport from './views/AttendanceReport'; 
import BiometricReport from './views/BiometricReport';

const ReportsScreen: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ReportsModule />}>
        <Route index element={<Navigate to="/reports/attendance" replace />} />
        <Route path="hotel-hours" element={<HotelHoursReport />} />
        <Route path="attendance-marks" element={<AttendanceReport />} />
        <Route path="biometric-persons" element={<BiometricReport />} />
        {/* Aquí puedes agregar más rutas para los otros tipos de reportes */}
      </Route>
    </Routes>
  );
};

export default ReportsScreen;