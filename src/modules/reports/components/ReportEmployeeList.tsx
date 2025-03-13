import React, { useState } from 'react';
import { EmployeeList } from '../interfaces/Employee';

interface ReportEmployeeListProps {
  employees: EmployeeList;
  selectedEmployees: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

const ReportEmployeeList: React.FC<ReportEmployeeListProps> = ({ 
  employees, 
  selectedEmployees, 
  onSelectionChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.name} ${employee.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleCheckboxChange = (employeeId: string) => {
    const isSelected = selectedEmployees.includes(employeeId);
    
    if (isSelected) {
      onSelectionChange(selectedEmployees.filter(id => id !== employeeId));
    } else {
      onSelectionChange([...selectedEmployees, employeeId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(employees.map(emp => emp.id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Empleados</h3>
        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto p-1">
        <div className="sticky top-0 bg-gray-50 p-3 rounded-md mb-2 flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            checked={selectedEmployees.length === employees.length}
            onChange={handleSelectAll}
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            {selectedEmployees.length === employees.length ? "Deseleccionar todos" : "Seleccionar todos"}
          </label>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {filteredEmployees.map((employee) => (
            <li key={employee.id} className="py-3 px-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
                <label className="ml-3 block">
                  <span className="text-sm font-medium text-gray-900">
                    {employee.name} {employee.lastName}
                  </span>
                  {employee.position && (
                    <span className="text-sm text-gray-500 block">
                      {employee.position}
                    </span>
                  )}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportEmployeeList;