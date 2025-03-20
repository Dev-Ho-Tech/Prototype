import React, { useState, ReactNode } from 'react';
import { Clock, Users, AlertTriangle } from 'lucide-react';

// Interfaz para las tarjetas KPI
export interface NovedadCard {
  id: string;
  count: number;
  label: string;
  color: string;
  bgColor: string;
  icon: ReactNode;
  borderColor: string;
  tooltip?: string;
}

// Componente de tarjeta individual con tooltip
const NovedadCardItem = ({ 
  card, 
  isActive = false, 
  onClick 
}: { 
  card: NovedadCard; 
  isActive?: boolean;
  onClick: (cardId: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determinar estilos basados en el estado activo
  const cardStyle = {
    backgroundColor: isActive ? card.color : card.bgColor,
    transform: isActive || isHovered ? 'scale(1.05)' : 'none',
    boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : ''
  };

  // Determinar estilos del texto basados en el estado activo
  const textStyle = {
    color: isActive ? 'white' : card.color
  };
  
  return (
    <div 
      className={`rounded-lg shadow relative overflow-hidden transition-all duration-200 cursor-pointer`}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(card.id)}
    >
      {/* Tooltip */}
      {isHovered && card.tooltip && (
        <div className="absolute z-10 -top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {card.tooltip}
        </div>
      )}
      
      {/* Barra inferior de color */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: card.borderColor }}
      ></div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold" style={textStyle}>
            {card.count}
          </div>
          <div style={textStyle}>
            {card.icon}
          </div>
        </div>
        <div className="mt-1" style={textStyle}>
          <span className="text-sm">{card.label}</span>
        </div>
      </div>
    </div>
  );
};

// Props para el componente KpisPanel
interface KpisPanelProps {
  empleadoId?: string;
  onFilterChange?: (filterId: string | null) => void;
}

// Componente principal KpisPanel
const KpisPanel: React.FC<KpisPanelProps> = ({
  onFilterChange = () => {},
}) => {
  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);
  
  // KPIs predeterminados 
  const kpis: NovedadCard[] = [
    { 
      id: 'tardanzas', 
      count: 4, 
      label: 'Tardanzas', 
      color: '#f4a72c', 
      bgColor: '#fff9e6', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#f4a72c',
      tooltip: 'Empleados que llegaron tarde'
    },
    { 
      id: 'permisos', 
      count: 4, 
      label: 'Permisos', 
      color: '#5c6cfa', 
      bgColor: '#eef0ff', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#5c6cfa',
      tooltip: 'Permisos aprobados'
    },
    { 
      id: 'salidas', 
      count: 10, 
      label: 'Salidas Intemp.', 
      color: '#5c6cfa', 
      bgColor: '#eef0ff', 
      icon: <Users className="w-5 h-5" />,
      borderColor: '#5c6cfa',
      tooltip: 'Salidas intempestivas'
    },
    { 
      id: 'ausencias', 
      count: 5, 
      label: 'Ausencias', 
      color: '#fa5c5c', 
      bgColor: '#ffeef0', 
      icon: <AlertTriangle className="w-5 h-5" />,
      borderColor: '#fa5c5c',
      tooltip: 'Total de ausencias'
    },
    { 
      id: 'sin-horario', 
      count: 5, 
      label: 'Sin Horario', 
      color: '#9333ea', 
      bgColor: '#f5eeff', 
      icon: <AlertTriangle className="w-5 h-5" />,
      borderColor: '#9333ea',
      tooltip: 'Empleados sin horario asignado'
    },
    { 
      id: 'horas-extras', 
      count: 7, 
      label: 'Horas Extras', 
      color: '#d946ef', 
      bgColor: '#fceeff', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#d946ef',
      tooltip: 'Total de horas extras'
    },
  ];

  // Manejador para cuando se hace clic en una tarjeta KPI
  const handleCardClick = (cardId: string) => {
    // Si ya está seleccionado, lo deseleccionamos
    const newFilter = activeKpiFilter === cardId ? null : cardId;
    setActiveKpiFilter(newFilter);
    
    // Propagamos el cambio al componente padre
    onFilterChange(newFilter);
  };

  return (
    <div className="mb-1">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {kpis.map((card) => (
          <NovedadCardItem 
            key={card.id} 
            card={card} 
            isActive={activeKpiFilter === card.id} 
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default KpisPanel;