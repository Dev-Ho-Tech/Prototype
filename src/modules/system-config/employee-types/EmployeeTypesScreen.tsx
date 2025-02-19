import React, { useState } from 'react';
import { Search, Plus, Filter, Users, Clock, DoorClosed, Coffee, Briefcase } from 'lucide-react';
import { employeeTypesData } from './data';

export function EmployeeTypesScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Tipos de Empleados</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los tipos de empleados y sus configuraciones
            </p>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Tipo</span>
          </button>
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
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-6">
            {employeeTypesData.map((type) => (
              <div
                key={type.id}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {type.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Código: {type.code}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      type.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {type.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Marcaje</span>
                      </div>
                      <span className="font-medium">{type.checkMethod}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <DoorClosed className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Acceso</span>
                      </div>
                      <span className="font-medium">{type.accessLevel}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Coffee className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Comedor</span>
                      </div>
                      <span className="font-medium">{type.diningAccess ? 'Permitido' : 'No permitido'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Horas extras</span>
                      </div>
                      <span className="font-medium">{type.overtimeAllowed ? 'Permitidas' : 'No permitidas'}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // Handle edit
                      }}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}