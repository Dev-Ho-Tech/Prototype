import React, { useState, useRef, useEffect } from 'react';
import { Clock, MapPin, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { Employee } from '../../../../types';

interface ScheduleGridProps {
  currentDate: Date;
  selectedEmployee: Employee;
  onShowDetails: () => void;
  viewMode: 'calendar' | 'timeline';
}

interface DragState {
  isDragging: boolean;
  isResizing: boolean;
  isStartHandle: boolean;
  startX: number;
  initialLeft: number;
  initialWidth: number;
  dayIndex: number;
  scheduleEntry: any;
}

export function ScheduleGrid({ currentDate, selectedEmployee, onShowDetails, viewMode }: ScheduleGridProps) {
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);
  const gridRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    dayIndex: number;
  } | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    startTime: '09:00',
    endTime: '17:00',
    shift: 'M'
  });

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'M':
        return 'bg-amber-700 text-white';
      case 'D':
        return 'bg-red-100 text-red-500';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  const handleMouseDown = (e: React.MouseEvent, schedule: any, dayIndex: number, element: HTMLElement) => {
    if (e.button === 2) {
      e.preventDefault();
      return;
    }

    const rect = element.getBoundingClientRect();
    const isRightEdge = e.clientX - rect.left > rect.width - 10;
    const isLeftEdge = e.clientX - rect.left < 10;

    setDragState({
      isDragging: !isRightEdge && !isLeftEdge,
      isResizing: isRightEdge || isLeftEdge,
      isStartHandle: isLeftEdge,
      startX: e.clientX,
      initialLeft: rect.left,
      initialWidth: rect.width,
      dayIndex,
      scheduleEntry: schedule
    });

    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState || !gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const cellWidth = gridRect.width / 24;
    const element = e.target as HTMLElement;
    
    if (dragState.isResizing) {
      const diff = e.clientX - dragState.startX;
      if (dragState.isStartHandle) {
        const newLeft = Math.max(0, dragState.initialLeft + diff - gridRect.left);
        const hour = Math.floor(newLeft / cellWidth);
        const endHour = parseInt(dragState.scheduleEntry.endTime);
        
        if (hour < endHour) {
          element.style.left = `${hour * (100 / 24)}%`;
          element.style.width = `${(endHour - hour) * (100 / 24)}%`;
          dragState.scheduleEntry.startTime = `${hour.toString().padStart(2, '0')}:00`;
        }
      } else {
        const newWidth = Math.max(cellWidth, dragState.initialWidth + diff);
        const hours = Math.round(newWidth / cellWidth);
        const startHour = parseInt(dragState.scheduleEntry.startTime);
        
        element.style.width = `${hours * (100 / 24)}%`;
        dragState.scheduleEntry.endTime = `${(startHour + hours).toString().padStart(2, '0')}:00`;
      }
    } else {
      const diff = e.clientX - dragState.startX;
      const cells = Math.round(diff / cellWidth);
      const newLeft = dragState.initialLeft + (cells * cellWidth);
      const hour = Math.floor((newLeft - gridRect.left) / cellWidth);
      const duration = parseInt(dragState.scheduleEntry.endTime) - parseInt(dragState.scheduleEntry.startTime);
      
      element.style.left = `${hour * (100 / 24)}%`;
      dragState.scheduleEntry.startTime = `${hour.toString().padStart(2, '0')}:00`;
      dragState.scheduleEntry.endTime = `${(hour + duration).toString().padStart(2, '0')}:00`;
    }
  };

  const handleMouseUp = () => {
    if (!dragState) return;
    
    // Update the schedule with the new times
    const updatedSchedule = selectedEmployee.schedule.map(s => 
      s.date === dragState.scheduleEntry.date ? { ...s, ...dragState.scheduleEntry } : s
    );

    console.log('Updated schedule:', updatedSchedule);
    setDragState(null);
  };

  const handleContextMenu = (e: React.MouseEvent, dayIndex: number) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      dayIndex
    });
  };

  const handleAddSchedule = () => {
    if (!contextMenu) return;
    
    const date = new Date(currentDate);
    date.setDate(date.getDate() + contextMenu.dayIndex);
    
    const newEntry = {
      date: date.toISOString().split('T')[0],
      shift: newSchedule.shift,
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime
    };

    console.log('Adding new schedule:', newEntry);
    setContextMenu(null);
  };

  useEffect(() => {
    if (dragState) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenu && !(e.target as Element).closest('.context-menu')) {
        setContextMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu]);

  return (
    <div className="relative" ref={gridRef}>
      {/* Time slots header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="grid grid-cols-[100px,repeat(24,minmax(60px,1fr))]">
          <div className="p-2 border-r border-gray-200 bg-gray-50"></div>
          {timeSlots.map((hour) => (
            <div
              key={hour}
              className="p-2 text-center text-xs font-medium text-gray-500 border-r border-gray-200 bg-gray-50"
            >
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule grid */}
      <div className="relative">
        {weekDays.map((day, dayIndex) => {
          const date = new Date(currentDate);
          date.setDate(date.getDate() + dayIndex);
          const formattedDate = date.toISOString().split('T')[0];
          const schedule = selectedEmployee.schedule.find(s => s.date === formattedDate);

          return (
            <div
              key={day}
              className="grid grid-cols-[100px,repeat(24,minmax(60px,1fr))] border-b border-gray-200"
              onContextMenu={(e) => handleContextMenu(e, dayIndex)}
            >
              <div className="p-4 border-r border-gray-200 bg-gray-50">
                <div className="text-sm font-medium text-gray-900">{day}</div>
                <div className="text-xs text-gray-500">
                  {date.toLocaleDateString()}
                </div>
              </div>
              <div className="col-span-24 relative h-16 bg-gray-50">
                {schedule && schedule.shift !== 'D' && (
                  <div
                    className={`absolute top-2 bottom-2 rounded-lg shadow-sm cursor-move transition-all duration-150 ${getShiftColor(schedule.shift)}`}
                    style={{
                      left: `${(parseInt(schedule.startTime) / 24) * 100}%`,
                      width: `${((parseInt(schedule.endTime) - parseInt(schedule.startTime)) / 24) * 100}%`
                    }}
                    onMouseDown={(e) => handleMouseDown(e, schedule, dayIndex, e.currentTarget)}
                  >
                    <div className="absolute inset-0 px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Turno {schedule.shift}</span>
                        <span className="text-sm">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white opacity-50 cursor-w-resize hover:opacity-100 transition-opacity" />
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-50 cursor-e-resize hover:opacity-100 transition-opacity" />
                  </div>
                )}
                {schedule && schedule.shift === 'D' && (
                  <div className="absolute inset-2 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-red-500">DESCANSO</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Context Menu */}
      {contextMenu?.show && (
        <div
          className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hora de inicio
              </label>
              <input
                type="time"
                value={newSchedule.startTime}
                onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hora de fin
              </label>
              <input
                type="time"
                value={newSchedule.endTime}
                onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                value={newSchedule.shift}
                onChange={(e) => setNewSchedule({ ...newSchedule, shift: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="M">Turno M</option>
                <option value="D">Descanso</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setContextMenu(null)}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSchedule}
                className="px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}