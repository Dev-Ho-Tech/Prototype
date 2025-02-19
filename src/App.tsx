import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { EmployeesScreen } from './modules/employees/EmployeesScreen';
import { EmployeeManagementScreen } from './modules/employees/management/EmployeeManagementScreen';
import { ReportsScreen } from './modules/reports/ReportsScreen';
import { SchedulingScreen } from './modules/scheduling/SchedulingScreen';
import { LicensesScreen } from './modules/administration/licenses/LicensesScreen';
import { UsersScreen } from './modules/administration/users/UsersScreen';
import { ConfigScreen } from './modules/administration/config/ConfigScreen';
import { StructureScreen } from './modules/system-config/structure/StructureScreen';
import { PositionsScreen } from './modules/system-config/positions/PositionsScreen';
import { DevicesScreen } from './modules/system-config/devices/DevicesScreen';
import { EmployeeTypesScreen } from './modules/system-config/employee-types/EmployeeTypesScreen';
import { ContractsScreen } from './modules/system-config/contracts/ContractsScreen';
import { RecordsScreen } from './modules/employees/records/RecordsScreen';
import { CheckProfilesScreen } from './modules/employees/check-profiles/CheckProfilesScreen';
import { BiometricScreen } from './modules/employees/biometric/BiometricScreen';
import { CalendarScreen } from './modules/time-control/calendar/CalendarScreen';
import { ChecksScreen } from './modules/time-control/checks/ChecksScreen';
import { HoursApprovalScreen } from './modules/time-control/hours/HoursApprovalScreen';
import { AbsencesScreen } from './modules/time-control/absences/AbsencesScreen';
import { DiningRoomsScreen } from './modules/dining/rooms/DiningRoomsScreen';
import { DiningScheduleScreen } from './modules/dining/schedule/DiningScheduleScreen';
import { DiningAccessScreen } from './modules/dining/access/DiningAccessScreen';
import { DiningReportsScreen } from './modules/dining/reports/DiningReportsScreen';
import { DoorsScreen } from './modules/access-control/doors/DoorsScreen';
import { VisitorsScreen } from './modules/access-control/visitors/VisitorsScreen';
import { PermissionsScreen } from './modules/access-control/permissions/PermissionsScreen';
import { MonitoringScreen } from './modules/access-control/monitoring/MonitoringScreen';
import DashboardScreen from './modules/dashboard/DashboardScreen';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 overflow-hidden">
        {currentView === 'dashboard' && <DashboardScreen />}
        {currentView === '/employees/management' && <EmployeeManagementScreen />}
        {currentView === '/employees/records' && <RecordsScreen />}
        {currentView === '/employees/schedule' && <SchedulingScreen />}
        {currentView === '/employees/check-profiles' && <CheckProfilesScreen />}
        {currentView === '/employees/biometric' && <BiometricScreen />}
        {currentView === '/administration/licenses' && <LicensesScreen />}
        {currentView === '/administration/users' && <UsersScreen />}
        {currentView === '/administration/config' && <ConfigScreen />}
        {currentView === '/system-config/structure' && <StructureScreen />}
        {currentView === '/system-config/positions' && <PositionsScreen />}
        {currentView === '/system-config/devices' && <DevicesScreen />}
        {currentView === '/system-config/employee-types' && <EmployeeTypesScreen />}
        {currentView === '/system-config/contracts' && <ContractsScreen />}
        {currentView === '/time-control/calendar' && <CalendarScreen />}
        {currentView === '/time-control/checks' && <ChecksScreen />}
        {currentView === '/time-control/hours-approval' && <HoursApprovalScreen />}
        {currentView === '/time-control/absence' && <AbsencesScreen />}
        {currentView === '/dining/rooms' && <DiningRoomsScreen />}
        {currentView === '/dining/schedule' && <DiningScheduleScreen />}
        {currentView === '/dining/access' && <DiningAccessScreen />}
        {currentView === '/dining/reports' && <DiningReportsScreen />}
        {currentView === '/access/doors' && <DoorsScreen />}
        {currentView === '/access/visitors' && <VisitorsScreen />}
        {currentView === '/access/permissions' && <PermissionsScreen />}
        {currentView === '/access/monitoring' && <MonitoringScreen />}
        {currentView === '/reports/attendance' && <ReportsScreen />}
      </div>
    </div>
  );
}

export default App;