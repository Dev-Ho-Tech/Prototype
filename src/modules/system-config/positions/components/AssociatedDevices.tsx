import React, { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { AssociatedDevice, DeviceSelectionProps } from '../interfaces/types';

export const AssociatedDevices: React.FC<DeviceSelectionProps> = ({
  availableDevices,
  selectedDevices,
  onDeviceToggle
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = availableDevices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSelected = (device: AssociatedDevice) => 
    selectedDevices.some(selected => selected.id === device.id);

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Dispositivos asociados</h3>
        <p className="mt-1 text-sm text-gray-500">
          Selecciona los dispositivos que estarán asociados a este tipo de acceso
        </p>
        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar dispositivo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre dispositivo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDevices.map((device) => (
              <tr 
                key={device.id} 
                className={`cursor-pointer ${isSelected(device) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => onDeviceToggle(device)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{device.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{device.model}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{device.serialNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isSelected(device) ? (
                    <span className="text-green-600">
                      <Check className="w-5 h-5" />
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      <Check className="w-5 h-5" />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};