import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { AccessType, AccessTypeFormProps } from '../interfaces/types';

export const AccessTypeForm: React.FC<AccessTypeFormProps> = ({
  accessType,
  accessProfiles,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<AccessType>>({
    name: '',
    description: '',
    isActive: true,
  });

  const [selectedProfile, setSelectedProfile] = useState<string>('');

  useEffect(() => {
    if (accessType) {
      setFormData({
        ...accessType
      });
    }
    // Si hay un perfil predeterminado, seleccionarlo
    const defaultProfile = accessProfiles.find(profile => profile.isDefault);
    if (defaultProfile) {
      setSelectedProfile(defaultProfile.id);
    } else if (accessProfiles.length > 0) {
      setSelectedProfile(accessProfiles[0].id);
    }
  }, [accessType, accessProfiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkboxInput.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    const finalData: AccessType = {
      ...(formData as AccessType),
      id: accessType?.id || `access-type-${Date.now()}`,
      createdAt: accessType?.createdAt || now,
      updatedAt: now
    };
    
    onSave(finalData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          {accessType ? 'Editar Tipo de Acceso' : 'Nuevo Tipo de Acceso'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="accessProfile" className="block text-sm font-medium text-gray-700">
              Perfil de Acceso <span className="text-red-500">*</span>
            </label>
            <select
              name="accessProfile"
              id="accessProfile"
              required
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {accessProfiles.map(profile => (
                <option key={profile.id} value={profile.id}>
                  {profile.name} {profile.description ? `- ${profile.description}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Activo
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};