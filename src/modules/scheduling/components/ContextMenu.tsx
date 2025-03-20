import React, { useEffect, useRef } from 'react';
import { WorkShift, License } from '../interfaces/types';

interface ContextMenuProps {
  x: number;
  y: number;
  date: string;
  hour: number;
  employeeId: string | null;
  onClose: () => void;
  workShifts: WorkShift[];
  licenses: License[];
  onAddShift: (shiftId: string, date: string, hour: number, employeeId: string | null) => void;
  onAddLicense: (licenseId: string, date: string, hour: number, employeeId: string | null) => void;
  onAddMarking: (type: 'entry' | 'exit', date: string, hour: number, employeeId: string | null) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  date,
  hour,
  employeeId,
  onClose,
  workShifts,
  licenses,
  onAddShift,
  onAddLicense,
  onAddMarking
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Ajustar posición para que no se salga de la pantalla
  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 300);

  // Formatear hora para mostrar (HH:00)
  const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
  
  // Formatear fecha en formato más legible (DD/MM/YYYY)
  const formattedDate = date.split('-').reverse().join('/');

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
      style={{ left: adjustedX, top: adjustedY, width: '240px' }}
    >
      <div className="p-2 bg-blue-600 text-white text-xs font-medium flex items-center justify-between">
        <span>Agregar en {formattedDate} - {formattedHour}</span>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xs"
        >
          ✕
        </button>
      </div>
      
      <div className="p-2 border-b border-gray-200">
        <div className="text-xs font-medium text-gray-700 mb-1">Marcajes</div>
        <div className="grid grid-cols-2 gap-1">
          <button
            className="text-xs py-1 px-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors flex items-center"
            onClick={() => onAddMarking('entry', date, hour, employeeId)}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Entrada</span>
          </button>
          <button
            className="text-xs py-1 px-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors flex items-center"
            onClick={() => onAddMarking('exit', date, hour, employeeId)}
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>Salida</span>
          </button>
        </div>
      </div>
      
      <div className="p-2 border-b border-gray-200">
        <div className="text-xs font-medium text-gray-700 mb-1">Turnos</div>
        <div className="max-h-28 overflow-y-auto">
          {workShifts.map((shift) => (
            <button
              key={shift.id}
              className="text-xs w-full text-left py-1 px-2 hover:bg-gray-100 rounded transition-colors flex items-center space-x-2"
              onClick={() => onAddShift(shift.id, date, hour, employeeId)}
            >
              <div 
                className={`w-3 h-3 rounded-full flex-shrink-0 ${shift.color ? shift.color.split(' ')[0] : 'bg-blue-500'}`}
              ></div>
              <span>{shift.label || shift.id}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-2">
        <div className="text-xs font-medium text-gray-700 mb-1">Licencias</div>
        <div className="max-h-28 overflow-y-auto">
          {licenses.map((license) => (
            <button
              key={license.code}
              className="text-xs w-full text-left py-1 px-2 hover:bg-gray-100 rounded transition-colors flex items-center space-x-2"
              onClick={() => onAddLicense(license.code, date, hour, employeeId)}
            >
              <div 
                className={`w-3 h-3 rounded-full flex-shrink-0 ${license.color ? license.color.split(' ')[0] : 'bg-yellow-200'}`}
              ></div>
              <span>{license.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;