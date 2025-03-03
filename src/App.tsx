import { useState, useCallback } from 'react';
import { LogoutModal } from './modules/auth/components/LogoutModal';
import { authService } from './modules/auth/services/authService';
import { Sidebar } from './components/layout/Sidebar';
// import { EmployeesScreen } from './modules/employees/EmployeesScreen';
import { EmployeeManagementScreen } from './modules/employees/management/EmployeeManagementScreen';
import { ReportsScreen } from './modules/reports/ReportsScreen';
import { SchedulingScreen } from './modules/scheduling/SchedulingScreen';
import { LicensesScreen } from './modules/administration/licenses/LicensesScreen';
import { UsersScreen } from './modules/administration/users/UsersScreen';
import { ConfigScreen } from './modules/administration/config/ConfigScreen';
import { StructureScreen } from './modules/system-config/structure/StructureScreen';
import { AccessTypesScreen} from './modules/system-config/positions/PositionsScreen';
import { DevicesScreen } from './modules/system-config/devices/DevicesScreen';
import { EmployeeTypesScreen } from './modules/system-config/employee-types/EmployeeTypesScreen';
import { ContractsScreen } from './modules/system-config/contracts/ContractsScreen';
import { RecordsScreen } from './modules/employees/records/RecordsScreen';
import { CheckProfilesScreen } from './modules/employees/check-profiles/CheckProfilesScreen';
import { BiometricScreen } from './modules/employees/biometric/BiometricScreen';
import IncidenciasScreen from './modules/employees/incidents/IncidentsScreen';

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
import { LoginScreen } from './modules/auth/login/LoginScreen';
import DashboardScreen from './modules/dashboard/DashboardScreen';
// import TestScreen from './modules/employees/incidents/test';
// import IncidenciasScreen from './modules/incidents/IncidentsScreen';

function App() {
  const [currentView, setCurrentView] = useState('/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isViewTransitioning, setIsViewTransitioning] = useState(false);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      setIsAuthenticated(false);
      setShowLogoutModal(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  const handleLogoutClick = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setIsViewTransitioning(true);
    // Clear any existing timeouts
    setTimeout(() => {
      setCurrentView(view);
      setIsViewTransitioning(false);
    }, 150); // Small delay for smooth transition
  }, []);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }
  try {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleViewChange}
        onLogout={handleLogoutClick}
      />
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
          isLoading={isLoggingOut}
        />
      )}
      <div className={`flex-1 overflow-hidden transition-opacity duration-150 ${isViewTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentView === '/dashboard' && <DashboardScreen />}
        {currentView === '/employees/management' && <EmployeeManagementScreen />}
        {currentView === '/employees/records' && <RecordsScreen />}
        {currentView === '/employees/schedule' && <SchedulingScreen />}
        {currentView === '/employees/check-profiles' && <CheckProfilesScreen />}
        {currentView === '/employees/biometric' && <BiometricScreen />}
        {/* {currentView === '/employees/incidencias' && <TestScreen/>} */}
        {currentView === '/employees/incidencias' && <IncidenciasScreen/>}
        {currentView === '/administration/licenses' && <LicensesScreen />}
        {currentView === '/administration/users' && <UsersScreen />}
        {currentView === '/administration/config' && <ConfigScreen />}
        {currentView === '/system-config/structure' && <StructureScreen />}
        {currentView === '/system-config/positions' && <AccessTypesScreen />}
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
} catch (error) {
  console.error("Error rendering view:", error);
  return <div>Error loading view. See console for details.</div>;
}
}

export default App;