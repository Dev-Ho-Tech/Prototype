import React, { useState } from 'react';
import { Search, Computer, Plus, X } from 'lucide-react';
import { AssociatedDevice, DeviceSelectionProps } from '../interfaces/types';

export const ImprovedAssociatedDevices: React.FC<DeviceSelectionProps> = ({
  availableDevices,
  selectedDevices,
  onDeviceToggle
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);

  // Filtra los dispositivos disponibles según el término de búsqueda
  const filteredDevices = availableDevices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Comprueba si un dispositivo está seleccionado
  const isSelected = (device: AssociatedDevice) => 
    selectedDevices.some(selected => selected.id === device.id);

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-md font-medium text-gray-900">Dispositivos asociados</h3>
        
        <div className="mt-2 flex items-center">
          <div className="flex-1 flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md">
            <span className="text-sm">{selectedDevices.length} dispositivos seleccionados</span>
            <button
              type="button"
              className="ml-2 text-blue-600 hover:text-blue-700"
              onClick={() => setShowDeviceSelector(!showDeviceSelector)}
            >
              {showDeviceSelector ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* Lista de dispositivos seleccionados */}
        {selectedDevices.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-2">
            {selectedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <Computer className="w-4 h-4 text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">{device.name}</div>
                    <div className="text-xs text-gray-500">{device.model} | {device.serialNumber}</div>
                  </div>
                </div>
                <button
                  onClick={() => onDeviceToggle(device)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selector de dispositivos */}
      {showDeviceSelector && (
        <div className="p-4 border-t border-gray-200">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar dispositivo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="overflow-y-auto max-h-64">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};