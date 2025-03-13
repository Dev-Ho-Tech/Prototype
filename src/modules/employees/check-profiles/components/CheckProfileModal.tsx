import React from 'react';
import { X, AlertTriangle, Clock, Users, Fingerprint, MapPin, Camera, Check, Shield, Clock12 } from 'lucide-react';
import { CheckProfile, CheckProfileFormData } from '../interfaces/CheckProfile';
import CheckProfileForm from './CheckProfileForm';

interface CheckProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'delete' | 'view';
  profile: CheckProfile | null;
  isSubmitting: boolean;
  onSubmit: (data: CheckProfileFormData) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

const CheckProfileModal: React.FC<CheckProfileModalProps> = ({
  isOpen,
  onClose,
  mode,
  profile,
  isSubmitting,
  onSubmit,
  onDelete
}) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    if (profile) {
      await onDelete(profile.id);
    }
  };

  // Obtener el color según el tipo de perfil
  const getProfileTypeColor = (type: string) => {
    switch(type) {
      case 'attendance': return 'bg-blue-500';
      case 'access': return 'bg-green-500';
      case 'dining': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  // Obtener el icono según el tipo de perfil
  const getProfileTypeIcon = (type: string) => {
    switch(type) {
      case 'attendance': return <Clock className="w-6 h-6 text-white" />;
      case 'access': return <Fingerprint className="w-6 h-6 text-white" />;
      case 'dining': return <Users className="w-6 h-6 text-white" />;
      default: return <Fingerprint className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${mode === 'create' || mode === 'edit' ? 'sm:max-w-6xl' : 'sm:max-w-5xl'} sm:w-full`}>
          {/* Encabezado personalizado con color según el modo */}
          <div className={`px-6 py-4 ${mode === 'delete' ? 'bg-red-500' : 'bg-blue-500'} text-white flex justify-between items-center`}>
            <h3 className="text-xl font-medium flex items-center">
              {mode === 'create' && 'Crear nuevo perfil de marcaje'}
              {mode === 'edit' && 'Editar perfil de marcaje'}
              {mode === 'delete' && 'Eliminar perfil de marcaje'}
              {mode === 'view' && 'Detalles del perfil de marcaje'}
            </h3>
            <button
              type="button"
              className="rounded-md text-white hover:text-gray-100 focus:outline-none transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Contenido según el modo */}
          {mode === 'delete' ? (
            <div className="p-6 sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Eliminar perfil
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    ¿Está seguro de que desea eliminar el perfil "{profile?.name}"? Esta acción no se puede deshacer.
                  </p>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </div>
            </div>
          ) : mode === 'view' && profile ? (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8 mb-6">
                {/* Encabezado del detalle con ícono y estado */}
                <div className="flex items-start">
                  <div className={`mr-4 p-3 rounded-full ${getProfileTypeColor(profile.type)}`}>
                    {getProfileTypeIcon(profile.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${
                        profile.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {profile.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {profile.employeeCount} empleados asignados
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sección de Horarios */}
                <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16">
                    <div className="absolute transform rotate-45 bg-blue-500 text-white shadow-sm -right-8 -top-8 h-16 w-16"></div>
                    <Clock className="absolute right-1.5 top-2 h-4 w-4 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Configuración de Horario
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Hora de inicio</span>
                      <span className="font-medium text-gray-900">{profile.schedule.startTime}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Hora de fin</span>
                      <span className="font-medium text-gray-900">{profile.schedule.endTime}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tolerancia</span>
                      <span className="font-medium text-gray-900">{profile.schedule.tolerance || 0} minutos</span>
                    </div>
                  </div>
                </div>

                {/* Sección de Métodos */}
                <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16">
                    <div className="absolute transform rotate-45 bg-blue-500 text-white shadow-sm -right-8 -top-8 h-16 w-16"></div>
                    <Fingerprint className="absolute right-1.5 top-2 h-4 w-4 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                    <Fingerprint className="w-5 h-5 mr-2 text-blue-500" />
                    Métodos Permitidos
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {profile.methods.map(method => (
                      <span
                        key={method}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm"
                      >
                        {method === 'fingerprint' && <Fingerprint className="w-4 h-4 mr-1" />}
                        {method === 'face' && <Camera className="w-4 h-4 mr-1" />}
                        {method === 'card' && <Check className="w-4 h-4 mr-1" />}
                        {method === 'pin' && <Shield className="w-4 h-4 mr-1" />}
                        {method === 'mobile' && <Clock12 className="w-4 h-4 mr-1" />}
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sección de Validaciones */}
                <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16">
                    <div className="absolute transform rotate-45 bg-blue-500 text-white shadow-sm -right-8 -top-8 h-16 w-16"></div>
                    <Check className="absolute right-1.5 top-2 h-4 w-4 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                    <Check className="w-5 h-5 mr-2 text-blue-500" />
                    Validaciones
                  </h4>
                  
                  <ul className="space-y-3">
                    <li className={`flex items-center text-sm ${profile.validations.requirePhoto ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                      <div className={`rounded-full h-5 w-5 flex items-center justify-center mr-2 ${profile.validations.requirePhoto ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        {profile.validations.requirePhoto ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </div>
                      <span className="flex items-center">
                        <Camera className="w-4 h-4 mr-1" /> Requiere foto
                      </span>
                    </li>
                    
                    <li className={`flex items-center text-sm ${profile.validations.requireLocation ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                      <div className={`rounded-full h-5 w-5 flex items-center justify-center mr-2 ${profile.validations.requireLocation ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        {profile.validations.requireLocation ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </div>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> Requiere ubicación
                        {profile.validations.requireLocation && profile.validations.maxDistanceMeters && (
                          <span className="ml-1 text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-full">
                            Máx: {profile.validations.maxDistanceMeters}m
                          </span>
                        )}
                      </span>
                    </li>
                    
                    <li className={`flex items-center text-sm ${profile.validations.requireSupervisorApproval ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                      <div className={`rounded-full h-5 w-5 flex items-center justify-center mr-2 ${profile.validations.requireSupervisorApproval ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        {profile.validations.requireSupervisorApproval ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </div>
                      <span>Requiere aprobación de supervisor</span>
                    </li>
                    
                    <li className={`flex items-center text-sm ${profile.validations.allowOvertime ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                      <div className={`rounded-full h-5 w-5 flex items-center justify-center mr-2 ${profile.validations.allowOvertime ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        {profile.validations.allowOvertime ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </div>
                      <span>Permite horas extra</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={onClose}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  onClick={() => {
                    onClose();
                    if (profile) {
                      setTimeout(() => {
                        onSubmit(profile);
                      }, 100);
                    }
                  }}
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <CheckProfileForm
                initialData={profile}
                onSubmit={onSubmit}
                onCancel={onClose}
                isSubmitting={isSubmitting}
                mode={mode}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckProfileModal;