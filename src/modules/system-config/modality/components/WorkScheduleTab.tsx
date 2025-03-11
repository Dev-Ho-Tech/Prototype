import React from 'react';
import { WorkShift } from '../interfaces/WorkShift';
import { TimeSelector } from './shifts/TimeSelector';
import { hours, minutes, ampm } from '../temp/workShiftsData';

interface WorkScheduleTabProps {
  workShift: WorkShift;
  onChange: (updatedValues: Partial<WorkShift>) => void;
}

export const WorkScheduleTab: React.FC<WorkScheduleTabProps> = ({ workShift, onChange }) => {
  // Parsear los tiempos de inicio y fin
  const parseTime = (timeString: string) => {
    const parts = timeString.split(' ');
    const timeParts = parts[0].split(':');
    return {
      hour: timeParts[0],
      minute: timeParts[1],
      ampm: parts[1]
    };
  };

  const startTime = parseTime(workShift.startTime);
  const endTime = parseTime(workShift.endTime);

  const handleStartHourChange = (value: string) => {
    onChange({
      startTime: `${value}:${startTime.minute} ${startTime.ampm}`
    });
  };

  const handleStartMinuteChange = (value: string) => {
    onChange({
      startTime: `${startTime.hour}:${value} ${startTime.ampm}`
    });
  };

  const handleStartAmPmChange = (value: string) => {
    onChange({
      startTime: `${startTime.hour}:${startTime.minute} ${value}`
    });
  };

  const handleEndHourChange = (value: string) => {
    onChange({
      endTime: `${value}:${endTime.minute} ${endTime.ampm}`
    });
  };

  const handleEndMinuteChange = (value: string) => {
    onChange({
      endTime: `${endTime.hour}:${value} ${endTime.ampm}`
    });
  };

  const handleEndAmPmChange = (value: string) => {
    onChange({
      endTime: `${endTime.hour}:${endTime.minute} ${value}`
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="mb-8">
        <h2 className="text-lg font-medium flex items-center text-gray-800">
          <span className="flex items-center justify-center bg-indigo-100 w-8 h-8 rounded-full mr-2">
            <span className="text-indigo-600">2</span>
          </span>
          Configuración Horaria
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Inicio de jornada de trabajo
          </label>
          <TimeSelector
            hours={hours}
            minutes={minutes}
            ampm={ampm}
            selectedHour={startTime.hour}
            selectedMinute={startTime.minute}
            selectedAmPm={startTime.ampm}
            onHourChange={handleStartHourChange}
            onMinuteChange={handleStartMinuteChange}
            onAmPmChange={handleStartAmPmChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Fin de jornada de trabajo
          </label>
          <TimeSelector
            hours={hours}
            minutes={minutes}
            ampm={ampm}
            selectedHour={endTime.hour}
            selectedMinute={endTime.minute}
            selectedAmPm={endTime.ampm}
            onHourChange={handleEndHourChange}
            onMinuteChange={handleEndMinuteChange}
            onAmPmChange={handleEndAmPmChange}
          />
        </div>
      </div>
    </div>
  );
};