import React, { useState } from 'react';
import { X, Upload, Building2, Users, MapPin, Mail, Phone } from 'lucide-react';
import { nodeTypes } from '../data';
import type { OrganizationalNode } from '../../../../types';

interface NodeFormProps {
  node?: OrganizationalNode;
  parentType?: string;
  onClose: () => void;
  onSubmit: (data: Partial<OrganizationalNode>) => void;
}

export function NodeForm({ node, parentType, onClose, onSubmit }: NodeFormProps) {
  const [formData, setFormData] = useState<Partial<OrganizationalNode>>(
    node || {
      name: '',
      type: parentType ? nodeTypes.find(t => 
        nodeTypes.findIndex(nt => nt.value === parentType) + 1 === 
        nodeTypes.findIndex(nt => nt.value === t.value)
      )?.value || 'company' : 'company',
      status: 'active',
      description: '',
      manager: '',
      metadata: {
        location: '',
        contact: {
          email: '',
          phone: ''
        }
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const allowedTypes = parentType 
    ? nodeTypes.slice(nodeTypes.findIndex(t => t.value === parentType) + 1)
    : nodeTypes;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {node ? 'Editar Nodo' : 'Nuevo Nodo'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as OrganizationalNode['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  {allowedTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Responsable
                </label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={formData.metadata?.location}
                  onChange={(e) => setFormData({
                    ...formData,
                    metadata: {
                      ...formData.metadata,
                      location: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={formData.metadata?.contact?.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    metadata: {
                      ...formData.metadata,
                      contact: {
                        ...formData.metadata?.contact,
                        email: e.target.value
                      }
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.metadata?.contact?.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    metadata: {
                      ...formData.metadata,
                      contact: {
                        ...formData.metadata?.contact,
                        phone: e.target.value
                      }
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
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
                {node ? 'Guardar cambios' : 'Crear nodo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}