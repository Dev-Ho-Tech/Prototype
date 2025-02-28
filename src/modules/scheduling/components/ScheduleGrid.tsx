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
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  employee,
  selectedDate,
  // selectedPeriod,
  workShifts,
  licenses,
  dragInfo,
  setDragInfo
}) => {
  // Horarios mostrados en la cuadrícula (horas de 6:00 a 20:00)
  const startHour = 5;
  const endHour = 19;

  // Calcular los días de la semana para la fecha seleccionada
  const getWeekDays = () => {
    const date = new Date(selectedDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para que la semana comience el lunes
    
    const monday = new Date(date.setDate(diff));
    
    const days = [
      { name: 'Lunes', date: new Date(monday) },
      { name: 'Martes', date: new Date(monday.setDate(monday.getDate() + 1)) },
      { name: 'Miércoles', date: new Date(monday.setDate(monday.getDate() + 1)) },
      { name: 'Jueves', date: new Date(monday.setDate(monday.getDate() + 1)) },
      { name: 'Viernes', date: new Date(monday.setDate(monday.getDate() + 1)) },
      { name: 'Sábado', date: new Date(monday.setDate(monday.getDate() + 1)) },
      { name: 'Domingo', date: new Date(monday.setDate(monday.getDate() + 1)) }
    ];
    
    return days.map(day => ({
      name: day.name,
      date: day.date.toISOString().split('T')[0]
    }));
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