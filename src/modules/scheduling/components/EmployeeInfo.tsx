import React from 'react';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';

interface EmployeeInfoProps {
  employee: UnifiedEmployee;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Código:</div>
          <div className="font-medium">{employee.codigo || employee.id}</div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Sede:</div>
          <div className="font-medium">{employee.location || employee.sede}</div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Departamento:</div>
          <div className="font-medium">{employee.department}</div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Cargo:</div>
          <div className="font-medium">{employee.position || employee.cargo}</div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Tipo De Contrato:</div>
          <div className="font-medium">{employee.contractType || employee.modalidadTiempo || 'Indefinido'}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;