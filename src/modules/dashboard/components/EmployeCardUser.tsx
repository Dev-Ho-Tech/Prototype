import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Users, Clock, Camera, Fingerprint, CreditCard, Key, Check, X, Briefcase, AlertCircle, Calendar } from 'lucide-react';
import type { Employee, Marcaje } from '../interface/types';

// Extender la interfaz Employee para incluir nuevos campos
interface ExtendedEmployee extends Employee {
  metodoBiometricoEntrada?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  metodoBiometricoSalida?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  horaEntrada?: string;
  horaSalida?: string;
  marcajes?: Marcaje[];
  tieneContrato?: boolean; // Nuevo campo para determinar si tiene contrato asignado
  tardanza?: {
    tiene: boolean;
    tiempo: string;
  };
}

interface EmployeeCardProps {
  empleado: ExtendedEmployee;
  onSelect?: (empleado: ExtendedEmployee) => void;
  activeFilter?: string | null; // Agregamos el filtro activo como prop
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ empleado, onSelect, activeFilter }) => {
  // Estado local para el tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipTimeout = useRef(null);
  
  // Limpiar timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
    };
  }, []);

  // Función para obtener el color y el ícono según el estado
  const getEstadoInfo = (estado: string) => {
    // Si estamos filtrando por un tipo específico, mostrar ese estado en vez del estado actual
    if (activeFilter) {
      switch (activeFilter) {
        case 'tardanzas':
          return { 
            bgColor: 'bg-amber-100', 
            textColor: 'text-amber-800',
            icon: <Clock className="w-5 h-5 mr-2 text-amber-500" />
          };
        
        case 'permisos':
          return { 
            bgColor: 'bg-blue-100', 
            textColor: 'text-blue-800',
            icon: <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          };
        
        case 'salidas':
          return { 
            bgColor: 'bg-indigo-100', 
            textColor: 'text-indigo-800',
            icon: <Users className="w-5 h-5 mr-2 text-indigo-500" />
          };
        
        case 'ausencias':
          return { 
            bgColor: 'bg-red-100', 
            textColor: 'text-red-800',
            icon: <X className="w-5 h-5 mr-2 text-red-500" />
          };
        
        case 'sin-horario':
          return { 
            bgColor: 'bg-purple-100', 
            textColor: 'text-purple-800',
            icon: <AlertCircle className="w-5 h-5 mr-2 text-purple-500" />
          };
        
        case 'horas-extras':
          return { 
            bgColor: 'bg-pink-100', 
            textColor: 'text-pink-800',
            icon: <Clock className="w-5 h-5 mr-2 text-pink-500" />
          };
      }
    }
    
    // Si no hay filtro activo o no es un filtro conocido, usar el estado normal
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

  // Determinar si mostrar indicador de 'Sin horario' o 'Tardanza'
  const getIndicadorEstado = () => {
    // Si es un permiso, mostrar indicador de permiso
    if (empleado.estado === 'permiso') {
      return {
        show: true,
        type: 'permiso',
        text: 'Permiso',
        color: 'bg-indigo-500',
        textColor: 'text-white',
        icon: <Calendar className="w-4 h-4 text-white" />,
        tooltipText: 'Permiso'
      };
    }
    
    // Si no tiene contrato, mostrar "Sin horario"
    if (!empleado.tieneContrato) {
      return {
        show: true,
        type: 'sin-horario',
        text: `Sin horario: ${empleado.horas}`,
        color: 'bg-blue-400',
        textColor: 'text-white',
        icon: <Clock className="w-4 h-4 text-white" />,
        tooltipText: `Sin horario: ${empleado.horas}`
      };
    }
    
    // Si tiene tardanza, mostrar indicador
    if (empleado.tardanza?.tiene) {
      return {
        show: true,
        type: 'tardanza',
        text: `Tardanza: ${empleado.tardanza.tiempo}`,
        color: 'bg-gray-700',
        textColor: 'text-white',
        icon: <AlertCircle className="w-4 h-4 text-white" />,
        tooltipText: `Tardanza: ${empleado.tardanza.tiempo}`
      };
    }
    
    return { show: false };
  };

  // Texto del estado
  const getEstadoTexto = (estado: string) => {
    // Si estamos filtrando por un tipo específico, mostrar ese texto en vez del estado actual
    if (activeFilter) {
      switch (activeFilter) {
        case 'tardanzas':
          return 'Tardanza';
        case 'permisos':
          return 'Permiso';
        case 'salidas':
          return 'Salida Intemp.';
        case 'ausencias':
          return 'Ausencia';
        case 'sin-horario':
          return 'Sin Horario';
        case 'horas-extras':
          return 'Horas Extras';
      }
    }
    
    // Si no hay filtro activo o no es un filtro conocido, usar el estado normal
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

  // Información del estado para este empleado
  const estadoInfo = getEstadoInfo(empleado.estado);
  
  // Información de indicador (sin horario/tardanza/permiso)
  const indicadorInfo = getIndicadorEstado();
  
  // Handler para el clic en la tarjeta
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(empleado);
    }
  };

  // Handler para mostrar tooltip
  const handleIndicadorMouseEnter = (e) => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + (rect.width / 2),
      y: rect.top + window.scrollY
    });
    setShowTooltip(true);
  };

  // Handler para ocultar tooltip
  const handleIndicadorMouseLeave = () => {
    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 100);
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
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 h-[255px] flex flex-col relative"
      onClick={handleCardClick}
    >
      {/* Indicador sin horario/tardanza si existe - solo icono */}
      {indicadorInfo.show && (
        <div 
          className={`absolute right-2 top-2 ${indicadorInfo.color} ${indicadorInfo.textColor} p-1.5 rounded-full z-10 cursor-pointer shadow-sm`}
          onMouseEnter={handleIndicadorMouseEnter}
          onMouseLeave={handleIndicadorMouseLeave}
        >
          {indicadorInfo.icon}
        </div>
      )}
      
      {/* Tooltip estilo material */}
      {showTooltip && (
        <div 
          className="absolute z-30 bg-white shadow-lg rounded-md py-2 px-3 text-sm"
          style={{
            top: (tooltipPosition.y - 45) + 'px',
            left: tooltipPosition.x + 'px',
            transform: 'translateX(-80%)',
            whiteSpace: 'nowrap',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))'
          }}
        >
          <div className="text-gray-800 font-medium">
            {indicadorInfo.tooltipText}
          </div>
          <div 
            className="absolute h-3 w-3 bg-white transform rotate-45" 
            style={{ bottom: '-6px', left: '85%', marginLeft: '-6px', boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.08)' }}
          ></div>
        </div>
      )}

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