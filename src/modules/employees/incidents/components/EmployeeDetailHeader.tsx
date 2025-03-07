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
          {/* Primera fila - 6 columnas exactamente como en la imagen */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Nombres:</div>
            <div className="text-sm font-medium">{completeEmployee.nombre}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Apellidos:</div>
            <div className="text-sm font-medium">{completeEmployee.apellidos}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sede:</div>
            <div className="text-sm font-medium">{completeEmployee.location}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sección:</div>
            <div className="text-sm font-medium">{completeEmployee.section}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Contenedor:</div>
            <div className="text-sm font-medium">{completeEmployee.containerType || 'Departamentos'}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Cargo:</div>
            <div className="text-sm font-medium">{completeEmployee.position}</div>
          </div>
          
          {/* Segunda fila - 3 columnas como en la imagen */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Departamento:</div>
            <div className="text-sm font-medium">{completeEmployee.department}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Contenedor:</div>
            <div className="text-sm font-medium">Puestos</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Empresa:</div>
            <div className="text-sm font-medium">{completeEmployee.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailHeader;