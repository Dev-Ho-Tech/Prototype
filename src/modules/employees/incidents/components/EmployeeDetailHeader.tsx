import React from 'react';
import { Employee } from '../interface/types';
import EmployeeAvatar from './EmployeeAvatar';

interface EmployeeDetailHeaderProps {
  employee: Employee;
}

const EmployeeDetailHeader: React.FC<EmployeeDetailHeaderProps> = ({ employee }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h2 className="text-sm font-medium text-gray-700 mb-4">Datos de la persona</h2>
      
      <div className="flex">
        <div className="mr-6">
          <EmployeeAvatar 
            photoUrl={employee.photoUrl} 
            name={`${employee.nombre} ${employee.apellidos}`}
            size="large"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 flex-1">
          <div>
            <div className="text-xs text-gray-500 mb-1">Nombres:</div>
            <div className="text-sm font-medium">{employee.nombre}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Apellidos:</div>
            <div className="text-sm font-medium">{employee.apellidos}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sede:</div>
            <div className="text-sm font-medium">{employee.location}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sección:</div>
            <div className="text-sm font-medium">{employee.section}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Contenedor:</div>
            <div className="text-sm font-medium">{employee.containerType || 'Departamentos'}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Cargo:</div>
            <div className="text-sm font-medium">{employee.position}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Departamento:</div>
            <div className="text-sm font-medium">{employee.department}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Contenedor:</div>
            <div className="text-sm font-medium">{employee.containerType || 'Puestos'}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Empresa:</div>
            <div className="text-sm font-medium">{employee.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailHeader;