import React from 'react';
import { ScheduleEntry, WorkShift, License } from '../interfaces/types';

interface ScheduleEntryComponentProps {
  schedule: ScheduleEntry;
  workShifts: WorkShift[];
  licenses: License[];
  onMouseDown: (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => void;
}

const ScheduleEntryComponent: React.FC<ScheduleEntryComponentProps> = ({ 
  schedule, 
  workShifts, 
  licenses,
  onMouseDown 
}) => {
  // Determinar si es un turno de trabajo o una licencia
  const isLicense = licenses.some(l => l.code === schedule.shift);
  const shiftInfo = isLicense 
    ? licenses.find(l => l.code === schedule.shift) 
    : workShifts.find(s => s.id === schedule.shift);

  // Si no hay hora de inicio/fin (como en el caso de licencias), usar horario completo
  const startTimeHour = schedule.startTime 
    ? parseInt(schedule.startTime.split(':')[0]) 
    : 5;
    
  const endTimeHour = schedule.endTime 
    ? parseInt(schedule.endTime.split(':')[0]) 
    : 19;

  const statusIndicator = () => {
    if (!schedule.status) return null;
    
    let statusClass = '';
    let statusIcon = '';
    
    switch(schedule.status) {
      case 'onTime':
        statusClass = 'bg-green-600';
        statusIcon = '✓';
        break;
      case 'late':
        statusClass = 'bg-orange-600';
        statusIcon = '!';
        break;
      case 'early':
        statusClass = 'bg-yellow-600';
        statusIcon = '↑';
        break;
      case 'absent':
        statusClass = 'bg-red-600';
        statusIcon = '✗';
        break;
      default:
        return null;
    }
    
    return (
      <div className={`absolute -top-2 -right-2 w-5 h-5 ${statusClass} rounded-full flex items-center justify-center text-white text-xs`}>
        {statusIcon}
      </div>
    );
  };

  return (
    <div
      className={`absolute inset-y-0 m-1 rounded flex items-center px-2 cursor-move ${shiftInfo?.color}`}
      style={{
        left: `${((startTimeHour - 5) / 13) * 100}%`,
        width: `${((endTimeHour - startTimeHour) / 13) * 100}%`
      }}
      onMouseDown={(e) => onMouseDown(e, schedule)}
    >
      <div className="flex items-center space-x-2 text-xs">
        <span>{isLicense ? shiftInfo?.label : `Turno ${schedule.shift}`}</span>
        {schedule.startTime && schedule.endTime && (
          <>
            <span>•</span>
            <span>{schedule.startTime} - {schedule.endTime}</span>
          </>
        )}
      </div>
      
      {statusIndicator()}
      
      {/* Manijas para redimensionar */}
      <div className="absolute inset-y-0 left-0 w-2 cursor-w-resize" />
      <div className="absolute inset-y-0 right-0 w-2 cursor-e-resize" />
    </div>
  );
};

export default ScheduleEntryComponent;