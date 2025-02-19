import React, { useState } from 'react';
import { 
  X, 
  Edit, 
  RefreshCw as Refresh, 
  Plus, 
  Camera, 
  MapPin, 
  Clock, 
  Calendar, 
  Fingerprint,
  LogIn
} from 'lucide-react';

interface EmployeeMonitoringModalProps {
  employee: any;
  onClose: () => void;
}

export function EmployeeMonitoringModal({ employee, onClose }: EmployeeMonitoringModalProps) {
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Monitoreo de Empleado
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('technical')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'technical'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ficha Técnica
              </button>
              <button
                onClick={() => setActiveTab('workTime')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'workTime'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tiempos Trabajados
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Novedades
              </button>
              <button
                onClick={() => setActiveTab('checks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'checks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Marcajes
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'technical' && (
              <div className="grid grid-cols-3 gap-6">
                {/* Basic Information */}
                <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={employee.photo}
                        alt={employee.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                        <p className="text-sm text-gray-500">{employee.documentId}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Información laboral</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Departamento</p>
                          <p className="text-sm font-medium text-gray-900">{employee.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ubicación</p>
                          <p className="text-sm font-medium text-gray-900">{employee.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Turno actual</p>
                          <p className="text-sm font-medium text-gray-900">
                            {employee.schedule[0].shift} ({employee.schedule[0].startTime} - {employee.schedule[0].endTime})
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Estado actual</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Estado</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.status === 'working'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.status === 'working' ? 'Trabajando' : 'Ausente'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Última actualización</p>
                          <p className="text-sm font-medium text-gray-900">Hace 5 minutos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Acciones rápidas</h4>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Editar información</span>
                    </button>
                    <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                      <Refresh className="w-4 h-4" />
                      <span>Actualizar estado</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workTime' && (
              <div className="grid grid-cols-3 gap-6">
                {/* Real-time Hours */}
                <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Horas en tiempo real</h3>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                      <Refresh className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Horas trabajadas hoy</p>
                      <p className="text-2xl font-semibold text-gray-900">6h 30m</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Horas restantes</p>
                      <p className="text-2xl font-semibold text-gray-900">1h 30m</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Horas extras</p>
                      <p className="text-2xl font-semibold text-blue-600">0h 30m</p>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Planificación</h3>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {employee.schedule.map((s: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(s.date).toLocaleDateString('es', { weekday: 'long' })}
                            </p>
                            <p className="text-sm text-gray-500">
                              {s.startTime} - {s.endTime}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          s.shift === 'D' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          Turno {s.shift}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="grid grid-cols-3 gap-6">
                {/* Events List */}
                <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Novedades</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Agregar novedad</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {/* Example events */}
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Permiso médico</h4>
                          <span className="text-sm text-gray-500">Hace 2 horas</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Cita médica programada para el control mensual
                        </p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Filtros rápidos</h4>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-left">
                      Permisos
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-left">
                      Licencias
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-left">
                      Vacaciones
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'checks' && (
              <div className="grid grid-cols-3 gap-6">
                {/* Check History */}
                <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Historial de marcajes</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <Refresh className="w-5 h-5" />
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Nuevo marcaje</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Example check */}
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <LogIn className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Entrada</h4>
                          <span className="text-sm text-gray-500">08:00 AM</span>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Fingerprint className="w-4 h-4 mr-1" />
                            <span>Biométrico</span>
                          </div>
                          <div className="flex items-center">
                            <Camera className="w-4 h-4 mr-1" />
                            <span>Foto</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>Entrada Principal</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Check Stats */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Estadísticas de marcaje</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Puntualidad</p>
                      <p className="text-2xl font-semibold text-green-600">95%</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div className="w-[95%] h-full bg-green-600 rounded-full" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Marcajes correctos</p>
                      <p className="text-2xl font-semibold text-blue-600">98%</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div className="w-[98%] h-full bg-blue-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}