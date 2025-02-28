import React from 'react';
import { WorkShift, License } from '../interfaces/types';
import ShiftLegend from './ShiftLegend';
import LicenseLegend from './LicenseLegend';

interface LegendsProps {
  workShifts: WorkShift[];
  licenses: License[];
  showShifts: boolean;
  showLicenses: boolean;
}

const Legends: React.FC<LegendsProps> = ({
  workShifts,
  licenses,
  showShifts,
  showLicenses
}) => {
  return (
    <div className="border-t border-gray-200 mt-4">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ShiftLegend workShifts={workShifts} visible={showShifts} />
        <LicenseLegend licenses={licenses} visible={showLicenses} />
      </div>
      
      {/* Indicadores de estado para marcajes biométricos */}
      <div className="flex items-center space-x-6 mt-2 mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm mx-4">
        <h4 className="text-sm font-medium text-gray-900">Estado de marcajes:</h4>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          <span className="text-xs text-gray-600">A tiempo</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
          <span className="text-xs text-gray-600">Tardanza</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
          <span className="text-xs text-gray-600">Salida anticipada</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-red-600 rounded-full"></div>
          <span className="text-xs text-gray-600">Ausencia</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Marcaje de entrada</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Marcaje de salida</span>
        </div>
      </div>
    </div>
  );
};

export default Legends;