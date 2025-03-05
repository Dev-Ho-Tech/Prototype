/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Employee, Period, DragInfo } from './interfaces/types';
import { locations, departments, sections, units, mapEmployeeToOrganization ,workShifts, licenses, employees } from './data';
import TopBar from './components/TopBar';
import EmployeeList from './components/EmployeeList';
import EmployeeInfo from './components/EmployeeInfo';
import ScheduleGrid from './components/ScheduleGrid';
import Legends from './components/Legends';

// Mejorar la estructura de los empleados con datos de organización
const enhancedEmployees = employees.map(emp => mapEmployeeToOrganization(emp));

export function SchedulingScreen() {
  // Estados para la interfaz
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Semanal');
  const [selectedDate, setSelectedDate] = useState('2025-02-14');
  // Nuevos estados para el rango de fechas
  const [startDate, setStartDate] = useState('2025-02-14');
  const [endDate, setEndDate] = useState('2025-02-14');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(enhancedEmployees[0]);
  const [showShifts, setShowShifts] = useState(true);
  const [showLicenses, setShowLicenses] = useState(true);
  const [editMode] = useState(false);
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);

  // Estado para los filtros avanzados
  const [advancedFilters, setAdvancedFilters] = useState({
    selectedLocations: [] as string[],
    selectedDepartments: [] as string[],
    selectedSections: [] as string[],
    selectedUnits: [] as string[],
    selectedEmployees: [] as string[]
  });

  // Estado para los empleados filtrados
  const [filteredEmployees, setFilteredEmployees] = useState(enhancedEmployees);

  // Aplicar filtros a los empleados
  useEffect(() => {
    let filtered = enhancedEmployees;

    // Filtrar por término de búsqueda simple
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        employee => 
          employee.name.toLowerCase().includes(term) ||
          employee.position.toLowerCase().includes(term) ||
          employee.department.toLowerCase().includes(term)
      );
    }

    // Aplicar filtros avanzados
    if (advancedFilters.selectedLocations.length > 0) {
      filtered = filtered.filter(emp => 
        advancedFilters.selectedLocations.includes(emp.locationId)
      );
    }

    if (advancedFilters.selectedDepartments.length > 0) {
      filtered = filtered.filter(emp => 
        advancedFilters.selectedDepartments.includes(emp.departmentId)
      );
    }

    // Para secciones y unidades, necesitaríamos tener esa información en los registros de empleados
    // Este es un filtrado simplificado

    if (advancedFilters.selectedEmployees.length > 0) {
      filtered = filtered.filter(emp => 
        advancedFilters.selectedEmployees.includes(emp.id)
      );
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, advancedFilters]);

  // Manejar cambios en los filtros avanzados
  const handleAdvancedFilterChange = (filters: any) => {
    setAdvancedFilters(filters);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-screen bg-gray-100">
      {/* Top Bar con filtros y controles */}
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
        // Nuevas props para filtros avanzados
        locations={locations}
        departments={departments}
        sections={sections}
        units={units}
        employees={enhancedEmployees}
        onAdvancedFilterChange={handleAdvancedFilterChange}
      />

      <div className="flex-1 overflow-hidden flex p-4">
        {/* Panel izquierdo - Lista de empleados */}
        <EmployeeList 
          employees={filteredEmployees}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          searchTerm={searchTerm}
        />

        {/* Panel derecho - Información y cuadrícula */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Información del empleado seleccionado */}
          {selectedEmployee && <EmployeeInfo employee={selectedEmployee} />}

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
          Total empleados: {filteredEmployees.length} / {employees.length}
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