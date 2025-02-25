import React, { useState } from 'react';
import { Search, Plus, Filter, Download, ChevronDown, Settings, LogOut, Users, ArrowUpRight, ArrowDownRight, Fingerprint } from 'lucide-react';
import { CustomPieChart } from '../../../components/common/PieChart';
import { EmployeeForm } from '../components/EmployeeForm';
import Formemploye from '../Form-employe/Formemploye.tsx'

export function EmployeeManagementScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data for charts and stats
  const locationData = [
    { name: 'Hodelpa Gran Almirante', value: 200, color: '#4F46E5' },
    { name: 'Hodelpa Garden', value: 150, color: '#818CF8' },
    { name: 'Centro Plaza Hodelpa', value: 38, color: '#C7D2FE' }
  ];

  const departmentData = [
    { name: 'Habitaciones', value: 120, color: '#EF4444' },
    { name: 'Alimentos y Bebidas', value: 80, color: '#F59E0B' },
    { name: 'Generales y Adm.', value: 70, color: '#10B981' },
    { name: 'Mantenimiento', value: 60, color: '#3B82F6' },
    { name: 'Otros', value: 58, color: '#6366F1' }
  ];

  // Sample employee data
  const employees = [
    {
      id: '1010008284',
      name: 'Kinsys Chevalier',
      position: 'Cocinero',
      location: 'Hodelpa Gran Almirante',
      department: 'Alimentos y Bebidas',
      method: 'Biométrico',
      initial: 'K'
    },
    {
      id: '1010008285',
      name: 'Maria Rodriguez',
      position: 'Recepcionista',
      location: 'Hodelpa Garden',
      department: 'Front Desk',
      method: 'Biométrico',
      initial: 'M'
    },
    {
      id: '1010008286',
      name: 'Juan Perez',
      position: 'Mantenimiento',
      location: 'Centro Plaza Hodelpa',
      department: 'Mantenimiento',
      method: 'Biométrico',
      initial: 'J'
    },
    {
      id: '1010008287',
      name: 'Ana Martinez',
      position: 'Camarera',
      location: 'Hodelpa Gran Almirante',
      department: 'Habitaciones',
      method: 'Biométrico',
      initial: 'A'
    },
    {
      id: '1010008288',
      name: 'Carlos Santos',
      position: 'Bartender',
      location: 'Hodelpa Garden',
      department: 'Alimentos y Bebidas',
      method: 'Biométrico',
      initial: 'C'
    },
    {
      id: '1010008289',
      name: 'Laura Mendez',
      position: 'Supervisora',
      location: 'Centro Plaza Hodelpa',
      department: 'Habitaciones',
      method: 'Biométrico',
      initial: 'L'
    },
    {
      id: '1010008290',
      name: 'Pedro Guzman',
      position: 'Chef',
      location: 'Hodelpa Gran Almirante',
      department: 'Alimentos y Bebidas',
      method: 'Biométrico',
      initial: 'P'
    },
    {
      id: '1010008291',
      name: 'Sofia Ramirez',
      position: 'Contadora',
      location: 'Hodelpa Garden',
      department: 'Generales y Adm.',
      method: 'Biométrico',
      initial: 'S'
    },
    {
      id: '1010008292',
      name: 'Roberto Diaz',
      position: 'Seguridad',
      location: 'Centro Plaza Hodelpa',
      department: 'Generales y Adm.',
      method: 'Biométrico',
      initial: 'R'
    },
    {
      id: '1010008293',
      name: 'Isabel Torres',
      position: 'Coordinadora',
      location: 'Hodelpa Gran Almirante',
      department: 'Front Desk',
      method: 'Biométrico',
      initial: 'I'
    }
  ];

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Active/Inactive Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Empleados activos</p>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-semibold text-gray-900">388</p>
                <div className="flex items-center ml-2 text-sm text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+2.5%</span>
                </div>
              </div>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Empleados inactivos</p>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-semibold text-gray-900">52</p>
                <div className="flex items-center ml-2 text-sm text-red-600">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  <span>-1.2%</span>
                </div>
              </div>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Rotation Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ingresos recientes</p>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-semibold text-green-600">6</p>
                <span className="ml-2 text-sm text-gray-500">últimos 30 días</span>
              </div>
            </div>
            <ArrowUpRight className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Egresos recientes</p>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-semibold text-red-600">4</p>
                <span className="ml-2 text-sm text-gray-500">últimos 30 días</span>
              </div>
            </div>
            <ArrowDownRight className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <CustomPieChart data={locationData} title="Empleados por sedes" />
        <CustomPieChart data={departmentData} title="Empleados por departamentos" />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Método de marcaje</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Fingerprint className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">388</p>
                <p className="text-sm text-gray-500">Biométrico</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">100%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Employees Table Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Empleado</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Identificación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sede
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setShowForm(true);
                      }}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {employee.initial}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{employee.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Fingerprint className="w-3 h-3 mr-1" />
                      {employee.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-400 hover:text-blue-600"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowForm(true);
                        }}
                      >
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
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, employees.length)} a {Math.min(currentPage * itemsPerPage, employees.length)} de {employees.length} empleados
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(employees.length / itemsPerPage)))}
                  disabled={currentPage >= Math.ceil(employees.length / itemsPerPage)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm 
          onClose={handleCloseForm}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
}