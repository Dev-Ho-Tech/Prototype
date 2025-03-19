import React from 'react';
import { PerfilComida, HorarioComida, EstacionComida } from '../interfaces/types';
import { BookOpen, Clock, Utensils, Ticket, Eye, Edit, Trash2 } from 'lucide-react';

interface PerfilCardProps {
  perfil: PerfilComida;
  horarios: HorarioComida[];
  estaciones: EstacionComida[];
  onEdit: (perfil: PerfilComida) => void;
  onDelete: (id: string) => void;
  onView?: (perfil: PerfilComida) => void;
}

const PerfilCard: React.FC<PerfilCardProps> = ({
  perfil,
  horarios,
  estaciones,
  onEdit,
  onDelete,
  onView
}) => {
  // Obtener nombres de horarios asociados
  const getHorariosNombres = (horarioIds: string[]): string => {
    if (horarioIds.length === 0) return "-";
    
    const nombresHorarios = horarioIds.map(id => {
      const horario = horarios.find(h => h.id === id);
      return horario ? horario.nombre : 'Desconocido';
    });
    
    if (nombresHorarios.length > 2) {
      return `${nombresHorarios.slice(0, 2).join(', ')} y ${nombresHorarios.length - 2} más`;
    }
    
    return nombresHorarios.join(', ');
  };

  // Obtener nombres de estaciones asociadas
  const getEstacionesNombres = (estacionIds: string[]): string => {
    if (estacionIds.length === 0) return "-";
    
    const nombresEstaciones = estacionIds.map(id => {
      const estacion = estaciones.find(e => e.id === id);
      return estacion ? estacion.nombre : 'Desconocida';
    });
    
    if (nombresEstaciones.length > 2) {
      return `${nombresEstaciones.slice(0, 2).join(', ')} y ${nombresEstaciones.length - 2} más`;
    }
    
    return nombresEstaciones.join(', ');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Cabecera con nombre y estado */}
      <div className="p-4 bg-green-50 border-b flex justify-between items-start">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <BookOpen className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{perfil.nombre}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{perfil.descripcion || 'Sin descripción'}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          perfil.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {perfil.estado === 'activo' ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Horarios */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Horarios:</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{getHorariosNombres(perfil.horarioIds)}</span>
            </div>
          </div>
          
          {/* Estaciones */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Estaciones:</p>
            <div className="flex items-center">
              <Utensils className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{getEstacionesNombres(perfil.estacionIds)}</span>
            </div>
          </div>
          
          {/* Tickets */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Tickets Disponibles:</p>
            <div className="flex items-center">
              <Ticket className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">
                {perfil.ticketsDisponibles > 0 ? perfil.ticketsDisponibles : 'Ilimitados'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-end space-x-2">
        {onView && (
          <button
            onClick={() => onView(perfil)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
            title="Ver detalle"
          >
            <Eye className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={() => onEdit(perfil)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
          title="Editar"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(perfil.id)}
          className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
          title="Eliminar"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PerfilCard;