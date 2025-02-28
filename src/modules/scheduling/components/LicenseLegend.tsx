import React, { useState } from 'react';
import { License } from '../interfaces/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LicenseLegendProps {
  licenses: License[];
  visible: boolean;
}

const LicenseLegend: React.FC<LicenseLegendProps> = ({ licenses, visible }) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!visible) return null;

  // Mostrar solo 6 licencias inicialmente a menos que se expanda
  const displayedLicenses = showAll ? licenses : licenses.slice(0, 6);

  return (
    <div className="flex-1 border bg-white p-4 rounded-lg mb-4 mr-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-md font-medium text-gray-900">Licencias y permisos</h4>
        {licenses.length > 6 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 text-sm flex items-center"
          >
            {showAll ? (
              <>
                <span>Ver menos</span>
                <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Ver todos</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {displayedLicenses.map(license => (
          <div
            key={license.code}
            className={`px-2 py-1 rounded text-xs flex items-center ${license.color}`}
          >
            <span className="mr-2 font-bold">{license.code}</span>
            <span>{license.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LicenseLegend;