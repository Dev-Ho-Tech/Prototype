import React from 'react';
import { Employee } from '../interface/types';
import EmployeeAvatar from './EmployeeAvatar';

interface EmployeeDetailHeaderProps {
  employee: Employee;
}

const EmployeeDetailHeader: React.FC<EmployeeDetailHeaderProps> = ({ employee }) => {
  // Datos de prueba complementarios para los campos que no existen
  const mockData = {
    supervisor: 'María González Pérez'
  };

  // Combinamos los datos reales con los de prueba
  const completeEmployee = {
    ...employee,
    supervisor: employee.supervisor || mockData.supervisor
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h2 className="text-sm font-medium text-gray-700 mb-4">Datos de la persona</h2>
      
      <div className="flex">
        <div className="mr-6">
          <EmployeeAvatar 
            photoUrl={completeEmployee.photoUrl} 
            name={`${completeEmployee.nombre} ${completeEmployee.apellidos}`}
            size="large"
          />
        </div>
        
        <div className="grid grid-cols-6 gap-x-4 gap-y-4 flex-1">
          {/* Primera fila - 6 columnas  */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Nombres:</div>
            <div className="text-sm font-medium">{completeEmployee.nombre}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Apellidos:</div>
            <div className="text-sm font-medium">{completeEmployee.apellidos}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Compañia:</div>
            <div className="text-sm font-medium">{completeEmployee.company}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sucursal:</div>
            <div className="text-sm font-medium">Hodelpa Gran Almirante</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Departamento:</div>
            <div className="text-sm font-medium">{completeEmployee.department}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sección:</div>
            <div className="text-sm font-medium">Reclutamiento y Seleccíon</div>
          </div>
          
          {/* Segunda fila -  */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Unidad:</div>
            <div className="text-sm font-medium">Selección de Personal</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Cargo:</div>
            <div className="text-sm font-medium">{completeEmployee.position}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Supervisor:</div>
            <div className="text-sm font-medium">Marco Timaná</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailHeader;