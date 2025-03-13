import React, { useState, useEffect } from 'react';
import { CheckProfile, CheckProfileFormData, CheckMethodType } from '../interfaces/CheckProfile';
import { Clock, MapPin, Camera, Fingerprint, CreditCard, KeyRound} from 'lucide-react';

interface CheckProfileFormProps {
  initialData?: CheckProfile | null;
  onSubmit: (data: CheckProfileFormData) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting: boolean;
  mode: 'create' | 'edit';
}

const CheckProfileForm: React.FC<CheckProfileFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  mode
}) => {
  const [formData, setFormData] = useState<CheckProfileFormData>({
    name: '',
    description: '',
    type: 'attendance',
    status: 'active',
    schedule: {
      startTime: '08:00',
      endTime: '17:00'
    },
    methods: ['fingerprint'],
    validations: {
      requirePhoto: false,
      requireLocation: false
    }
  });

  // Inicializar el formulario con datos existentes si estamos en modo edición
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        type: initialData.type,
        status: initialData.status,
        schedule: initialData.schedule,
        methods: initialData.methods,
        validations: initialData.validations,
        locations: initialData.locations,
        departments: initialData.departments
      });
    }
  }, [initialData, mode]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        const parentKey = parent as keyof CheckProfileFormData;
        const parentValue = prev[parentKey];
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Manejar cambios en los métodos de marcaje
  const handleMethodToggle = (method: CheckMethodType) => {
    setFormData(prev => {
      const methods = prev.methods.includes(method)
        ? prev.methods.filter(m => m !== method)
        : [...prev.methods, method];
      
      return { ...prev, methods };
    });
  };

  // Manejar cambios en las validaciones
  const handleValidationToggle = (key: keyof typeof formData.validations) => {
    setFormData(prev => ({
      ...prev,
      validations: {
        ...prev.validations,
        [key]: !prev.validations[key]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección principal - Layout horizontal */}
      <div className="grid grid-cols-1 gap-6">
        {/* Información básica */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-700 mb-4">Información básica</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del perfil*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de perfil*
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="attendance">Asistencia</option>
                <option value="access">Acceso</option>
                <option value="dining">Comedor</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Layout horizontal para las tres secciones restantes */}
        <div className="grid grid-cols-3 gap-6">
          {/* Horario */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="flex items-center text-lg font-medium text-blue-700 mb-4">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Configuración de horario
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="schedule.startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de inicio
                </label>
                <input
                  id="schedule.startTime"
                  name="schedule.startTime"
                  type="time"
                  value={formData.schedule.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="schedule.endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de fin
                </label>
                <input
                  id="schedule.endTime"
                  name="schedule.endTime"
                  type="time"
                  value={formData.schedule.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="schedule.tolerance" className="block text-sm font-medium text-gray-700 mb-1">
                Tolerancia (minutos)
              </label>
              <input
                id="schedule.tolerance"
                name="schedule.tolerance"
                type="number"
                min="0"
                value={formData.schedule.tolerance || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Métodos de marcaje */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="flex items-center text-lg font-medium text-blue-700 mb-4">
              <Fingerprint className="w-5 h-5 mr-2 text-blue-500" />
              Métodos de Marcaje Permitidos
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleMethodToggle('fingerprint')}
                className={`
                  p-4 border rounded-lg flex flex-col items-center justify-center transition
                  ${formData.methods.includes('fingerprint')
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'}
                `}
              >
                <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
                  <Fingerprint className="w-6 h-6 text-blue-600" />
                </div>
                <span>Huella</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleMethodToggle('face')}
                className={`
                  p-4 border rounded-lg flex flex-col items-center justify-center transition
                  ${formData.methods.includes('face')
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'}
                `}
              >
                <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  </svg>
                </div>
                <span>Rostro</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleMethodToggle('card')}
                className={`
                  p-4 border rounded-lg flex flex-col items-center justify-center transition
                  ${formData.methods.includes('card')
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'}
                `}
              >
                <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <span>Tarjeta</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleMethodToggle('pin')}
                className={`
                  p-4 border rounded-lg flex flex-col items-center justify-center transition
                  ${formData.methods.includes('pin')
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'}
                `}
              >
                <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
                  <KeyRound className="w-6 h-6 text-blue-600" />
                </div>
                <span>PIN</span>
              </button>
            </div>
            
            {formData.methods.length === 0 && (
              <p className="mt-2 text-sm text-red-600">
                Debe seleccionar al menos un método
              </p>
            )}
          </div>
          
          {/* Validaciones */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-medium text-blue-700 mb-4">Validaciones adicionales</h3>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.validations.requirePhoto}
                  onChange={() => handleValidationToggle('requirePhoto')}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 flex items-center text-gray-700">
                  <Camera className="w-4 h-4 mr-1 text-blue-500" />
                  Requiere foto
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.validations.requireLocation}
                  onChange={() => handleValidationToggle('requireLocation')}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                  Requiere ubicación
                </span>
              </label>
              
              {formData.validations.requireLocation && (
                <div className="ml-6 mt-2">
                  <label htmlFor="validations.maxDistanceMeters" className="block text-sm font-medium text-gray-700 mb-1">
                    Distancia máxima (metros)
                  </label>
                  <input
                    id="validations.maxDistanceMeters"
                    name="validations.maxDistanceMeters"
                    type="number"
                    min="0"
                    value={formData.validations.maxDistanceMeters || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.validations.requireSupervisorApproval}
                  onChange={() => handleValidationToggle('requireSupervisorApproval')}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">
                  Requiere aprobación de supervisor
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.validations.allowOvertime}
                  onChange={() => handleValidationToggle('allowOvertime')}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">
                  Permitir horas extra
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-blue-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting || formData.methods.length === 0}
        >
          {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Crear perfil' : 'Actualizar perfil'}
        </button>
      </div>
    </form>
  );
};

export default CheckProfileForm;