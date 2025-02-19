import React, { useState } from 'react';
import { Search, Plus, Filter, Fingerprint, Camera, CreditCard, Key, RefreshCcw, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { biometricData } from './data';

export function BiometricScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'incomplete':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'complete':
        return 'Completo';
      case 'incomplete':
        return 'Incompleto';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Información Biométrica</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los datos biométricos de los empleados
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <RefreshCcw className="w-4 h-4" />
              <span>Sincronizar</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Registro</span>
            </button>
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="complete">Completos</option>
                <option value="incomplete">Incompletos</option>
                <option value="pending">Pendientes</option>
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-6">
            {biometricData.map((record) => (
              <div
                key={record.id}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={record.photo}
                        alt={record.employeeName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {record.employeeName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {record.employeeId} • {record.department}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(record.status)
                    }`}>
                      {getStatusLabel(record.status)}
                    </span>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Fingerprint className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Huellas digitales</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{
                                width: `${(record.registrationStatus.fingerprints.registered / record.registrationStatus.fingerprints.total) * 100}%`
                              }}
                            />
                          </div>
                          <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                            <span>{record.registrationStatus.fingerprints.registered}/{record.registrationStatus.fingerprints.total} registradas</span>
                            <span>Calidad: {record.registrationStatus.fingerprints.quality}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Camera className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Rostro</span>
                        </div>
                        {record.registrationStatus.face.registered ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">{record.registrationStatus.face.quality}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">No registrado</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Tarjeta</span>
                        </div>
                        {record.registrationStatus.card.registered ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">{record.registrationStatus.card.number}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">No asignada</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Key className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">PIN</span>
                        </div>
                        {record.registrationStatus.pin.set ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">Configurado</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">No configurado</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {record.devices.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Dispositivos asignados</div>
                        <div className="flex flex-wrap gap-2">
                          {record.devices.map((device) => (
                            <span
                              key={device}
                              className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700"
                            >
                              {device}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // Handle registration
                      }}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {record.status === 'pending' ? 'Iniciar registro' : 'Actualizar datos'}
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