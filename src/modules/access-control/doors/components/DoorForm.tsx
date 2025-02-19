import React, { useState } from 'react';
import { X, Upload, Clock, Shield, Users, Camera } from 'lucide-react';
import type { Door } from '../../../../types';

interface DoorFormProps {
  door?: Door;
  onClose: () => void;
}

export function DoorForm({ door, onClose }: DoorFormProps) {
  const [formData, setFormData] = useState<Partial<Door>>(
    door || {
      name: '',
      location: '',
      type: 'biometric',
      status: 'active',
      description: '',
      securityLevel: 'medium',
      schedule: {
        enabled24_7: false,
        customHours: {
          start: '',
          end: ''
        }
      },
      restrictions: {
        authorizedGroups: [],
        specialProtocols: []
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
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {door ? 'Editar Puerta' : 'Nueva Puerta'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Información básica
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre/Identificador
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ubicación
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar ubicación</option>
                        <option value="Hodelpa Gran Almirante">Hodelpa Gran Almirante</option>
                        <option value="Hodelpa Garden Court">Hodelpa Garden Court</option>
                        <option value="Centro Plaza Hodelpa">Centro Plaza Hodelpa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Descripción
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo de acceso
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="biometric">Biométrico</option>
                        <option value="card">Tarjeta</option>
                        <option value="both">Ambos</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Multimedia
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto de la puerta
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Camera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Subir foto</span>
                              <input type="file" className="sr-only" accept="image/*" />
                            </label>
                            <p className="pl-1">o arrastrar y soltar</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG hasta 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Control de acceso
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nivel de seguridad
                      </label>
                      <select
                        value={formData.securityLevel}
                        onChange={(e) => setFormData({ ...formData, securityLevel: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="low">Bajo</option>
                        <option value="medium">Medio</option>
                        <option value="high">Alto</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.schedule?.enabled24_7}
                          onChange={(e) => setFormData({
                            ...formData,
                            schedule: { ...formData.schedule!, enabled24_7: e.target.checked }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Acceso 24/7
                        </span>
                      </label>
                    </div>

                    {!formData.schedule?.enabled24_7 && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Hora inicio
                          </label>
                          <input
                            type="time"
                            value={formData.schedule?.customHours?.start}
                            onChange={(e) => setFormData({
                              ...formData,
                              schedule: {
                                ...formData.schedule!,
                                customHours: {
                                  ...formData.schedule!.customHours!,
                                  start: e.target.value
                                }
                              }
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Hora fin
                          </label>
                          <input
                            type="time"
                            value={formData.schedule?.customHours?.end}
                            onChange={(e) => setFormData({
                              ...formData,
                              schedule: {
                                ...formData.schedule!,
                                customHours: {
                                  ...formData.schedule!.customHours!,
                                  end: e.target.value
                                }
                              }
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Restricciones
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grupos autorizados
                      </label>
                      <div className="space-y-2">
                        {['Empleados', 'Administrativos', 'Seguridad', 'Mantenimiento'].map((group) => (
                          <label key={group} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.restrictions?.authorizedGroups?.includes(group)}
                              onChange={(e) => {
                                const groups = formData.restrictions?.authorizedGroups || [];
                                setFormData({
                                  ...formData,
                                  restrictions: {
                                    ...formData.restrictions!,
                                    authorizedGroups: e.target.checked
                                      ? [...groups, group]
                                      : groups.filter(g => g !== group)
                                  }
                                });
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{group}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Protocolos especiales
                      </label>
                      <div className="space-y-2">
                        {['Emergencia', 'Mantenimiento', 'Inventario'].map((protocol) => (
                          <label key={protocol} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.restrictions?.specialProtocols?.includes(protocol)}
                              onChange={(e) => {
                                const protocols = formData.restrictions?.specialProtocols || [];
                                setFormData({
                                  ...formData,
                                  restrictions: {
                                    ...formData.restrictions!,
                                    specialProtocols: e.target.checked
                                      ? [...protocols, protocol]
                                      : protocols.filter(p => p !== protocol)
                                  }
                                });
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{protocol}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {door ? 'Guardar cambios' : 'Crear puerta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}