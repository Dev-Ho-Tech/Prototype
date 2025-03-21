/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MoreVertical, RefreshCw, Activity, Clock, CheckCircle, Power, AlertCircle } from 'lucide-react';

// Tipo del objeto que se mostrará en la tarjeta
interface DeviceCardProps {
  device: {
    id?: string;
    name: string;
    brand?: string;
    type?: string;
    model?: string;
    serialNumber?: string;
    location?: string;
    status?: string;
    lastSync?: string;
    [key: string]: any;
  };
  onCardClick: (device: any) => void;
  onMenuClick: (device: any, e: React.MouseEvent) => void;
  onOperationsClick: (device: any, e: React.MouseEvent) => void;
  onEventsClick: (device: any, e: React.MouseEvent) => void;
  onRestartClick: (device: any, e: React.MouseEvent) => void;
  menuOpen?: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onCardClick,
  onMenuClick,
  onOperationsClick,
  onEventsClick,
  onRestartClick,
  // menuOpen = false
}) => {
  // Función para obtener las clases según el estado
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el icono según el estado
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'online': return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'offline': return <Power className="w-4 h-4 mr-1" />;
      case 'warning': return <AlertCircle className="w-4 h-4 mr-1" />;
      case 'maintenance': return <Clock className="w-4 h-4 mr-1" />;
      default: return <Activity className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onCardClick(device)}
    >
      {/* Cabecera de la tarjeta */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 mr-3">
            {device.brand === 'zkteco' && (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">ZK</div>
            )}
            {device.brand === 'suprema' && (
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">SP</div>
            )}
            {device.brand === 'hikvision' && (
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold">HK</div>
            )}
            {device.brand === 'dahua' && (
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold">DH</div>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 truncate max-w-xs">{device.name}</h3>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick(device, e);
            }}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            title="Más acciones"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Cuerpo de la tarjeta */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-gray-500">Tipo</p>
            <p className="text-sm font-medium capitalize">{device.type || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Modelo</p>
            <p className="text-sm font-medium">{device.model || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Serie</p>
            <p className="text-sm font-medium truncate">{device.serialNumber || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Ubicación</p>
            <p className="text-sm font-medium truncate">{device.location || 'N/A'}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(device.status || '')}`}>
            {getStatusIcon(device.status || '')}
            {device.status || 'Desconocido'}
          </span>
          <span className="text-xs text-gray-500">
            {device.lastSync ? new Date(device.lastSync).toLocaleString() : 'Sin sincronizar'}
          </span>
        </div>
      </div>
      
      {/* Pie de la tarjeta */}
      <div className="border-t border-gray-200 p-2 bg-gray-50 flex justify-end space-x-1" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => onOperationsClick(device, e)}
          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-gray-200"
          title="Operaciones biométricas"
        >
          <Activity className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => onEventsClick(device, e)}
          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-gray-200"
          title="Ver eventos"
        >
          <Clock className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => onRestartClick(device, e)}
          className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-gray-200"
          title="Reiniciar dispositivo"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;