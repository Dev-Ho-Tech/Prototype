import React, { useState } from 'react';
import { WorkShift } from '../interfaces/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DraggableItem from './DraggableItem';

interface ShiftLegendProps {
  workShifts: WorkShift[];
  visible: boolean;
}

const ShiftLegend: React.FC<ShiftLegendProps> = ({ workShifts, visible }) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!visible) return null;

  // Mostrar solo 6 turnos inicialmente a menos que se expanda
  const initialShifts = 6;
  const displayedShifts = showAll ? workShifts : workShifts.slice(0, initialShifts);
  const hasMoreShifts = workShifts.length > initialShifts;

  return (
    <div className="flex flex-wrap items-center gap-3 mt-2 mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm mx-4">
      <div className="flex items-center">
        <h4 className="text-sm font-medium text-gray-900 mr-2">Turnos de trabajo:</h4>
        
        {hasMoreShifts && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 text-xs flex items-center"
          >
            {showAll ? (
              <>
                <span>Ver menos</span>
                <ChevronUp className="w-3 h-3 ml-1" />
              </>
            ) : (
              <>
                <span>Ver todos</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Contenedor flexible para los turnos arrastrables */}
      {displayedShifts.map(shift => (
        <DraggableItem 
          key={shift.id}
          id={shift.id}
          label={shift.label || shift.id}
          color={shift.color || 'bg-blue-500 text-white'}
          type="shift"
          startTime={shift.startTime || '08:00'}
          endTime={shift.endTime || '16:00'}
        />
      ))}
    </div>
  );
};

export default ShiftLegend;