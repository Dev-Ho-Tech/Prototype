import React from 'react';

interface TimeSlotHeaderProps {
  startHour: number;
  endHour: number;
}

const TimeSlotHeader: React.FC<TimeSlotHeaderProps> = ({ startHour, endHour }) => {
  // Crear todas las horas en una sola fila horizontal
  const timeSlots = [];
  
  // Generamos todas las horas desde startHour hasta endHour
  for (let hour = startHour; hour <= endHour; hour++) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12; // Convertir a formato 12h
    const period = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour12.toString().padStart(2, '0');
    
    // Determinar si es hora nocturna (después de 7 PM)
    const isEveningHour = hour >= 19;
    
    timeSlots.push({
      time: `${formattedHour}:00 ${period}`,
      isEveningHour
    });
  }

  // Calcular la cantidad de columnas para el grid
  const totalColumns = endHour - startHour + 1;
  
  return (
    <div 
      className="grid divide-x divide-gray-200" 
      style={{ 
        gridTemplateColumns: `repeat(${totalColumns}, minmax(80px, 1fr))` 
      }}
    >
      {timeSlots.map((slot, index) => (
        <div 
          key={index} 
          className={`px-2 py-1 text-xs text-gray-500 text-center border-r last:border-r-0 ${
            slot.isEveningHour ? 'bg-white' : ''
          }`}
        >
          {slot.time}
        </div>
      ))}
    </div>
  );
};

export default TimeSlotHeader;