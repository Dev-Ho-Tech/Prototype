import React, { useState } from 'react';
import { Search, Plus, Download, Filter, ChevronDown, Settings, LogOut } from 'lucide-react';
import { CustomPieChart } from '../../components/common/PieChart';
import { locationData, departmentData, employeeData } from './data';
import { EmployeeForm } from './components/EmployeeForm';
import type { Employee } from '../../types';

export function EmployeesScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [showForm, setShowForm] = useState(false);

  const filteredEmployees = employeeData.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'Todos' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <main className="flex-1 overflow-auto">
      <header className="bg-white shadow-sm px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Empleados</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Empleado</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Versión Clásica
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Estatus</h3>
          <div className="flex space-x-8">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-2xl font-semibold">388</span>
              </div>
              <p className="text-sm text-gray-500">Activos</p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-2xl font-semibold">52</span>
              </div>
              <p className="text-sm text-gray-500">Inactivos</p>
            </div>
          </div>
        </div>

        <CustomPieChart data={locationData} title="Empleados por sedes" />
        <CustomPieChart data={departmentData} title="Empleados por departamentos" />
      </div>

      <div className="px-8 pb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, ID o departamento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-3">
              <div className="relative">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                  onClick={() => {
                    // Add dropdown functionality
                  }}
                >
                  <span>Departamento</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Identificación</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Empleado</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Sede</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Departamento</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Método</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{employee.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {employee.initial}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{employee.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{employee.department}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs">
                      {employee.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-600">
                        <Settings className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm onClose={() => setShowForm(false)} />
      )}
    </main>
  );
}