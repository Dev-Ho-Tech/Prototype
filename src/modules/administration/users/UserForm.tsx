import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { departments, roles } from './temp/data';
import type { User } from '../../../types';

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
}

export function UserForm({ user, onClose }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      role: 'user',
      departments: [],
      permissions: {
        approveHours: false,
        modifyChecks: false,
        manageReports: false
      },
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      twoFactorEnabled: false
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el usuario
    console.log('Guardando usuario:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {user ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Información Personal</h3>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={formData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm border border-gray-200"
              >
                <Upload className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex-1">
              <div className="mb-2">
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
              Rol
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departamentos
            </label>
            <div className="space-y-2 max-h-48 overflow-auto">
              {departments.map((department) => (
                <label key={department} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.departments?.includes(department)}
                    onChange={(e) => {
                      const deps = formData.departments || [];
                      setFormData({
                        ...formData,
                        departments: e.target.checked
                          ? [...deps, department]
                          : deps.filter(d => d !== department)
                      });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{department}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Permisos y Seguridad</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permisos específicos
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.permissions?.approveHours}
                  onChange={(e) => setFormData({
                    ...formData,
                    permissions: { ...formData.permissions!, approveHours: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Aprobación de horas</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.permissions?.modifyChecks}
                  onChange={(e) => setFormData({
                    ...formData,
                    permissions: { ...formData.permissions!, modifyChecks: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Modificación de marcajes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.permissions?.manageReports}
                  onChange={(e) => setFormData({
                    ...formData,
                    permissions: { ...formData.permissions!, manageReports: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Gestión de reportes</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de inicio
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Opciones de seguridad</h4>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.twoFactorEnabled}
                  onChange={(e) => setFormData({ ...formData, twoFactorEnabled: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Autenticación de dos factores</span>
              </label>
            </div>

            {!user && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña temporal
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  El usuario deberá cambiar la contraseña en su primer inicio de sesión
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
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
          {user ? 'Guardar cambios' : 'Crear usuario'}
        </button>
      </div>
    </form>
  );
}