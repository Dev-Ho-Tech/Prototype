import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, RefreshCw, Power, AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';
import { devicesData } from './data';
import { Device } from './interfaces/device';
import { DeviceForm } from './components/DeviceForm';
import { BiometricOperations } from './components/BiometricOperations';
import { EventosDetallados } from './components/EventosDetallados';
import DevicesSummary from './components/DevicesSummaryProps';

export const DevicesScreen: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(devicesData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showDeviceForm, setShowDeviceForm] = useState<boolean>(false);
  const [editingDevice, setEditingDevice] = useState<Device | undefined>(undefined);
  const [showBiometricOperations, setShowBiometricOperations] = useState<boolean>(false);
  const [showEventosDetallados, setShowEventosDetallados] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // Filtrar dispositivos
  useEffect(() => {
    let filtered = devicesData;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(device => 
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filterStatus !== 'all') {
      filtered = filtered.filter(device => device.status === filterStatus);
    }

    // Filtrar por tipo
    if (filterType !== 'all') {
      filtered = filtered.filter(device => device.type === filterType);
    }

    setDevices(filtered);
  }, [searchTerm, filterStatus, filterType]);

  // Función para abrir el formulario en modo edición
  const handleEditDevice = (device: Device) => {
    setEditingDevice(device);
    setShowDeviceForm(true);
  };

  // Función para abrir el formulario en modo creación
  const handleAddDevice = () => {
    setEditingDevice(undefined);
    setShowDeviceForm(true);
  };

  // Función para manejar el cierre del formulario
  const handleCloseForm = () => {
    setShowDeviceForm(false);
    setEditingDevice(undefined);
  };

  // Función para abrir operaciones biométricas
  const handleOpenOperations = (device: Device) => {
    setSelectedDevice(device);
    setShowBiometricOperations(true);
  };

  // Función para abrir el panel de eventos detallados
  const handleOpenEventos = (device: Device) => {
    setSelectedDevice(device);
    setShowEventosDetallados(true);
  };

  // Función para reiniciar dispositivo
  const handleRestart = (deviceId: string | number) => {
    // En una implementación real, aquí iría la lógica para reiniciar el dispositivo
    console.log('Reiniciando dispositivo:', deviceId);
  };

  // Obtener la clase CSS para el estado del dispositivo
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Obtener el icono para el estado del dispositivo
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'offline':
        return <Power className="w-4 h-4 mr-1" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 mr-1" />;
      case 'maintenance':
        return <Clock className="w-4 h-4 mr-1" />;
      default:
        return <Activity className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dispositivos</h1>
        <button
          onClick={handleAddDevice}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Nuevo dispositivo
        </button>
      </div>

      {/* Resumen de dispositivos */}
      <DevicesSummary devices={devices} />

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, ubicación o serie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="online">En línea</option>
                <option value="offline">Fuera de línea</option>
                <option value="warning">Advertencia</option>
                <option value="maintenance">Mantenimiento</option>
              </select>
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los tipos</option>
                <option value="biometric">Biométrico</option>
                <option value="access">Control de Acceso</option>
                <option value="dining">Comedor</option>
              </select>
            </div>
            <button
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg flex items-center hover:bg-gray-200"
            >
              <Filter className="mr-2 h-5 w-5" />
              Más filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de dispositivos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo/Modelo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP/Ubicación
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última sincronización
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {device.brand === 'zkteco' && (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                            ZK
                          </div>
                        )}
                        {device.brand === 'suprema' && (
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
                            SP
                          </div>
                        )}
                        {device.brand === 'hikvision' && (
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold">
                            HK
                          </div>
                        )}
                        {device.brand === 'dahua' && (
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold">
                            DH
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">SN: {device.serialNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{device.type}</div>
                    <div className="text-sm text-gray-500">{device.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{device.ip}</div>
                    <div className="text-sm text-gray-500">{device.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(device.status || '')}`}>
                      {getStatusIcon(device.status || '')}
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.lastSync ? new Date(device.lastSync).toLocaleString() : 'Sin sincronizar'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => handleOpenOperations(device)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Operaciones biométricas"
                      >
                        <Activity className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleOpenEventos(device)}
                        className="text-green-600 hover:text-green-900"
                        title="Ver eventos"
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleRestart(device.id || '')}
                        className="text-orange-600 hover:text-orange-900"
                        title="Reiniciar dispositivo"
                      >
                        <RefreshCw className="h-5 w-5" />
                      </button>
                      <div className="relative group">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          title="Más acciones"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                          <div className="py-1">
                            <button 
                              onClick={() => handleEditDevice(device)} 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Editar dispositivo
                            </button>
                            <button 
                              onClick={() => handleOpenOperations(device)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Operaciones biométricas
                            </button>
                            <button 
                              onClick={() => handleOpenEventos(device)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Ver eventos
                            </button>
                            <button 
                              onClick={() => handleRestart(device.id || '' )}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Reiniciar dispositivo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {devices.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">No se encontraron dispositivos con los filtros seleccionados.</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Mostrando {devices.length} de {devicesData.length} dispositivos
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700">
            Anterior
          </button>
          <button className="px-3 py-1 bg-blue-50 border border-blue-300 rounded-lg text-sm text-blue-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700">
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal de formulario */}
      {showDeviceForm && (
        <DeviceForm
          device={editingDevice}
          onClose={handleCloseForm}
        />
      )}

      {/* Modal de operaciones biométricas */}
      {showBiometricOperations && selectedDevice && (
        <BiometricOperations
          deviceId={selectedDevice.id || ''}
          deviceName={selectedDevice.name}
          onClose={() => {
            setShowBiometricOperations(false);
            setSelectedDevice(null);
          }}
        />
      )}

      {/* Modal de eventos detallados */}
      {showEventosDetallados && selectedDevice && (
        <EventosDetallados
          deviceId={selectedDevice.id as string}
          deviceName={selectedDevice.name}
          onClose={() => {
            setShowEventosDetallados(false);
            setSelectedDevice(null);
          }}
        />
      )}
    </div>
  );
};

export default DevicesScreen;