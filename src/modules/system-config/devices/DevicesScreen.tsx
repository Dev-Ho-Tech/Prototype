import React, { useState } from 'react';
import { Search, Plus, Filter, Wifi, WifiOff, AlertTriangle, RefreshCcw, Settings, Fingerprint, DoorClosed, Coffee, RotateCcw, Users, Activity, CheckCircle } from 'lucide-react';
import { devicesData, deviceEvents, biometricData } from './data';
import { DeviceForm } from './components/DeviceForm';
import { BiometricRegistration } from './components/BiometricRegistration';
import type { Device, BiometricData as BiometricDataType } from '../../../types';

export function DevicesScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [showBiometricForm, setShowBiometricForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<BiometricDataType | null>(null);

  const handleRestart = (deviceId: string) => {
    // Handle device restart
    console.log('Restarting device:', deviceId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'biometric':
        return <Fingerprint className="w-5 h-5" />;
      case 'access':
        return <DoorClosed className="w-5 h-5" />;
      case 'dining':
        return <Coffee className="w-5 h-5" />;
      default:
        return <Settings className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dispositivos</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los dispositivos de control de acceso y marcaje
            </p>
          </div>
          <button
            onClick={() => setShowDeviceForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Dispositivo</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Dispositivos</p>
                <p className="text-2xl font-semibold text-gray-900">48</p>
              </div>
              <Settings className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">En línea</p>
                <p className="text-2xl font-semibold text-green-600">42</p>
              </div>
              <Wifi className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fuera de línea</p>
                <p className="text-2xl font-semibold text-red-600">6</p>
              </div>
              <WifiOff className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Alertas</p>
                <p className="text-2xl font-semibold text-yellow-600">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Device List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, IP o ubicación"
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
                <option value="biometric">Biométrico</option>
                <option value="access">Control de Acceso</option>
                <option value="dining">Comedor</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="online">En línea</option>
                <option value="offline">Fuera de línea</option>
                <option value="warning">Con alertas</option>
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-6">
            {devicesData.map((device) => (
              <div
                key={device.id}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(device.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {device.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {device.location}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(device.status)
                    }`}>
                      {device.status === 'online' ? 'En línea' : 
                       device.status === 'offline' ? 'Fuera de línea' : 
                       'Alerta'}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Serial</span>
                      <span className="font-medium">{device.serialNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">IP</span>
                      <span className="font-medium">{device.ip}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">MAC</span>
                      <span className="font-medium">{device.mac}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Firmware</span>
                      <span className="font-medium">{device.firmware}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Capacidad</span>
                      <span className="font-medium">{device.capacity.used}/{device.capacity.total} {device.capacity.type}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setSelectedDevice(device);
                        setShowDeviceForm(true);
                      }}
                      className="flex flex-col items-center justify-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <Settings className="w-5 h-5 mb-1" />
                      <span className="text-xs">Configurar</span>
                    </button>
                    <button
                      onClick={() => setShowBiometricForm(true)}
                      className="flex flex-col items-center justify-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <Users className="w-5 h-5 mb-1" />
                      <span className="text-xs">Empleados</span>
                    </button>
                    <button
                      onClick={() => handleRestart(device.id)}
                      className="flex flex-col items-center justify-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <RotateCcw className="w-5 h-5 mb-1" />
                      <span className="text-xs">Reiniciar</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <Activity className="w-5 h-5 mb-1" />
                      <span className="text-xs">Eventos</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Eventos recientes</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {deviceEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {event.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{event.description}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Dispositivo: {devicesData.find(d => d.id === event.deviceId)?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Device Form Modal */}
      {showDeviceForm && (
        <DeviceForm
          device={selectedDevice}
          onClose={() => {
            setShowDeviceForm(false);
            setSelectedDevice(null);
          }}
        />
      )}

      {/* Biometric Registration Modal */}
      {showBiometricForm && biometricData[0] && (
        <BiometricRegistration
          employeeData={biometricData[0]}
          onClose={() => setShowBiometricForm(false)}
        />
      )}
    </div>
  );
}