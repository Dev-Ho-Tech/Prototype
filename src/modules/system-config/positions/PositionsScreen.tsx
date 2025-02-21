import React, { useState } from 'react';
import { Search, Plus, Filter, Building2, Users, Briefcase, GraduationCap, Clock } from 'lucide-react';
import { positionsData } from './data';

export function PositionsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Puestos de Trabajo</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los puestos de trabajo y sus configuraciones
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Puesto</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o departamento"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Todos los departamentos</option>
                <option>Recursos Humanos</option>
                <option>Operaciones</option>
                <option>Administración</option>
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-6">
            {positionsData.map((position) => (
              <div
                key={position.id}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {position.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {position.department}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      position.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {position.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  {/* <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {position.employeeCount} empleados
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {position.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {position.education}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {position.experience}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // Handle edit
                      }}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Ver detalles
                    </button>
                  </div> */}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}