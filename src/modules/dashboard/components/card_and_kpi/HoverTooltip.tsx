import React from 'react';

interface ChartDataItem {
  name: string;
  value: number;
  percentage?: number;
  color: string;
  details?: string;
  additionalInfo?: string;
}

interface HoverTooltipProps {
  data: ChartDataItem | null;
  position: { x: number; y: number } | null;
  visible: boolean;
}

const HoverTooltip: React.FC<HoverTooltipProps> = ({ 
  data, 
  position, 
  visible 
}) => {
  if (!visible || !data || !position) return null;
  
  // Calcular el porcentaje si no viene ya calculado
  const percentage = data.percentage !== undefined 
    ? data.percentage 
    : (data.value / 100) * 100;
  
  return (
    <div 
      className="absolute bg-white border border-gray-200 shadow-md rounded-md p-2 z-[9999]"
      style={{ 
        left: '50%', 
        top: '-85px',
        transform: 'translateX(-50%)',
        minWidth: '100px',
        pointerEvents: 'none'
      }}
    >
      {/* Cabecera simple */}
      <div className="font-medium text-sm text-gray-800 flex items-center">
        <div 
          className="w-4 h-3 rounded-full mr-2.5" 
          style={{ backgroundColor: data.color }}
        ></div>
        <span>{data.name}</span>
      </div>
      
      {/* Contenido */}
      <div className="text-xs text-gray-600 mt-0.5">
        <div>
          {data.value} ({percentage.toFixed(1)}%)
        </div>
        {data.details && (
          <div className="text-xs font-medium">{data.details}</div>
        )}
      </div>
      
      {/* Flecha del tooltip */}
      <div 
        className="absolute w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45" 
        style={{ bottom: '-6px', left: '50%', marginLeft: '-6px' }}
      ></div>
    </div>
  );
};

export default HoverTooltip;