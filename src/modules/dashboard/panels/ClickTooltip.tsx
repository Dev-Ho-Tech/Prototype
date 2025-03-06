/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ClickTooltipProps {
  visible: boolean;
  data: any;
  position: { x: number, y: number };
  onClick: () => void;
}

const ClickTooltip: React.FC<ClickTooltipProps> = ({ 
  visible, 
  data, 
  position, 
  onClick 
}) => {
  if (!visible || !data) return null;
  
  return (
    <div 
      className="fixed bg-black bg-opacity-80 text-white px-3 py-2 rounded text-sm z-50 shadow-lg border border-gray-600 tooltip-click"
      style={{ 
        top: position.y, 
        left: position.x,
        transform: 'translate(-50%, -120%)',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <p className="font-bold text-center">{data.name}</p>
      <p className="text-center font-semibold text-lg">{data.value}%</p>
      {data.details && <p className="text-center">{data.details}</p>}
      {data.additionalInfo && <p className="text-xs text-gray-300 text-center">{data.additionalInfo}</p>}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-black border-r border-b border-gray-600"></div>
    </div>
  );
};

export default ClickTooltip;