import React from 'react';
import { WorkShift } from '../interfaces/types';

interface ShiftLegendProps {
  workShifts: WorkShift[];
  visible: boolean;
}

const ShiftLegend: React.FC<ShiftLegendProps> = ({ workShifts, visible }) => {
  if (!visible) return null;

  return (
    <div className="flex-1 border bg-white p-4 rounded-lg mb-4 mr-4 shadow-sm">
      <h4 className="text-md font-medium text-gray-900 mb-4">Turnos de trabajo</h4>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {workShifts.map(shift => (
          <div
            key={shift.id}
            className="flex items-center space-x-2 text-sm mb-2"
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${shift.color}`}>
              {shift.label}
            </div>
            <span className="text-gray-600">
              {shift.startTime}-{shift.endTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftLegend;