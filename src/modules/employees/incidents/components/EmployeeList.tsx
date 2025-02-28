import React from 'react';
import { Employee } from '../interface/types';
import { CheckCircle2} from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee) => void;
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
    employee.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener el ícono de estado del empleado
  const getStatusIcon = (employee: Employee) => {
    // Aquí podrías implementar lógica para mostrar diferentes estados
    // Por ahora, mostramos un círculo de check genérico
    console.log(employee);   
    return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="w-72 border border-gray-200 rounded-lg bg-white flex flex-col mr-4 shadow-sm">
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
                <h3 className="font-medium text-gray-900">{employee.nombre} {employee.apellidos}</h3>
                <p className="text-xs text-gray-500">{employee.position}</p>
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