import React, { useState, useEffect } from 'react';
import { PerfilComida, PerfilComidaFormProps } from '../interfaces/types';
import { generateId } from '../temp/comedor';
import { X, Save } from 'lucide-react';

const PerfilComidaForm: React.FC<PerfilComidaFormProps> = ({
  perfil,
  horarios,
  estaciones,
  onSave,
  onCancel
}) => {
  const isEdit = !!perfil;
  
  // Estado inicial para un nuevo perfil
  const [formData, setFormData] = useState<PerfilComida>({
    id: '',
    nombre: '',
    descripcion: '',
    ticketsDisponibles: 0,
    horarioIds: [],
    estacionIds: [],
    estado: 'activo'
  });

  // Cargar datos del perfil si estamos en modo edición
  useEffect(() => {
    if (perfil) {
      setFormData(perfil);
    }
  }, [perfil]);

  // Manejador para cambios en campos simples
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Para campos numéricos, convertir el valor a número
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Manejador para cambios en los horarios seleccionados (checkboxes)
  const handleHorarioChange = (horarioId: string) => {
    const horarioIdsActual = [...formData.horarioIds];
    
    if (horarioIdsActual.includes(horarioId)) {
      // Si ya está seleccionado, quitar de la lista
      const nuevoHorarios = horarioIdsActual.filter(id => id !== horarioId);
      setFormData({
        ...formData,
        horarioIds: nuevoHorarios
      });
    } else {
      // Si no está seleccionado, agregar a la lista
      setFormData({
        ...formData,
        horarioIds: [...horarioIdsActual, horarioId]
      });
    }
  };

  // Manejador para cambios en las estaciones seleccionadas (checkboxes)
  const handleEstacionChange = (estacionId: string) => {
    const estacionIdsActual = [...formData.estacionIds];
    
    if (estacionIdsActual.includes(estacionId)) {
      // Si ya está seleccionado, quitar de la lista
      const nuevoEstaciones = estacionIdsActual.filter(id => id !== estacionId);
      setFormData({
        ...formData,
        estacionIds: nuevoEstaciones
      });
    } else {
      // Si no está seleccionado, agregar a la lista
      setFormData({
        ...formData,
        estacionIds: [...estacionIdsActual, estacionId]
      });
    }
  };

  // Manejador para envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Asegurarse de que tenemos todos los campos requeridos
    if (!formData.nombre || formData.horarioIds.length === 0 || formData.estacionIds.length === 0) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    // Crear un ID para nuevos perfiles o mantener el existente
    const perfilToSave: PerfilComida = {
      ...formData,
      id: formData.id || generateId('PERF')
    };
    
    onSave(perfilToSave);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-lg font-medium">
          {isEdit ? `Editar Perfil: ${perfil.nombre}` : 'Nuevo Perfil de Comida'}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1 */}
          <div>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Alimentación Regular"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion || ''}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="ticketsDisponibles" className="block text-sm font-medium text-gray-700 mb-1">
                Tickets Disponibles
              </label>
              <input
                type="number"
                id="ticketsDisponibles"
                name="ticketsDisponibles"
                value={formData.ticketsDisponibles}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          
          {/* Columna 2 */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horarios de Comida <span className="text-red-500">*</span>
              </label>
              {horarios.length === 0 ? (
                <div className="p-3 bg-gray-100 rounded-md text-gray-500 text-sm">
                  No hay horarios disponibles. Por favor, cree horarios primero.
                </div>
              ) : (
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {horarios.map(horario => (
                    <div key={horario.id} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`horario-${horario.id}`}
                        checked={formData.horarioIds.includes(horario.id)}
                        onChange={() => handleHorarioChange(horario.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`horario-${horario.id}`} className="ml-2 block text-sm text-gray-700">
                        {horario.nombre} ({horario.horaInicio} - {horario.horaFin})
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {formData.horarioIds.length === 0 && (
                <p className="text-red-500 text-xs mt-1">Seleccione al menos un horario</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estaciones de Comida <span className="text-red-500">*</span>
              </label>
              {estaciones.length === 0 ? (
                <div className="p-3 bg-gray-100 rounded-md text-gray-500 text-sm">
                  No hay estaciones disponibles. Por favor, cree estaciones primero.
                </div>
              ) : (
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {estaciones.map(estacion => (
                    <div key={estacion.id} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`estacion-${estacion.id}`}
                        checked={formData.estacionIds.includes(estacion.id)}
                        onChange={() => handleEstacionChange(estacion.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`estacion-${estacion.id}`} className="ml-2 block text-sm text-gray-700">
                        {estacion.nombre} ({estacion.tipo})
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {formData.estacionIds.length === 0 && (
                <p className="text-red-500 text-xs mt-1">Seleccione al menos una estación</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfilComidaForm;