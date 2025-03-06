import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, RefreshCw, Power, AlertCircle, CheckCircle, Clock, Activity, X } from 'lucide-react';
import { devicesData } from './data';
import { Device } from './interfaces/device';
import { DeviceForm } from './components/DeviceForm';
import { BiometricOperations } from './components/BiometricOperations';
import { EventosDetallados } from './components/EventosDetallados';
import { RestartModal } from './components/RestartModal';
import { DeleteDeviceModal } from './components/DeleteDeviceModal';
import { DeviceContextMenu } from './components/DeviceContextMenu';
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
  const [showRestartModal, setShowRestartModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [contextMenuDevice, setContextMenuDevice] = useState<Device | null>(null);

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
  const handleRestart = (device: Device) => {
    setSelectedDevice(device);
    setShowRestartModal(true);
  };

  // Función para confirmar eliminación de dispositivo
  const handleDeleteDevice = (device: Device) => {
    setSelectedDevice(device);
    setShowDeleteModal(true);
  };

  // Función para procesar la eliminación
  const confirmDeleteDevice = () => {
    // Aquí iría la lógica para eliminar el dispositivo
    console.log('Eliminando dispositivo:', selectedDevice?.id);
    
    // Actualizar la lista (simulación)
    if (selectedDevice) {
      setDevices(currentDevices => 
        currentDevices.filter(device => device.id !== selectedDevice.id)
      );
    }
    
    // Mostrar notificación
    setToast({
      type: 'success',
      message: `Dispositivo "${selectedDevice?.name}" eliminado correctamente`
    });
    
    // Cerrar modal
    setShowDeleteModal(false);
    setSelectedDevice(null);
  };

  // Función para manejar clic en fila
  const handleRowClick = (device: Device) => {
    handleOpenEventos(device);
  };

  // Función para abrir el menú contextual
  const handleOpenContextMenu = (device: Device, e: React.MouseEvent) => {
    e.stopPropagation();
    // Cerrar menú si ya está abierto para el mismo dispositivo
    if (contextMenuDevice && contextMenuDevice.id === device.id) {
      setContextMenuDevice(null);
    } else {
      setContextMenuDevice(device);
    }
  };

  // Función para cerrar el menú contextual
  const handleCloseContextMenu = () => {
    setContextMenuDevice(null);
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
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto" style={{ overflowY: "visible" }}>
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
                  Ubicación
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
                <tr 
                  key={device.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(device)}
                >
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
                    {/* <div className="text-sm text-gray-900">{device.ip}</div> */}
                    <div className="text-sm text-gray-500">{device.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(device.status || '')}`}>
                      {getStatusIcon(device.status || '')}
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                    {device.lastSync ? new Date(device.lastSync).toLocaleString() : 'Sin sincronizar'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenOperations(device);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Operaciones biométricas"
                      >
                        <Activity className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEventos(device);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Ver eventos"
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestart(device);
                        }}
                        className="text-orange-600 hover:text-orange-900"
                        title="Reiniciar dispositivo"
                      >
                        <RefreshCw className="h-5 w-5" />
                      </button>
                      <div className="relative" style={{ position: "relative" }}>
                        <button
                          onClick={(e) => handleOpenContextMenu(device, e)}
                          className="text-gray-500 hover:text-gray-700"
                          title="Más acciones"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        
                        {contextMenuDevice && contextMenuDevice.id === device.id && (
                          <DeviceContextMenu
                            device={device}
                            isOpen={true}
                            onClose={handleCloseContextMenu}
                            onEdit={handleEditDevice}
                            onOpenOperations={handleOpenOperations}
                            onOpenEventos={handleOpenEventos}
                            onRestart={handleRestart}
                            onDelete={handleDeleteDevice}
                          />
                        )}
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

      {/* Modal de reinicio */}
      {showRestartModal && selectedDevice && (
        <RestartModal
          deviceName={selectedDevice.name}
          onClose={() => {
            setShowRestartModal(false);
            setSelectedDevice(null);
          }}
        />
      )}

      {/* Modal de eliminación */}
      {showDeleteModal && selectedDevice && (
        <DeleteDeviceModal
          deviceName={selectedDevice.name}
          onDelete={confirmDeleteDevice}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedDevice(null);
          }}
        />
      )}

      {/* Toast de notificación */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg flex items-center space-x-3 shadow-lg
          ${toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
            toast.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
            'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5" />}
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => setToast(null)}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DevicesScreen;