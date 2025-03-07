/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Period, DragInfo } from './interfaces/types';
import { locations, departments, workShifts, licenses } from './../../global/temp/data_global_temp';
import TopBar from './components/TopBar';
import ScheduleGrid from './components/ScheduleGrid';
import Legends from './components/Legends';
// Importar el contexto de estado global
import { useAppState } from '../../global/context/AppStateContext';
import { UnifiedEmployee } from '../../global/interfaces/unifiedTypes';

export function SchedulingScreen() {
  // Usar el contexto global
  const { 
    allEmployees, 
    currentEmployee, 
    setCurrentEmployee,
    setCurrentScreen
  } = useAppState();
  
  // Estados para la interfaz
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Semanal');
  const [selectedDate, setSelectedDate] = useState('2025-02-14');
  // Nuevos estados para el rango de fechas
  const [startDate, setStartDate] = useState('2025-02-14');
  const [endDate, setEndDate] = useState('2025-02-14');
  const [selectedEmployee, setSelectedEmployee] = useState<UnifiedEmployee | null>(null);
  const [showShifts, setShowShifts] = useState(true);
  const [showLicenses, setShowLicenses] = useState(true);
  const [editMode] = useState(false);
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);

  // Estado para los filtros avanzados (mismo formato que en EmployeeManagementScreen)
  const [filterState, setFilterState] = useState({
    sedes: [] as string[],
    departamentos: [] as string[],
    secciones: [] as string[],
    unidades: [] as string[]
  });

  // Estado para los empleados filtrados
  const [filteredEmployees, setFilteredEmployees] = useState<UnifiedEmployee[]>([]);

  // Inicializar la pantalla actual
  useEffect(() => {
    setCurrentScreen('scheduling');
  }, [setCurrentScreen]);

  // Inicializar los empleados filtrados con todos los empleados
  useEffect(() => {
    setFilteredEmployees(allEmployees);
  }, [allEmployees]);

  // Aplicar filtros a los empleados
  useEffect(() => {
    let filtered = allEmployees;

    // Filtrar por término de búsqueda simple
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        employee => 
          (employee.displayName?.toLowerCase().includes(term) || false) ||
          (employee.position?.toLowerCase().includes(term) || false) ||
          (employee.department?.toLowerCase().includes(term) || false)
      );
    }

    // Aplicar filtros de la misma manera que en EmployeeManagementScreen
    if (filterState.sedes.length > 0) {
      filtered = filtered.filter(emp => 
        filterState.sedes.includes(emp.location || '')
      );
    }

    if (filterState.departamentos.length > 0) {
      filtered = filtered.filter(emp => 
        filterState.departamentos.includes(emp.department || '')
      );
    }

    if (filterState.secciones.length > 0) {
      filtered = filtered.filter(emp => 
        filterState.secciones.includes(emp.section || '')
      );
    }

    if (filterState.unidades.length > 0) {
      filtered = filtered.filter(emp => 
        filterState.unidades.includes(emp.unit || '')
      );
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, filterState, allEmployees]);

  // Manejar cambios en los filtros
  const handleFilterChange = (filters: any) => {
    setFilterState(filters);
  };

  // Limpiar todos los filtros
  // const clearAllFilters = () => {
  //   setFilterState({
  //     sedes: [],
  //     departamentos: [],
  //     secciones: [],
  //     unidades: []
  //   });
  //   setSearchTerm('');
  // };

  // Seleccionar el empleado actual cuando cambia
  useEffect(() => {
    console.log('Inicializando SchedulingScreen');
    
    // Si hay un empleado seleccionado en el contexto, usarlo
    if (currentEmployee) {
      console.log('Empleado encontrado en el contexto global:', currentEmployee.displayName);
      setSelectedEmployee(currentEmployee);
    } else if (allEmployees.length > 0) {
      // Si no hay empleado seleccionado en el contexto, usar el primero de la lista
      console.log('No hay empleado seleccionado, usando el primero de la lista');
      setSelectedEmployee(allEmployees[0]);
    }
  }, [currentEmployee, allEmployees]);

  // Manejar la selección de un empleado
  const handleSelectEmployee = (employee: UnifiedEmployee) => {
    setSelectedEmployee(employee);
    setCurrentEmployee(employee);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-screen bg-gray-100">
      {/* Top Bar con filtros y controles actualizados */}
      <TopBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showShifts={showShifts}
        setShowShifts={setShowShifts}
        showLicenses={showLicenses}
        setShowLicenses={setShowLicenses}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        // Props para los filtros
        locations={locations}
        departments={departments}
        employees={allEmployees}
        onAdvancedFilterChange={handleFilterChange}
      />

      <div className="flex-1 overflow-hidden flex p-4">
        {/* Panel izquierdo - Lista de empleados adaptada para usar el modelo unificado */}
        <div className="w-80 border border-gray-200 rounded-lg bg-white flex flex-col mr-4 ml-4 shadow-sm">
          <div className="p-2 bg-blue-600 border-b border-gray-200 flex justify-center rounded-t-lg">
            <h3 className="font-medium text-white text-md">Empleados</h3>
          </div>

          <div className="flex-1 overflow-auto">
            {filteredEmployees.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No se encontraron empleados
              </div>
            ) : (
              filteredEmployees.map((employee) => {
                return (
                  <button
                    key={employee.id}
                    onClick={() => handleSelectEmployee(employee)}
                    className={`w-full text-left p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{employee.displayName || employee.name}</h3>
                      <p className="text-xs text-gray-500">{employee.position || employee.cargo}</p>
                      <p className="text-xs text-gray-500">{employee.department}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {/* Aquí iría el ícono de estado si aplica */}
                    </div>
                  </button>
                );
              })
            )}
          </div>
          
          <div className="p-2 border-t border-gray-200 bg-gray-50 text-xs text-center text-gray-500 rounded-b-lg">
            Total: {filteredEmployees.length} empleados
          </div>
        </div>

        {/* Panel derecho - Información y cuadrícula */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Información del empleado seleccionado */}
          {selectedEmployee && (
            <div className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1">
                  <div className="text-xs text-gray-500 mb-1">Código:</div>
                  <div className="font-medium">{selectedEmployee.codigo || selectedEmployee.id}</div>
                </div>
                
                <div className="col-span-1">
                  <div className="text-xs text-gray-500 mb-1">Sede:</div>
                  <div className="font-medium">{selectedEmployee.location || selectedEmployee.sede}</div>
                </div>
                
                <div className="col-span-1">
                  <div className="text-xs text-gray-500 mb-1">Departamento:</div>
                  <div className="font-medium">{selectedEmployee.department}</div>
                </div>
                
                <div className="col-span-1">
                  <div className="text-xs text-gray-500 mb-1">Cargo:</div>
                  <div className="font-medium">{selectedEmployee.position || selectedEmployee.cargo}</div>
                </div>
                
                <div className="col-span-1">
                  <div className="text-xs text-gray-500 mb-1">Tipo De Contrato:</div>
                  <div className="font-medium">{selectedEmployee.contractType || selectedEmployee.modalidadTiempo || 'Indefinido'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Cuadrícula de horarios */}
          <ScheduleGrid 
            employee={selectedEmployee}
            selectedDate={selectedDate}
            selectedPeriod={selectedPeriod}
            workShifts={workShifts}
            licenses={licenses}
            dragInfo={dragInfo}
            setDragInfo={setDragInfo}
            startDate={startDate}
            endDate={endDate}
          />

          {/* Leyendas de turnos y licencias */}
          <Legends 
            workShifts={workShifts}
            licenses={licenses}
            showShifts={showShifts}
            showLicenses={showLicenses}
          />
        </div>
      </div>

      {/* Barra de estado en la parte inferior */}
      <div className="p-2 bg-white border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <div>
          Total empleados: {filteredEmployees.length} / {allEmployees.length}
        </div>
        <div>
          {editMode ? (
            <span className="text-blue-600">Modo edición activo</span>
          ) : (
            <span>Modo visualización</span>
          )}
        </div>
        <div>
          Última actualización: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default SchedulingScreen;