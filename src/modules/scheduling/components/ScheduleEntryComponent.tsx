import React, { useRef, useState } from 'react';
import { ScheduleEntry, WorkShift, License } from '../interfaces/types';

interface ScheduleEntryComponentProps {
  schedule: ScheduleEntry;
  workShifts: WorkShift[];
  licenses: License[];
  onMouseDown: (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => void;
  startHour?: number;
  endHour?: number;
  timeStep?: number;
}

const ScheduleEntryComponent: React.FC<ScheduleEntryComponentProps> = ({ 
  schedule, 
  workShifts, 
  licenses,
  onMouseDown,
  startHour = 5,
  endHour = 23,
  timeStep = 15
}) => {
  // Referencia al elemento para mejorar detección de bordes
  const entryRef = useRef<HTMLDivElement>(null);
  const leftHandleRef = useRef<HTMLDivElement>(null);
  const rightHandleRef = useRef<HTMLDivElement>(null);
  
  // Estado para controlar si estamos en modo interacción
  const [isInteracting, setIsInteracting] = useState(false);

  // Determinar si es un turno de trabajo o una licencia
  const isLicense = licenses.some(l => l.code === schedule.shift);
  const shiftInfo = isLicense 
    ? licenses.find(l => l.code === schedule.shift) 
    : workShifts.find(s => s.id === schedule.shift);

  // Obtener las horas de inicio y fin, limitando al rango visible
  const rawStartHour = schedule.startTime 
    ? parseInt(schedule.startTime.split(':')[0]) 
    : startHour;
    
  const rawStartMinutes = schedule.startTime 
    ? parseInt(schedule.startTime.split(':')[1] || '0') 
    : 0;
    
  const rawEndHour = schedule.endTime 
    ? parseInt(schedule.endTime.split(':')[0]) 
    : endHour;
    
  const rawEndMinutes = schedule.endTime 
    ? parseInt(schedule.endTime.split(':')[1] || '0') 
    : 0;
  
  // Asegurar que las horas estén dentro del rango visible
  const visibleStartHour = Math.max(startHour, Math.min(endHour, rawStartHour));
  const visibleEndHour = Math.min(endHour, Math.max(startHour, rawEndHour));
  
  // Calcular el total de horas en la cuadrícula
  const totalHours = endHour - startHour;
  
  // Calcular posición y ancho como porcentaje del total, incluyendo minutos para más precisión
  const leftPosition = ((visibleStartHour - startHour + (rawStartMinutes / 60)) / totalHours) * 100;
  const width = ((visibleEndHour - visibleStartHour + ((rawEndMinutes - rawStartMinutes) / 60)) / totalHours) * 100;
  
  // No mostrar el componente si está completamente fuera del rango visible
  if (visibleStartHour >= visibleEndHour && rawStartMinutes >= rawEndMinutes) {
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
    e.preventDefault();
    
    console.log('[HANDLE] Iniciando redimensionamiento IZQUIERDO');
    
    // Importante: definir explícitamente todas las propiedades 
    // necesarias para asegurar una copia completa
    const newSchedule: ScheduleEntry = { 
      ...schedule, 
      date: schedule.date,
      shift: schedule.shift,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isResizingStart: true,  // ¡CLAVE!
      isResizingEnd: false,
      isMoving: false
    };
    
    // Llamar al manejador del componente padre
    onMouseDown(e, newSchedule);
  };

  // Manejador para redimensionar desde el borde derecho
  const handleRightResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log('[HANDLE] Iniciando redimensionamiento DERECHO');
    
    // Importante: definir explícitamente todas las propiedades 
    // necesarias para asegurar una copia completa
    const newSchedule: ScheduleEntry = { 
      ...schedule, 
      date: schedule.date,
      shift: schedule.shift,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isResizingStart: false,
      isResizingEnd: true,  // ¡CLAVE!
      isMoving: false
    };
    
    // Llamar al manejador del componente padre
    onMouseDown(e, newSchedule);
  };

  // Manejador para mover el horario completo
  const handleMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log('[HANDLE] Iniciando MOVIMIENTO');
    
    // Importante: definir explícitamente todas las propiedades 
    // necesarias para asegurar una copia completa
    const newSchedule: ScheduleEntry = { 
      ...schedule, 
      date: schedule.date,
      shift: schedule.shift,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isResizingStart: false,
      isResizingEnd: false,
      isMoving: true  // ¡CLAVE!
    };
    
    // Llamar al manejador del componente padre
    onMouseDown(e, newSchedule);
  };

  // Formatear hora para mostrar (HH:MM)
  const formatTime = (hours: number, minutes: number) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={entryRef}
      id={`schedule-entry-${schedule.date}-${schedule.shift}`}
      className={`absolute inset-y-0 m-1 rounded flex items-center px-2 ${getBackgroundColor()} select-none`}
      style={{
        left: `${leftPosition}%`,
        width: `${width}%`,
        minWidth: '20px',
        maxHeight: '90%',
        top: '5%',
        zIndex: isInteracting ? 30 : 10,
        cursor: 'move',
        pointerEvents: 'auto',
        transition: 'box-shadow 0.1s ease-in-out',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}
      onMouseDown={handleMove}
    >
      <div className="flex items-center space-x-2 text-xs overflow-hidden">
        <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {isLicense ? shiftInfo?.label : `${schedule.shift}`}
        </span>
        {schedule.startTime && schedule.endTime && (
          <span className="whitespace-nowrap">
            {formatTime(rawStartHour, rawStartMinutes)} - {formatTime(rawEndHour, rawEndMinutes)}
          </span>
        )}
      </div>
      
      {/* Manipulador de redimensionado izquierdo - Destacado y más grande */}
      <div 
        ref={leftHandleRef}
        className="absolute inset-y-0 left-0 w-6 hover:bg-white hover:bg-opacity-30 z-30 cursor-w-resize flex items-center justify-center"
        style={{
          height: '100%',
          borderTopLeftRadius: '0.25rem',
          borderBottomLeftRadius: '0.25rem',
          touchAction: 'none',
          pointerEvents: 'auto'
        }}
        onMouseDown={handleLeftResize}
      >
        <div className="h-12 w-1 bg-white bg-opacity-40 rounded"></div>
      </div>
      
      {/* Manipulador de redimensionado derecho - Destacado y más grande */}
      <div 
        ref={rightHandleRef}
        className="absolute inset-y-0 right-0 w-6 hover:bg-white hover:bg-opacity-30 z-30 cursor-e-resize flex items-center justify-center"
        style={{
          height: '100%',
          borderTopRightRadius: '0.25rem',
          borderBottomRightRadius: '0.25rem',
          touchAction: 'none',
          pointerEvents: 'auto'
        }}
        onMouseDown={handleRightResize}
      >
        <div className="h-12 w-1 bg-white bg-opacity-40 rounded"></div>
      </div>
    </div>
  );
};

export default ScheduleEntryComponent;