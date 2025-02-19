import React from 'react';
import { MoreVertical, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { EmployeeRecord } from '../../../../types';

interface EmployeeGridProps {
  employees: EmployeeRecord[];
  onSelect: (employee: EmployeeRecord) => void;
}

export function EmployeeGrid({ employees, onSelect }: EmployeeGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'onLeave':
        return 'bg-yellow-100 text-yellow-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'onLeave':
        return 'De permiso';
      case 'terminated':
        return 'Terminado';
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelect(employee)}
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={employee.photo}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                    employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{employee.position}</p>
                  <p className="text-sm text-gray-500">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {employee.alerts.length > 0 && (
                  <div className="relative group">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 text-sm text-gray-600 hidden group-hover:block">
                      {employee.alerts[0].message}
                    </div>
                  </div>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                getStatusColor(employee.status)
              }`}>
                {getStatusLabel(employee.status)}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{employee.employmentInfo.schedule}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Código</span>
                <p className="font-medium">{employee.code}</p>
              </div>
              <div>
                <span className="text-gray-500">Sede</span>
                <p className="font-medium">{employee.location}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Documentos al día</span>
              </div>
              <span className="text-blue-600 hover:text-blue-700 font-medium">
                Ver detalles
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}