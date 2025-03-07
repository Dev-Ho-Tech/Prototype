import React from 'react';
import { PieChart, Info } from 'lucide-react';

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  details?: string;
  additionalInfo?: string;
}

interface PieChartProps {
  data: ChartDataItem[];
  centerLabel: string;
  sectionId: string;
  activeSegment: string | null;
  onSegmentClick: (segmentId: string, event: React.MouseEvent) => void;
}

// Componente principal
const InteractivePieChart: React.FC<PieChartProps> = ({ 
  data, 
  centerLabel, 
  sectionId, 
  activeSegment, 
  onSegmentClick 
}) => {
  console.log('Renderizando InteractivePieChart con datos:', { data, centerLabel, sectionId, activeSegment });
  
  // Calcular el total para los porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Configuración del gráfico
  const size = 140;
  const radius = size / 2;
  const innerRadius = radius * 0.6;
  
  // Función para calcular las coordenadas de un punto en el arco
  const getPointOnArc = (angle: number, r: number) => {
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x: radius + r * Math.cos(rad),
      y: radius + r * Math.sin(rad)
    };
  };
  
  // Generar los segmentos
  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = startAngle + angle;
    
    // Calcular puntos para el arco (dona)
    const startInner = getPointOnArc(startAngle, innerRadius);
    const startOuter = getPointOnArc(startAngle, radius);
    const endOuter = getPointOnArc(endAngle, radius);
    const endInner = getPointOnArc(endAngle, innerRadius);
    
    // Determinar si es un arco mayor (> 180 grados)
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Crear el path
    const path = [
      `M ${startInner.x} ${startInner.y}`,
      `L ${startOuter.x} ${startOuter.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      'Z'
    ].join(' ');
    
    // Actualizar ángulo para el siguiente segmento
    currentAngle = endAngle;
    
    const segmentId = `${sectionId}-${index}`;
    console.log(`Generando segmento ${segmentId}:`, { startAngle, endAngle, color: item.color });
    
    return {
      id: segmentId,
      path,
      color: item.color,
      name: item.name,
      value: item.value,
      percentage,
      startAngle,
      endAngle
    };
  });
  
  // Event handlers con logging
  const handleMouseEnter = (e: React.MouseEvent, segmentId: string) => {
    console.log(`MouseEnter en segmento ${segmentId}`);
    // Aplicar estilo directamente al elemento
    const target = e.currentTarget as SVGPathElement;
    target.style.opacity = '0.8';
    target.style.filter = 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))';
  };
  
  const handleMouseLeave = (e: React.MouseEvent, segmentId: string) => {
    console.log(`MouseLeave en segmento ${segmentId}`);
    // Solo restaurar estilo si no es el segmento activo
    if (segmentId !== activeSegment) {
      const target = e.currentTarget as SVGPathElement;
      target.style.opacity = '1';
      target.style.filter = 'none';
    }
  };
  
  const handleClick = (e: React.MouseEvent, segmentId: string) => {
    console.log(`Click en segmento ${segmentId}`);
    onSegmentClick(segmentId, e);
  };
  
  return (
    <div className="relative tooltip-area" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {segments.map(segment => (
          <path
            key={segment.id}
            id={segment.id}
            d={segment.path}
            fill={segment.color}
            stroke="#fff"
            strokeWidth={1}
            onClick={(e) => handleClick(e, segment.id)}
            onMouseEnter={(e) => handleMouseEnter(e, segment.id)}
            onMouseLeave={(e) => handleMouseLeave(e, segment.id)}
            style={{
              cursor: 'pointer',
              opacity: activeSegment === segment.id ? 0.8 : 1,
              filter: activeSegment === segment.id ? 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))' : 'none',
              transition: 'opacity 0.3s ease, filter 0.3s ease'
            }}
          />
        ))}
        
        {/* Círculo central */}
        <circle 
          cx={radius} 
          cy={radius} 
          r={innerRadius} 
          fill="white" 
          stroke="#f0f0f0" 
          strokeWidth="1"
        />
      </svg>
      
      {/* Etiqueta central */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold"
        style={{ fontSize: `${size/7}px` }}
      >
        {centerLabel}
      </div>
    </div>
  );
};

interface ChartTooltipProps {
  data: ChartDataItem | null;
  position: { x: number; y: number };
  visible: boolean;
  onClose: () => void;
}

// Componente para el tooltip
export const ChartTooltip: React.FC<ChartTooltipProps> = ({ 
  data, 
  position, 
  visible, 
  onClose 
}) => {
  console.log('Renderizando ChartTooltip:', { visible, data, position });
  
  if (!visible || !data) return null;
  
  // Calcular el porcentaje
  const percentage = data.percentage !== undefined ? data.percentage : 
    (data.value / (data.value + 100)) * 100;
  
  return (
    <div 
      className="fixed bg-white border border-gray-200 shadow-lg rounded-md p-3 z-50 tooltip-click"
      style={{ 
        top: position.y - 10,
        left: position.x,
        minWidth: '240px',
        transform: 'translate(-50%, -100%)'
      }}
    >
      {/* Cabecera */}
      <div className="font-semibold text-gray-800 mb-2 flex items-center justify-between border-b pb-1">
        <div className="flex items-center">
          <PieChart className="w-4 h-4 mr-1" style={{ color: data.color }} />
          <span>{data.name}</span>
        </div>
        <button 
          type="button"
          onClick={() => {
            console.log('Click en botón cerrar tooltip');
            onClose();
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
      
      {/* Contenido */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {/* Valor y porcentaje */}
        <div className="text-gray-500">Porcentaje:</div>
        <div className="text-gray-700 font-medium">
          {percentage.toFixed(1)}%
        </div>
        
        {typeof data.value === 'number' && (
          <>
            <div className="text-gray-500">Valor:</div>
            <div className="text-gray-700 font-medium">{data.value}</div>
          </>
        )}
        
        {data.details && (
          <>
            <div className="text-gray-500">Detalles:</div>
            <div className="text-gray-700 font-medium">{data.details}</div>
          </>
        )}
        
        {data.additionalInfo && (
          <div className="col-span-2 mt-2 bg-blue-50 p-2 rounded-sm text-blue-700 text-xs flex items-start">
            <Info className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
            <div>{data.additionalInfo}</div>
          </div>
        )}
      </div>
      
      {/* Flecha del tooltip */}
      <div 
        className="absolute w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45" 
        style={{ bottom: '-7px', left: '50%', marginLeft: '-7px' }}
      ></div>
    </div>
  );
};

export default InteractivePieChart;