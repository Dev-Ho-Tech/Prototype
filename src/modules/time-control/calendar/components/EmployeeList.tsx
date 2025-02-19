import React from 'react';
import { Clock, MapPin, AlertCircle } from 'lucide-react';
import type { Employee } from '../../../../types';

interface EmployeeListProps {
  employees: Employee[];
  selectedEmployee: Employee;
  onSelectEmployee: (employee: Employee) => void;
}

export function EmployeeList({ employees, selectedEmployee, onSelectEmployee }: EmployeeListProps) {
  return (
    <div className="flex-1 overflow-auto">
      {employees.map((employee) => (
        <button
          key={employee.id}
          onClick={() => onSelectEmployee(employee)}
          className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
            selectedEmployee.id === employee.id ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-start space-x-3">
            <img
              src={employee.photo}
              alt={employee.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {employee.name}
              </h3>
              <p className="text-sm text-gray-500">{employee.position}</p>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{employee.schedule[0].shift}</span>
                <span className="mx-1">•</span>
                <MapPin className="w-4 h-4 mr-1" />
                <span className="truncate">{employee.location}</span>
              </div>
            </div>
            {employee.alerts && employee.alerts.length > 0 && (
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}