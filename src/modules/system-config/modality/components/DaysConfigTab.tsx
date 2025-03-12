import React from 'react';
import { WorkShift, DayOfWeek } from '../interfaces/WorkShift';
import { DaySelector } from './shifts/DaySelector';
import { daysOfWeek, translateDay} from '../temp/workShiftsData';
import { Toggle } from './shifts/Toggle';
import { ChevronDown } from 'lucide-react';

interface DaysConfigTabProps {
  workShift: WorkShift;
  onChange: (updatedValues: Partial<WorkShift>) => void;
}

export const DaysConfigTab: React.FC<DaysConfigTabProps> = ({ workShift, onChange }) => {
  const handleDayToggle = (day: string, isActive: boolean) => {
    const updatedWorkDays = workShift.workDays.map(wd => 
      wd.day === day ? { ...wd, isActive } : wd
    );
    
    onChange({ workDays: updatedWorkDays });
  };

  const handleStartDayChange = (value: DayOfWeek) => {
    onChange({ startDayOfWeek: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mt-4">
      <div className="mb-8">
        <h2 className="text-lg font-medium flex items-center text-gray-800">
          <span className="flex items-center justify-center bg-indigo-100 w-8 h-8 rounded-full mr-2">
            <span className="text-indigo-600">3</span>
          </span>
          Configuración de Días
        </h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Días aplicables
        </label>
        <div className="flex flex-wrap gap-2">
          {workShift.workDays.map((workDay) => (
            <DaySelector
              key={workDay.day}
              day={workDay.day}
              label={translateDay(workDay.day)}
              isActive={workDay.isActive}
              onChange={handleDayToggle}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Día de inicio
          </label>
          <div className="relative">
            <select
              value={workShift.startDayOfWeek}
              onChange={(e) => handleStartDayChange(e.target.value as DayOfWeek)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Toggle
          label="¿Aplica en días festivos?"
          description="El turno se aplicará durante los días festivos"
          isChecked={workShift.applyOnHolidays}
          onChange={(checked) => onChange({ applyOnHolidays: checked })}
        />
        
        <Toggle
          label="¿Permite cruce de días?"
          description="El turno puede empezar un día y terminar el siguiente"
          isChecked={workShift.allowDayCrossing}
          onChange={(checked) => onChange({ allowDayCrossing: checked })}
        />
      </div>
    </div>
  );
};