/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Period, DragInfo } from './interfaces/types';
import { locations, departments, workShifts, licenses } from './../../global/temp/data_global_temp';
import TopBar from './components/TopBar';
import ScheduleGrid from './components/ScheduleGrid';
import Legends from './components/Legends';
import EmployeeInfo from './components/EmployeeInfo';
import { useAppState } from '../../global/context/AppStateContext';
import { UnifiedEmployee } from '../../global/interfaces/unifiedTypes';

export function SchedulingScreen() {
  // Usar el contexto global
  const { 
    allEmployees, 
    setCurrentEmployee,
    setCurrentScreen
  } = useAppState();
  
  // Estados para la interfaz
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Diario');
  const [selectedDate, setSelectedDate] = useState('2025-02-14');
  // Nuevos estados para el rango de fechas
  const [startDate, setStartDate] = useState('2025-02-14');
  const [endDate, setEndDate] = useState('2025-02-14');
  const [selectedEmployee, setSelectedEmployee] = useState<UnifiedEmployee | null>(null);
  
  // Estado para los filtros avanzados
  const [filterState, setFilterState] = useState({
    sedes: [] as string[],
    departamentos: [] as string[],
    secciones: [] as string[],
    unidades: [] as string[]
  });
  
  // Estado para los empleados filtrados
  const [filteredEmployees, setFilteredEmployees] = useState<UnifiedEmployee[]>([]);
  
  // Estado para empleados que se muestran en el ScheduleGrid
  const [selectedEmployees, setSelectedEmployees] = useState<UnifiedEmployee[]>([]);
  // Estado para empleados seleccionados visualmente
  const [visuallySelectedEmployees, setVisuallySelectedEmployees] = useState<UnifiedEmployee[]>([]);
  // Estado para almacenar las fechas de cada empleado seleccionado
  const [employeeDates, setEmployeeDates] = useState<{[id: string]: {startDate: string, endDate: string}}>({});
  
  const [showShifts, setShowShifts] = useState(true);
  const [showLicenses, setShowLicenses] = useState(true);
  const [editMode] = useState(false);
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const [panelWidth, setPanelWidth] = useState<number>(320); // Ancho inicial del panel izquierdo
  const [isResizing, setIsResizing] = useState<boolean>(false);
  
  // Ref para el panel
  const panelRef = useRef<HTMLDivElement>(null);

  // Inicializar la pantalla actual
  useEffect(() => {
    setCurrentScreen('scheduling');
  }, [setCurrentScreen]);

  // IMPORTANTE: Inicializar los primeros 15 empleados al cargar la pantalla
  useEffect(() => {
    if (allEmployees.length > 0) {
      console.log('Inicializando SchedulingScreen - cargando los primeros 15 empleados');
      
      // Ordenar alfabéticamente los empleados
      const sortedEmployees = [...allEmployees].sort((a, b) => {
        const nameA = (a.displayName || a.name || '').toLowerCase();
        const nameB = (b.displayName || b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
      
      setFilteredEmployees(sortedEmployees);
      
      // Seleccionar los primeros 15 empleados ordenados alfabéticamente
      const numberOfEmployeesToShow = Math.min(15, sortedEmployees.length);
      const initialEmployees = sortedEmployees.slice(0, numberOfEmployeesToShow);
      
      // Importante: seleccionamos estos empleados para que aparezcan en el ScheduleGrid
      // pero no los marcamos visualmente en la interfaz
      setSelectedEmployees(initialEmployees);
      setVisuallySelectedEmployees([]);
      
      // Inicializar fechas para todos los empleados cargados
      const dates: {[id: string]: {startDate: string, endDate: string}} = {};
      initialEmployees.forEach(emp => {
        dates[emp.id] = {
          startDate: emp.startDate || '',
          endDate: emp.endDate || ''
        };
      });
      setEmployeeDates(dates);
    }
  }, [allEmployees]);

  // Aplicar filtros a los empleados
  useEffect(() => {
    let filtered = [...allEmployees];
    
    // Primero, ordenar alfabéticamente
    filtered.sort((a, b) => {
      const nameA = (a.displayName || a.name || '').toLowerCase();
      const nameB = (b.displayName || b.name || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Luego aplicar filtros de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        employee => 
          (employee.displayName?.toLowerCase().includes(term) || false) ||
          (employee.position?.toLowerCase().includes(term) || false) ||
          (employee.department?.toLowerCase().includes(term) || false)
      );
    }

    // Aplicar filtros de sedes, departamentos, etc
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

  // Manejar la selección de un empleado
  const handleSelectEmployee = (employee: UnifiedEmployee, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      // Si se está presionando Ctrl/Cmd, alternar la selección
      const isAlreadySelected = visuallySelectedEmployees.some(emp => emp.id === employee.id);
      
      if (isAlreadySelected) {
        // Eliminar si ya está seleccionado visualmente
        const newVisuallySelected = visuallySelectedEmployees.filter(emp => emp.id !== employee.id);
        setVisuallySelectedEmployees(newVisuallySelected);
        
        // También actualizamos los empleados que se muestran en el grid
        setSelectedEmployees(newVisuallySelected.length > 0 ? newVisuallySelected : filteredEmployees.slice(0, 15));
        
        // Si se deseleccionó el empleado actual, seleccionar el primero de la lista (si hay alguno)
        if (selectedEmployee?.id === employee.id && newVisuallySelected.length > 0) {
          setSelectedEmployee(newVisuallySelected[0]);
          setCurrentEmployee(newVisuallySelected[0]);
        } else if (newVisuallySelected.length === 0) {
          setSelectedEmployee(null);
          setCurrentEmployee(null);
          
          // Si no queda ningún empleado seleccionado, volver a mostrar los 15 primeros
          const top15 = filteredEmployees.slice(0, 15);
          setSelectedEmployees(top15);
          
          // Inicializar fechas para todos los empleados mostrados
          const dates = {...employeeDates};
          top15.forEach(emp => {
            if (!dates[emp.id]) {
              dates[emp.id] = {
                startDate: emp.startDate || '',
                endDate: emp.endDate || ''
              };
            }
          });
          setEmployeeDates(dates);
        }
        
        // Si hay un solo empleado seleccionado, cambiar a vista semanal
        if (newVisuallySelected.length === 1) {
          setSelectedPeriod('Semanal');
        } else {
          // Si hay múltiples o ninguno, cambiar a vista diaria
          setSelectedPeriod('Diario');
        }
      } else {
        // Añadir a la selección visual
        const newVisuallySelected = [...visuallySelectedEmployees, employee];
        setVisuallySelectedEmployees(newVisuallySelected);
        
        // Actualizamos los empleados que se muestran en el grid con los seleccionados
        setSelectedEmployees(newVisuallySelected);
        
        // Si no había empleado seleccionado actualmente, establecer este como el actual
        if (!selectedEmployee) {
          setSelectedEmployee(employee);
          setCurrentEmployee(employee);
        }
        
        // Inicializar fechas para el empleado si no existen
        if (!employeeDates[employee.id]) {
          setEmployeeDates({
            ...employeeDates,
            [employee.id]: {
              startDate: employee.startDate || '',
              endDate: employee.endDate || ''
            }
          });
        }
        
        // Si hay múltiples empleados seleccionados, cambiar a vista diaria
        if (newVisuallySelected.length > 1) {
          setSelectedPeriod('Diario');
        } else {
          // Si solo hay uno, cambiar a vista semanal
          setSelectedPeriod('Semanal');
        }
      }
    } else {
      // Selección simple (sin Ctrl/Cmd)
      const isVisuallySelected = visuallySelectedEmployees.length === 1 && 
                              visuallySelectedEmployees[0].id === employee.id;
      
      if (isVisuallySelected) {
        // Si ya está seleccionado solo este empleado, deseleccionarlo y volver a mostrar los 15 primeros
        setVisuallySelectedEmployees([]);
        
        const top15 = filteredEmployees.slice(0, 15);
        setSelectedEmployees(top15);
        setSelectedEmployee(null);
        setCurrentEmployee(null);
        
        // Volver a vista diaria
        setSelectedPeriod('Diario');
      } else {
        // Selección de un solo empleado, cambiar a vista semanal
        setSelectedEmployee(employee);
        setCurrentEmployee(employee);
        setSelectedEmployees([employee]);
        setVisuallySelectedEmployees([employee]);
        
        // Inicializar fechas para el empleado si no existen
        if (!employeeDates[employee.id]) {
          setEmployeeDates({
            ...employeeDates,
            [employee.id]: {
              startDate: employee.startDate || '',
              endDate: employee.endDate || ''
            }
          });
        }
        
        // Cambiar automáticamente a vista semanal cuando se selecciona un solo empleado
        setSelectedPeriod('Semanal');
      }
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

  // Renderizar la cuadrícula de horarios apropiada según el estado de selección y el período
  const renderScheduleGrid = () => {
    // Si hay empleados seleccionados visualmente
    if (visuallySelectedEmployees.length > 0) {
      // Si es un solo empleado seleccionado o estamos en período semanal
      if (visuallySelectedEmployees.length === 1 || selectedPeriod === 'Semanal') {
        // Mostrar un grid individual para cada empleado con su info
        return (
          <div className="space-y-8">
            {visuallySelectedEmployees.map(employee => (
              <div key={employee.id} className="mb-8">
                <EmployeeInfo 
                  employee={employee}
                  startDate={employeeDates[employee.id]?.startDate || '01-03-2025'}
                  endDate={employeeDates[employee.id]?.endDate || '07-03-2025'}
                />
                
                {/* Grid individual para cada empleado */}
                <ScheduleGrid 
                  employees={[employee]}
                  selectedDate={selectedDate}
                  selectedPeriod={selectedPeriod}
                  workShifts={workShifts}
                  licenses={licenses}
                  dragInfo={dragInfo}
                  setDragInfo={setDragInfo}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            ))}
          </div>
        );
      } else {
        // Si estamos en período diario y hay múltiples empleados seleccionados
        // Mostrar un solo grid con todos los empleados seleccionados (sin EmployeeInfo)
        return (
          <ScheduleGrid 
            employees={visuallySelectedEmployees}
            selectedDate={selectedDate}
            selectedPeriod={selectedPeriod}
            workShifts={workShifts}
            licenses={licenses}
            dragInfo={dragInfo}
            setDragInfo={setDragInfo}
            startDate={startDate}
            endDate={endDate}
          />
        );
      }
    } else {
      // Si no hay empleados seleccionados visualmente, mostrar los 15 por defecto en un solo grid
      return (
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
      );
    }
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
          className="border border-gray-200 rounded-lg bg-white flex flex-col mr-4 ml-4 shadow-sm w-80"
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
                // Verificar si el empleado está seleccionado visualmente
                const isSelected = visuallySelectedEmployees.some(emp => emp.id === employee.id);
                
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
                    {/* Checkmark a la derecha */}
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
          
          <div className="p-2 border-t border-gray-200 bg-gray-50 text-xs text-center text-gray-500 rounded-b-lg">
            {visuallySelectedEmployees.length > 0 ? 
              `Seleccionados: ${visuallySelectedEmployees.length} de ${filteredEmployees.length} empleados` : 
              `Total: ${filteredEmployees.length} empleados`}
          </div>
        </div>

        {/* Divisor redimensionable - siempre visible */}
        <div 
          className={`w-1 bg-gray-100 hover:bg-blue-300 cursor-col-resize ${isResizing ? 'bg-blue-400' : ''}`}
          onMouseDown={handleResizeStart}
        />

        {/* Panel derecho - Información y cuadrícula - SIEMPRE VISIBLE */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Renderizar el grid apropiado según la selección y el período */}
          {renderScheduleGrid()}

          {/* Leyendas de turnos y licencias - Siempre visibles */}
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
          {visuallySelectedEmployees.length > 0 ? 
           ` | Seleccionados: ${visuallySelectedEmployees.length}` : 
           selectedEmployees.length > 0 && ` | Mostrando: ${selectedEmployees.length}`}
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