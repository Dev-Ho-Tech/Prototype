import React, { useState } from 'react';
import { X } from 'lucide-react';
import { deviceTypes, deviceBrands } from '../data';
import { Device } from '../interfaces/device';

interface DeviceFormProps {
  device?: Device;
  onClose: () => void;
}

export function DeviceForm({ device, onClose }: DeviceFormProps) {
  const [formData, setFormData] = useState<Partial<Device>>(
    device || {
      name: '',
      serialNumber: '',
      brand: '',
      model: '',
      type: 'biometric',
      ip: '',
      subnet: '255.255.255.0',
      location: '',
      timezone: 'America/Santo_Domingo',
      operationMode: 'attendance',
      capacity: {
        total: 3000,
        used: 0,
        type: 'fingerprints'
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {device ? 'Editar Dispositivo' : 'Nuevo Dispositivo'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Sección: Información básica */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                  <span className="text-xs">1</span>
                </div>
                <h3 className="text-md font-medium text-gray-700">
                  Información básica
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nombre del dispositivo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tipo de dispositivo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Device['type'] })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    {deviceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Marca
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar marca</option>
                    {deviceBrands.map(brand => (
                      <option key={brand.value} value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Modelo
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese modelo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Número de serie
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese número de serie"
                  />
                </div>
              </div>
            </div>

            {/* Sección: Configuración de red */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                  <span className="text-xs">2</span>
                </div>
                <h3 className="text-md font-medium text-gray-700">
                  Configuración de red
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Dirección IP
                  </label>
                  <input
                    type="text"
                    value={formData.ip}
                    onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="192.168.1.100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Máscara de red
                  </label>
                  <input
                    type="text"
                    value={formData.subnet}
                    onChange={(e) => setFormData({ ...formData, subnet: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="255.255.255.0"
                  />
                </div>
              </div>
            </div>

            {/* Sección: Configuración operativa */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                  <span className="text-xs">3</span>
                </div>
                <h3 className="text-md font-medium text-gray-700">
                  Configuración operativa
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ubicación física
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese ubicación"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Zona horaria
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="America/Santo_Domingo">America/Santo_Domingo (GMT-4)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Modo de operación
                  </label>
                  <select
                    value={formData.operationMode}
                    onChange={(e) => setFormData({ ...formData, operationMode: e.target.value as Device['operationMode'] })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="attendance">Asistencia</option>
                    <option value="access">Control de acceso</option>
                    <option value="dining">Comedor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Capacidad máxima
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={formData.capacity?.total}
                      onChange={(e) => setFormData({
                        ...formData,
                        capacity: { ...formData.capacity!, total: parseInt(e.target.value) }
                      })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <select
                      value={formData.capacity?.type}
                      onChange={(e) => setFormData({
                        ...formData,
                        capacity: { ...formData.capacity!, type: e.target.value as unknown as Device['capacity']['type'] }
                      })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="fingerprints">Huellas</option>
                      <option value="faces">Rostros</option>
                      <option value="users">Usuarios</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {device ? 'Guardar cambios' : 'Crear dispositivo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}