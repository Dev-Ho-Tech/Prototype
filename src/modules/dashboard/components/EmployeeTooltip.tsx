import React from 'react';

interface EmployeeTooltipProps {
  text: string;
  position: { x: number; y: number };
  visible: boolean;
}

const EmployeeTooltip: React.FC<EmployeeTooltipProps> = ({ text, position, visible }) => {
  // Log para depuración
  console.log("EmployeeTooltip render:", { text, position, visible });

  if (!visible) {
    return null;
  }

  // Usamos document.body para renderizar el tooltip
  // Esto evita problemas con posicionamiento y z-index
  return (
    <div 
      id="employee-tooltip"
      className="fixed bg-black bg-opacity-75 text-white rounded px-2 py-1 text-sm pointer-events-none"
      style={{
        top: `${position.y - 30}px`,
        left: `${position.x}px`,
        transform: 'translateX(-50%)',
        zIndex: 9999,
        maxWidth: '200px',
        fontWeight: 500
      }}
    >
      {text}
    </div>
  );
};

export default EmployeeTooltip;