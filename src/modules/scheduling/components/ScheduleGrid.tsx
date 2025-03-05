import React from 'react';
import { Employee, WorkShift, License, ScheduleEntry, DragInfo } from '../interfaces/types';
import DayRow from './DayRow';
import TimeSlotHeader from './TimeSlotHeader';

interface ScheduleGridProps {
  employee: Employee | null;
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
  // Horarios mostrados en la cuadrícula (horas de 6:00 a 20:00)
  const startHour = 5;
  const endHour = 19;

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

  // Manejadores para arrastrar y soltar
  const handleMouseDown = (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const isRightEdge = e.clientX - rect.left > rect.width - 10;
    const isLeftEdge = e.clientX - rect.left < 10;

    if (isRightEdge || isLeftEdge) {
      setDragInfo({
        isResizing: true,
        isStartHandle: isLeftEdge,
        startX: e.clientX,
        initialLeft: rect.left,
        initialWidth: rect.width,
        scheduleEntry
      });
      
      // Agregar clase para el elemento que se está arrastrando
      const element = e.currentTarget as HTMLElement;
      element.classList.add('dragging');
    } else {
      setDragInfo({
        isResizing: false,
        startX: e.clientX,
        initialLeft: rect.left,
        initialWidth: rect.width,
        scheduleEntry
      });
      
      // Agregar clase para el elemento que se está arrastrando
      const element = e.currentTarget as HTMLElement;
      element.classList.add('dragging');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragInfo || !dragInfo.scheduleEntry) return;

    const gridRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cellWidth = gridRect.width / (endHour - startHour);
    
    // Actualizar la posición del elemento en tiempo real
    const element = document.querySelector('.dragging') as HTMLElement;
    if (element) {
      if (dragInfo.isResizing) {
        if (dragInfo.isStartHandle) {
          const diff = e.clientX - dragInfo.startX;
          const newLeft = Math.max(0, dragInfo.initialLeft + diff - gridRect.left);
          const hour = startHour + Math.floor(newLeft / cellWidth);
          const endHour = parseInt(dragInfo.scheduleEntry.endTime);
          
          if (hour < endHour) {
            element.style.left = `${(hour - startHour) * (100 / (endHour - startHour))}%`;
            element.style.width = `${(endHour - hour) * (100 / (endHour - startHour))}%`;
            dragInfo.scheduleEntry.startTime = `${hour.toString().padStart(2, '0')}:00`;
          }
        } else {
          const diff = e.clientX - dragInfo.startX;
          const newWidth = Math.max(cellWidth, dragInfo.initialWidth + diff);
          const hours = Math.round(newWidth / cellWidth);
          const startHour = parseInt(dragInfo.scheduleEntry.startTime);
          
          element.style.width = `${hours * (100 / (endHour - startHour))}%`;
          dragInfo.scheduleEntry.endTime = `${(startHour + hours).toString().padStart(2, '0')}:00`;
        }
      } else {
        const diff = e.clientX - dragInfo.startX;
        const cells = Math.round(diff / cellWidth);
        const newLeft = dragInfo.initialLeft + (cells * cellWidth);
        const hour = startHour + Math.floor((newLeft - gridRect.left) / cellWidth);
        const duration = parseInt(dragInfo.scheduleEntry.endTime) - parseInt(dragInfo.scheduleEntry.startTime);
        
        element.style.left = `${(hour - startHour) * (100 / (endHour - startHour))}%`;
        dragInfo.scheduleEntry.startTime = `${hour.toString().padStart(2, '0')}:00`;
        dragInfo.scheduleEntry.endTime = `${(hour + duration).toString().padStart(2, '0')}:00`;
      }
    }
  };

  const handleMouseUp = () => {
    // Remover clase de arrastre
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement) {
      draggingElement.classList.remove('dragging');
    }
    setDragInfo(null);
  };

  if (!employee) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Seleccione un empleado para ver su horario</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg mr-4 flex-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;