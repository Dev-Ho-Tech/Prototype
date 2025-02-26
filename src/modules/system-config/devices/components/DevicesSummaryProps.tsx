import React from 'react';
import { Device } from '../interfaces/device';
import { Settings, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface DevicesSummaryProps {
  devices: Device[];
}

export const DevicesSummary: React.FC<DevicesSummaryProps> = ({ devices }) => {
  // Calcular resumen
  const totalDevices = devices.length;
  const onlineDevices = devices.filter(device => device.status === 'online').length;
  const offlineDevices = devices.filter(device => device.status === 'offline').length;
  const alertDevices = devices.filter(device => device.status === 'warning').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Total de dispositivos */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Total Dispositivos</h2>
          <p className="text-3xl font-bold text-gray-800">{totalDevices}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          <Settings className="h-6 w-6 text-gray-600" />
        </div>
      </div>
      
      {/* En línea */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-500">En línea</h2>
          <p className="text-3xl font-bold text-green-600">{onlineDevices}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <Wifi className="h-6 w-6 text-green-500" />
        </div>
      </div>
      
      {/* Fuera de línea */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Fuera de línea</h2>
          <p className="text-3xl font-bold text-red-600">{offlineDevices}</p>
        </div>
        <div className="bg-red-100 p-3 rounded-full">
          <WifiOff className="h-6 w-6 text-red-500" />
        </div>
      </div>
      
      {/* Alertas */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Alertas</h2>
          <p className="text-3xl font-bold text-yellow-500">{alertDevices}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-full">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default DevicesSummary;