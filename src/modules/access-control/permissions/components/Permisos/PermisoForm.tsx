import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash } from 'lucide-react';
import { Permiso } from '../../interfaces/permisos';

interface PermisoFormProps {
  permiso: Permiso | null;
  onClose: () => void;
  onSave: (permiso: Permiso) => void;
}

export function PermisoForm({ permiso, onClose, onSave }: PermisoFormProps) {
  // Estado inicial del formulario
  const initialFormState: Permiso = {
    id: '',
    nombre: '',
    descripcion: '',
    tipo: 'empleado',
    nivel: 'bajo',
    estado: 'activo',
    fechaCreacion: '',
    fechaModificacion: '',
    creadoPor: '',
    modificadoPor: '',
    usuariosAsignados: 0,
    areas: [],
    tipoAutorizacion: 'tarjeta',
    requiereAcompanante: false,
    horarios: [{
      inicio: '08:00',
      fin: '18:00',
      diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
    }],
    permisos: {
      crear: false,
      leer: false,
      actualizar: false,
      eliminar: false,
    }
  };

  // Estado del formulario
  const [formData, setFormData] = useState<Permiso>(initialFormState);
  const [newArea, setNewArea] = useState<string>('');
  const [newAreaNivel, setNewAreaNivel] = useState<string>('bajo');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar datos del permiso existente si se está editando
  useEffect(() => {
    if (permiso) {
      // Asegúrate de que el permiso tenga todas las propiedades necesarias
      const permisoCompleto = {
        ...initialFormState,
        ...permiso,
        // Asegurar que estos objetos existan
        permisos: permiso.permisos || {
          crear: false,
          leer: false,
          actualizar: false,
          eliminar: false,
        }
      };
      setFormData(permisoCompleto);
    }
  }, [permiso]);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en los checkboxes de permisos
  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      permisos: {
        ...prev.permisos!,
        [name]: checked
      }
    }));
  };

  // Añadir una nueva área
  const handleAddArea = () => {
    if (!newArea.trim()) {
      setErrors(prev => ({ ...prev, area: 'El nombre del área es requerido' }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      areas: [
        ...prev.areas,
        {
          nombre: newArea.trim(),
          nivelSeguridad: newAreaNivel as 'bajo' | 'medio' | 'alto' | 'critico'
        }
      ]
    }));

    // Limpiar campos
    setNewArea('');
    setNewAreaNivel('bajo');
    setErrors(prev => ({ ...prev, area: '' }));
  };

  // Eliminar un área
  const handleRemoveArea = (index: number) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.filter((_, i) => i !== index)
    }));
  };

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const updatedPermiso: Permiso = {
      ...formData,
      fechaModificacion: new Date().toISOString(),
      modificadoPor: 'Usuario Actual',
    };

    onSave(updatedPermiso);
  };

  // Obtener el título según sea creación o edición
  const formTitle = permiso?.id ? 'Editar Permiso' : 'Nuevo Permiso';

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{formTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Información básica */}
            <div>
              <h3 className="text-lg font-medium mb-4">Información básica</h3>
              
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
                  className={`w-full px-3 py-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-3 py-2 border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.descripcion && <p className="mt-1 text-sm text-red-500">{errors.descripcion}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de permiso
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="empleado">Empleado</option>
                    <option value="contratista">Contratista</option>
                    <option value="visitante">Visitante</option>
                    <option value="temporal">Temporal</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel de acceso
                  </label>
                  <select
                    id="nivel"
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="bajo">Bajo</option>
                    <option value="medio">Medio</option>
                    <option value="alto">Alto</option>
                    <option value="critico">Crítico</option>
                  </select>
                </div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="tipoAutorizacion" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Autorización
                </label>
                <select
                  id="tipoAutorizacion"
                  name="tipoAutorizacion"
                  value={formData.tipoAutorizacion}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="tarjeta">Tarjeta</option>
                  <option value="tarjeta_pin">Tarjeta + PIN</option>
                  <option value="biometrico">Biométrico</option>
                </select>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="requiereAcompanante"
                  name="requiereAcompanante"
                  checked={formData.requiereAcompanante}
                  onChange={(e) => setFormData(prev => ({...prev, requiereAcompanante: e.target.checked}))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="requiereAcompanante" className="ml-2 block text-sm text-gray-700">
                  Requiere acompañante
                </label>
              </div>
            </div>

            {/* Áreas y permisos */}
            <div>
              <h3 className="text-lg font-medium mb-4">Permisos específicos</h3>
              
              <div className="mb-6">
                <fieldset className="border border-gray-200 rounded-md p-4">
                  <legend className="text-sm font-medium px-2">Acciones permitidas</legend>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="crear"
                        name="crear"
                        checked={formData.permisos?.crear || false}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="crear" className="ml-2 block text-sm text-gray-700">Crear</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="leer"
                        name="leer"
                        checked={formData.permisos?.leer || false}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="leer" className="ml-2 block text-sm text-gray-700">Leer</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="actualizar"
                        name="actualizar"
                        checked={formData.permisos?.actualizar || false}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="actualizar" className="ml-2 block text-sm text-gray-700">Actualizar</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="eliminar"
                        name="eliminar"
                        checked={formData.permisos?.eliminar || false}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="eliminar" className="ml-2 block text-sm text-gray-700">Eliminar</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <h3 className="text-lg font-medium mb-4">Áreas asignadas</h3>
              
              <div className="mb-4">
                <div className="flex space-x-3 mb-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      placeholder="Nombre del área"
                      className={`w-full px-3 py-2 border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
                  </div>
                  
                  <div className="w-1/3">
                    <select
                      value={newAreaNivel}
                      onChange={(e) => setNewAreaNivel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="bajo">Bajo</option>
                      <option value="medio">Medio</option>
                      <option value="alto">Alto</option>
                      <option value="critico">Crítico</option>
                    </select>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddArea}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Añadir
                  </button>
                </div>
                
                {/* Lista de áreas */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  {formData.areas.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No hay áreas asignadas
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {formData.areas.map((area, index) => (
                        <li key={index} className="p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{area.nombre}</p>
                            <p className="text-xs text-gray-500">Nivel: {area.nivelSeguridad}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveArea(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional solo en modo edición */}
          {permiso?.id && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Información adicional</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                <div>
                  <p className="font-medium">ID:</p>
                  <p>{permiso.id}</p>
                </div>
                <div>
                  <p className="font-medium">Creado por:</p>
                  <p>{permiso.creadoPor}</p>
                </div>
                <div>
                  <p className="font-medium">Fecha creación:</p>
                  <p>{new Date(permiso.fechaCreacion).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium">Última modificación:</p>
                  <p>{new Date(permiso.fechaModificacion).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}