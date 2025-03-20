import React, { useState } from 'react';
import { License } from '../interfaces/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DraggableItem from './DraggableItem';

interface LicenseLegendProps {
  licenses: License[];
  visible: boolean;
}

const LicenseLegend: React.FC<LicenseLegendProps> = ({ licenses, visible }) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!visible) return null;

  // Mostrar solo 6 licencias inicialmente a menos que se expanda
  const initialLicenses = 6;
  const displayedLicenses = showAll ? licenses : licenses.slice(0, initialLicenses);
  const hasMoreLicenses = licenses.length > initialLicenses;

  return (
    <div className="flex flex-wrap items-center gap-3 mt-2 mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm mx-4">
      <div className="flex items-center">
        <h4 className="text-sm font-medium text-gray-900 mr-2">Licencias y permisos:</h4>
        
        {hasMoreLicenses && (
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
      
      {/* Contenedor flexible para las licencias arrastrables */}
      {displayedLicenses.map(license => (
        <DraggableItem
          key={license.code}
          id={license.code}
          label={license.label}
          color={license.color || 'bg-yellow-200 text-yellow-800'}
          type="license"
          startTime={license.defaultStartTime || '08:00'} 
          endTime={license.defaultEndTime || '16:00'}
        />
      ))}
    </div>
  );
};

export default LicenseLegend;