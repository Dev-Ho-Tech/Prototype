import React from 'react';
import { EstacionComida, Comedor } from '../interfaces/types';
import { Utensils, Users, Info, Tag, Eye, Edit, Trash2 } from 'lucide-react';

interface EstacionCardProps {
  estacion: EstacionComida;
  comedores: Comedor[];
  onEdit: (estacion: EstacionComida) => void;
  onDelete: (id: string) => void;
  onView?: (estacion: EstacionComida) => void;
}

const EstacionCard: React.FC<EstacionCardProps> = ({
  estacion,
  comedores,
  onEdit,
  onDelete,
  onView
}) => {
  // Obtener comedor asociado
  const comedor = comedores.find(c => c.id === estacion.comedorId);

  // Formatear tipo de estación
  const formatTipoEstacion = (tipo: string): string => {
    const tiposEstacion: Record<string, string> = {
      'buffet': 'Buffet',
      'servido': 'Servido',
      'self-service': 'Self-Service',
      'otro': 'Otro'
    };
    return tiposEstacion[tipo] || tipo;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Cabecera con nombre y estado */}
      <div className="p-4 bg-yellow-50 border-b flex justify-between items-start">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
            <Utensils className="h-4 w-4 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{estacion.nombre}</h3>
            <p className="text-sm text-gray-500">{comedor?.nombre || 'Sin comedor asignado'}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          estacion.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {estacion.estado === 'activo' ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Tipo */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Tipo:</p>
            <div className="flex items-center">
              <Tag className="h-4 w-4 text-gray-400 mr-1" />
              <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                estacion.tipo === 'buffet' ? 'bg-purple-100 text-purple-700' :
                estacion.tipo === 'servido' ? 'bg-blue-100 text-blue-700' :
                estacion.tipo === 'self-service' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {formatTipoEstacion(estacion.tipo)}
              </span>
            </div>
          </div>
          
          {/* Capacidad */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Capacidad:</p>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{estacion.capacidadMaxima} personas</span>
            </div>
          </div>
          
          {/* Comedor */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Comedor:</p>
            <p className="text-sm font-medium text-blue-600">{comedor?.nombre || '-'}</p>
          </div>
          
          {/* Descripción */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Descripción:</p>
            <div className="flex items-start">
              <Info className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
              <p className="text-sm text-gray-700 line-clamp-2">
                {estacion.descripcion || 'Sin descripción'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-end space-x-2">
        {onView && (
          <button
            onClick={() => onView(estacion)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
            title="Ver detalle"
          >
            <Eye className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={() => onEdit(estacion)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
          title="Editar"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(estacion.id)}
          className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
          title="Eliminar"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default EstacionCard;