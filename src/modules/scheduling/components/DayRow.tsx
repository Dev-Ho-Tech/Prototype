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
  isEmployeeName?: boolean;
  onContextMenu?: (e: React.MouseEvent, date: string, hour: number, employeeId: string | null) => void;
  onDrop?: (e: React.DragEvent, date: string, hour: number, employeeId: string | null) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onStartDragBetweenDays?: (scheduleEntry: ScheduleEntry, date: string, employeeId: string | null) => void;
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
  timeStep = 15,
  isEmployeeName = false,
  onContextMenu,
  onDrop,
  onDragOver,
  onStartDragBetweenDays
}) => {
  // Estados para manejar el redimensionado localmente
  const [isResizing, setIsResizing] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, width: 0 });
  const [hoverHour, setHoverHour] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Manejador para prevenir el comportamiento de menú contextual por defecto
  const handleContextMenuDefault = (e: React.MouseEvent) => {
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

  // Manejador para el click derecho en la celda
  const handleCellContextMenu = (e: React.MouseEvent, hour: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onContextMenu) {
      onContextMenu(e, date, hour, employee?.id || null);
    }
  };

  // Manejador para iniciar arrastre entre días
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, scheduleEntry: ScheduleEntry) => {
    if (!schedule) return;
    
    e.stopPropagation();
    
    // Guardar datos detallados del horario en el dataTransfer
    const dragData = {
      type: 'schedule',
      entry: scheduleEntry,
      employeeId: employee?.id,
      originDate: date
    };
    
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    
    // Crear imagen personalizada para el arrastre
    const dragImage = document.createElement('div');
    dragImage.style.width = '120px';
    dragImage.style.height = '30px';
    dragImage.style.backgroundColor = 'rgba(59, 130, 246, 0.8)';
    dragImage.style.color = 'white';
    dragImage.style.padding = '4px 8px';
    dragImage.style.borderRadius = '4px';
    dragImage.style.fontSize = '12px';
    dragImage.style.display = 'flex';
    dragImage.style.alignItems = 'center';
    dragImage.style.justifyContent = 'center';
    dragImage.innerText = `${scheduleEntry.startTime} - ${scheduleEntry.endTime}`;
    
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 15);
    
    // Eliminar elemento auxiliar después
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
    
    // Notificar al componente padre si está disponible
    if (onStartDragBetweenDays) {
      onStartDragBetweenDays(scheduleEntry, date, employee?.id || null);
    }
  };

  // Manejador para drag over en la celda
  const handleCellDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDragOver) {
      onDragOver(e);
    }
    
    // Obtener la hora sobre la que está el cursor
    const gridCell = e.currentTarget as HTMLElement;
    const gridRect = gridCell.getBoundingClientRect();
    const offsetX = e.clientX - gridRect.left;
    const cellWidth = gridRect.width;
    
    // Calcular la hora y minutos
    const hourFraction = (offsetX / cellWidth) + parseInt(gridCell.dataset.hour || '0');
    const hour = Math.floor(hourFraction);
    const minutes = Math.floor((hourFraction - hour) * 60);
    const roundedMinutes = Math.round(minutes / timeStep) * timeStep;
    
    setHoverHour(hour);
    
    // Mostrar tooltip con la hora
    setTooltipContent(`${hour}:${roundedMinutes === 0 ? '00' : roundedMinutes}`);
    setTooltipPosition({ x: e.clientX, y: e.clientY - 20 });
    setShowTooltip(true);
  };

  // Manejador para drag leave
  const handleCellDragLeave = () => {
    setShowTooltip(false);
  };

  // Manejador para drop en la celda
  const handleCellDrop = (e: React.DragEvent, hour: number) => {
    e.preventDefault();
    
    try {
      // Verificar si hay datos de arrastre de horario
      const dataJson = e.dataTransfer.getData('application/json');
      if (dataJson) {
        const dragData = JSON.parse(dataJson);
        
        // Si es un horario arrastrado
        if (dragData.type === 'schedule') {
          if (onDrop) {
            // Utilizar la función onDrop proporcionada por el padre
            onDrop(e, date, hour, employee?.id || null);
          }
        } else if (dragData.type === 'shift' || dragData.type === 'license') {
          // Continuar con el comportamiento existente para turnos y licencias
          if (onDrop) {
            onDrop(e, date, hour, employee?.id || null);
          }
        }
      }
    } catch (error) {
      console.error('[DAY_ROW] Error al procesar drop:', error);
    }
    
    setShowTooltip(false);
  };

  // Crear celdas con el color de fondo correcto
  const cells = Array.from({ length: totalColumns }).map((_, index) => {
    const hour = startHour + index;
    const isEveningHour = hour >= 19; // Después de 7 PM
    
    return (
      <div 
        key={index}
        data-hour={hour}
        className={`h-full min-h-[50px] ${isEveningHour ? 'bg-gray-50' : ''} border-r border-gray-100 relative`}
        onContextMenu={(e) => handleCellContextMenu(e, hour)}
        onDragOver={handleCellDragOver}
        onDragLeave={handleCellDragLeave}
        onDrop={(e) => handleCellDrop(e, hour)}
      >
        {/* Indicador de hora durante el drag */}
        {showTooltip && hoverHour === hour && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none">
            <div className="bg-blue-500 bg-opacity-20 rounded-lg py-1 px-2 text-xs text-blue-800">
              {hour}:00
            </div>
          </div>
        )}
      </div>
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
    
    // Si es un horario manual (agregado desde el menú contextual)
    if (schedule.shift === 'manual') {
      return { 
        isManual: true,
        isLicense: false, 
        shiftInfo: { 
          label: 'Horario manual', 
          color: 'bg-green-500 text-white' 
        } 
      };
    }
    
    const isLicense = licenses.some(l => l.code === schedule.shift);
    const shiftInfo = isLicense 
      ? licenses.find(l => l.code === schedule.shift) 
      : workShifts.find(s => s.id === schedule.shift);
      
    return { isLicense, shiftInfo, isManual: false };
  };
  
  // Obtener color de fondo
  const getBackgroundColor = () => {
    const info = getScheduleInfo();
    if (!info) return '';
    
    // Si es un horario manual (agregado desde el menú contextual), usar verde
    if (info.isManual) {
      return 'bg-green-500 text-white';
    }
    
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
      employeeId: employee?.id || '',
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
      employeeId: employee?.id || '',
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
    
    // Obtener el elemento actual y su posición exacta
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Guardar la posición y dimensiones iniciales para comparar
    setInitialPosition({ 
      x: e.clientX, 
      width: rect.width 
    });
    
    // Crear una copia del horario con datos de posición inicial
    const newSchedule = {
      ...schedule,
      employeeId: employee?.id || '',
      isResizingStart: false,
      isResizingEnd: false,
      isMoving: true,
      initialX: e.clientX,
      initialTime: schedule.startTime, // Guardar el tiempo inicial para referencia
      initialWidth: rect.width,
      initialLeft: rect.left,
      sensitivity: 0.10
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
      <div 
        className="w-20 px-2 py-2 text-xs border-t border-gray-200 bg-gray-50"
        onContextMenu={handleContextMenuDefault}
      >
        {isEmployeeName ? (
          // Mostrar el nombre del empleado y departamento
          <div>
            <div className="font-medium text-xs truncate">{day}</div>
            <div className="text-gray-500 text-xs truncate">{employee?.department}</div>
          </div>
        ) : (
          // Mostrar el día de la semana y la fecha
          <div>
            <div className="font-medium">{day}</div>
            <div className="text-gray-500">{formattedShortDate}</div>
          </div>
        )}
      </div>
      <div 
        className="relative border-t border-gray-200 grid divide-x divide-gray-200"
        style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(80px, 1fr))` }}
        onMouseMove={onMouseMove}
        onMouseUp={handleLocalMouseUp}
      >
        {/* Tooltip para drag & drop */}
        {showTooltip && (
          <div 
            className="fixed bg-gray-800 text-white px-2 py-1 text-xs rounded z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: 'translateX(-50%)'
            }}
          >
            {tooltipContent}
          </div>
        )}
        
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
              zIndex: isResizing ? 30 : 10,
              cursor: 'move',
              transition: isResizing ? 'none' : 'box-shadow 0.1s ease',
              boxShadow: isResizing ? '0 0 0 2px rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.15)' : 'none'
            }}
            onMouseDown={handleMove}
            onContextMenu={(e) => onContextMenu && onContextMenu(e, date, parseInt(schedule.startTime.split(':')[0]), employee?.id || null)}
            id={`schedule-entry-${date}-${schedule.shift}-${employee?.id}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, schedule)}
          >
            <div className="flex items-center space-x-2 text-xs overflow-hidden">
              <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {schedule.shift === 'manual' ? 'Horario manual' : (getScheduleInfo()?.isLicense ? getScheduleInfo()?.shiftInfo?.label : `${schedule.shift}`)}
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
            onContextMenu={handleContextMenuDefault}
          />
        )}
        
        {schedule?.actualExitTime && (
          <div 
            className="absolute top-0 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2"
            style={{ 
              left: `${((parseInt(schedule.actualExitTime.split(':')[0]) - startHour + 
                      (parseInt(schedule.actualExitTime.split(':')[1] || '0') / 60)) / totalHours) * 100}%`,
              zIndex: 20
            }}
            title={`Salida: ${schedule.actualExitTime}`}
            onContextMenu={handleContextMenuDefault}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default DayRow;