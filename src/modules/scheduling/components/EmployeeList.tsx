import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Circle, Clock } from 'lucide-react';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';

interface EmployeeListProps {
  employees: UnifiedEmployee[];
  selectedEmployee: UnifiedEmployee | null;
  setSelectedEmployee: (employee: UnifiedEmployee) => void;
  searchTerm: string;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  selectedEmployee,
  setSelectedEmployee,
  searchTerm
}) => {
  // Filtrar empleados basado en el término de búsqueda
  const filteredEmployees = employees.filter(employee =>
    (employee.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (employee.department?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  // Función para obtener el ícono de estado del empleado
  const getStatusIcon = (employee: UnifiedEmployee) => {
    const todayDate = new Date().toISOString().split('T')[0];
    const todaySchedule = employee.schedule?.find(s => s.date === todayDate);
    
    if (!todaySchedule) return <Circle className="w-4 h-4 text-gray-400" />;
    
    // Evaluar estado según el horario y los marcajes biométricos
    if (['D', 'V', 'LPM', 'LPTE', 'E', 'TL', 'NDH', 'M', 'LPF', 'EEM', 'IPA'].includes(todaySchedule.shift)) {
      return <Clock className="w-4 h-4 text-blue-500" />; // Licencia o descanso
    } else if (todaySchedule.status === 'onTime') {
      return <CheckCircle2 className="w-4 h-4 text-green-500" />; // A tiempo
    } else if (todaySchedule.status === 'late') {
      return <AlertCircle className="w-4 h-4 text-orange-500" />; // Tarde
    } else if (todaySchedule.status === 'early') {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />; // Salida temprana
    } else if (todaySchedule.status === 'absent') {
      return <XCircle className="w-4 h-4 text-red-500" />; // Ausente
    }
    
    return <Circle className="w-4 h-4 text-gray-400" />; // Pendiente o sin información
  };

  return (
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
          filteredEmployees.map((employee) => (
            <button
              key={employee.id}
              onClick={() => setSelectedEmployee(employee)}
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
                {getStatusIcon(employee)}
              </div>
            </button>
          ))
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200 bg-gray-50 text-xs text-center text-gray-500 rounded-b-lg">
        Total: {filteredEmployees.length} empleados
      </div>
    </div>
  );
};

export default EmployeeList;