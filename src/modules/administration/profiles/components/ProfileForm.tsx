import React, { useState} from 'react';
import { PermissionCategory, Profile } from '../interfaces/Profile';
import { Permission } from '../interfaces/Profile';
import { PermissionCategoryItem } from './PermissionCategoryItem';
import { permissionCategories as defaultCategories } from '../temp/profilesData';
import { Search, ArrowLeft } from 'lucide-react';

interface ProfileFormProps {
  profile?: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
  isEditMode: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ 
  profile, 
  onSave, 
  onCancel,
  isEditMode
}) => {
  const [name, setName] = useState(profile?.name || '');
  const [description, setDescription] = useState(profile?.description || '');
  const [status, setStatus] = useState(profile?.status === 'active');
  const [permissionSearch, setPermissionSearch] = useState('');
  
  // Initialize permissions categories from the profile or default
  const [categories, setCategories] = useState<PermissionCategory[]>(() => {
    if (profile && profile.permissions.length > 0) {
      return defaultCategories.map(category => {
        const updatedPermissions = category.permissions.map(permission => {
          const existingPermission = profile.permissions.find(
            p => p.name === permission.name && p.category === permission.category
          );
          return existingPermission || permission;
        });
        
        return {
          ...category,
          permissions: updatedPermissions,
          isExpanded: true
        };
      });
    }
    return defaultCategories;
  });

  const handleToggleCategory = (categoryId: string) => {
    setCategories(
      categories.map(category => 
        category.id === categoryId 
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  const handleTogglePermission = (updatedPermission: Permission) => {
    setCategories(
      categories.map(category => {
        if (category.name === updatedPermission.category) {
          return {
            ...category,
            permissions: category.permissions.map(permission => 
              permission.id === updatedPermission.id
                ? updatedPermission
                : permission
            )
          };
        }
        return category;
      })
    );
  };

  const handleSubmit = () => {
    // Flatten all permissions
    const allPermissions: Permission[] = [];
    categories.forEach(category => {
      category.permissions.forEach(permission => {
        allPermissions.push(permission);
      });
    });

    const updatedProfile: Profile = {
      id: profile?.id || String(Date.now()),
      name,
      description,
      assignedUsers: profile?.assignedUsers || 0,
      status: status ? 'active' : 'inactive',
      permissions: allPermissions
    };

    onSave(updatedProfile);
  };

  // Filter categories and permissions based on search term
  const filteredCategories = permissionSearch
    ? categories.map(category => ({
        ...category,
        permissions: category.permissions.filter(permission =>
          permission.name.toLowerCase().includes(permissionSearch.toLowerCase())
        ),
        isExpanded: true
      })).filter(category => category.permissions.length > 0)
    : categories;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={onCancel}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">
          {isEditMode ? 'Editar Perfil' : 'Crear Nuevo Perfil'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda: Información básica */}
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="flex items-center text-lg font-medium mb-4">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Información básica
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="profileName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del perfil <span className="text-red-500">*</span>
                </label>
                <input
                  id="profileName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: Administrador General"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="profileDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="profileDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Describe las funciones principales de este perfil"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Estado del perfil</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={status} 
                    onChange={() => setStatus(!status)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {status ? 'Activo' : 'Inactivo'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Columna derecha: Permisos */}
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="flex items-center text-lg font-medium mb-4">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Permisos del perfil
            </h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar permisos"
                value={permissionSearch}
                onChange={(e) => setPermissionSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCategories.map(category => (
                <PermissionCategoryItem
                  key={category.id}
                  category={category}
                  onToggleExpand={handleToggleCategory}
                  onTogglePermission={handleTogglePermission}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!name || !description}
          className={`px-4 py-2 rounded-md text-white ${
            !name || !description ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isEditMode ? 'Guardar Cambios' : 'Crear Perfil'}
        </button>
      </div>
    </div>
  );
};