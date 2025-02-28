import React from 'react';
import { Marcaje } from '../interface/types';

interface TimelineViewerProps {
  marcajes: Marcaje[];
  startHour?: number;
  endHour?: number;
  onAddMarcaje?: () => void;
  onMarkerClick?: (marcaje: Marcaje) => void;
  selectedMarcajeId?: string | null;
}

const TimelineViewer: React.FC<TimelineViewerProps> = ({
  marcajes,
  startHour = 5,
  endHour = 19,
  onMarkerClick,
  selectedMarcajeId
}) => {
  // Calcular posición horizontal basada en la hora
  const calculateHorizontalPosition = (timeString: string): number => {
    // Extraer hora y minutos, considerar AM/PM
    const parts = timeString.split(' ');
    const timePart = parts[0];
    const isPM = parts[1] === 'PM';
    
    const [hoursStr, minutesStr] = timePart.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    
    // Convertir a formato 24 horas si es PM
    if (isPM && hours < 12) {
      hours += 12;
    }
    // Convertir 12 AM a 0 horas
    if (!isPM && hours === 12) {
      hours = 0;
    }
    
    // Calcular posición como porcentaje del ancho total
    const totalHours = endHour - startHour;
    const hourDecimal = hours + (minutes / 60);
    const position = ((hourDecimal - startHour) / totalHours) * 100;
    
    // Limitar posición entre 0% y 100%
    return Math.max(0, Math.min(100, position));
  };

  // Función para obtener color según tipo de marcaje
  const getMarkerColor = (marcaje: Marcaje): string => {
    switch (marcaje.tipoMarcaje) {
      case 'Entrada':
        return 'bg-green-500';
      case 'Salida':
        return 'bg-blue-500';
      case 'Inicio de Descanso':
      case 'Fin de Descanso':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Manejar clic en marcador
  const handleMarkerClick = (marcaje: Marcaje) => {
    if (onMarkerClick) {
      onMarkerClick(marcaje);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="relative" style={{ height: '100px', minWidth: '800px' }}>
          {/* Horas en la parte inferior */}
          <div className="absolute bottom-0 w-full flex border-t border-gray-200">
            {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
              const hour = startHour + i;
              return (
                <div key={hour} className="flex-1 text-center border-r border-gray-200 last:border-r-0 text-xs text-gray-500 py-1">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
              );
            })}
          </div>
          
          {/* Líneas verticales de la cuadrícula */}
          <div className="absolute inset-0 w-full h-full flex pointer-events-none">
            {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
              return (
                <div key={i} className="flex-1 border-r border-gray-200 last:border-r-0"></div>
              );
            })}
          </div>
          
          {/* Línea horizontal del tiempo */}
          <div className="absolute top-1/2 w-full h-px bg-gray-300"></div>
          
          {/* Marcadores de tiempo */}
          {marcajes.map(marcaje => {
            const position = calculateHorizontalPosition(marcaje.hora);
            const isSelected = marcaje.id === selectedMarcajeId;
            const markerColor = getMarkerColor(marcaje);
            
            return (
              <div 
                key={marcaje.id}
                className={`absolute cursor-pointer transition-all ${isSelected ? 'z-10' : 'z-0'}`}
                style={{ 
                  left: `${position}%`, 
                  top: '50%',
                  transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.2)' : 'scale(1)'}` 
                }}
                onClick={() => handleMarkerClick(marcaje)}
              >
                <div className={`${markerColor} w-4 h-4 rounded-full shadow ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap text-xs font-medium">
                  {marcaje.hora}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineViewer;