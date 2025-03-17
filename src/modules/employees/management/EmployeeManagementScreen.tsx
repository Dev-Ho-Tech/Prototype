/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, SVGProps } from 'react';
import { Search, Plus, Download, Settings, Clock, Fingerprint, ArrowLeft, ChevronDown } from 'lucide-react';
import { CustomPieChart } from '../../../components/common/PieChart';
import { departmentData, locationData } from './temp/data_kpis';
import { EmployeeProfileForm } from './components/EmployeeProfile';
import { MarkingMethodComponent } from './components/kpiAndCards/MarkingMethodComponent';
import { StatsSection } from './components/kpiAndCards/StatsSection';
import AdvancedFilters from './components/Search/AdvancedFilters';
import { Pagination } from './components/Pagination';

import { useAppState } from '../../../global/context/AppStateContext';
import { convertToSpecificModel, UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';
import { JSX } from 'react/jsx-runtime';

interface EmployeeManagementScreenProps {
  setCurrentView: (view: string) => void;
}

export function EmployeeManagementScreen({ setCurrentView }: EmployeeManagementScreenProps) {
  // Usar el contexto global
  const { 
    allEmployees, 
    currentEmployee, 
    setCurrentEmployee, 
    setCurrentScreen 
  } = useAppState();
  
  const UserIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="8" r="4" fill="currentColor"/>
      <path d="M4 20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V20Z" fill="currentColor"/>
    </svg>
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<UnifiedEmployee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [, setFilterState] = useState({
    sedes: [],
    departamentos: [],
    secciones: [],
    unidades: []
  });
  
  // Nuevo estado para los filtros de KPI
  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);
  
  const itemsPerPage = 10;

  // Calcular estadísticas para los KPIs
  const calculateStats = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    const activeEmployees = allEmployees.filter(emp => emp.status === 'active');
    const inactiveEmployees = allEmployees.filter(emp => emp.status !== 'active');
    
    // Empleados recientes (contratados en los últimos 30 días)
    const recentAdditions = allEmployees.filter(emp => {
      if (!emp.fechaInicialContrato) return false;
      const startDate = new Date(emp.fechaInicialContrato);
      return startDate >= thirtyDaysAgo && startDate <= now;
    });
    
    // Empleados que salieron recientemente (con contrato finalizado en los últimos 30 días)
    const recentExits = allEmployees.filter(emp => {
      if (!emp.fechaFinalContrato) return false;
      const endDate = new Date(emp.fechaFinalContrato);
      return endDate >= thirtyDaysAgo && endDate <= now;
    });
    
    return {
      active: activeEmployees.length,
      inactive: inactiveEmployees.length,
      recentAdditions: recentAdditions.length,
      recentExits: recentExits.length
    };
  };
  
  const stats = calculateStats();

  // Actualizar el estado de pantalla actual al cargar el componente
  useEffect(() => {
    setCurrentScreen('employee');
  }, [setCurrentScreen]);

  const markingMethodsData = [
    {
      icon: <Fingerprint className="w-8 h-8" />,
      count: 300,
      label: 'Rostro',
      percentage: 77
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      count: 88,
      label: 'Huella',
      percentage: 23
    }
  ];

  // Función para aplicar filtros basados en el KPI seleccionado
  const applyKpiFilter = (employees: UnifiedEmployee[]) => {
    if (!activeKpiFilter) return employees;
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    switch (activeKpiFilter) {
      case 'active':
        return employees.filter(emp => emp.status === 'active');
      case 'inactive':
        return employees.filter(emp => emp.status !== 'active');
      case 'recent-additions':
        return employees.filter(emp => {
          if (!emp.fechaInicialContrato) return false;
          const startDate = new Date(emp.fechaInicialContrato);
          return startDate >= thirtyDaysAgo && startDate <= now;
        });
      case 'recent-exits':
        return employees.filter(emp => {
          if (!emp.fechaFinalContrato) return false;
          const endDate = new Date(emp.fechaFinalContrato);
          return endDate >= thirtyDaysAgo && endDate <= now;
        });
      default:
        return employees;
    }
  };

  // Filtrar empleados según el término de búsqueda y el KPI seleccionado
  const filteredEmployees = applyKpiFilter(
    allEmployees.filter(
      (employee) =>
        employee.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeClick = (employee: UnifiedEmployee) => {
    // Actualizar tanto el estado local como el global
    setSelectedEmployee(employee);
    setCurrentEmployee(employee);
    setShowProfile(true);
  };

  const onSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handleFilterChange = (filters: any) => {
    setFilterState(filters);
    // Aquí podríamos aplicar los filtros a la lista de empleados si fuera necesario
  };

  const clearAllFilters = () => {
    setFilterState({
      sedes: [],
      departamentos: [],
      secciones: [],
      unidades: []
    });
    setSearchTerm('');
    setActiveKpiFilter(null); // También limpiamos el filtro KPI
  };
  
  const handleAddNewEmployee = () => {
    setSelectedEmployee(null);
    setCurrentEmployee(null);
    setShowProfile(true);
  };

  // Manejador para cambios de filtro KPI
  const handleKpiFilterChange = (filter: string | null) => {
    setActiveKpiFilter(filter);
    // Reset a la primera página cuando cambiamos el filtro
    setCurrentPage(1);
  };

  // Función para navegar a SchedulingScreen
  const handleNavigateToScheduling = (employee: UnifiedEmployee) => {
    try {
      console.log('Navegando a scheduling con empleado:', employee);
      
      // Guardar el empleado en el estado global
      setCurrentEmployee(employee);
      setCurrentScreen('scheduling');
      
      // También guardamos en sessionStorage como respaldo
      sessionStorage.setItem('selectedEmployeeId', employee.id);
      
      // Navegar a la vista de scheduling
      setCurrentView('/employees/schedule');
    } catch (error) {
      console.error('Error al navegar a scheduling:', error);
      // Si hay un error, intentar navegar directamente
      setCurrentView('/employees/schedule');
    }
  };

  // Función para navegar a IncidenciasScreen
  const handleNavigateToIncidencias = (employee: UnifiedEmployee) => {
    try {
      console.log('Navegando a incidencias con empleado:', employee);
      
      // Guardar el empleado en el estado global
      setCurrentEmployee(employee);
      setCurrentScreen('incidencias');
      
      // También guardamos en sessionStorage como respaldo
      sessionStorage.setItem('selectedEmployeeId', employee.id);
      
      // Navegar a la vista de incidencias
      setCurrentView('/employees/incidencias');
    } catch (error) {
      console.error('Error al navegar a incidencias:', error);
      // Si hay un error, intentar navegar directamente
      setCurrentView('/employees/incidencias');
    }
  };

  // Mostramos información sobre el filtro activo para mejor UX
  const renderActiveFilter = () => {
    if (!activeKpiFilter) return null;
    
    let filterText = '';
    switch (activeKpiFilter) {
      case 'active':
        filterText = 'Mostrando solo empleados activos';
        break;
      case 'inactive':
        filterText = 'Mostrando solo empleados inactivos';
        break;
      case 'recent-additions':
        filterText = 'Mostrando solo empleados recién incorporados (últimos 30 días)';
        break;
      case 'recent-exits':
        filterText = 'Mostrando solo empleados que han salido recientemente (últimos 30 días)';
        break;
    }
    
    return (
      <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg mb-4">
        <span className="text-blue-700 text-sm">{filterText}</span>
        <button 
          onClick={() => setActiveKpiFilter(null)}
          className="text-blue-600 text-sm hover:underline"
        >
          Quitar filtro
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8 relative">
      {/* Mostrar perfil cuando está seleccionado */}
      {showProfile ? (
        <div>
          <div className="mb-6">
            <button 
              onClick={handleCloseProfile}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a la lista de empleados
            </button>
          </div>
          <EmployeeProfileForm 
            employee={selectedEmployee}
            onClose={handleCloseProfile}
          />
        </div>
      ) : (
        <>
          {/* Stats Section - Ahora con filtros interactivos */}
          <StatsSection 
            activeFilter={activeKpiFilter} 
            onFilterChange={handleKpiFilterChange}
            stats={stats}
          />

          {/* Charts Section */}
          <div className="grid grid-cols-3 gap-6 mb-3">
            <CustomPieChart data={locationData} title="Empleados por sedes" />
            <CustomPieChart data={departmentData} title="Empleados por departamentos" />
            <MarkingMethodComponent methods={markingMethodsData} title="Método de marcaje" />
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-700">Empleados</h2>
              </div>

              {/* Mostrar filtro activo */}
              {renderActiveFilter()}

              {/* Nueva disposición: todo en una sola fila */}
              <div className="flex items-center justify-between gap-4">
                {/* Buscador con ancho flexible */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por ID, Cédula, Nombre, Sede, Departamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-36 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={toggleAdvancedFilters}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-xs text-blue-600 hover:bg-blue-50 rounded-md flex items-center"
                  >
                    {showAdvancedFilters ? 'Búsqueda simple' : 'Búsqueda avanzada'}
                    <ChevronDown className={`ml-1 w-3 h-3 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center space-x-3 shrink-0">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Exportar</span>
                  </button>
                  <button
                    onClick={handleAddNewEmployee}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Empleado</span>
                  </button>
                </div>
              </div>

              {/* Panel de filtros avanzados (condicionalmente renderizado) */}
              {showAdvancedFilters && (
                 <div className="bg-white rounded-lg border border-gray-200 shadow-sm absolute left-15 z-20 w-96">
                  <AdvancedFilters 
                    searchTerm={searchTerm}
                    onSearchTermChange={onSearchTermChange}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearAllFilters}
                    employees={allEmployees.map(emp => convertToSpecificModel(emp, 'employee'))}
                  />
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Identificación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Empleado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sede
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Departamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Método
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                        No se encontraron empleados con los filtros seleccionados
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((employee) => {
                        // Convertir al modelo específico para esta pantalla
                        const displayEmployee = convertToSpecificModel(employee, 'employee');
                        const isSelected = currentEmployee?.id === employee.id;
                        
                        return (
                          <tr 
                            key={employee.id} 
                            className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                            onClick={() => handleEmployeeClick(employee)}
                          >
                            <td className="px-6 py-4">
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{employee.id}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                  {displayEmployee.initial || employee.displayName?.charAt(0) || '?'}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{displayEmployee.name}</p>
                                  <p className="text-sm text-gray-500">{displayEmployee.position}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{displayEmployee.location}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{displayEmployee.department}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {displayEmployee.method === 'Rostro' ? (
                                  <UserIcon className="w-3 h-3 mr-1" />
                                ) : displayEmployee.method === 'Huella' ? (
                                  <Fingerprint className="w-3 h-3 mr-1" />
                                ) : (
                                  <Fingerprint className="w-3 h-3 mr-1" />
                                )}
                                {displayEmployee.method || 'No definido'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-gray-400 hover:text-blue-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEmployeeClick(employee);
                                  }}
                                  title="Editar empleado"
                                >
                                  <Settings className="w-5 h-5" />
                                </button>
                                <button 
                                  className="text-gray-400 hover:text-blue-600"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('Botón de planificar horarios clickeado para:', displayEmployee.name);
                                    handleNavigateToScheduling(employee);
                                  }}
                                  title="Planificar horarios"
                                >
                                  <Clock className="w-5 h-5" />
                                </button>
                                <button 
                                  className="text-gray-400 hover:text-amber-600"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('Botón de incidencias clickeado para:', displayEmployee.name);
                                    handleNavigateToIncidencias(employee);
                                  }}
                                  title="Ver incidencias"
                                >
                                  <Fingerprint className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Mostrando {filteredEmployees.length > 0 ? Math.min((currentPage - 1) * itemsPerPage + 1, filteredEmployees.length) : 0} a {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} de {filteredEmployees.length} empleados
                  </div>
                  {/* Paginación */}
                  {filteredEmployees.length > 0 && (
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}