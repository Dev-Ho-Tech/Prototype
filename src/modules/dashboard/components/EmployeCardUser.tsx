import React from 'react';
import { Clock, MapPin, Users, Smartphone, Laptop } from 'lucide-react';
import type { Employee } from '../interface/types';

interface EmployeeCardProps {
  empleado: Employee;
  onSelect?: (empleado: Employee) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ empleado, onSelect }) => {
  const getEstadoClase = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'bg-green-100 text-green-800';
      case 'permiso':
        return 'bg-orange-100 text-orange-800';
      case 'ausencia':
        return 'bg-red-100 text-red-800';
      case 'planificado':
        return 'bg-blue-100 text-blue-800';
      case 'trabajó':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'Trabajando';
      case 'permiso':
        return 'Permiso';
      case 'ausencia':
        return 'Ausencia';
      case 'planificado':
        return 'Planificado';
      case 'trabajó':
        return 'Trabajó';
      default:
        return estado;
    }
  };

  const getDispositivoIcon = (dispositivo: string | null) => {
    if (!dispositivo) return null;
    
    return dispositivo === 'computadora' 
      ? <Laptop className="w-4 h-4 text-gray-600" /> 
      : <Smartphone className="w-4 h-4 text-gray-600" />;
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(empleado);
    }
  };

  return (
    <div 
  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full cursor-pointer transition-transform hover:scale-105 "
      onClick={handleCardClick}
    >
      <div className={`p-3.5 flex-grow bg-white`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            {empleado.foto ? (
              <img 
                src={empleado.foto} 
                alt={empleado.nombre} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{empleado.nombre}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>{empleado.horas}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{empleado.pais}</span>
        </div>
        
        {/* Última acción */}
        {empleado.ultimaAccion && (
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <span className="mr-1">→</span>
            <span>{empleado.ultimaAccion}</span>
            {empleado.dispositivo && (
              <span className="ml-1">{getDispositivoIcon(empleado.dispositivo)}</span>
            )}
          </div>
        )}
        
        {/* Segunda acción si existe */}
        {empleado.ultimaAccion2 && (
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <span className="mr-1">→</span>
            <span>{empleado.ultimaAccion2}</span>
            {empleado.dispositivo2 && (
              <span className="ml-1">{getDispositivoIcon(empleado.dispositivo2)}</span>
            )}
          </div>
        )}
        
        {/* Espacio para mantener altura mínima incluso sin acciones */}
        {!empleado.ultimaAccion && !empleado.ultimaAccion2 && (
          <div className="mb-6"></div>
        )}
      </div>
      
      {/* Estado siempre al fondo */}
      <div className={`px-4 py-2 text-center text-sm font-medium mt-auto ${getEstadoClase(empleado.estado)}`}>
        {getEstadoTexto(empleado.estado)}
      </div>
    </div>
  );
};

export default EmployeeCard;