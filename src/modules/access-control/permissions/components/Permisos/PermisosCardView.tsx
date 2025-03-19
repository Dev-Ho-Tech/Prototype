import React from 'react';
import { Eye, Edit, Trash, Users, MapPin, Clock } from 'lucide-react';
import { Permiso } from '../../interfaces/permisos';

interface PermisosCardViewProps {
  permisos: Permiso[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PermisosCardView: React.FC<PermisosCardViewProps> = ({
  permisos,
  onView,
  onEdit,
  onDelete
}) => {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-gray-100 text-gray-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'Activo';
      case 'inactivo':
        return 'Inactivo';
      case 'pendiente':
        return 'Pendiente';
      default:
        return estado;
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'bajo':
        return 'bg-blue-100 text-blue-800';
      case 'medio':
        return 'bg-green-100 text-green-800';
      case 'alto':
        return 'bg-orange-100 text-orange-800';
      case 'critico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (permisos.length === 0) {
    return (
      <div className="bg-white p-8 text-center rounded-lg shadow-sm">
        <p className="text-gray-500">No se encontraron permisos con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {permisos.map((permiso) => (
        <div key={permiso.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {permiso.nombre}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {permiso.descripcion.length > 80 
                    ? `${permiso.descripcion.substring(0, 80)}...` 
                    : permiso.descripcion}
                </p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(permiso.estado)}`}>
                {getStatusText(permiso.estado)}
              </span>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getNivelColor(permiso.nivel)}`}>
                {permiso.nivel.charAt(0).toUpperCase() + permiso.nivel.slice(1)}
              </span>
              <span className="text-xs text-gray-500">
                {permiso.tipo === 'empleado' ? 'Empleado' : 
                 permiso.tipo === 'contratista' ? 'Contratista' : 
                 permiso.tipo === 'visitante' ? 'Visitante' : 'Temporal'}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{permiso.usuariosAsignados} usuarios</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{permiso.areas.length} áreas</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 col-span-2">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>Actualizado: {new Date(permiso.fechaModificacion).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
              <button
                onClick={() => onView(permiso.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="Ver detalles"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => onEdit(permiso.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="Editar"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(permiso.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
                title="Eliminar"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermisosCardView;