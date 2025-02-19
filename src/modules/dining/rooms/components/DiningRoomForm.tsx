import React, { useState } from 'react';
import { X, Plus, Trash, Clock } from 'lucide-react';
import type { DiningRoom } from '../../../../types';

interface DiningRoomFormProps {
  diningRoom?: DiningRoom;
  onClose: () => void;
}

export function DiningRoomForm({ diningRoom, onClose }: DiningRoomFormProps) {
  const [formData, setFormData] = useState<Partial<DiningRoom>>(
    diningRoom || {
      name: '',
      location: '',
      description: '',
      capacity: 0,
      status: 'active',
      devices: [],
      schedule: {
        startTime: '',
        endTime: '',
        shifts: []
      },
      restrictions: {
        maxTimePerPerson: 45,
        maxCapacityPerShift: 0,
        requiresReservation: false
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
              {diningRoom ? 'Editar Comedor' : 'Nuevo Comedor'}
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
                        Nombre
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
                        Capacidad máxima
                      </label>
                      <input
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Dispositivos
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      {formData.devices?.map((device, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-900">{device}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newDevices = formData.devices?.filter((_, i) => i !== index);
                              setFormData({ ...formData, devices: newDevices });
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newDevices = [...(formData.devices || []), `DIN-${Date.now()}`];
                          setFormData({ ...formData, devices: newDevices });
                        }}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar dispositivo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Horario de operación
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Hora de apertura
                        </label>
                        <input
                          type="time"
                          value={formData.schedule?.startTime}
                          onChange={(e) => setFormData({
                            ...formData,
                            schedule: { ...formData.schedule!, startTime: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Hora de cierre
                        </label>
                        <input
                          type="time"
                          value={formData.schedule?.endTime}
                          onChange={(e) => setFormData({
                            ...formData,
                            schedule: { ...formData.schedule!, endTime: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Turnos
                      </label>
                      <div className="space-y-2">
                        {formData.schedule?.shifts.map((shift, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <select
                              value={shift.type}
                              onChange={(e) => {
                                const newShifts = [...formData.schedule!.shifts];
                                newShifts[index] = { ...shift, type: e.target.value as any };
                                setFormData({
                                  ...formData,
                                  schedule: { ...formData.schedule!, shifts: newShifts }
                                });
                              }}
                              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="breakfast">Desayuno</option>
                              <option value="lunch">Almuerzo</option>
                              <option value="dinner">Cena</option>
                              <option value="break">Break</option>
                            </select>
                            <input
                              type="time"
                              value={shift.startTime}
                              onChange={(e) => {
                                const newShifts = [...formData.schedule!.shifts];
                                newShifts[index] = { ...shift, startTime: e.target.value };
                                setFormData({
                                  ...formData,
                                  schedule: { ...formData.schedule!, shifts: newShifts }
                                });
                              }}
                              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <input
                              type="time"
                              value={shift.endTime}
                              onChange={(e) => {
                                const newShifts = [...formData.schedule!.shifts];
                                newShifts[index] = { ...shift, endTime: e.target.value };
                                setFormData({
                                  ...formData,
                                  schedule: { ...formData.schedule!, shifts: newShifts }
                                });
                              }}
                              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newShifts = formData.schedule!.shifts.filter((_, i) => i !== index);
                                setFormData({
                                  ...formData,
                                  schedule: { ...formData.schedule!, shifts: newShifts }
                                });
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newShifts = [
                              ...(formData.schedule?.shifts || []),
                              { type: 'breakfast', startTime: '', endTime: '' }
                            ];
                            setFormData({
                              ...formData,
                              schedule: { ...formData.schedule!, shifts: newShifts }
                            });
                          }}
                          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Agregar turno</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Restricciones
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tiempo máximo por persona (minutos)
                      </label>
                      <input
                        type="number"
                        value={formData.restrictions?.maxTimePerPerson}
                        onChange={(e) => setFormData({
                          ...formData,
                          restrictions: { ...formData.restrictions!, maxTimePerPerson: parseInt(e.target.value) }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Capacidad máxima por turno
                      </label>
                      <input
                        type="number"
                        value={formData.restrictions?.maxCapacityPerShift}
                        onChange={(e) => setFormData({
                          ...formData,
                          restrictions: { ...formData.restrictions!, maxCapacityPerShift: parseInt(e.target.value) }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.restrictions?.requiresReservation}
                          onChange={(e) => setFormData({
                            ...formData,
                            restrictions: { ...formData.restrictions!, requiresReservation: e.target.checked }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Requiere reservación
                        </span>
                      </label>
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
                {diningRoom ? 'Guardar cambios' : 'Crear comedor'}
              </button> </div>
          </form>
        </div>
      </div>
    </div>
  );
}