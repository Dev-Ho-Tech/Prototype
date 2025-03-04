import React from 'react';
import { MapPin, Users, Clock, Camera, Fingerprint, CreditCard, Key, Check, X } from 'lucide-react';
import type { Employee } from '../interface/types';

// Extender la interfaz Employee para incluir nuevos campos
interface ExtendedEmployee extends Employee {
  horaEntrada?: string;
  horaSalida?: string;
  departamento?: string;
  metodoBiometricoEntrada?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  metodoBiometricoSalida?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  totalHoras?: string;
}

interface EmployeeCardProps {
  empleado: ExtendedEmployee;
  onSelect?: (empleado: ExtendedEmployee) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ empleado, onSelect }) => {
  // Función para obtener el color y el ícono según el estado
  const getEstadoInfo = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return { 
          bgColor: 'bg-green-100', 
          textColor: 'text-green-800',
          icon: <Check className="w-5 h-5 mr-2 text-green-500" />
        };
      case 'permiso':
        return { 
          bgColor: 'bg-blue-100', 
          textColor: 'text-blue-800',
          icon: <Clock className="w-5 h-5 mr-2 text-blue-500" />
        };
      case 'ausencia':
        return { 
          bgColor: 'bg-red-100', 
          textColor: 'text-red-800',
          icon: <X className="w-5 h-5 mr-2 text-red-500" />
        };
      case 'planificado':
        return { 
          bgColor: 'bg-blue-100', 
          textColor: 'text-blue-800',
          icon: <Clock className="w-5 h-5 mr-2 text-blue-500" />
        };
      case 'trabajó':
        return { 
          bgColor: 'bg-gray-100', 
          textColor: 'text-gray-800',
          icon: <Check className="w-5 h-5 mr-2 text-gray-500" />
        };
      default:
        return { 
          bgColor: 'bg-gray-100', 
          textColor: 'text-gray-800',
          icon: <Clock className="w-5 h-5 mr-2 text-gray-500" />
        };
    }
  };

  // Función para obtener el ícono del método biométrico
  const getBiometricIcon = (metodo?: string) => {
    switch(metodo) {
      case 'camara':
        return <Camera className="w-5 h-5 text-gray-500" />;
      case 'huella':
        return <Fingerprint className="w-5 h-5 text-gray-500" />;
      case 'tarjeta':
        return <CreditCard className="w-5 h-5 text-gray-500" />;
      case 'pin':
        return <Key className="w-5 h-5 text-gray-500" />;
      default:
        return <Fingerprint className="w-5 h-5 text-gray-500" />;
    }
  };

  // Información del estado para este empleado
  const estadoInfo = getEstadoInfo(empleado.estado);
  
  // Handler para el clic en la tarjeta
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(empleado);
    }
  };

  // Texto del estado
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

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 h-[255px] flex flex-col"
      onClick={handleCardClick}
    >
      {/* Encabezado con la información principal - altura fija */}
      <div className="p-4 bg-white flex-grow flex flex-col">
        {/* Foto y nombre - espacio fijo */}
        <div className="flex items-start mb-4 h-[72px]">
          <div className="flex-shrink-0 mr-3">
            {empleado.foto ? (
              <img 
                src={empleado.foto} 
                alt={empleado.nombre} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-1">{empleado.nombre}</h3>
            
            {/* País con ícono */}
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" />
              <span className="line-clamp-1">{empleado.pais || "Colombia"}</span>
            </div>
            
            {/* Departamento con ícono */}
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" fill="currentColor" />
              </svg>
              <span className="line-clamp-1">{empleado.departamento || "Marketing"}</span>
            </div>
          </div>
        </div>
        
        {/* Horarios de entrada/salida con iconos biométricos debajo - espacio fijo */}
        <div className="flex justify-between mb-4 h-[50px]">
          {/* Hora de entrada */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <span className="text-green-500 mr-1">→</span>
              <span className="text-sm text-gray-600">{empleado.horaEntrada || "10:00"}</span>
            </div>
            <div className="mt-1">
              {getBiometricIcon(empleado.metodoBiometricoEntrada || 'huella')}
            </div>
          </div>
          
          {/* Hora de salida */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <span className="text-red-500 mr-1">←</span>
              <span className="text-sm text-gray-600">{empleado.horaSalida || "18:00"}</span>
            </div>
            <div className="mt-1">
              {getBiometricIcon(empleado.metodoBiometricoSalida || 'camara')}
            </div>
          </div>
        </div>
        
        {/* Total de horas - espacio fijo */}
        <div className="flex items-center justify-center text-sm text-blue-600 mb-2 h-[20px]">
          <Clock className="w-4 h-4 mr-1" />
          <span>{empleado.totalHoras || "8 hours"}</span>
        </div>
      </div>
      
      {/* Barra de estado (pegada al fondo sin margen) - altura fija */}
      <div className={`flex items-center justify-center py-2 ${estadoInfo.bgColor} ${estadoInfo.textColor} h-[40px]`}>
        {estadoInfo.icon}
        <span className="font-medium">{getEstadoTexto(empleado.estado)}</span>
      </div>
    </div>
  );
};

export default EmployeeCard;