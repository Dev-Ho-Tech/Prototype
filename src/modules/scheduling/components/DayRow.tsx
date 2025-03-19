import React, { useState } from 'react';
import { ScheduleEntry, WorkShift, License } from '../interfaces/types';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';

interface DayRowProps {
  day: string;
  date: string;
  employee: UnifiedEmployee | null;
  workShifts: WorkShift[];
  licenses: License[];
  onMouseDown: (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  startHour: number;
  endHour: number;
  timeStep?: number;
}

// Componente para las manijas de redimensionado
const ResizeHandle: React.FC<{
  position: 'left' | 'right',
  onMouseDown: (e: React.MouseEvent) => void
}> = ({ position, onMouseDown }) => {
  // Prevenir menú contextual (click derecho)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      className={`absolute inset-y-0 ${position}-0 w-4 z-40 cursor-${position === 'left' ? 'w' : 'e'}-resize flex items-center justify-center`}
      style={{
        height: '100%',
        borderTopLeftRadius: position === 'left' ? '0.25rem' : '0',
        borderBottomLeftRadius: position === 'left' ? '0.25rem' : '0',
        borderTopRightRadius: position === 'right' ? '0.25rem' : '0',
        borderBottomRightRadius: position === 'right' ? '0.25rem' : '0',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
      onMouseDown={onMouseDown}
      onContextMenu={handleContextMenu}
    >
      <div className="h-10 w-1 bg-white bg-opacity-40 rounded"></div>
    </div>
  );
};

const DayRow: React.FC<DayRowProps> = ({ 
  day, 
  date, 
  employee, 
  workShifts, 
  licenses,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  startHour,
  endHour,
  timeStep = 15
}) => {
  // Estados para manejar el redimensionado localmente
  const [isResizing, setIsResizing] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, width: 0 });
  
  // Prevenir menú contextual (click derecho)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };
  
  // Formatear fecha para mostrar MM/DD
  const formattedShortDate = date.split('-').slice(1).join('/');
  
  // Encontrar el horario del empleado para este día
  const schedule = employee?.schedule?.find(s => s.date === date);

  // Calcular la cantidad de columnas para el grid
  const totalColumns = endHour - startHour + 1;
  const totalHours = endHour - startHour;

  // Crear celdas con el color de fondo correcto
  const cells = Array.from({ length: totalColumns }).map((_, index) => {
    const hour = startHour + index;
    const isEveningHour = hour >= 19; // Después de 7 PM
    
    return (
      <div 
        key={index} 
        className={`h-full min-h-[50px] ${isEveningHour ? 'bg-gray-50' : ''}`}
        onContextMenu={handleContextMenu}
      ></div>
    );
  });
  
  // Funciones para procesar el horario si existe
  const getScheduleStyles = () => {
    if (!schedule) return null;
    
    // Obtener las horas de inicio y fin
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
    
    // Calcular posición y ancho como porcentaje del total
    const leftPosition = ((visibleStartHour - startHour + (rawStartMinutes / 60)) / totalHours) * 100;
    const width = ((visibleEndHour - visibleStartHour + ((rawEndMinutes - rawStartMinutes) / 60)) / totalHours) * 100;
    
    return {
      left: `${leftPosition}%`,
      width: `${width}%`
    };
  };
  
  // Obtener información sobre turno o licencia
  const getScheduleInfo = () => {
    if (!schedule) return null;
    
    const isLicense = licenses.some(l => l.code === schedule.shift);
    const shiftInfo = isLicense 
      ? licenses.find(l => l.code === schedule.shift) 
      : workShifts.find(s => s.id === schedule.shift);
      
    return { isLicense, shiftInfo };
  };
  
  // Obtener color de fondo
  const getBackgroundColor = () => {
    const info = getScheduleInfo();
    if (!info) return '';
    
    if (info.isLicense) {
      return info.shiftInfo?.color || 'bg-yellow-200 text-yellow-800';
    }
    
    if (schedule?.shift?.toString().includes('matrimonio')) {
      return 'bg-purple-300 text-purple-900';
    } else if (schedule?.shift?.toString().includes('descanso')) {
      return 'bg-red-200 text-red-800';
    }
    
    return info.shiftInfo?.color || 'bg-blue-500 text-white';
  };
  
  // Formatear hora para mostrar (HH:MM)
  const formatTime = (timeString: string) => {
    const parts = timeString.split(':');
    const hour = parts[0].padStart(2, '0');
    const minutes = (parts[1] || '00').padStart(2, '0');
    return `${hour}:${minutes}`;
  };
  
