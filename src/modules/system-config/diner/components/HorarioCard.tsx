import React from 'react';
import { HorarioComida, Comedor } from '../interfaces/types';
import { Clock, Calendar, Users, Eye, Edit, Trash2 } from 'lucide-react';

interface HorarioCardProps {
  horario: HorarioComida;
  comedores: Comedor[];
  onEdit: (horario: HorarioComida) => void;
  onDelete: (id: string) => void;
  onView?: (horario: HorarioComida) => void;
}

const HorarioCard: React.FC<HorarioCardProps> = ({
  horario,
  comedores,
  onEdit,
  onDelete,
  onView
}) => {
  // Obtener comedor asociado
  const comedor = comedores.find(c => c.id === horario.comedorId);

  // Formatear días de semana
  const formatDiasSemana = (dias: string[]): string => {
    if (dias.length === 0) return "-";
    if (dias.length === 7) return "Todos los días";
    
    // Si son días consecutivos, mostrar rango
    const diasOrdenados = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const indices = dias.map(dia => diasOrdenados.indexOf(dia)).sort((a, b) => a - b);
    
    if (indices.length > 1 && indices[indices.length - 1] - indices[0] === indices.length - 1) {
      return `${diasOrdenados[indices[0]]} a ${diasOrdenados[indices[indices.length - 1]]}`;
    }
    
    // Si no son consecutivos o son pocos, mostrar lista
    if (dias.length <= 3) {
      return dias.join(', ');
    }
    
    // Si son más de 3 días no consecutivos
    return `${dias.slice(0, 2).join(', ')} y ${dias.length - 2} más`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Cabecera con nombre y estado */}
      <div className="p-4 bg-blue-50 border-b flex justify-between items-start">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Clock className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{horario.nombre}</h3>
            <p className="text-sm text-gray-500">{comedor?.nombre || 'Sin comedor asignado'}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          horario.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {horario.estado === 'activo' ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Horario */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Horario:</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{horario.horaInicio} - {horario.horaFin}</span>
            </div>
          </div>
          
          {/* Días */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Días:</p>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{formatDiasSemana(horario.diasSemana)}</span>
            </div>
          </div>
          
          {/* Capacidad */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Capacidad:</p>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{horario.capacidadMaxima} personas</span>
            </div>
          </div>
          
          {/* Comedor */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Comedor:</p>
            <p className="text-sm font-medium text-blue-600">{comedor?.nombre || '-'}</p>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-end space-x-2">
        {onView && (
          <button
            onClick={() => onView(horario)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
            title="Ver detalle"
          >
            <Eye className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={() => onEdit(horario)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
          title="Editar"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(horario.id)}
          className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
          title="Eliminar"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default HorarioCard;