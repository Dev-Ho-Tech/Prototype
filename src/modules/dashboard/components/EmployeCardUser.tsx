/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, SVGProps } from 'react';
import { MapPin, Users, Clock, Fingerprint, CreditCard, Key, Check, X, Briefcase, AlertCircle, Calendar } from 'lucide-react';
import type { Employee, Marcaje } from '../interface/types';
// Elimina la importación del componente EmployeeTooltip que ya no vamos a usar
// import EmployeeTooltip from './EmployeeTooltip';

// Extender la interfaz Employee para incluir nuevos campos
interface ExtendedEmployee extends Employee {
  metodoBiometricoEntrada?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  metodoBiometricoSalida?: 'huella' | 'camara' | 'tarjeta' | 'pin';
  horaEntrada?: string;
  horaSalida?: string;
  marcajes?: Marcaje[];
  tieneContrato?: boolean; 
  tardanza?: {
    tiene: boolean;
    tiempo: string;
  };
}

interface EmployeeCardProps {
  empleado: ExtendedEmployee;
  onSelect?: (empleado: ExtendedEmployee) => void;
  activeFilter?: string | null;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ empleado, onSelect, activeFilter }) => {
  // Estado local para el tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipTimeout = useRef<any>(null);
  
  // Funciones de tooltip con Vanilla JS
  const showGlobalTooltip = (text: string, x: number, y: number) => {
    // Para debug
    console.log("Mostrando TOOLTIP GLOBAL:", { text, x, y });
    
    // Eliminar cualquier tooltip existente primero
    const oldTooltip = document.getElementById('global-employee-tooltip');
    if (oldTooltip) {
      document.body.removeChild(oldTooltip);
    }
    
    // Crear nuevo tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'global-employee-tooltip';
    tooltip.textContent = text;
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${y - 30}px`;
    tooltip.style.left = `${x}px`;
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.fontWeight = '500';
    tooltip.style.zIndex = '99999';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    
    // Añadir al body
    document.body.appendChild(tooltip);
  };

  const hideGlobalTooltip = () => {
    const tooltip = document.getElementById('global-employee-tooltip');
    if (tooltip) {
      document.body.removeChild(tooltip);
    }
  };
  
  // Limpiar timeout y tooltips cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
      hideGlobalTooltip();
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
        return <UserIcon className="w-5 h-5 text-gray-500" />;
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


  const UserIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="8" r="4" fill="currentColor"/>
      <path d="M4 20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V20Z" fill="currentColor"/>
    </svg>
  );

  // Determinar si mostrar indicador y qué contenido debe tener
  const shouldShowIndicator = () => {
    // Log inicial para depuración
    console.log(`Evaluando indicador para ${empleado.nombre}:`, {
      estado: empleado.estado,
      contrato: empleado.contrato,
      tardanza: empleado.tardanza
    });

    // Solo mostrar en estos estados
    const validStates = ['trabajando', 'trabajó', 'permiso'];
    if (!validStates.includes(empleado.estado)) {
      console.log(`${empleado.nombre}: No mostrar indicador - estado no válido`);
      return { show: false };
    }

    // Caso 1: Permiso
    if (empleado.estado === 'permiso') {
      console.log(`${empleado.nombre}: Mostrar indicador de PERMISO`);
      return {
        show: true,
        type: 'permiso',
        text: 'PERMISO',
        color: 'bg-blue-500',
        textColor: 'text-white',
        icon: <Calendar className="w-4 h-4 text-white" />,
        tooltipText: 'PERMISO'
      };
    }

    // Caso 2: Sin contrato (trabajando o trabajó)
    if (empleado.contrato === false) {
      console.log(`${empleado.nombre}: Mostrar indicador de Sin horario - contrato: ${empleado.contrato}`);
      return {
        show: true,
        type: 'sin-horario',
        text: `Sin horario: ${empleado.horas || '0 hrs 0 min'}`,
        color: 'bg-cyan-500', // Color celeste para diferenciar
        textColor: 'text-white',
        icon: <Clock className="w-4 h-4 text-white" />,
        tooltipText: `Sin horario: ${empleado.horas || '0 hrs 0 min'}`
      };
    }

    // Caso 3: Con contrato y tardanza (trabajando)
    if (empleado.contrato === true && empleado.tardanza?.tiene) {
      console.log(`${empleado.nombre}: Mostrar indicador de Tardanza - tiene: ${empleado.tardanza.tiene}, tiempo: ${empleado.tardanza.tiempo}`);
      return {
        show: true,
        type: 'tardanza',
        text: `Tardanza: ${empleado.tardanza.tiempo}`,
        color: 'bg-amber-500',
        textColor: 'text-white',
        icon: <AlertCircle className="w-4 h-4 text-white" />,
        tooltipText: `Tardanza: ${empleado.tardanza.tiempo}`
      };
    }

    console.log(`${empleado.nombre}: No mostrar indicador - no cumple ninguna condición`);
    return { show: false };
  };

  // Obtener información del indicador con la nueva lógica
  const indicadorInfo = shouldShowIndicator();
  
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
  
  // Handler para el clic en la tarjeta
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(empleado);
    }
  };

  // Handler para mostrar tooltip usando Vanilla JS
  const handleIndicadorMouseEnter = (e: React.MouseEvent) => {
    console.log(`MouseEnter en indicador de ${empleado.nombre}`);
    
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    console.log("Posición calculada del tooltip:", { x, y });
    showGlobalTooltip(indicadorInfo.tooltipText || "", x, y);
    
    // Actualizamos el estado local también (por si se necesita para otra cosa)
    setTooltipPosition({ x, y });
    setShowTooltip(true);
  };

  // Handler para ocultar tooltip
  const handleIndicadorMouseLeave = () => {
    console.log(`MouseLeave en indicador de ${empleado.nombre}`);
    
    hideGlobalTooltip();
    
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
  
  const horaEntrada = getHoraEntrada();
  const horaSalida = getHoraSalida();
  const metodoBiometricoEntrada = getMetodoBiometricoEntrada();

  // Verificar si el estado es "trabajando"
  const isTrabajando = empleado.estado === 'trabajando';

  // Log para verificar el estado del tooltip
  console.log(`Estado del tooltip para ${empleado.nombre}:`, { 
    showTooltip, 
    tooltipPosition, 
    indicadorVisible: indicadorInfo.show,
    tooltipText: indicadorInfo.tooltipText || ""
  });

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 h-[255px] flex flex-col relative"
      onClick={handleCardClick}
    >
      {/* Indicador según las condiciones - solo se muestra si indicadorInfo.show es true */}
      {indicadorInfo.show && (
        <div 
          className={`absolute right-2 top-2 ${indicadorInfo.color} ${indicadorInfo.textColor} p-1.5 rounded-full z-10 cursor-pointer shadow-sm`}
          onMouseEnter={handleIndicadorMouseEnter}
          onMouseLeave={handleIndicadorMouseLeave}
        >
          {indicadorInfo.icon}
        </div>
      )}
      
      {/* Eliminamos ambos tooltips de React y dejamos solo la implementación en Vanilla JS */}
  
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
          {/* Hora de entrada - siempre visible */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <span className="text-green-500 mr-1 text-xl font-bold px-2">→</span>
              <span className="text-sm text-gray-600">{horaEntrada}</span>
            </div>
            <div className="mt-1">
              {getBiometricIcon(metodoBiometricoEntrada)}
            </div>
          </div>
          
          {/* Espacio para la hora de salida - mantiene la estructura even cuando está trabajando */}
          {isTrabajando ? (
            <div className="flex-1"></div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="text-red-500 mr-1 text-xl font-bold px-2">←</span>
                <span className="text-sm text-gray-600">{horaSalida}</span>
              </div>
              <div className="mt-1">
                {getBiometricIcon(metodoBiometricoEntrada)}
              </div>
            </div>
          )}
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