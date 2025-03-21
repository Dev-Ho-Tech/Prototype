import React from 'react';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';

interface EmployeeInfoProps {
  employee: UnifiedEmployee;
  startDate: string;
  endDate: string;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
  employee,
  startDate,
  endDate
}) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Código:</div>
          <div className="font-medium truncate">{employee.codigo || employee.id}</div>
        </div>
          
        {/* Campos de fecha solo informativos */}
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Fecha de Inicio:</div>
          <div className="flex items-center gap-2 text-sm">
            <span>{startDate}</span>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Fecha de Fin:</div>
          <div className="flex items-center gap-2 text-sm">
            <span>{endDate}</span>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Sede:</div>
          <div className="font-medium truncate">{employee.location || employee.sede}</div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Departamento:</div>
          <div className="font-medium truncate">{employee.department}</div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Cargo:</div>
          <div className="font-medium truncate">{employee.position || employee.cargo}</div>
        </div>
        
        <div className="col-span-1">
          <div className="text-xs text-gray-500 mb-1">Tipo De Contrato:</div>
          <div className="font-medium truncate">{employee.contractType || employee.modalidadTiempo || 'Indefinido'}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
