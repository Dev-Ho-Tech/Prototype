import React, { useState, useEffect } from 'react';
import { HorarioComida, HorarioComidaFormProps, DiaSemana } from '../interfaces/types';
import { generateId } from '../temp/comedor';
import { X, Save, Clock } from 'lucide-react';

const HorarioComidaForm: React.FC<HorarioComidaFormProps> = ({
  horario,
  comedores,
  onSave,
  onCancel
}) => {
  const isEdit = !!horario;
  
  // Estado inicial para un nuevo horario
  const [formData, setFormData] = useState<HorarioComida>({
    id: '',
    nombre: '',
    horaInicio: '08:00',
    horaFin: '09:00',
    diasSemana: [],
    capacidadMaxima: 100,
    comedorId: comedores.length > 0 ? comedores[0].id : '',
    estado: 'activo'
  });

  // Opciones para los días de la semana
  const diasSemanaOptions = Object.values(DiaSemana);

  // Cargar datos del horario si estamos en modo edición
  useEffect(() => {
    if (horario) {
      setFormData(horario);
    } else if (comedores.length > 0) {
      setFormData(prev => ({ ...prev, comedorId: comedores[0].id }));
    }
  }, [horario, comedores]);

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

  // Manejador para cambios en los días de la semana (checkboxes)
  const handleDiaSemanaChange = (dia: DiaSemana) => {
    const diasSemanaActual = [...formData.diasSemana];
    
    if (diasSemanaActual.includes(dia)) {
      // Si ya está seleccionado, quitar de la lista
      const nuevoDias = diasSemanaActual.filter(d => d !== dia);
      setFormData({
        ...formData,
        diasSemana: nuevoDias
      });
    } else {
      // Si no está seleccionado, agregar a la lista
      setFormData({
        ...formData,
        diasSemana: [...diasSemanaActual, dia]
      });
    }
  };

  // Manejador para envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Asegurarse de que tenemos todos los campos requeridos
    if (!formData.nombre || !formData.horaInicio || !formData.horaFin || formData.diasSemana.length === 0) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    // Validar que hora fin sea posterior a hora inicio
    if (formData.horaInicio >= formData.horaFin) {
      alert('La hora de fin debe ser posterior a la hora de inicio');
      return;
    }
    
    // Crear un ID para nuevos horarios o mantener el existente
    const horarioToSave: HorarioComida = {
      ...formData,
      id: formData.id || generateId('HOR')
    };
    
    onSave(horarioToSave);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-lg font-medium">
          {isEdit ? `Editar Horario: ${horario.nombre}` : 'Nuevo Horario de Comida'}
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
                placeholder="Ej: Desayuno, Almuerzo, Cena"
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
          
          {/* Columna 2 */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Inicio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="horaInicio"
                    name="horaInicio"
                    value={formData.horaInicio}
                    onChange={handleChange}
                    required
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Fin <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="horaFin"
                    name="horaFin"
                    value={formData.horaFin}
                    onChange={handleChange}
                    required
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Días de la semana <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {diasSemanaOptions.map(dia => (
                  <div key={dia} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`dia-${dia}`}
                      checked={formData.diasSemana.includes(dia)}
                      onChange={() => handleDiaSemanaChange(dia)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`dia-${dia}`} className="ml-2 text-sm text-gray-700">
                      {dia}
                    </label>
                  </div>
                ))}
              </div>
              {formData.diasSemana.length === 0 && (
                <p className="text-red-500 text-xs mt-1">Seleccione al menos un día</p>
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

export default HorarioComidaForm;
