import { Eye, Edit, Trash, Users, Clock, MapPin } from 'lucide-react';
import { Permiso } from '../../interfaces/permisos';
import { PermisoCard } from './PermisoCard';

interface PermisosListProps {
  permisos: Permiso[];
  viewMode: 'list' | 'cards';
  onEdit: (permiso: Permiso) => void;
  onDelete: (id: string) => void;
}

export function PermisosList({ permisos, viewMode, onEdit, onDelete }: PermisosListProps) {
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

  const getTipoText = (tipo: string) => {
    switch (tipo) {
      case 'empleado':
        return 'Empleado';
      case 'contratista':
        return 'Contratista';
      case 'visitante':
        return 'Visitante';
      case 'temporal':
        return 'Temporal';
      default:
        return tipo;
    }
  };
  
  // Si no hay permisos, mostrar mensaje vacío
  if (permisos.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No se encontraron permisos con los filtros aplicados.</p>
      </div>
    );
  }

  // Vista de tarjetas
  if (viewMode === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {permisos.map(permiso => (
          <PermisoCard 
            key={permiso.id} 
            permiso={permiso} 
            onEdit={() => onEdit(permiso)} 
            onDelete={() => onDelete(permiso.id)} 
          />
        ))}
      </div>
    );
  }

  // Vista de lista (tabla)
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nivel
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuarios
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Áreas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Última Modificación
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {permisos.map(permiso => (
            <tr key={permiso.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {permiso.nombre}
                    </div>
                    <div className="text-sm text-gray-500">
                      {permiso.descripcion.length > 50 
                        ? `${permiso.descripcion.substring(0, 50)}...` 
                        : permiso.descripcion}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">
                  {getTipoText(permiso.tipo)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getNivelColor(permiso.nivel)}`}>
                  {permiso.nivel.charAt(0).toUpperCase() + permiso.nivel.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(permiso.estado)}`}>
                  {getStatusText(permiso.estado)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  {permiso.usuariosAsignados}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  {permiso.areas.length}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  {new Date(permiso.fechaModificacion).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => onEdit(permiso)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onEdit(permiso)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(permiso.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}