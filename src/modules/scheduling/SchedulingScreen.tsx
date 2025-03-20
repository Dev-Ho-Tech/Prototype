/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Period, DragInfo } from './interfaces/types';
import { locations, departments, workShifts, licenses } from './../../global/temp/data_global_temp';
import TopBar from './components/TopBar';
import ScheduleGrid from './components/ScheduleGrid';
import Legends from './components/Legends';
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
  // Nuevo estado para selección múltiple
  const [selectedEmployees, setSelectedEmployees] = useState<UnifiedEmployee[]>([]);
  const [showShifts, setShowShifts] = useState(true);
  const [showLicenses, setShowLicenses] = useState(true);
  const [editMode] = useState(false);
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const [panelWidth, setPanelWidth] = useState<number>(320); // Ancho inicial del panel izquierdo
  const [isResizing, setIsResizing] = useState<boolean>(false);

  // Estado para los filtros avanzados (mismo formato que en EmployeeManagementScreen)
  const [filterState, setFilterState] = useState({
    sedes: [] as string[],
    departamentos: [] as string[],
    secciones: [] as string[],
    unidades: [] as string[]
  });

  // Estado para los empleados filtrados
  const [filteredEmployees, setFilteredEmployees] = useState<UnifiedEmployee[]>([]);

  // Ref para el panel
  const panelRef = useRef<HTMLDivElement>(null);

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

  // Ordenar los empleados alfabéticamente
  useEffect(() => {
    // Ordenar los empleados alfabéticamente
    setFilteredEmployees(prevEmployees => {
      return [...prevEmployees].sort((a, b) => {
        const nameA = (a.displayName || a.name || '').toLowerCase();
        const nameB = (b.displayName || b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
    });
  }, [filteredEmployees.length]); // Solo ordenar cuando cambia la cantidad de empleados filtrados

  // Manejar cambios en los filtros
  const handleFilterChange = (filters: any) => {
    setFilterState(filters);
  };

  // Seleccionar el empleado actual cuando cambia
  useEffect(() => {
    console.log('Inicializando SchedulingScreen');
    
    // Si hay un empleado seleccionado en el contexto, usarlo
    if (currentEmployee) {
      console.log('Empleado encontrado en el contexto global:', currentEmployee.displayName);
      setSelectedEmployee(currentEmployee);
      setSelectedEmployees([currentEmployee]); // También actualizar el array de seleccionados
    } else if (allEmployees.length > 0) {
      // Si no hay empleado seleccionado en el contexto, usar el primero de la lista
      console.log('No hay empleado seleccionado, usando el primero de la lista');
      setSelectedEmployee(allEmployees[0]);
      setSelectedEmployees([allEmployees[0]]); // También actualizar el array de seleccionados
    }
  }, [currentEmployee, allEmployees]);

  // Manejar la selección de un empleado
  const handleSelectEmployee = (employee: UnifiedEmployee, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      // Si se está presionando Ctrl/Cmd, alternar la selección
      if (selectedEmployees.some(emp => emp.id === employee.id)) {
        // Eliminar si ya está seleccionado
        const newSelected = selectedEmployees.filter(emp => emp.id !== employee.id);
        setSelectedEmployees(newSelected);
        
        // Si se deseleccionó el empleado actual, seleccionar el primero de la lista (si hay alguno)
        if (selectedEmployee?.id === employee.id && newSelected.length > 0) {
          setSelectedEmployee(newSelected[0]);
          setCurrentEmployee(newSelected[0]);
        } else if (newSelected.length === 0) {
          setSelectedEmployee(null);
          setCurrentEmployee(null);
        }
      } else {
        // Añadir a la selección
        const newSelected = [...selectedEmployees, employee];
        setSelectedEmployees(newSelected);
        
        // Si no había empleado seleccionado actualmente, establecer este como el actual
        if (!selectedEmployee) {
          setSelectedEmployee(employee);
          setCurrentEmployee(employee);
        }
      }
    } else {
      // Selección simple (sin Ctrl/Cmd)
      setSelectedEmployee(employee);
      setCurrentEmployee(employee);
      setSelectedEmployees([employee]);
    }
  };

  // Manejar el inicio del redimensionamiento
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      // Establecer el nuevo ancho basado en la posición del cursor
      const newWidth = moveEvent.clientX;
      
      // Limitar el ancho a mínimos y máximos
      const minPanelWidth = 280; // Ancho mínimo del panel izquierdo
      const maxPanelWidth = window.innerWidth * 0.7; // Ancho máximo (70% de la ventana)
      
      // También asegurar que quede espacio suficiente para el panel derecho
      const minRightPanelWidth = 400; // Ancho mínimo que debe tener el panel derecho
      const maxAllowedLeftPanelWidth = window.innerWidth - minRightPanelWidth;
      
      // Calcular el ancho final respetando todas las restricciones
      const finalWidth = Math.max(minPanelWidth, Math.min(newWidth, maxPanelWidth, maxAllowedLeftPanelWidth));
      
      setPanelWidth(finalWidth);
    };
    
    const onMouseUp = () => {
      setIsResizing(false);
      // Eliminar event listeners cuando se suelta el ratón
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    // Agregar event listeners para seguir el movimiento del ratón
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
        <div 
          ref={panelRef}
          className={`border border-gray-200 rounded-lg bg-white flex flex-col mr-4 ml-4 shadow-sm ${selectedEmployee ? '' : 'w-full'}`}
          style={selectedEmployee ? { width: `${panelWidth}px` } : {}}
        >
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
                const isSelected = selectedEmployees.some(emp => emp.id === employee.id);
                return (
                  <button
                    key={employee.id}
                    onClick={(e) => handleSelectEmployee(employee, e.ctrlKey || e.metaKey)}
                    className={`w-full text-left py-2 px-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <div className="flex-shrink-0 w-1 h-10 rounded-full" style={{ backgroundColor: isSelected ? '#3b82f6' : 'transparent' }}></div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900 truncate mr-2">{employee.displayName || employee.name}</h3>
                          <span className="text-xs text-gray-500 truncate">• {employee.department}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{employee.position || employee.cargo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
          
          <div className="p-2 border-t border-gray-200 bg-gray-50 text-xs text-center text-gray-500 rounded-b-lg">
            {selectedEmployees.length > 0 ? 
              `Seleccionados: ${selectedEmployees.length} de ${filteredEmployees.length} empleados` : 
              `Total: ${filteredEmployees.length} empleados`}
          </div>
        </div>

        {/* Divisor redimensionable */}
        {selectedEmployee && (
          <div 
            className={`w-1 bg-gray-100 hover:bg-blue-300 cursor-col-resize ${isResizing ? 'bg-blue-400' : ''}`}
            onMouseDown={handleResizeStart}
          />
        )}

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

          {/* Cuadrícula de horarios - Actualizada para múltiples empleados */}
          <ScheduleGrid 
            employees={selectedEmployees}
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
          {selectedEmployees.length > 0 && ` | Seleccionados: ${selectedEmployees.length}`}
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