import React, { useRef } from 'react';
import { ScheduleEntry, WorkShift, License } from '../interfaces/types';

interface ScheduleEntryComponentProps {
  schedule: ScheduleEntry;
  workShifts: WorkShift[];
  licenses: License[];
  onMouseDown: (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => void;
  startHour?: number;
  endHour?: number;
}

const ScheduleEntryComponent: React.FC<ScheduleEntryComponentProps> = ({ 
  schedule, 
  workShifts, 
  licenses,
  onMouseDown,
  startHour = 5,
  endHour = 23
}) => {
  // Referencia al elemento para mejorar detección de bordes
  const entryRef = useRef<HTMLDivElement>(null);

  // Determinar si es un turno de trabajo o una licencia
  const isLicense = licenses.some(l => l.code === schedule.shift);
  const shiftInfo = isLicense 
    ? licenses.find(l => l.code === schedule.shift) 
    : workShifts.find(s => s.id === schedule.shift);

  // Obtener las horas de inicio y fin, limitando al rango visible
  const rawStartHour = schedule.startTime 
    ? parseInt(schedule.startTime.split(':')[0]) 
    : startHour;
    
  const rawEndHour = schedule.endTime 
    ? parseInt(schedule.endTime.split(':')[0]) 
    : endHour;
  
  // Asegurar que las horas estén dentro del rango visible
  const visibleStartHour = Math.max(startHour, Math.min(endHour, rawStartHour));
  const visibleEndHour = Math.min(endHour, Math.max(startHour, rawEndHour));
  
  // Calcular el total de horas en la cuadrícula
  const totalHours = endHour - startHour;
  
  // Calcular posición y ancho como porcentaje del total
  const leftPosition = ((visibleStartHour - startHour) / totalHours) * 100;
  const width = ((visibleEndHour - visibleStartHour) / totalHours) * 100;
  
  // No mostrar el componente si está completamente fuera del rango visible
  if (visibleStartHour >= visibleEndHour) {
    return null;
  }

  // Determinar color basado en el tipo de turno o licencia
  const getBackgroundColor = () => {
    if (isLicense) {
      return shiftInfo?.color || 'bg-yellow-200 text-yellow-800';
    }
    
    // Puedes tener lógica específica para diferentes turnos
    if (schedule.shift?.toString().includes('matrimonio')) {
      return 'bg-purple-300 text-purple-900';
    } else if (schedule.shift?.toString().includes('descanso')) {
      return 'bg-red-200 text-red-800';
    }
    
    return shiftInfo?.color || 'bg-blue-500 text-white';
  };

  // Manejador para redimensionar desde el borde izquierdo
  const handleLeftResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // No usamos preventDefault() para permitir el arrastre normal
    
    // Crear una copia del horario con indicador de que estamos redimensionando el inicio
    const newSchedule = { 
      ...schedule, 
      isResizingStart: true,  // Este es el indicador clave para el redimensionamiento izquierdo
      isResizingEnd: false,
      isMoving: false
    };
    
    // Llamar al manejador del componente padre con el evento original
    onMouseDown(e, newSchedule);
  };

  // Manejador para redimensionar desde el borde derecho
  const handleRightResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // No usamos preventDefault() para permitir el arrastre normal
    
    // Crear una copia del horario con indicador de que estamos redimensionando el final
    const newSchedule = { 
      ...schedule, 
      isResizingStart: false,
      isResizingEnd: true,  // Este es el indicador clave para el redimensionamiento derecho
      isMoving: false
    };
    
    // Llamar al manejador del componente padre con el evento original
    onMouseDown(e, newSchedule);
  };

  // Manejador para mover el horario completo
  const handleMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Crear una copia del horario con indicador de que estamos moviendo
    const newSchedule = { 
      ...schedule, 
      isResizingStart: false,
      isResizingEnd: false,
      isMoving: true
    };
    
    // Llamar al manejador del componente padre
    onMouseDown(e, newSchedule);
  };

  return (
    <div
      ref={entryRef}
      className={`absolute inset-y-0 m-1 rounded flex items-center px-2 ${getBackgroundColor()}`}
      style={{
        left: `${leftPosition}%`,
        width: `${width}%`,
        minWidth: '20px',
        maxWidth: `${((endHour - startHour) / totalHours) * 100}%`,
        maxHeight: '90%',
        top: '5%',
        zIndex: 10,
        cursor: 'move'
      }}
      onMouseDown={handleMove}
    >
      <div className="flex items-center space-x-2 text-xs overflow-hidden">
        <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {isLicense ? shiftInfo?.label : `${schedule.shift}`}
        </span>
        {schedule.startTime && schedule.endTime && (
          <span className="whitespace-nowrap">
            {rawStartHour.toString().padStart(2, '0')}:00 - {rawEndHour.toString().padStart(2, '0')}:00
          </span>
        )}
      </div>
      
      {/* Manija izquierda para redimensionar - más ancha y visible */}
      <div 
        className="absolute inset-y-0 left-0 w-5 hover:bg-white hover:bg-opacity-20 z-20"
        style={{
          height: '100%',
          borderTopLeftRadius: '0.25rem',
          borderBottomLeftRadius: '0.25rem',
          cursor: 'w-resize'
        }}
        onMouseDown={handleLeftResize}
      />
      
      {/* Manija derecha para redimensionar - más ancha y visible */}
      <div 
        className="absolute inset-y-0 right-0 w-5 hover:bg-white hover:bg-opacity-20 z-20"
        style={{
          height: '100%',
          borderTopRightRadius: '0.25rem',
          borderBottomRightRadius: '0.25rem',
          cursor: 'e-resize'
        }}
        onMouseDown={handleRightResize}
      />
    </div>
  );
};

export default ScheduleEntryComponent;