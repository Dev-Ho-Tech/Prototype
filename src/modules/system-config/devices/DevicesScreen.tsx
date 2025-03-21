import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle, CheckCircle, X, RefreshCw, Power, Clock, Activity, MoreVertical } from 'lucide-react';
import { devicesData } from './data';
import { Device } from './interfaces/device';
import { DeviceForm } from './components/DeviceForm';
import { BiometricOperations } from './components/BiometricOperations';
import { EventosDetallados } from './components/EventosDetallados';
import { RestartModal } from './components/RestartModal';
import { DeleteDeviceModal } from './components/DeleteDeviceModal';
import { DeviceContextMenu } from './components/DeviceContextMenu';
import DevicesSummary from './components/DevicesSummaryProps';
import Pagination from './components/screen_components/Pagination';
import SortableTable, { ColumnDefinition } from './components/screen_components/SortableTable';
import Filters from './components/screen_components/Filters';
import DeviceGrid from './components/screen_components/DeviceGrid';

export const DevicesScreen: React.FC = () => {
  const [allDevices, setAllDevices] = useState<Device[]>(devicesData);
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
  
  // Estados para la paginación de la tabla
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [paginatedDevices, setPaginatedDevices] = useState<Device[]>([]);
  
  // Estado para el ordenamiento
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Estado para el modo de visualización (lista o cuadrícula)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filtrar dispositivos
  useEffect(() => {
    let filtered = devicesData;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(device => 
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
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

    setAllDevices(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando cambian los filtros
  }, [searchTerm, filterStatus, filterType]);

  // Actualizar dispositivos paginados cuando cambie la página o los elementos por página
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedDevices(allDevices.slice(startIndex, endIndex));
  }, [allDevices, currentPage, itemsPerPage]);

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Función para cambiar elementos por página
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Resetear a la primera página cuando cambia el número de elementos por página
  };

  // Función para manejar el ordenamiento
  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  // Función para cambiar el modo de visualización
  const handleViewModeChange = (mode: 'list' | 'grid') => {
    setViewMode(mode);
  };

  // Función para restablecer los filtros
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterType('all');
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (filterName: string, value: string) => {
    if (filterName === 'status') {
      setFilterStatus(value);
    } else if (filterName === 'type') {
      setFilterType(value);
    }
  };

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
      const updatedDevices = allDevices.filter(device => device.id !== selectedDevice.id);
      setAllDevices(updatedDevices);
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

  // Función para manejar clic en fila o tarjeta
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

  // Función para renderizar el menú contextual (usado en vista de cuadrícula)
  const renderContextMenu = (device: Device) => (
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
  );

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

  // Definir las columnas para la tabla
  const columns: ColumnDefinition<Device>[] = [
    {
      key: 'name',
      header: 'Nombre',
      sortable: true,
      render: (device) => (
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
      )
    },
    {
      key: 'type',
      header: 'Tipo/Modelo',
      sortable: true,
      render: (device) => (
        <>
          <div className="text-sm text-gray-900 capitalize">{device.type}</div>
          <div className="text-sm text-gray-500">{device.model}</div>
        </>
      )
    },
    {
      key: 'location',
      header: 'Ubicación',
      sortable: true,
      render: (device) => (
        <div className="text-sm text-gray-500">{device.location}</div>
      )
    },
    {
      key: 'status',
      header: 'Estado',
      sortable: true,
      render: (device) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(device.status || '')}`}>
          {getStatusIcon(device.status || '')}
          {device.status}
        </span>
      )
    },
    {
      key: 'lastSync',
      header: 'Última sincronización',
      sortable: true,
      cellClassName: 'stopPropagation',
      render: (device) => (
        <span className="text-sm text-gray-500">
          {device.lastSync ? new Date(device.lastSync).toLocaleString() : 'Sin sincronizar'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Acciones',
      sortable: false,
      align: 'right',
      cellClassName: 'stopPropagation',
      render: (device) => (
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
      )
    }
  ];

  // Opciones de filtro para el componente de filtros
  const filterOptions = {
    status: {
      label: 'Estado',
      options: [
        { value: 'all', label: 'Todos los estados' },
        { value: 'online', label: 'En línea' },
        { value: 'offline', label: 'Fuera de línea' },
        { value: 'warning', label: 'Advertencia' },
        { value: 'maintenance', label: 'Mantenimiento' }
      ]
    },
    type: {
      label: 'Tipo',
      options: [
        { value: 'all', label: 'Todos los tipos' },
        { value: 'biometric', label: 'Biométrico' },
        { value: 'access', label: 'Control de Acceso' },
        { value: 'dining', label: 'Comedor' }
      ]
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dispositivos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra las dispositivos de las empresas
          </p>
        </div>
        <button
          onClick={handleAddDevice}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Licencia</span>
        </button>
      </div>

      {/* Resumen de dispositivos */}
      <DevicesSummary devices={allDevices} />

      {/* Componente de filtros */}
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Buscar por nombre, ubicación o serie"
        filterValues={{
          status: filterStatus,
          type: filterType
        }}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onResetFilters={handleResetFilters}
      />

      {/* Lista de dispositivos - Condicional según el modo de visualización */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg shadow">
          <SortableTable
            data={paginatedDevices}
            columns={columns}
            keyExtractor={(device) => device.id || ''}
            emptyMessage="No se encontraron dispositivos con los filtros seleccionados."
            onRowClick={handleRowClick}
            initialSortKey={sortKey}
            initialSortDirection={sortDirection}
            onSort={handleSort}
          />
          
          {/* Paginación para la vista de lista */}
          <div className="p-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalItems={allDevices.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={[10, 25, 50, 100]}
            />
          </div>
        </div>
      ) : (
        <DeviceGrid
          devices={allDevices}
          onCardClick={handleRowClick}
          onMenuClick={handleOpenContextMenu}
          onOperationsClick={handleOpenOperations}
          onEventsClick={handleOpenEventos}
          onRestartClick={handleRestart}
          contextMenuDevice={contextMenuDevice}
          renderContextMenu={renderContextMenu}
          emptyMessage="No se encontraron dispositivos con los filtros seleccionados."
        />
      )}

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
          {toast.type === 'warning' && <AlertCircle className="w-5 w-5" />}
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