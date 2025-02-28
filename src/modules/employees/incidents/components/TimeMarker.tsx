import React from 'react';
import { Marcaje, TipoMarcaje } from '../interface/types';

interface TimeMarkerProps {
  marcaje: Marcaje;
  startHour: number;
  endHour: number;
  selected?: boolean;
  onClick?: () => void;
}

const TimeMarker: React.FC<TimeMarkerProps> = ({ 
  marcaje, 
  startHour,
  endHour,
  selected = false,
  onClick 
}) => {
  // Extraer la hora del marcaje (formato "HH:MM AM/PM")
  const getHourFromTime = (timeString: string): number => {
    const isPM = timeString.includes('PM');
    const [hourMinute] = timeString.split(' ');
    // eslint-disable-next-line prefer-const
    let [hour, minute] = hourMinute.split(':').map(Number);
    
    if (isPM && hour < 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    
    return hour + (minute / 60);
  };

  const hour = getHourFromTime(marcaje.hora);
  
  // Calcular posición basada en la hora
  const totalHours = endHour - startHour;
  const position = ((hour - startHour) / totalHours) * 100;
  
  // Determinar color basado en tipo de marcaje
  const getMarkerColor = () => {
    switch (marcaje.tipoMarcaje) {
      case TipoMarcaje.ENTRADA:
        return 'bg-green-500';
      case TipoMarcaje.SALIDA:
        return 'bg-blue-500';
      case TipoMarcaje.BREAK_INICIO:
        return 'bg-amber-500';
      case TipoMarcaje.BREAK_FIN:
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Si la hora está fuera del rango visible
  if (hour < startHour || hour > endHour) {
    return null;
  }

  return (
    <div 
      className={`absolute top-0 cursor-pointer transition-transform ${selected ? 'z-10' : 'z-0'}`}
      style={{ 
        left: `${position}%`, 
        transform: `translateX(-50%) ${selected ? 'scale(1.5)' : ''}` 
      }}
      onClick={onClick}
      title={`${marcaje.tipoMarcaje}: ${marcaje.hora}`}
    >
      <div className={`w-4 h-4 rounded-full ${getMarkerColor()} border-2 border-white`}></div>
      
      {/* Línea vertical */}
      <div className={`absolute w-px h-6 ${getMarkerColor()} top-full left-1/2 transform -translate-x-1/2`}></div>
      
      {/* Etiqueta de hora */}
      <div className="absolute whitespace-nowrap text-xs font-medium transform -translate-x-1/2 -rotate-45 origin-top-left" style={{ top: '24px', left: '50%' }}>
        {marcaje.hora}
      </div>
    </div>
  );
};

export default TimeMarker;