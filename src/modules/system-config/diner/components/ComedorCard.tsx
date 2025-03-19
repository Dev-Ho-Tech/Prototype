import React from 'react';
import { Comedor } from '../interfaces/types';
import { MapPin, Users, Calendar, Eye, Edit, Trash2 } from 'lucide-react';

interface ComedorCardProps {
  comedor: Comedor;
  onEdit: (comedor: Comedor) => void;
  onDelete: (id: string) => void;
  onView?: (comedor: Comedor) => void;
}

const ComedorCard: React.FC<ComedorCardProps> = ({
  comedor,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Cabecera con nombre y estado - Cambiado a color más claro como en la imagen */}
      <div className="p-4 bg-blue-50 border-b flex justify-between items-start">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{comedor.nombre}</h3>
            <p className="text-sm text-gray-500 truncate max-w-xs">{comedor.ubicacion}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          comedor.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {comedor.estado === 'activo' ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Sede */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Sede:</p>
            <p className="text-sm font-medium text-blue-600">{comedor.ubicacion.split(',')[0]}</p>
          </div>
          
          {/* Empleados */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Empleados:</p>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{comedor.capacidadMaxima}</span>
            </div>
          </div>
          
          {/* Radio */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Radio:</p>
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                {comedor.cantidadMesas}m
              </div>
            </div>
          </div>
          
          {/* Fecha de creación */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Creación:</p>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
              <p className="text-sm text-gray-700">{comedor.fechaCreacion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-end space-x-2">
        <button
          onClick={() => onView ? onView(comedor) : null}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
          title="Ver detalle"
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={() => onEdit(comedor)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
          title="Editar"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(comedor.id)}
          className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
          title="Eliminar"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ComedorCard;