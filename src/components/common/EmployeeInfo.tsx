import React from 'react';
import { Building2, Briefcase, Users, FileText } from 'lucide-react';
import type { Employee } from '../../types';

interface EmployeeInfoProps {
  employee: Employee;
}

export function EmployeeInfo({ employee }: EmployeeInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
      <div className="flex items-start space-x-4 ">
        {/* <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xl">
          {employee.name.charAt(0)}
        </div> */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 text-[#1d4ed8]">{employee.name}</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>Código: {employee.id}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Building2 className="w-4 h-4" />
              <span>Sede: {employee.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>Departamento: {employee.department}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Briefcase className="w-4 h-4" />
              <span>Cargo: {employee.position}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}