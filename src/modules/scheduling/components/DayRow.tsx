import React from 'react';
import { ScheduleEntry, WorkShift, License } from '../interfaces/types';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';
import ScheduleEntryComponent from './ScheduleEntryComponent';

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
}

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
  endHour
}) => {
  // Formatear fecha para mostrar MM/DD
  const formattedShortDate = date.split('-').slice(1).join('/');
  
  // Encontrar el horario del empleado para este día
  const schedule = employee?.schedule?.find(s => s.date === date);

  // Calcular la cantidad de columnas para el grid
  const totalColumns = endHour - startHour + 1;

  // Crear celdas con el color de fondo correcto
  const cells = Array.from({ length: totalColumns }).map((_, index) => {
    const hour = startHour + index;
    const isEveningHour = hour >= 19; // Después de 7 PM
    
    return (
      <div 
        key={index} 
        className={`h-full min-h-[50px] ${isEveningHour ? 'bg-white' : ''}`}
      ></div>
    );
  });

  return (
    <React.Fragment>
      <div className="w-20 px-2 py-3 text-xs border-t border-gray-200 bg-gray-50">
        <div className="font-medium">{day}</div>
        <div className="text-gray-500">{formattedShortDate}</div>
      </div>
      <div 
        className={`relative border-t border-gray-200 grid divide-x divide-gray-200`}
        style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(80px, 1fr))` }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* Celdas con el color de fondo correcto */}
        {cells}
        
        {/* Sobreponemos el componente de horario */}
        {schedule && (
          <ScheduleEntryComponent 
            schedule={schedule}
            workShifts={workShifts}
            licenses={licenses}
            onMouseDown={onMouseDown}
            startHour={startHour}
            endHour={endHour}
          />
        )}
        
        {/* Marcajes biométricos */}
        {schedule?.actualEntryTime && (
          <div 
            className="absolute top-0 w-3 h-3 bg-green-500 rounded-full transform -translate-y-1/2"
            style={{ 
              left: `${((parseInt(schedule.actualEntryTime.split(':')[0]) - startHour) / totalColumns) * 100}%`,
              zIndex: 20
            }}
            title={`Entrada: ${schedule.actualEntryTime}`}
          />
        )}
        
        {schedule?.actualExitTime && (
          <div 
            className="absolute top-0 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2"
            style={{ 
              left: `${((parseInt(schedule.actualExitTime.split(':')[0]) - startHour) / totalColumns) * 100}%`,
              zIndex: 20
            }}
            title={`Salida: ${schedule.actualExitTime}`}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default DayRow;