import React from 'react';

interface StatusTabsProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    active: number;
    inactive: number;
    total: number;
  };
}

const StatusTabs: React.FC<StatusTabsProps> = ({
  currentStatus,
  onStatusChange,
  counts
}) => {
  return (
    <div className="flex border border-gray-200 rounded-md mb-4 w-fit">
      <button
        className={`px-4 py-2 ${currentStatus === 'todas' 
          ? 'bg-gray-100 font-medium' 
          : 'text-gray-500 hover:bg-gray-50'}`}
        onClick={() => onStatusChange('todas')}
      >
        Todas <span className="ml-1 px-2 py-1 text-xs bg-gray-200 rounded-full">{counts.total}</span>
      </button>
      <button
        className={`px-4 py-2 border-l border-r border-gray-200 ${currentStatus === 'activo' 
          ? 'bg-gray-100 font-medium' 
          : 'text-gray-500 hover:bg-gray-50'}`}
        onClick={() => onStatusChange('activo')}
      >
        Activas <span className="ml-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{counts.active}</span>
      </button>
      <button
        className={`px-4 py-2 ${currentStatus === 'inactivo' 
          ? 'bg-gray-100 font-medium' 
          : 'text-gray-500 hover:bg-gray-50'}`}
        onClick={() => onStatusChange('inactivo')}
      >
        Inactivas <span className="ml-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">{counts.inactive}</span>
      </button>
    </div>
  );
};

export default StatusTabs;