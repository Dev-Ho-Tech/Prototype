import { useState } from 'react';
import { Search, Plus, Download, Settings, LogOut, Users, ArrowUpRight, ArrowDownRight, Fingerprint, ArrowLeft } from 'lucide-react';
import { CustomPieChart } from '../../../components/common/PieChart';
import { departmentData, locationData } from '../data';
import { employees } from './data';
import { EmployeeProfile } from './components/EmployeeProfile';

export function EmployeeManagementScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar empleados según el término de búsqueda
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowProfile(true);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8 relative">
      {/* Mostrar perfil cuando está seleccionado */}
      {showProfile ? (
        <div>
          <div className="mb-6">
            <button 
              onClick={handleCloseProfile}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a la lista de empleados
            </button>
          </div>
          <EmployeeProfile 
            employee={selectedEmployee}
            onClose={handleCloseProfile}
          />
        </div>
      ) : (
        <>
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
                    onClick={() => {
                      setSelectedEmployee(null);
                      setShowProfile(true);
                    }}
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
                  {filteredEmployees
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((employee) => (
                      <tr 
                        key={employee.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleEmployeeClick(employee)}
                      >
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{employee.id}</td>
                        <td className="px-6 py-4">
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmployeeClick(employee);
                              }}
                            >
                              <Settings className="w-5 h-5" />
                            </button>
                            <button 
                              className="text-gray-400 hover:text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Lógica para dar de baja al empleado
                              }}
                            >
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
                    Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, filteredEmployees.length)} a {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} de {filteredEmployees.length} empleados
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
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredEmployees.length / itemsPerPage)))}
                      disabled={currentPage >= Math.ceil(filteredEmployees.length / itemsPerPage)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}