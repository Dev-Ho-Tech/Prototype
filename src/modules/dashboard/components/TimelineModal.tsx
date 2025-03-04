import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Employee } from '../interface/types';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee;
}

// Componente de Tooltip rediseñado y mejorado
// const Tooltip = ({ visible, content, position }: { visible: boolean; content: React.ReactNode; position: { top?: string; left?: string; bottom?: string; right?: string; transform?: string } }) => {
//   if (!visible) return null;
  
//   return (
//     <div 
//       className="fixed bg-white border border-gray-200 shadow-md rounded-md p-3 z-50"
//       style={{ 
//         ...position,
//         minWidth: '180px',
//         maxWidth: '250px',
//         pointerEvents: 'none'  // Prevenir que el tooltip interfiera con eventos del mouse
//       }}
//     >
//       {content}
//       <div className="absolute w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45" style={{ bottom: '-6px', left: 'calc(50% - 6px)' }}></div>
//     </div>
//   );
// };

// Icono Facial - componente separado para simplicidad
const FaceIcon = ({ color }: { color: string }) => {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: color }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"/>
        <path d="M13 10C13 9.44772 13.4477 9 14 9H14.01C14.5623 9 15.01 9.44772 15.01 10C15.01 10.5523 14.5623 11 14.01 11H14C13.4477 11 13 10.5523 13 10Z" fill="currentColor"/>
        <path d="M9 15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15H11C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8ZM8 5C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5H8Z" fill="currentColor"/>
      </svg>
    </div>
  );
};

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
  if (!isOpen) return null;

  // Marcajes de ejemplo para visualización
  const marcajes = [
    {
      id: "entrada",
      time: "7:00 am",
      type: "Entrada Almuerzo",
      device: "Biométrico",
      method: "Facial",
      position: "16.67%", // 7am position (5am=0%, 8pm=100%)
      color: "#22c55e" // green-500
    },
    {
      id: "salida-almuerzo",
      time: "11:00 am",
      type: "Salida Almuerzo",
      device: "Biométrico",
      method: "Facial",
      position: "46.15%", // 11am position
      color: "#3b82f6" // blue-500
    },
    {
      id: "entrada-almuerzo",
      time: "12:00 pm",
      type: "Entrada Almuerzo",
      device: "Biométrico",
      method: "Facial",
      position: "53.85%", // 12pm position
      color: "#eab308" // yellow-500
    }
  ];

  // Función para mostrar tooltip con posición calculada
  const showTooltip = (id: string, event: React.MouseEvent) => {
    // Calcular posición basada en el evento
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top - 80, // Posicionarlo más arriba
      left: rect.left
    };
    
    setTooltipPosition(position);
    setActiveTooltip(id);
  };

  // Función para ocultar tooltip
  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  // Obtener el marcaje activo
  const activeMarcaje = activeTooltip ? marcajes.find(m => m.id === activeTooltip) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 overflow-hidden relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Línea de tiempo</h2>
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Tooltip global - ahora usando posición fija calculada */}
        {activeTooltip && activeMarcaje && (
          <div 
            className="fixed bg-white border border-gray-200 shadow-lg rounded-md p-3 z-50"
            style={{ 
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              minWidth: '180px',
              transform: 'translate(-50%, -100%)',
              zIndex: 9999
            }}
          >
            <div className="font-semibold text-gray-800">{activeMarcaje.time}</div>
            <div className="text-gray-600">{activeMarcaje.type}</div>
            <div className="text-gray-500 text-sm">Dispositivo: {activeMarcaje.device}</div>
            <div className="text-gray-500 text-sm">Método: {activeMarcaje.method}</div>
            
            {/* Flecha de tooltip */}
            <div className="absolute w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45" style={{ bottom: '-7px', left: '50%', marginLeft: '-7px' }}></div>
          </div>
        )}
        
        <div className="p-6">
          <div className="relative mb-8">
            {/* Iconos de marcaje con conectores */}
            {marcajes.map((marcaje) => (
              <div 
                key={marcaje.id}
                className="absolute"
                style={{ 
                  left: marcaje.position,
                  top: '0',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20
                }}
              >
                {/* Icono con conector */}
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={(e) => showTooltip(marcaje.id, e)}
                  onMouseLeave={hideTooltip}
                >
                  <FaceIcon color={marcaje.color} />
                  <div 
                    className="h-8 w-0.5" 
                    style={{ backgroundColor: marcaje.color, margin: '0 auto' }}
                  ></div>
                </div>
              </div>
            ))}

            {/* Línea de tiempo con horas */}
            <div className="mt-10 border border-gray-200 rounded-lg p-4">
              <div className="relative h-32">
                {/* Escala de horas */}
                <div className="absolute top-0 left-0 right-0 flex">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const hour = i + 5; // Empezamos en 5:00 am
                    const ampm = hour >= 12 ? 'pm' : 'am';
                    const displayHour = hour > 12 ? hour - 12 : hour;
                    
                    return (
                      <div key={i} className="flex-1 text-center">
                        <div className="text-xs text-gray-500">{`${displayHour}:00 ${ampm}`}</div>
                        <div className="h-3 border-l border-gray-200 mx-auto"></div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Línea de hora actual */}
                <div 
                  className="absolute top-6 bottom-0 w-0.5 bg-gray-400 z-10" 
                  style={{ left: '46.15%' }} // 11:00 am
                ></div>
                
                {/* Contenedor para barras de horario */}
                <div className="absolute left-0 right-0 top-10 h-16">
                  {/* Horario planificado (azul) */}
                  <div 
                    className="absolute h-5 rounded-md bg-blue-400"
                    style={{ left: '16.67%', width: '66.66%' }} // 7am - 5pm
                  ></div>
                  
                  {/* Tiempo trabajado 1 (verde rayado) */}
                  <div 
                    className="absolute h-5 rounded-md bg-striped-green"
                    style={{ left: '16.67%', width: '29.48%', top: '10px' }} // 7am - 11am
                    onMouseEnter={(e) => showTooltip("entrada", e)}
                    onMouseLeave={hideTooltip}
                  ></div>
                  
                  {/* Tiempo trabajado 2 (verde rayado) */}
                  <div 
                    className="absolute h-5 rounded-md bg-striped-green"
                    style={{ left: '53.85%', width: '22%', top: '10px' }} // 12pm - 3pm
                    onMouseEnter={(e) => showTooltip("entrada-almuerzo", e)}
                    onMouseLeave={hideTooltip}
                  ></div>
                  
                  {/* Descanso (naranja) */}
                  <div 
                    className="absolute h-12 rounded-md bg-orange-300"
                    style={{ left: '46.15%', width: '7.7%', top: '10px' }} // 11am - 12pm
                    onMouseEnter={(e) => showTooltip("salida-almuerzo", e)}
                    onMouseLeave={hideTooltip}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leyenda */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Horario planificado</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-striped-green rounded mr-2"></div>
              <span className="text-sm text-gray-600">Tiempo trabajado</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-300 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Descanso</span>
            </div>
          </div>
          
          {/* Estilos CSS para patrones y animaciones */}
          <style>{`
            .bg-striped-green {
              background-color: #86efac;
              background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.5) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.5) 75%, transparent 75%, transparent);
              background-size: 10px 10px;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default TimelineModal;