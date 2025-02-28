import { useState } from 'react';
import { Employee, Period, DragInfo } from './interfaces/types';
import { workShifts, licenses, employees } from './data';
import TopBar from './components/TopBar';
import EmployeeList from './components/EmployeeList';
import EmployeeInfo from './components/EmployeeInfo';
import ScheduleGrid from './components/ScheduleGrid';
import Legends from './components/Legends';

export function SchedulingScreen() {
  // Estados para la interfaz
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Semanal');
  const [selectedDate, setSelectedDate] = useState('2025-02-14');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(employees[0]);
  const [showShifts, setShowShifts] = useState(true);
  const [showLicenses, setShowLicenses] = useState(true);
  const [editMode] = useState(false);
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);

  // Actualizar datos de empleado
  // const updateEmployee = (updatedEmployee: Employee) => {
  //   const updatedEmployees = employees.map(emp => 
  //     emp.id === updatedEmployee.id ? updatedEmployee : emp
  //   );
  //   // Aquí se actualizaría normalmente la lista de empleados en el estado global o se haría una petición API
  //   // Por simplicidad, solo actualizamos el empleado seleccionado
  //   setSelectedEmployee(updatedEmployee);
  // };

  // Guardar cambios
  // const saveChanges = () => {
  //   // Aquí iría la lógica para guardar cambios en la base de datos o API
  //   console.log('Guardando cambios...');
  //   alert('Cambios guardados correctamente');
  // };

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
      />

      <div className="flex-1 overflow-hidden flex p-4">
        {/* Panel izquierdo - Lista de empleados */}
        <EmployeeList 
          employees={employees}
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
          Total empleados: {employees.length}
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