  // Manejador para iniciar redimensionado desde el borde izquierdo
  const handleLeftResize = (e: React.MouseEvent) => {
    // Solo procesar click izquierdo (e.button === 0)
    if (e.button !== 0) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    if (!schedule) return;
    
    console.log('[DAY_ROW] Iniciando redimensionado IZQUIERDO con posición inicial:', e.clientX);
    
    // Guardar posición inicial para el cálculo de sensibilidad
    setInitialPosition({ 
      x: e.clientX, 
      width: (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect().width 
    });
    
    const newSchedule = {
      ...schedule,
      isResizingStart: true,
      isResizingEnd: false,
      isMoving: false,
      initialX: e.clientX, // Guardamos la posición inicial del mouse
      sensitivity: 0.2 // Añadimos factor de sensibilidad
    };
    
    setIsResizing(true);
    onMouseDown(e, newSchedule);
  };
  
  // Manejador para iniciar redimensionado desde el borde derecho
  const handleRightResize = (e: React.MouseEvent) => {
    // Solo procesar click izquierdo (e.button === 0)
    if (e.button !== 0) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    if (!schedule) return;
    
    console.log('[DAY_ROW] Iniciando redimensionado DERECHO con posición inicial:', e.clientX);
    
    // Guardar posición inicial para el cálculo de sensibilidad
    setInitialPosition({ 
      x: e.clientX, 
      width: (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect().width 
    });
    
    const newSchedule = {
      ...schedule,
      isResizingStart: false,
      isResizingEnd: true,
      isMoving: false,
      initialX: e.clientX, // Guardamos la posición inicial del mouse
      sensitivity: 0.2 // Añadimos factor de sensibilidad
    };
    
    setIsResizing(true);
    onMouseDown(e, newSchedule);
  };
  
  // Manejador para iniciar movimiento
  const handleMove = (e: React.MouseEvent) => {
    // Solo procesar click izquierdo (e.button === 0)
    if (e.button !== 0) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    if (!schedule) return;
    
    console.log('[DAY_ROW] Iniciando MOVIMIENTO');
    
    // Guardar posición inicial para el cálculo de sensibilidad
    setInitialPosition({ 
      x: e.clientX, 
      width: (e.currentTarget as HTMLElement).getBoundingClientRect().width 
    });
    
    const newSchedule = {
      ...schedule,
      isResizingStart: false,
      isResizingEnd: false,
      isMoving: true,
      initialX: e.clientX, // Guardamos la posición inicial del mouse
      sensitivity: 0.2 // Añadimos factor de sensibilidad para el movimiento
    };
    
    setIsResizing(true);
    onMouseDown(e, newSchedule);
  };
  
  // Cuando se suelta el mouse
  const handleLocalMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
      onMouseUp();
    }
  };

  return (
    <React.Fragment>
      <div className="w-20 px-2 py-3 text-xs border-t border-gray-200 bg-gray-50"
           onContextMenu={handleContextMenu}>
        <div className="font-medium">{day}</div>
        <div className="text-gray-500">{formattedShortDate}</div>
      </div>
      <div 
        className="relative border-t border-gray-200 grid divide-x divide-gray-200"
        style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(80px, 1fr))` }}
        onMouseMove={onMouseMove}
        onMouseUp={handleLocalMouseUp}
        onContextMenu={handleContextMenu}
      >
        {/* Celdas de fondo */}
        {cells}
        
        {/* Horario */}
        {schedule && getScheduleStyles() && (
          <div 
            className={`absolute inset-y-0 m-1 rounded flex items-center px-2 ${getBackgroundColor()} select-none`}
            style={{
              ...getScheduleStyles(),
              maxHeight: '90%',
              top: '5%',
              zIndex: isResizing ? 30 : 10, // Aumentar z-index durante redimensionado
              cursor: 'move',
              transition: isResizing ? 'none' : 'box-shadow 0.1s ease', // Eliminar transición durante el arrastre
              boxShadow: isResizing ? '0 0 0 2px rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.15)' : 'none'
            }}
            onMouseDown={handleMove}
            onContextMenu={handleContextMenu}
            id={`schedule-entry-${date}-${schedule.shift}`}
          >
            <div className="flex items-center space-x-2 text-xs overflow-hidden">
              <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {getScheduleInfo()?.isLicense ? getScheduleInfo()?.shiftInfo?.label : `${schedule.shift}`}
              </span>
              {schedule.startTime && schedule.endTime && (
                <span className="whitespace-nowrap">
                  {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                </span>
              )}
            </div>
            
            {/* Manija izquierda para redimensionar */}
            <ResizeHandle 
              position="left" 
              onMouseDown={handleLeftResize} 
            />
            
            {/* Manija derecha para redimensionar */}
            <ResizeHandle 
              position="right" 
              onMouseDown={handleRightResize} 
            />
          </div>
        )}
        
        {/* Marcajes biométricos */}
        {schedule?.actualEntryTime && (
          <div 
            className="absolute top-0 w-3 h-3 bg-green-500 rounded-full transform -translate-y-1/2"
            style={{ 
              left: `${((parseInt(schedule.actualEntryTime.split(':')[0]) - startHour + 
                      (parseInt(schedule.actualEntryTime.split(':')[1] || '0') / 60)) / totalHours) * 100}%`,
              zIndex: 20
            }}
            title={`Entrada: ${schedule.actualEntryTime}`}
            onContextMenu={handleContextMenu}
          />
        )}
        
        {schedule?.actualExitTime && (
          <div 
            className="absolute top-0 w-3 h-3 bg-red-500 rounded-full transform -translate-y-1/2"
            style={{ 
              left: `${((parseInt(schedule.actualExitTime.split(':')[0]) - startHour + 
                      (parseInt(schedule.actualExitTime.split(':')[1] || '0') / 60)) / totalHours) * 100}%`,
              zIndex: 20
            }}
            title={`Salida: ${schedule.actualExitTime}`}
            onContextMenu={handleContextMenu}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default DayRow;