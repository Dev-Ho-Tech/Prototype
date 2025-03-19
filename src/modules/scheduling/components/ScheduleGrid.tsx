import React, { useState, useEffect, useRef } from 'react';
import { WorkShift, License, ScheduleEntry, DragInfo } from '../interfaces/types';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';
import DayRow from './DayRow';
import TimeSlotHeader from './TimeSlotHeader';

interface ScheduleGridProps {
  employee: UnifiedEmployee | null;
  selectedDate: string;
  selectedPeriod: string;
  workShifts: WorkShift[];
  licenses: License[];
  dragInfo: DragInfo | null;
  setDragInfo: React.Dispatch<React.SetStateAction<DragInfo | null>>;
  startDate?: string;
  endDate?: string;
  timeStep?: number;
  onScheduleUpdate?: (updatedEntry: ScheduleEntry) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  employee,
  selectedDate,
  selectedPeriod,
  workShifts,
  licenses,
  dragInfo,
  setDragInfo,
  startDate,
  endDate,
  timeStep = 15,
  onScheduleUpdate
}) => {
  const startHour = 5;
  const endHour = 23;
  
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Estado para el tooltip
  const [tooltip, setTooltip] = useState({
    show: false,
    content: '',
    x: 0,
    y: 0
  });
  
  // Prevenir menú contextual (click derecho)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };
  
  // Efecto para manejar eventos globales durante redimensionado
  useEffect(() => {
    if (!isDragging || !dragInfo) return;
    
    console.log('[GRID] Configurando manejadores globales');
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      if (!gridRef.current) return;
      
      // Actualizar tooltip
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY - 30
      }));
      
      // Obtener elemento que se está redimensionando
      if (!dragInfo?.scheduleEntry) return;
      
      const dayDate = dragInfo.scheduleEntry.date;
      const shiftId = dragInfo.scheduleEntry.shift;
      const entryId = `schedule-entry-${dayDate}-${shiftId}`;
      const entryElement = document.getElementById(entryId);
      
      if (!entryElement) {
        console.log('[GRID] No se encontró el elemento:', entryId);
        return;
      }
      
      // Obtener dimensiones
      const gridRect = gridRef.current.getBoundingClientRect();
      const totalWidth = gridRect.width - 80; // Restar ancho de columna de días
      const totalHours = endHour - startHour;
      
      // Parsear horarios actuales
      const startTimeParts = dragInfo.scheduleEntry.startTime.split(':');
      const endTimeParts = dragInfo.scheduleEntry.endTime.split(':');
      
      const startTimeHour = parseInt(startTimeParts[0]);
      const startTimeMinutes = parseInt(startTimeParts[1] || '0');
      const endTimeHour = parseInt(endTimeParts[0]);
      const endTimeMinutes = parseInt(endTimeParts[1] || '0');
      
      // Obtener posición del mouse relativa a la cuadrícula
      const offsetX = e.clientX - gridRect.left - 80;
      
      // Factor de reducción de sensibilidad (0.5 = mitad de sensible)
      const sensitivityFactor = 0.6;
      
      // Aplicar el factor de sensibilidad para reducir los cambios
      // Calculamos el movimiento relativo al punto inicial y lo reducimos
      const relativeMovement = e.clientX - dragInfo.startX;
      const adjustedMovement = relativeMovement * sensitivityFactor;
      const adjustedClientX = dragInfo.startX + adjustedMovement;
      
      // Recalcular offsetX con la posición ajustada
      const adjustedOffsetX = adjustedClientX - gridRect.left - 80;
      
      // Calcular la hora usando el movimiento ajustado
      const hourDecimal = startHour + (adjustedOffsetX / totalWidth) * totalHours;
      
      // Calcular hora y minutos con snap a incrementos
      const hour = Math.floor(hourDecimal);
      let minutes = Math.floor((hourDecimal - hour) * 60);
      minutes = Math.round(minutes / timeStep) * timeStep;
      
      const newHour = Math.max(startHour, Math.min(endHour, minutes === 60 ? hour + 1 : hour));
      const newMinutes = minutes === 60 ? 0 : minutes;
      
      // Calcular duración actual en minutos
      const durationMinutes = 
        (endTimeHour * 60 + endTimeMinutes) - 
        (startTimeHour * 60 + startTimeMinutes);
      
      // Aplicar cambios según el tipo de operación
      if (dragInfo.isResizing) {
        if (dragInfo.isStartHandle) {
          // Redimensionar desde la izquierda
          const newStartTimeMinutesTotal = newHour * 60 + newMinutes;
          const endTimeMinutesTotal = endTimeHour * 60 + endTimeMinutes;
          
          // Asegurar duración mínima (30 min)
          if (newStartTimeMinutesTotal < endTimeMinutesTotal - 30) {
            // Calcular nueva posición y ancho
            const newStartHourDecimal = newHour + (newMinutes / 60);
            const newLeftPercent = ((newStartHourDecimal - startHour) / totalHours) * 100;
            const newEndHourDecimal = endTimeHour + (endTimeMinutes / 60);
            const newWidth = ((newEndHourDecimal - newStartHourDecimal) / totalHours) * 100;
            
            // Aplicar cambios
            console.log('[GRID] Redimensionando izquierda:', { 
              left: newLeftPercent, 
              width: newWidth,
              newTime: `${newHour}:${newMinutes}`
            });
            
            entryElement.style.left = `${newLeftPercent}%`;
            entryElement.style.width = `${newWidth}%`;
            
            // Actualizar horario
            const formattedNewTime = `${newHour.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
            dragInfo.scheduleEntry.startTime = formattedNewTime;
            
            // Actualizar tooltip
            setTooltip(prev => ({
              ...prev,
              content: `${formattedNewTime} - ${dragInfo.scheduleEntry.endTime}`
            }));
          }
        } else {
          // Redimensionar desde la derecha
          const startTimeMinutesTotal = startTimeHour * 60 + startTimeMinutes;
          const newEndTimeMinutesTotal = newHour * 60 + newMinutes;
          
          // Asegurar duración mínima (30 min)
          if (newEndTimeMinutesTotal > startTimeMinutesTotal + 30 && newHour <= endHour) {
            // Calcular nuevo ancho
            const startHourDecimal = startTimeHour + (startTimeMinutes / 60);
            const newEndHourDecimal = newHour + (newMinutes / 60);
            const newWidth = ((newEndHourDecimal - startHourDecimal) / totalHours) * 100;
            
            // Aplicar cambios
            console.log('[GRID] Redimensionando derecha:', { 
              width: newWidth,
              newTime: `${newHour}:${newMinutes}`
            });
            
            entryElement.style.width = `${newWidth}%`;
            
            // Actualizar horario
            const formattedNewTime = `${newHour.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
            dragInfo.scheduleEntry.endTime = formattedNewTime;
            
            // Actualizar tooltip
            setTooltip(prev => ({
              ...prev,
              content: `${dragInfo.scheduleEntry.startTime} - ${formattedNewTime}`
            }));
          }
        }
      } else {
        // Mover evento completo con sensibilidad reducida
        // Ajustar posición para centrar en el mouse
        const eventMouseOffset = dragInfo.initialWidth / 2;
        const adjustedOffsetX = adjustedOffsetX - eventMouseOffset;
        const adjustedHourDecimal = startHour + (adjustedOffsetX / totalWidth) * totalHours;
        
        // Calcular nueva hora de inicio con snap a incrementos
        const adjustedHour = Math.floor(adjustedHourDecimal);
        let adjustedMinutes = Math.floor((adjustedHourDecimal - adjustedHour) * 60);
        adjustedMinutes = Math.round(adjustedMinutes / timeStep) * timeStep;
        
        const newStartHour = Math.max(startHour, adjustedHour);
        const newStartMinutes = adjustedMinutes === 60 ? 0 : adjustedMinutes;
        
        // Calcular nueva hora de fin basada en la duración original
        let newEndHour = newStartHour + Math.floor(durationMinutes / 60);
        let newEndMinutes = newStartMinutes + (durationMinutes % 60);
        
        if (newEndMinutes >= 60) {
          newEndHour += 1;
          newEndMinutes -= 60;
        }
        
        // Verificar límites
        if (newStartHour >= startHour && newEndHour <= endHour) {
          // Calcular nueva posición
          const newStartHourDecimal = newStartHour + (newStartMinutes / 60);
          const newLeftPercent = ((newStartHourDecimal - startHour) / totalHours) * 100;
          
          // Aplicar cambios
          console.log('[GRID] Moviendo:', { 
            left: newLeftPercent,
            newStart: `${newStartHour}:${newStartMinutes}`,
            newEnd: `${newEndHour}:${newEndMinutes}`
          });
          
          entryElement.style.left = `${newLeftPercent}%`;
          
          // Actualizar horario
          const formattedStartTime = `${newStartHour.toString().padStart(2, '0')}:${newStartMinutes.toString().padStart(2, '0')}`;
          const formattedEndTime = `${newEndHour.toString().padStart(2, '0')}:${newEndMinutes.toString().padStart(2, '0')}`;
          
          dragInfo.scheduleEntry.startTime = formattedStartTime;
          dragInfo.scheduleEntry.endTime = formattedEndTime;
          
          // Actualizar tooltip
          setTooltip(prev => ({
            ...prev,
            content: `${formattedStartTime} - ${formattedEndTime}`
          }));
        }
      }
    };
    
    const handleGlobalMouseUp = (e: MouseEvent) => {
      console.log('[GRID] Finalizando operación');
      
      if (dragInfo?.scheduleEntry && onScheduleUpdate) {
        console.log('[GRID] Notificando actualización:', dragInfo.scheduleEntry);
        onScheduleUpdate(dragInfo.scheduleEntry);
      }
      
      // Limpiar
      setIsDragging(false);
      setDragInfo(null);
      setTooltip(prev => ({ ...prev, show: false }));
      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
    };
    
    // Agregar listeners globales
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragInfo, timeStep, startHour, endHour, onScheduleUpdate]);

  // Calcular los días de la semana para la fecha seleccionada
  const weekDays = React.useMemo(() => {
    if (selectedPeriod === 'Seleccionar fechas' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = [];
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      const maxDays = 30;
      let count = 0;
      
      for (let d = new Date(start); d <= end && count < maxDays; d.setDate(d.getDate() + 1), count++) {
        days.push({
          name: dayNames[d.getDay()],
          date: new Date(d).toISOString().split('T')[0]
        });
      }
      
      return days;
    } else if (selectedPeriod === 'Diario') {
      const date = new Date(selectedDate);
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      return [{
        name: dayNames[date.getDay()],
        date: date.toISOString().split('T')[0]
      }];
    } else if (selectedPeriod === 'Mensual') {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        days.push({
          name: dayNames[d.getDay()],
          date: new Date(d).toISOString().split('T')[0]
        });
      }
      
      return days;
    } else {
      const date = new Date(selectedDate);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      
      const monday = new Date(date.setDate(diff));
      
      const days = [
        { name: 'Lunes', date: new Date(monday) },
        { name: 'Martes', date: new Date(monday) },
        { name: 'Miércoles', date: new Date(monday) },
        { name: 'Jueves', date: new Date(monday) },
        { name: 'Viernes', date: new Date(monday) },
        { name: 'Sábado', date: new Date(monday) },
        { name: 'Domingo', date: new Date(monday) }
      ];
      
      days[0].date = new Date(monday);
      for (let i = 1; i < days.length; i++) {
        const newDate = new Date(days[i-1].date);
        newDate.setDate(newDate.getDate() + 1);
        days[i].date = newDate;
      }
      
      return days.map(day => ({
        name: day.name,
        date: day.date.toISOString().split('T')[0]
      }));
    }
  }, [selectedPeriod, selectedDate, startDate, endDate]);

  // Iniciar operación de redimensionado
  const handleMouseDown = (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => {
    // Solo procesar click izquierdo (e.button === 0)
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('[GRID] Iniciando operación:', scheduleEntry);
    
    if (!gridRef.current) return;
    
    // Obtener dimensiones
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    
    // Configurar estado de arrastre
    setDragInfo({
      isResizing: scheduleEntry.isResizingStart || scheduleEntry.isResizingEnd,
      isStartHandle: scheduleEntry.isResizingStart,
      startX: e.clientX,
      initialLeft: rect.left - gridRect.left,
      initialWidth: rect.width,
      scheduleEntry: {
        ...scheduleEntry
      }
    });
    
    // Configurar tooltip
    const startParts = scheduleEntry.startTime.split(':');
    const endParts = scheduleEntry.endTime.split(':');
    
    const startTimeFormatted = `${startParts[0].padStart(2, '0')}:${(startParts[1] || '00').padStart(2, '0')}`;
    const endTimeFormatted = `${endParts[0].padStart(2, '0')}:${(endParts[1] || '00').padStart(2, '0')}`;
    
    setTooltip({
      show: true,
      content: `${startTimeFormatted} - ${endTimeFormatted}`,
      x: e.clientX,
      y: e.clientY - 30
    });
    
    // Ajustar cursor según tipo de operación
    if (scheduleEntry.isResizingStart) {
      document.body.style.cursor = 'w-resize';
    } else if (scheduleEntry.isResizingEnd) {
      document.body.style.cursor = 'e-resize';
    } else {
      document.body.style.cursor = 'move';
    }
    
    document.body.style.userSelect = 'none';
    setIsDragging(true);
  };

  // Actualizar posición del tooltip durante el movimiento
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && tooltip.show) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY - 30
      }));
    }
  };

  // Finalizar operación
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    console.log('[GRID] Finalizando operación (evento de React)');
    
    if (dragInfo?.scheduleEntry && onScheduleUpdate) {
      console.log('[GRID] Notificando actualización:', dragInfo.scheduleEntry);
      onScheduleUpdate(dragInfo.scheduleEntry);
    }
    
    setIsDragging(false);
    setDragInfo(null);
    setTooltip(prev => ({ ...prev, show: false }));
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
  };

  if (!employee) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Seleccione un empleado para ver su horario</p>
      </div>
    );
  }

  return (
    <div 
      className="overflow-auto rounded-lg mr-4 flex-1 relative"
      onContextMenu={handleContextMenu}
    >
      {tooltip.show && (
        <div 
          className="fixed bg-gray-800 text-white px-2 py-1 text-xs rounded z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltip.content}
        </div>
      )}
    
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200" 
        ref={gridRef}
        onContextMenu={handleContextMenu}
      >
        <div className="grid grid-cols-[auto,1fr]">
          <div className="w-20 rounded-tl-lg bg-gray-50 border-r border-gray-200"></div>
          <TimeSlotHeader startHour={startHour} endHour={endHour} />

          {weekDays.map((day) => (
            <DayRow
              key={day.date}
              day={day.name}
              date={day.date}
              employee={employee}
              workShifts={workShifts}
              licenses={licenses}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              startHour={startHour}
              endHour={endHour}
              timeStep={timeStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;