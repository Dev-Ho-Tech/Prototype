import React from 'react';
import { Employee, ScheduleEntry, WorkShift, License } from '../interfaces/types';
import ScheduleEntryComponent from './ScheduleEntryComponent';

interface DayRowProps {
  day: string;
  date: string;
  employee: Employee | null;
  workShifts: WorkShift[];
  licenses: License[];
  onMouseDown: (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
}

const DayRow: React.FC<DayRowProps> = ({ 
  day, 
  date, 
  employee, 
  workShifts, 
  licenses,
  onMouseDown,
  onMouseMove,
  onMouseUp
}) => {
  // Formatear fecha para mostrar MM/DD
  const formattedShortDate = date.split('-').slice(1).join('/');
  
  // Encontrar el horario del empleado para este día
  const schedule = employee?.schedule.find(s => s.date === date);

  return (
    <React.Fragment>
      <div className="w-20 px-2 py-3 text-xs border-t border-gray-200 bg-gray-50">
        <div className="font-medium">{day}</div>
        <div className="text-gray-500">{formattedShortDate}</div>
      </div>
      <div 
        className="relative border-t border-gray-200 grid grid-cols-[repeat(13,minmax(80px,1fr))]"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {schedule && (
          <ScheduleEntryComponent 
            schedule={schedule}
            workShifts={workShifts}
            licenses={licenses}
            onMouseDown={onMouseDown}
          />
        )}
        
        {/* Marcajes biométricos (si existen) */}
        {schedule?.actualEntryTime && (
          <div 
            className="absolute top-0 w-2 h-2 bg-green-500 rounded-full transform -translate-y-1/2"
            style={{ 
              left: `${((parseInt(schedule.actualEntryTime.split(':')[0]) - 5) / 13) * 100}%`,
            }}
            title={`Entrada: ${schedule.actualEntryTime}`}
          />
        )}
        
        {schedule?.actualExitTime && (
          <div 
            className="absolute top-0 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2"
            style={{ 
              left: `${((parseInt(schedule.actualExitTime.split(':')[0]) - 5) / 13) * 100}%`,
            }}
            title={`Salida: ${schedule.actualExitTime}`}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default DayRow;