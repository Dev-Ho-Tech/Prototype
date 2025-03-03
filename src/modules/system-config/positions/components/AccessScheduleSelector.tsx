import React from 'react';
import { Clock } from 'lucide-react';
import { AccessSchedule } from '../interfaces/types';

interface AccessScheduleProps {
  schedules: AccessSchedule[];
  selectedScheduleId: string | undefined;
  onScheduleSelect: (scheduleId: string) => void;
}

export const AccessScheduleSelector: React.FC<AccessScheduleProps> = ({
  schedules,
  selectedScheduleId,
  onScheduleSelect
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-blue-500" />
        Horario de acceso
      </h3>

      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <div 
            key={schedule.id}
            className={`p-4 border rounded-md cursor-pointer transition-colors
              ${selectedScheduleId === schedule.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => onScheduleSelect(schedule.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {schedule.timeStart} - {schedule.timeEnd}
                </p>
                <div className="flex flex-wrap mt-2">
                  {schedule.daysOfWeek.map((day) => (
                    <span key={day} className="mr-2 mb-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className={`w-5 h-5 rounded-full ${
                  selectedScheduleId === schedule.id 
                    ? 'bg-blue-500 border-2 border-blue-200' 
                    : 'border-2 border-gray-300'
                }`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};