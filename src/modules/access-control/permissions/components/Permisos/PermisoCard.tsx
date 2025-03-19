import { Edit, Trash, Users, MapPin, Shield, Clock } from 'lucide-react';
import { Permiso } from '../../interfaces/permisos';

interface PermisoCardProps {
  permiso: Permiso;
  onEdit: () => void;
  onDelete: () => void;
}

export function PermisoCard({ permiso, onEdit, onDelete }: PermisoCardProps) {
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

  const getNivelIcon = (nivel: string) => {
    switch (nivel) {
      case 'bajo':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'medio':
        return <Shield className="w-5 h-5 text-green-500" />;
      case 'alto':
        return <Shield className="w-5 h-5 text-orange-500" />;
      case 'critico':
        return <Shield className="w-5 h-5 text-red-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {permiso.nombre}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {permiso.descripcion.length > 100 
                ? `${permiso.descripcion.substring(0, 100)}...` 
                : permiso.descripcion}
            </p>
            <div className="flex items-center mt-2 space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(permiso.estado)}`}>
                {getStatusText(permiso.estado)}
              </span>
              <span className="text-xs text-gray-500">
                {permiso.tipo.charAt(0).toUpperCase() + permiso.tipo.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {getNivelIcon(permiso.nivel)}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">Usuarios asignados</span>
            </div>
            <span className="font-medium">{permiso.usuariosAsignados}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">Áreas permitidas</span>
            </div>
            <span className="font-medium">{permiso.areas.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">Última modificación</span>
            </div>
            <span className="font-medium">
              {new Date(permiso.fechaModificacion).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onEdit}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}