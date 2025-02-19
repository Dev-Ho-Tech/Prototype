import React, { useState } from 'react';
import { Search, Plus, Filter, DoorClosed, Wifi, WifiOff, AlertTriangle, Settings, MapPin, Users, Clock, Shield, Grid, Layout as LayoutPlan } from 'lucide-react';
import { doorsData } from './data';
import { DoorForm } from './components/DoorForm';
import type { Door } from '../../../types';

export function DoorsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [selectedDoor, setSelectedDoor] = useState<Door | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConnectionIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-5 h-5 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Puertas</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestión de puertas y control de acceso
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Puerta</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total puertas</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
              <DoorClosed className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Puertas activas</p>
                <p className="text-2xl font-semibold text-green-600">20</p>
              </div>
              <Wifi className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fuera de línea</p>
                <p className="text-2xl font-semibold text-red-600">4</p>
              </div>
              <WifiOff className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Alertas activas</p>
                <p className="text-2xl font-semibold text-yellow-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o ubicación"
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
                  <option value="all">Todas las ubicaciones</option>
                  <option value="gran_almirante">Gran Almirante</option>
                  <option value="garden_court">Garden Court</option>
                  <option value="centro_plaza">Centro Plaza</option>
                </select>
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'map'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <LayoutPlan className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 gap-6 p-6">
              {doorsData.map((door) => (
                <div
                  key={door.id}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative">
                    <img
                      src={door.photo}
                      alt={door.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      {getConnectionIcon(door.connectionStatus)}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {door.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{door.location}</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(door.status)
                      }`}>
                        {door.status === 'active' ? 'Activo' :
                         door.status === 'warning' ? 'Advertencia' :
                         'Inactivo'}
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">Nivel de seguridad</span>
                        </div>
                        <span className="font-medium capitalize">{door.securityLevel}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">Accesos hoy</span>
                        </div>
                        <span className="font-medium">{door.stats.averageDaily}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">Último acceso</span>
                        </div>
                        <span className="font-medium">
                          {new Date(door.lastAccess).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setSelectedDoor(door);
                          setShowForm(true);
                        }}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configurar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <p className="text-gray-500">Vista de plano en desarrollo</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <DoorForm
          door={selectedDoor}
          onClose={() => {
            setShowForm(false);
            setSelectedDoor(null);
          }}
        />
      )}
    </div>
  );
}