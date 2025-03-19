import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LogoutModal } from './modules/auth/components/LogoutModal';
import { authService } from './modules/auth/services/authService';
import { Sidebar } from './components/layout/Sidebar';
import { EmployeeManagementScreen } from './modules/employees/management/EmployeeManagementScreen';
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
// import { VisitorsScreen } from './modules/access-control/visitors/VisitorsScreen';
// import { PermissionsScreen } from './modules/access-control/permissions/PermissionsScreen';
import { MonitoringScreen } from './modules/access-control/monitoring/MonitoringScreen';
import { LoginScreen } from './modules/auth/login/LoginScreen';
import DashboardScreen from './modules/dashboard/DashboardScreen';
import ComedorScreen from './modules/system-config/diner/ComedorScreen';
// Importa el proveedor de contexto
import { AppStateProvider } from './global/context/AppStateContext';
import GeofenceModule from './modules/employees/geocerca/geocercaScreen';
import EmailTemplatesPage from './modules/system-config/emial/emailScreen';
import { ProfileManagementScreen } from './modules/administration/profiles/ProfileManagementScreen';
import { WorkShiftsScreen } from './modules/system-config/modality/WorkShiftsScreen';
import ReportsScreen from './modules/reports/ReportsScreen';
import VisitorsScreen from './modules/access-control/visitors/VisitorsScreen';
import  PermisosScreen  from './modules/access-control/permissions/PermissionsScreen';

// Variable para almacenar el estado global (podemos mantenerla por compatibilidad)
// eslint-disable-next-line react-refresh/only-export-components
export const appState = {
  selectedEmployeeId: null as string | null,
  // Puedes agregar más estados globales si es necesario
};

// Componente para manejar el estado de autenticación de la aplicación
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isViewTransitioning, setIsViewTransitioning] = useState(false);

  // Verificar el estado de autenticación cuando cambia la ubicación
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      // Si no está autenticado y no está en la página de login, redirigir
      if (!authenticated && location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };
    
    checkAuth();
  }, [location, navigate]);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      setIsAuthenticated(false);
      setShowLogoutModal(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [navigate]);

  const handleLogoutClick = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setIsViewTransitioning(true);
    setTimeout(() => {
      navigate(view);
      setIsViewTransitioning(false);
    }, 150);
  }, [navigate]);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentView={location.pathname} 
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
        <Routes>
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/employees/management" element={<EmployeeManagementScreen setCurrentView={handleViewChange} />} />
          <Route path="/employees/records" element={<RecordsScreen />} />
          <Route path="/employees/schedule" element={<SchedulingScreen />} />
          <Route path="/employees/check-profiles" element={<CheckProfilesScreen />} />
          <Route path="/employees/geocerca" element={<GeofenceModule />} />
          <Route path="/employees/biometric" element={<BiometricScreen />} />
          <Route path="/employees/incidencias" element={<IncidenciasScreen />} />
          <Route path="/administration/licenses" element={<LicensesScreen />} />
          <Route path="/administration/users" element={<UsersScreen />} />
          <Route path="/administration/perfil" element={<ProfileManagementScreen />} />
          <Route path="/administration/config" element={<ConfigScreen />} />
          <Route path="/system-config/structure" element={<StructureScreen />} />
          <Route path="/system-config/positions" element={<AccessTypesScreen />} />
          <Route path="/system-config/devices" element={<DevicesScreen />} />
          <Route path="/system-config/employee-types" element={<EmployeeTypesScreen />} />
          <Route path="/system-config/contracts" element={<ContractsScreen />} />
          <Route path="/system-config/modality" element={<WorkShiftsScreen />} />
          <Route path="/system-config/diner" element={<ComedorScreen />} />
          <Route path="/system-config/email" element={<EmailTemplatesPage />} />
          <Route path="/time-control/calendar" element={<CalendarScreen />} />
          <Route path="/time-control/checks" element={<ChecksScreen />} />
          <Route path="/time-control/hours-approval" element={<HoursApprovalScreen />} />
          <Route path="/time-control/absence" element={<AbsencesScreen />} />
          <Route path="/dining/rooms" element={<DiningRoomsScreen />} />
          <Route path="/dining/schedule" element={<DiningScheduleScreen />} />
          <Route path="/dining/access" element={<DiningAccessScreen />} />
          <Route path="/dining/reports" element={<DiningReportsScreen />} />
          <Route path="/access/doors" element={<DoorsScreen />} />
          <Route path="/access/visitors" element={<VisitorsScreen />} />
          <Route path="/access/permissions" element={<PermisosScreen />} />
          <Route path="/access/monitoring" element={<MonitoringScreen />} />
          <Route path="/reports/attendance/*" element={<ReportsScreen />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    // Envuelve toda la aplicación con el AppStateProvider
    <AppStateProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginScreen onLogin={() => window.location.href = '/dashboard'} />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </AppStateProvider>
  );
}

export default App;