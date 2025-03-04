import React from 'react';
import { MapPin, Users, Clock, Camera, Fingerprint, CreditCard, Key, Check, X, Briefcase } from 'lucide-react';
import type { Employee, Marcaje } from '../interface/types';

// Extender la interfaz Employee para incluir nuevos campos
interface ExtendedEmployee extends Employee {
  metodoBiometricoEntrada?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  metodoBiometricoSalida?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  horaEntrada?: string;
  horaSalida?: string;
  marcajes?: Marcaje[];
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

  // Determinar información de marcajes
  const getHoraEntrada = () => {
    if (empleado.marcajes && empleado.marcajes.length > 0) {
      const entradas = empleado.marcajes.filter(m => m.tipo === 'entrada');
      if (entradas.length > 0) {
        const ultimaEntrada = entradas[entradas.length - 1];
        return ultimaEntrada.hora;
      }
    }
    
    // Si no hay marcajes, usar ultimaAccion o un valor por defecto
    if (empleado.ultimaAccion && empleado.estado === 'trabajando') {
      return empleado.ultimaAccion;
    }
    
    return empleado.horaEntrada || "10:00";
  };

  const getHoraSalida = () => {
    if (empleado.marcajes && empleado.marcajes.length > 0) {
      const salidas = empleado.marcajes.filter(m => m.tipo === 'salida');
      if (salidas.length > 0) {
        const ultimaSalida = salidas[salidas.length - 1];
        return ultimaSalida.hora;
      }
    }
    
    // Si no hay marcajes, usar ultimaAccion2 o un valor por defecto
    if (empleado.ultimaAccion2 && (empleado.estado === 'trabajó' || empleado.estado === 'trabajando')) {
      return empleado.ultimaAccion2;
    }
    
    return empleado.horaSalida || "18:00";
  };

  const getMetodoBiometricoEntrada = () => {
    if (empleado.marcajes && empleado.marcajes.length > 0) {
      const entradas = empleado.marcajes.filter(m => m.tipo === 'entrada');
      if (entradas.length > 0) {
        const ultimaEntrada = entradas[entradas.length - 1];
        // Convertir método a tipo biométrico
        if (ultimaEntrada.metodo === 'facial') return 'camara';
        if (ultimaEntrada.metodo === 'smartphone') return 'huella';
        if (ultimaEntrada.metodo === 'computadora') return 'huella';
        return 'huella';
      }
    }
    return empleado.metodoBiometricoEntrada || 'huella';
  };

  const getMetodoBiometricoSalida = () => {
    if (empleado.marcajes && empleado.marcajes.length > 0) {
      const salidas = empleado.marcajes.filter(m => m.tipo === 'salida');
      if (salidas.length > 0) {
        const ultimaSalida = salidas[salidas.length - 1];
        // Convertir método a tipo biométrico
        if (ultimaSalida.metodo === 'facial') return 'camara';
        if (ultimaSalida.metodo === 'smartphone') return 'tarjeta';
        if (ultimaSalida.metodo === 'computadora') return 'huella';
        return 'tarjeta';
      }
    }
    return empleado.metodoBiometricoSalida || 'camara';
  };
  
  const horaEntrada = getHoraEntrada();
  const horaSalida = getHoraSalida();
  const metodoBiometricoEntrada = getMetodoBiometricoEntrada();
  const metodoBiometricoSalida = getMetodoBiometricoSalida();

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
              <span className="line-clamp-1">{empleado.pais}</span>
            </div>
            
            {/* Departamento con ícono */}
            <div className="flex items-center text-sm text-gray-500">
              <Briefcase className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" />
              <span className="line-clamp-1">{empleado.departamento || "Marketing"}</span>
            </div>
          </div>
        </div>
        
        {/* Horarios de entrada/salida con iconos biométricos debajo - espacio fijo */}
        <div className="flex justify-between mb-4 h-[50px]">
          {/* Hora de entrada */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
            <span className="text-green-500 mr-1 text-xl font-bold px-2">→</span>
              <span className="text-sm text-gray-600">{horaEntrada}</span>
            </div>
            <div className="mt-1">
              {getBiometricIcon(metodoBiometricoEntrada)}
            </div>
          </div>
          
          {/* Hora de salida */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
            <span className="text-red-500 mr-1 text-xl font-bold px-2">←</span>
              <span className="text-sm text-gray-600">{horaSalida}</span>
            </div>
            <div className="mt-1">
              {getBiometricIcon(metodoBiometricoSalida)}
            </div>
          </div>
        </div>
        
        {/* Total de horas - espacio fijo */}
        <div className="flex items-center justify-center text-sm text-blue-600 mb-2 h-[20px]">
          <Clock className="w-4 h-4 mr-1" />
          <span>{empleado.horas}</span>
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