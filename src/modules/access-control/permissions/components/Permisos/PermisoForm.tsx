/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { X, Plus, Trash} from 'lucide-react';
import { Permiso, PermisoFormData, Area, RangoHorario } from '../../interfaces/permisos';

interface PermisoFormProps {
  permiso: Permiso | null;
  onClose: () => void;
  onSave: (permiso: Permiso) => void;
}

export function PermisoForm({ permiso, onClose, onSave }: PermisoFormProps) {
  const [formData, setFormData] = useState<PermisoFormData>(
    permiso || {
      nombre: '',
      descripcion: '',
      tipo: 'empleado',
      estado: 'activo',
      nivel: 'medio',
      tipoAutorizacion: 'tarjeta',
      areas: [],
      horarios: [],
      requiereAcompanante: false,
      vencimiento: null
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Si estamos editando, mantener los valores que no cambian
    if (permiso) {
      onSave({
        ...permiso,
        ...formData,
        fechaModificacion: new Date().toISOString(),
        modificadoPor: 'Usuario Actual',
      });
    } else {
      // Si es nuevo, crear el objeto completo
      onSave({
        ...formData,
        id: `PERM-${Date.now()}`,
        fechaCreacion: new Date().toISOString(),
        fechaModificacion: new Date().toISOString(),
        creadoPor: 'Usuario Actual',
        modificadoPor: 'Usuario Actual',
        usuariosAsignados: 0,
      } as Permiso);
    }
  };

  const handleAddArea = () => {
    const newArea: Area = {
      id: `AREA-${Date.now()}`,
      nombre: '',
      ubicacion: '',
      nivelSeguridad: 'medio',
      requiereAutorizacionAdicional: false
    };
    
    setFormData({
      ...formData,
      areas: [...formData.areas, newArea]
    });
  };

  const handleRemoveArea = (index: number) => {
    const newAreas = [...formData.areas];
    newAreas.splice(index, 1);
    setFormData({ ...formData, areas: newAreas });
  };

  const handleAreaChange = (index: number, field: keyof Area, value: any) => {
    const newAreas = [...formData.areas];
    newAreas[index] = { ...newAreas[index], [field]: value };
    setFormData({ ...formData, areas: newAreas });
  };

  const handleAddHorario = () => {
    const newHorario: RangoHorario = {
      inicio: '08:00',
      fin: '18:00',
      diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
    };
    
    setFormData({
      ...formData,
      horarios: [...formData.horarios, newHorario]
    });
  };

  const handleRemoveHorario = (index: number) => {
    const newHorarios = [...formData.horarios];
    newHorarios.splice(index, 1);
    setFormData({ ...formData, horarios: newHorarios });
  };

  const handleHorarioChange = (index: number, field: keyof RangoHorario, value: any) => {
    const newHorarios = [...formData.horarios];
    newHorarios[index] = { ...newHorarios[index], [field]: value };
    setFormData({ ...formData, horarios: newHorarios });
  };

  const handleDiaSemanaChange = (horarioIndex: number, dia: string, checked: boolean) => {
    const newHorarios = [...formData.horarios];
    const currentDias = newHorarios[horarioIndex].diasSemana;
    
    if (checked && !currentDias.includes(dia)) {
      newHorarios[horarioIndex].diasSemana = [...currentDias, dia];
    } else if (!checked && currentDias.includes(dia)) {
      newHorarios[horarioIndex].diasSemana = currentDias.filter(d => d !== dia);
    }
    
    setFormData({ ...formData, horarios: newHorarios });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {permiso ? 'Editar Permiso' : 'Nuevo Permiso'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna 1: Información básica */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Información básica
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre del permiso
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Descripción
                      </label>
                      <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo
                      </label>
                      <select
                        value={formData.tipo}
                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="empleado">Empleado</option>
                        <option value="contratista">Contratista</option>
                        <option value="visitante">Visitante</option>
                        <option value="temporal">Temporal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <select
                        value={formData.estado}
                        onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="pendiente">Pendiente de aprobación</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nivel de acceso
                      </label>
                      <select
                        value={formData.nivel}
                        onChange={(e) => setFormData({ ...formData, nivel: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="bajo">Bajo</option>
                        <option value="medio">Medio</option>
                        <option value="alto">Alto</option>
                        <option value="critico">Crítico</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo de autorización
                      </label>
                      <select
                        value={formData.tipoAutorizacion}
                        onChange={(e) => setFormData({ ...formData, tipoAutorizacion: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="tarjeta">Tarjeta</option>
                        <option value="pin">PIN</option>
                        <option value="tarjeta_pin">Tarjeta + PIN</option>
                        <option value="biometrico">Biométrico</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="requiereAcompanante"
                        checked={formData.requiereAcompanante}
                        onChange={(e) => setFormData({ ...formData, requiereAcompanante: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="requiereAcompanante" className="ml-2 block text-sm font-medium text-gray-700">
                        Requiere acompañante
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Fecha de vencimiento (opcional)
                      </label>
                      <input
                        type="date"
                        value={formData.vencimiento || ''}
                        onChange={(e) => setFormData({ ...formData, vencimiento: e.target.value || null })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna 2: Áreas y Horarios */}
              <div className="space-y-6">
                {/* Áreas permitidas */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Áreas permitidas
                  </h3>
                  
                  <div className="space-y-4">
                    {formData.areas.map((area, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900">Área {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveArea(index)}
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
                              value={area.nombre}
                              onChange={(e) => handleAreaChange(index, 'nombre', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Ubicación
                            </label>
                            <input
                              type="text"
                              value={area.ubicacion}
                              onChange={(e) => handleAreaChange(index, 'ubicacion', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Nivel de seguridad
                            </label>
                            <select
                              value={area.nivelSeguridad}
                              onChange={(e) => handleAreaChange(index, 'nivelSeguridad', e.target.value as any)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="bajo">Bajo</option>
                              <option value="medio">Medio</option>
                              <option value="alto">Alto</option>
                              <option value="critico">Crítico</option>
                            </select>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`autorizacionAdicional-${index}`}
                              checked={area.requiereAutorizacionAdicional}
                              onChange={(e) => handleAreaChange(index, 'requiereAutorizacionAdicional', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`autorizacionAdicional-${index}`} className="ml-2 block text-sm font-medium text-gray-700">
                              Requiere autorización adicional
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddArea}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar área</span>
                    </button>
                  </div>
                </div>

                {/* Horarios permitidos */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Horarios permitidos
                  </h3>
                  
                  <div className="space-y-4">
                    {formData.horarios.map((horario, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900">Horario {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveHorario(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Hora inicio
                              </label>
                              <input
                                type="time"
                                value={horario.inicio}
                                onChange={(e) => handleHorarioChange(index, 'inicio', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Hora fin
                              </label>
                              <input
                                type="time"
                                value={horario.fin}
                                onChange={(e) => handleHorarioChange(index, 'fin', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Días de la semana
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((dia) => (
                                <label key={dia} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={horario.diasSemana.includes(dia)}
                                    onChange={(e) => handleDiaSemanaChange(index, dia, e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">
                                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddHorario}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar horario</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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
                {permiso ? 'Guardar cambios' : 'Crear permiso'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}