import React, { useState } from 'react';
import { X, Upload, Camera, Clock, MapPin, User, Building2, Mail, Phone, FileText } from 'lucide-react';
import type { Visitor } from '../../../../types';

interface VisitorFormProps {
  visitor?: Visitor;
  onClose: () => void;
}

export function VisitorForm({ visitor, onClose }: VisitorFormProps) {
  const [formData, setFormData] = useState<Partial<Visitor>>(
    visitor || {
      firstName: '',
      lastName: '',
      documentType: 'cedula',
      documentNumber: '',
      company: '',
      email: '',
      phone: '',
      visit: {
        reason: '',
        host: '',
        hostDepartment: '',
        areas: [],
        startTime: '',
        endTime: '',
        duration: ''
      },
      credentials: {
        type: 'card',
        requiresEscort: false
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
              {visitor ? 'Editar Visitante' : 'Nuevo Visitante'}
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
                    Información personal
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          {formData.photo ? (
                            <img
                              src={formData.photo}
                              alt="Visitor"
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                          ) : (
                            <Camera className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm border border-gray-200"
                        >
                          <Upload className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Nombre
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Apellidos
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tipo de documento
                        </label>
                        <select
                          value={formData.documentType}
                          onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="cedula">Cédula</option>
                          <option value="passport">Pasaporte</option>
                          <option value="license">Licencia</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de documento
                        </label>
                        <input
                          type="text"
                          value={formData.documentNumber}
                          onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Empresa/Organización
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Detalles de la visita
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Motivo de la visita
                      </label>
                      <textarea
                        value={formData.visit?.reason}
                        onChange={(e) => setFormData({
                          ...formData,
                          visit: { ...formData.visit!, reason: e.target.value }
                        })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Persona a visitar
                        </label>
                        <input
                          type="text"
                          value={formData.visit?.host}
                          onChange={(e) => setFormData({
                            ...formData,
                            visit: { ...formData.visit!, host: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Departamento
                        </label>
                        <input
                          type="text"
                          value={formData.visit?.hostDepartment}
                          onChange={(e) => setFormData({
                            ...formData,
                            visit: { ...formData.visit!, hostDepartment: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fecha/hora inicio
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.visit?.startTime?.slice(0, 16)}
                          onChange={(e) => setFormData({
                            ...formData,
                            visit: { ...formData.visit!, startTime: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fecha/hora fin
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.visit?.endTime?.slice(0, 16)}
                          onChange={(e) => setFormData({
                            ...formData,
                            visit: { ...formData.visit!, endTime: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Áreas autorizadas
                      </label>
                      <div className="space-y-2">
                        {['Recepción', 'Oficinas', 'Sala de Reuniones', 'Área Técnica'].map((area) => (
                          <label key={area} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.visit?.areas?.includes(area)}
                              onChange={(e) => {
                                const areas = formData.visit?.areas || [];
                                setFormData({
                                  ...formData,
                                  visit: {
                                    ...formData.visit!,
                                    areas: e.target.checked
                                      ? [...areas, area]
                                      : areas.filter(a => a !== area)
                                  }
                                });
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{area}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Credenciales
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo de acceso
                      </label>
                      <select
                        value={formData.credentials?.type}
                        onChange={(e) => setFormData({
                          ...formData,
                          credentials: { ...formData.credentials!, type: e.target.value as any }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="card">Tarjeta</option>
                        <option value="pin">PIN</option>
                        <option value="both">Ambos</option>
                      </select>
                    </div>

                    {(formData.credentials?.type === 'card' || formData.credentials?.type === 'both') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de tarjeta
                        </label>
                        <input
                          type="text"
                          value={formData.credentials?.cardNumber}
                          onChange={(e) => setFormData({
                            ...formData,
                            credentials: { ...formData.credentials!, cardNumber: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {(formData.credentials?.type === 'pin' || formData.credentials?.type === 'both') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          PIN temporal
                        </label>
                        <input
                          type="text"
                          value={formData.credentials?.pin}
                          onChange={(e) => setFormData({
                            ...formData,
                            credentials: { ...formData.credentials!, pin: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.credentials?.requiresEscort}
                          onChange={(e) => setFormData({
                            ...formData,
                            credentials: { ...formData.credentials!, requiresEscort: e.target.checked }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Requiere acompañante
                        </span>
                      </label>
                    </div>

                    {formData.credentials?.requiresEscort && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nombre del acompañante
                        </label>
                        <input
                          type="text"
                          value={formData.credentials?.escortName}
                          onChange={(e) => setFormData({
                            ...formData,
                            credentials: { ...formData.credentials!, escortName: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )}
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
                {visitor ? 'Guardar cambios' : 'Registrar visitante'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}