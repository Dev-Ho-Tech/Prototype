import React, { useState } from 'react';
import { Search, Plus, Filter, Users, Clock, DoorClosed, Coffee, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { diningAccessData } from '../data';

export function DiningAccessScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiningRoom, setSelectedDiningRoom] = useState('all');

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Control de Acceso</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitoreo de accesos a comedores en tiempo real
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Personas en comedores</p>
                <p className="text-2xl font-semibold text-gray-900">145</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Capacidad disponible</p>
                <p className="text-2xl font-semibold text-green-600">175</p>
              </div>
              <DoorClosed className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tiempo promedio</p>
                <p className="text-2xl font-semibold text-amber-600">32 min</p>
              </div>
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Alertas activas</p>
                <p className="text-2xl font-semibold text-red-600">3</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Real-time Monitor */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Dining Room Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Estado de Comedores</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Comedor Principal</h3>
                  <p className="text-sm text-gray-500">45/120 personas</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">37.5% ocupación</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="w-1/3 h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Comedor Ejecutivo</h3>
                  <p className="text-sm text-gray-500">12/40 personas</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">30% ocupación</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="w-1/3 h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h2>
            <div className="space-y-4">
              {diningAccessData.slice(0, 5).map((access) => (
                <div key={access.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      access.status === 'completed' ? 'bg-green-500' :
                      access.status === 'inProgress' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{access.employeeName}</p>
                      <p className="text-sm text-gray-500">{access.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(access.accessTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-500">{access.diningRoom}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Access Log */}
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
                value={selectedDiningRoom}
                onChange={(e) => setSelectedDiningRoom(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los comedores</option>
                <option value="DR001">Comedor Principal</option>
                <option value="DR002">Comedor Ejecutivo</option>
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
                    Comedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entrada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salida
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dispositivo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {diningAccessData.map((access) => (
                  <tr key={access.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {access.employeeName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {access.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {access.diningRoom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(access.accessTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {access.exitTime ? new Date(access.exitTime).toLocaleTimeString() : '---'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {access.mealType === 'breakfast' ? 'Desayuno' :
                         access.mealType === 'lunch' ? 'Almuerzo' :
                         'Cena'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        access.status === 'completed' ? 'bg-green-100 text-green-800' :
                        access.status === 'inProgress' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {access.status === 'completed' ? 'Completado' :
                         access.status === 'inProgress' ? 'En progreso' :
                         'Denegado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {access.device}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}