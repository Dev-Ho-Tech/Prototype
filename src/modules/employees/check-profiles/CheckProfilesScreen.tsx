import  { useState } from 'react';
import { Search, Plus, Filter, Users, Fingerprint, Clock, DoorClosed, Coffee, Settings, CheckSquare, MapPin, Camera } from 'lucide-react';
import { checkProfilesData } from './data';

export function CheckProfilesScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'access':
        return <DoorClosed className="w-5 h-5 text-green-600" />;
      case 'dining':
        return <Coffee className="w-5 h-5 text-amber-600" />;
      default:
        return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };


  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Perfiles de Marcaje</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los perfiles de marcaje y sus configuraciones
            </p>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Perfil</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o descripción"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los tipos</option>
                <option value="attendance">Asistencia</option>
                <option value="access">Acceso</option>
                <option value="dining">Comedor</option>
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-6">
            {checkProfilesData.map((profile) => (
              <div
                key={profile.id}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(profile.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {profile.description}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profile.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Empleados</span>
                      </div>
                      <span className="font-medium">{profile.employeeCount}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Horario</span>
                      </div>
                      <span className="font-medium">
                        {profile.schedule.startTime} - {profile.schedule.endTime}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
                        <Fingerprint className="w-4 h-4" />
                        <span>Métodos permitidos</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.methods.map((method) => (
                          <span
                            key={method}
                            className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs"
                          >
                            {method === 'fingerprint' && <Fingerprint className="w-3 h-3 mr-1" />}
                            {method === 'face' && <Camera className="w-3 h-3 mr-1" />}
                            {method === 'card' && <DoorClosed className="w-3 h-3 mr-1" />}
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
                        <CheckSquare className="w-4 h-4" />
                        <span>Validaciones</span>
                      </div>
                      <div className="space-y-1">
                        {profile.validations.requirePhoto && (
                          <div className="flex items-center text-xs text-gray-600">
                            <Camera className="w-3 h-3 mr-1" />
                            <span>Requiere foto</span>
                          </div>
                        )}
                        {profile.validations.requireLocation && (
                          <div className="flex items-center text-xs text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>Requiere ubicación</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // Handle configuration
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