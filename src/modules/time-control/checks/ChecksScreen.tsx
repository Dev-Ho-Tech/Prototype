import React, { useState } from 'react';
import { Search, Plus, Filter, Clock, MapPin, Building2, Users, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { CheckForm } from './components/CheckForm';
import { checksData } from '../data';

export function ChecksScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'onTime':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'onTime':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'late':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Marcajes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitoreo de marcajes en tiempo real
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Marcaje Manual</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total empleados</p>
                <p className="text-2xl font-semibold text-gray-900">450</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Presentes</p>
                <p className="text-2xl font-semibold text-green-600">389</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tardanzas</p>
                <p className="text-2xl font-semibold text-yellow-600">12</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ausentes</p>
                <p className="text-2xl font-semibold text-red-600">49</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o código"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas las sedes</option>
                <option value="gran_almirante">Gran Almirante</option>
                <option value="garden_court">Garden Court</option>
                <option value="centro_plaza">Centro Plaza</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="onTime">A tiempo</option>
                <option value="late">Tardanzas</option>
                <option value="absent">Ausentes</option>
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empleado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entrada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salida
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo trabajado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {checksData.map((check) => (
                  <tr key={check.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={check.employee.photo}
                          alt={check.employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {check.employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {check.employee.position}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {check.schedule.startTime} - {check.schedule.endTime}
                      </div>
                      <div className="text-sm text-gray-500">
                        Turno {check.schedule.shift}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{check.checkIn}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{check.checkOut || '---'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{check.duration}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(check.status)}
                        <span className={`ml-2 inline-flex text-xs font-medium ${getStatusColor(check.status)}`}>
                          {check.status === 'onTime' ? 'A tiempo' :
                           check.status === 'late' ? 'Tardanza' :
                           'Ausente'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{check.location}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Form Modal */}
      {showForm && (
        <CheckForm onClose={() => setShowForm(false)} />
      )}
      <div className="flex">
        {/* Turnos de Trabajo */}
        <div className="bg-white rounded-lg shadow p-6 ml-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Turnos de trabajos</h2>
            <div className="flex gap-4 mb-6">

              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="10" cy="10" r="7"></circle>
                  <line x1="21" y1="21" x2="15" y2="15"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Buscar turnos..."
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 border-pink-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-pink-500">Turno A</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Mañana
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Horario: 07:00 - 15:00</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-orange-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-orange-500">Turno B</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Tarde
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Horario: 15:00 - 23:00</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-cyan-500 text-cyan-500 text-cyan-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-cyan-500">Turno D</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Noche
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Horario: 15:00 - 23:00</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-purple-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-purple-500">Turno A</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Mañana
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Horario: 07:00 - 15:00</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-rose-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-rose-500 text-rose-500">Turno B</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Tarde
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Horario: 15:00 - 23:00</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-blue-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-blue-500">Turno D</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Noche
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Horario: 15:00 - 23:00</p>
                </div>
              </div>
            </div>
        </div>

        {/* Licencia y permisos */}
        <div className="bg-white rounded-lg shadow p-6 m-8">
            <h2 className="text-xl font-semibold mb-4">Licencias y permisos</h2>
            <div className="flex gap-4 mb-6">

              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="10" cy="10" r="7"></circle>
                  <line x1="21" y1="21" x2="15" y2="15"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Buscar turnos..."
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-pink-200 border-pink-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-pink-500">Descanso</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-orange-50 border-orange-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-orange-500">Licencia por Maternidad</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-cyan-200 border-cyan-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-cyan-500">Licencia por Tramite</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-purple-200 border-purple-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-purple-500">Estudios</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-rose-200 border-rose-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-rose-500">Tramite Legal</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-zinc-200 border-zinc-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-zinc-500">Nacimiento de un Hijo</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-fuchsia-200 border-fuchsia-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-fuchsia-500">Matrimonio</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-blue-200 border-blue-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-blue-500">Licencia por Fallecimiento</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-cyan-200 border-cyan-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-cyan-500">Elaboración de Exámenes</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-pink-200 border-pink-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-pink-500">Incapacidad por Accidentes</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              <div className="border bg-blue-200 border-blue-500 rounded-lg p-2 hover:shadow-md transition-shadow">
                <div className="flex justify-space-around items-start">
                  <h3 className="font-medium text-lg ml-2 text-blue-500">Vacation</h3>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}