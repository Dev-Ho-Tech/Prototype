import React, { useState } from 'react';
import { X, Plus, Trash, Clock, Shield, MapPin } from 'lucide-react';
import type { AccessProfile } from '../../../../types';

interface AccessProfileFormProps {
  profile?: AccessProfile;
  onClose: () => void;
}

export function AccessProfileForm({ profile, onClose }: AccessProfileFormProps) {
  const [formData, setFormData] = useState<Partial<AccessProfile>>(
    profile || {
      name: '',
      type: 'employee',
      status: 'active',
      description: '',
      areas: [],
      schedule: {
        shifts: [],
        specialDays: [],
        exceptions: []
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
              {profile ? 'Editar Perfil' : 'Nuevo Perfil'}
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
                        Nombre del perfil
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
                        Tipo
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="employee">Empleado</option>
                        <option value="contractor">Contratista</option>
                        <option value="visitor">Visitante</option>
                        <option value="temporary">Temporal</option>
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
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Áreas permitidas
                  </h3>
                  
                  <div className="space-y-4">
                    {formData.areas?.map((area, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900">Área {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const newAreas = [...(formData.areas || [])];
                              newAreas.splice(index, 1);
                              setFormData({ ...formData, areas: newAreas });
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Nombre
                            </label>
                            <input
                              type="text"
                              value={area.name}
                              onChange={(e) => {
                                const newAreas = [...(formData.areas || [])];
                                newAreas[index] = { ...area, name: e.target.value };
                                setFormData({ ...formData, areas: newAreas });
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Nivel de seguridad
                            </label>
                            <select
                              value={area.securityLevel}
                              onChange={(e) => {
                                const newAreas = [...(formData.areas || [])];
                                newAreas[index] = { ...area, securityLevel: e.target.value as any };
                                setFormData({ ...formData, areas: newAreas });
                              }}
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
                                checked={area.schedule.enabled24_7}
                                onChange={(e) => {
                                  const newAreas = [...(formData.areas || [])];
                                  newAreas[index] = {
                                    ...area,
                                    schedule: { ...area.schedule, enabled24_7: e.target.checked }
                                  };
                                  setFormData({ ...formData, areas: newAreas });
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                Acceso 24/7
                              </span>
                            </label>
                          </div>
                          {!area.schedule.enabled24_7 && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Hora inicio
                                </label>
                                <input
                                  type="time"
                                  value={area.schedule.customHours?.start}
                                  onChange={(e) => {
                                    const newAreas = [...(formData.areas || [])];
                                    newAreas[index] = {
                                      ...area,
                                      schedule: {
                                        ...area.schedule,
                                        customHours: {
                                          ...area.schedule.customHours!,
                                          start: e.target.value
                                        }
                                      }
                                    };
                                    setFormData({ ...formData, areas: newAreas });
                                  }}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Hora fin
                                </label>
                                <input
                                  type="time"
                                  value={area.schedule.customHours?.end}
                                  onChange={(e) => {
                                    const newAreas = [...(formData.areas || [])];
                                    newAreas[index] = {
                                      ...area,
                                      schedule: {
                                        ...area.schedule,
                                        customHours: {
                                          ...area.schedule.customHours!,
                                          end: e.target.value
                                        }
                                      }
                                    };
                                    setFormData({ ...formData, areas: newAreas });
                                  }}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newAreas = [...(formData.areas || []), {
                          id: `AREA${Date.now()}`,
                          name: '',
                          securityLevel: 'medium',
                          schedule: {
                            enabled24_7: false,
                            customHours: {
                              start: '',
                              end: ''
                            }
                          }
                        }];
                        setFormData({ ...formData, areas: newAreas });
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar área</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Horarios
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Turnos permitidos
                      </label>
                      <div className="space-y-2">
                        {['Mañana', 'Tarde', 'Noche', 'Diurno'].map((shift) => (
                          <label key={shift} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.schedule?.shifts.includes(shift)}
                              onChange={(e) => {
                                const shifts = formData.schedule?.shifts || [];
                                setFormData({
                                  ...formData,
                                  schedule: {
                                    ...formData.schedule!,
                                    shifts: e.target.checked
                                      ? [...shifts, shift]
                                      : shifts.filter(s => s !== shift)
                                  }
                                });
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{shift}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Días especiales
                      </label>
                      {formData.schedule?.specialDays.map((day, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-2">
                          <input
                            type="date"
                            value={day.date}
                            onChange={(e) => {
                              const newDays = [...formData.schedule!.specialDays];
                              newDays[index] = { ...day, date: e.target.value };
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, specialDays: newDays }
                              });
                            }}
                            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <select
                            value={day.allowed ? 'allowed' : 'restricted'}
                            onChange={(e) => {
                              const newDays = [...formData.schedule!.specialDays];
                              newDays[index] = { ...day, allowed: e.target.value === 'allowed' };
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, specialDays: newDays }
                              });
                            }}
                            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="allowed">Permitido</option>
                            <option value="restricted">Restringido</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Motivo"
                            value={day.reason}
                            onChange={(e) => {
                              const newDays = [...formData.schedule!.specialDays];
                              newDays[index] = { ...day, reason: e.target.value };
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, specialDays: newDays }
                              });
                            }}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newDays = [...formData.schedule!.specialDays];
                              newDays.splice(index, 1);
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, specialDays: newDays }
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
                          const newDays = [
                            ...(formData.schedule?.specialDays || []),
                            { date: '', allowed: true, reason: '' }
                          ];
                          setFormData({
                            ...formData,
                            schedule: { ...formData.schedule!, specialDays: newDays }
                          });
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar día especial</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excepciones
                      </label>
                      {formData.schedule?.exceptions.map((exception, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-2">
                          <input
                            type="date"
                            value={exception.startDate}
                            onChange={(e) => {
                              const newExceptions = [...formData.schedule!.exceptions];
                              newExceptions[index] = { ...exception, startDate: e.target.value };
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, exceptions: newExceptions }
                              });
                            }}
                            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <input
                            type="date"
                            value={exception.endDate}
                            onChange={(e) => {
                              const newExceptions = [...formData.schedule!.exceptions];
                              newExceptions[index] = { ...exception, endDate: e.target.value };
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, exceptions: newExceptions }
                              });
                            }}
                            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Motivo"
                            value={exception.reason}
                            onChange={(e) => {
                              const newExceptions = [...formData.schedule!.exceptions];
                              newExceptions[index] = { ...exception, reason: e.target.value };
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, exceptions: newExceptions }
                              });
                            }}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newExceptions = [...formData.schedule!.exceptions];
                              newExceptions.splice(index, 1);
                              setFormData({
                                ...formData,
                                schedule: { ...formData.schedule!, exceptions: newExceptions }
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
                          const newExceptions = [
                            ...(formData.schedule?.exceptions || []),
                            { startDate: '', endDate: '', reason: '' }
                          ];
                          setFormData({
                            ...formData,
                            schedule: { ...formData.schedule!, exceptions: newExceptions }
                          });
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar excepción</span>
                      </button>
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
                {profile ? 'Guardar cambios' : 'Crear perfil'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}