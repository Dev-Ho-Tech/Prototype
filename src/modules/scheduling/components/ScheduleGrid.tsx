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
  endDate
}) => {
  // Rango de horas visible (5:00 AM hasta 11:00 PM)
  const startHour = 5;
  const endHour = 23;
  
  // Referencia al contenedor de la cuadrícula para calcular posiciones
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Estado para almacenar el ancho de cada celda de hora (para cálculos precisos)
  const [cellWidth, setCellWidth] = useState(0);
  
  // Agregar un estado para manejar el arrastre global del documento
  const [isDragging, setIsDragging] = useState(false);
  
  // Efecto para calcular el ancho de celda cuando el componente se monta o redimensiona
  useEffect(() => {
    const updateCellWidth = () => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.getBoundingClientRect().width - 80; // Restar el ancho de la columna de días
        const totalColumns = endHour - startHour + 1;
        setCellWidth(gridWidth / totalColumns);
      }
    };
    
    // Actualizar inicialmente
    updateCellWidth();
    
    // Actualizar en caso de redimensionamiento
    window.addEventListener('resize', updateCellWidth);
    return () => window.removeEventListener('resize', updateCellWidth);
  }, [endHour, startHour]);
  
  // Efecto para manejar el arrastre global
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (dragInfo && isDragging) {
          handleMouseMoveEvent(e);
        }
      };
      
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
        handleMouseUpEvent();
      };
      
      // Agregar eventos globales durante el arrastre
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragInfo]);

  // Calcular los días de la semana para la fecha seleccionada
  const getWeekDays = () => {
    // Si estamos en modo "Seleccionar fechas", calcular los días basados en el rango
    if (selectedPeriod === 'Seleccionar fechas' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = [];
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      // Limitar el número de días mostrados (para evitar problemas de rendimiento)
      const maxDays = 30; // Mostrar máximo 30 días
      let count = 0;
      
      for (let d = new Date(start); d <= end && count < maxDays; d.setDate(d.getDate() + 1), count++) {
        days.push({
          name: dayNames[d.getDay()],
          date: new Date(d).toISOString().split('T')[0]
        });
      }
      
      return days;
    } else if (selectedPeriod === 'Diario') {
      // Para vista diaria, solo mostrar el día seleccionado
      const date = new Date(selectedDate);
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      return [{
        name: dayNames[date.getDay()],
        date: date.toISOString().split('T')[0]
      }];
    } else if (selectedPeriod === 'Mensual') {
      // Para vista mensual, mostrar todos los días del mes
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
      // Vista semanal (por defecto)
      const date = new Date(selectedDate);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para que la semana comience el lunes
      
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
      
      // Corregir el problema de las fechas
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
  };

  const weekDays = getWeekDays();

  // Función auxiliar para convertir posición del mouse a hora
  const getHourFromMousePosition = (clientX: number): number => {
    if (!gridRef.current) return startHour;
    
    const gridRect = gridRef.current.getBoundingClientRect();
    const offsetX = clientX - gridRect.left - 80; // Ajustar por el ancho de la columna de días
    const hourPosition = startHour + (offsetX / (gridRect.width - 80)) * (endHour - startHour + 1);
    
    // Redondear a la hora más cercana
    return Math.max(startHour, Math.min(endHour, Math.round(hourPosition)));
  };

  // Manejadores para arrastrar y soltar
  const handleMouseDown = (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => {
    if (!gridRef.current) return;
    
    // Marcar que estamos arrastrando
    setIsDragging(true);
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    
    // Detectar el tipo de acción basado en las marcas del horario
    const isResizingStart = scheduleEntry.isResizingStart;
    const isResizingEnd = scheduleEntry.isResizingEnd;
    const isMoving = scheduleEntry.isMoving || (!isResizingStart && !isResizingEnd);
    
    setDragInfo({
      isResizing: isResizingStart || isResizingEnd,
      isStartHandle: isResizingStart,
      startX: e.clientX,
      initialLeft: rect.left - gridRect.left,
      initialWidth: rect.width,
      scheduleEntry: {
        ...scheduleEntry,
        // Limpiar los indicadores para el siguiente evento
        isResizingStart: false,
        isResizingEnd: false,
        isMoving: false
      }
    });
    
    // Agregar clase para el elemento que se está arrastrando
    const element = e.currentTarget as HTMLElement;
    element.classList.add('dragging');
    
    // Cambiar cursor según la acción
    if (isResizingStart) {
      document.body.style.cursor = 'w-resize';
    } else if (isResizingEnd) {
      document.body.style.cursor = 'e-resize';
    } else {
      document.body.style.cursor = 'move';
    }
    
    // Evitar selección de texto durante el arrastre
    document.body.style.userSelect = 'none';
  };

  // Función para manejar el movimiento del mouse (puede ser llamada desde el efecto global)
  const handleMouseMoveEvent = (e: MouseEvent) => {
    if (!dragInfo || !dragInfo.scheduleEntry || !gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const totalColumns = endHour - startHour + 1;
    
    // Encontrar el elemento que se está arrastrando
    const element = document.querySelector('.dragging') as HTMLElement;
    if (!element) return;
    
    // Obtener los horarios actuales
    const startTimeHour = parseInt(dragInfo.scheduleEntry.startTime.split(':')[0]);
    const endTimeHour = parseInt(dragInfo.scheduleEntry.endTime.split(':')[0]);
    const duration = endTimeHour - startTimeHour;
    
    if (dragInfo.isResizing) {
      if (dragInfo.isStartHandle) {
        // Redimensionar desde el inicio (izquierda)
        // Convertir posición del mouse a hora
        const newStartHour = getHourFromMousePosition(e.clientX);
        
        // Asegurarse de que la hora de inicio no supere la hora de fin menos 1
        if (newStartHour < endTimeHour) {
          // Actualizar el elemento visualmente
          const newLeftPercent = ((newStartHour - startHour) / totalColumns) * 100;
          const newWidth = ((endTimeHour - newStartHour) / totalColumns) * 100;
          
          element.style.left = `${newLeftPercent}%`;
          element.style.width = `${newWidth}%`;
          
          // Actualizar el horario
          dragInfo.scheduleEntry.startTime = `${newStartHour.toString().padStart(2, '0')}:00`;
        }
      } else {
        // Redimensionar desde el fin (derecha)
        // Convertir posición del mouse a hora
        const newEndHour = getHourFromMousePosition(e.clientX);
        
        // Asegurarse de que la hora de fin no sea menor que la hora de inicio más 1
        // y que no exceda el límite de la cuadrícula
        if (newEndHour > startTimeHour && newEndHour <= endHour) {
          // Actualizar el elemento visualmente
          const newWidth = ((newEndHour - startTimeHour) / totalColumns) * 100;
          element.style.width = `${newWidth}%`;
          
          // Actualizar el horario
          dragInfo.scheduleEntry.endTime = `${newEndHour.toString().padStart(2, '0')}:00`;
        }
      }
    } else {
      // Mover el elemento completo
      // Convertir posición del mouse a hora
      const newStartHour = getHourFromMousePosition(e.clientX) - Math.floor(duration / 2);
      
      // Asegurarse de que el evento permanezca dentro del rango visible
      const adjustedStartHour = Math.max(startHour, Math.min(endHour - duration, newStartHour));
      const adjustedEndHour = adjustedStartHour + duration;
      
      // Actualizar posición visual
      const newLeftPercent = ((adjustedStartHour - startHour) / totalColumns) * 100;
      element.style.left = `${newLeftPercent}%`;
      
      // Actualizar horario
      dragInfo.scheduleEntry.startTime = `${adjustedStartHour.toString().padStart(2, '0')}:00`;
      dragInfo.scheduleEntry.endTime = `${adjustedEndHour.toString().padStart(2, '0')}:00`;
    }
  };
  
  // Sobrecarga para el evento de React (llama a la función principal)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && dragInfo) {
      handleMouseMoveEvent(e.nativeEvent);
    }
  };

  // Función para manejar cuando se suelta el mouse
  const handleMouseUpEvent = () => {
    // Remover clase de arrastre
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement) {
      draggingElement.classList.remove('dragging');
    }
    
    // Restaurar estilos del cursor y selección
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
    
    setDragInfo(null);
    setIsDragging(false);
  };
  
  // Sobrecarga para el evento de React
  const handleMouseUp = () => {
    handleMouseUpEvent();
  };

  // Si no hay empleado seleccionado, mostrar mensaje
  if (!employee) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Seleccione un empleado para ver su horario</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg mr-4 flex-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200" ref={gridRef}>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;