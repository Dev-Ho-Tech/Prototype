import React, { useState, useEffect } from 'react';
import { EstacionComida, EstacionComidaFormProps } from '../interfaces/types';
import { generateId } from '../temp/comedor';
import { X, Save } from 'lucide-react';

const EstacionComidaForm: React.FC<EstacionComidaFormProps> = ({
  estacion,
  comedores,
  onSave,
  onCancel
}) => {
  const isEdit = !!estacion;
  
  // Estado inicial para una nueva estación
  const [formData, setFormData] = useState<EstacionComida>({
    id: '',
    nombre: '',
    descripcion: '',
    tipo: 'servido',
    capacidadMaxima: 50,
    comedorId: comedores.length > 0 ? comedores[0].id : '',
    estado: 'activo'
  });

  // Opciones para los tipos de estación
  const tiposEstacion = [
    { id: 'buffet', nombre: 'Buffet' },
    { id: 'servido', nombre: 'Servido' },
    { id: 'self-service', nombre: 'Self-Service' },
    { id: 'otro', nombre: 'Otro' }
  ];

  // Cargar datos de la estación si estamos en modo edición
  useEffect(() => {
    if (estacion) {
      setFormData(estacion);
    } else if (comedores.length > 0) {
      setFormData(prev => ({ ...prev, comedorId: comedores[0].id }));
    }
  }, [estacion, comedores]);

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

  // Manejador para envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Asegurarse de que tenemos todos los campos requeridos
    if (!formData.nombre || !formData.comedorId) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    // Crear un ID para nuevas estaciones o mantener el existente
    const estacionToSave: EstacionComida = {
      ...formData,
      id: formData.id || generateId('EST')
    };
    
    onSave(estacionToSave);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-lg font-medium">
          {isEdit ? `Editar Estación: ${estacion.nombre}` : 'Nueva Estación de Comida'}
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
                placeholder="Ej: Ensaladas, Platos Calientes"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="comedorId" className="block text-sm font-medium text-gray-700 mb-1">
                Comedor <span className="text-red-500">*</span>
              </label>
              <select
                id="comedorId"
                name="comedorId"
                value={formData.comedorId}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {comedores.length === 0 ? (
                  <option value="">No hay comedores disponibles</option>
                ) : (
                  comedores.map(comedor => (
                    <option key={comedor.id} value={comedor.id}>
                      {comedor.nombre}
                    </option>
                  ))
                )}
              </select>
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
          </div>
          
          {/* Columna 2 */}
          <div>
            <div className="mb-4">
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo <span className="text-red-500">*</span>
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {tiposEstacion.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="capacidadMaxima" className="block text-sm font-medium text-gray-700 mb-1">
                Capacidad Máxima <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="capacidadMaxima"
                name="capacidadMaxima"
                value={formData.capacidadMaxima}
                onChange={handleChange}
                min="1"
                required
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

export default EstacionComidaForm;