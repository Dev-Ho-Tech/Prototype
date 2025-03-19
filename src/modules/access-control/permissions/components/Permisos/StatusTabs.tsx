import React from 'react';

interface StatusTabsProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    active: number;
    inactive: number;
    pending: number;
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
        className={`px-4 py-2 ${currentStatus === 'todos' 
          ? 'bg-gray-100 font-medium' 
          : 'text-gray-500 hover:bg-gray-50'}`}
        onClick={() => onStatusChange('todos')}
      >
        Todos <span className="ml-1 px-2 py-1 text-xs bg-gray-200 rounded-full">{counts.total}</span>
      </button>
      <button
        className={`px-4 py-2 border-l border-r border-gray-200 ${currentStatus === 'activo' 
          ? 'bg-gray-100 font-medium' 
          : 'text-gray-500 hover:bg-gray-50'}`}
        onClick={() => onStatusChange('activo')}
      >
        Activos <span className="ml-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{counts.active}</span>
      </button>
      <button
        className={`px-4 py-2 ${currentStatus === 'pendiente' 
          ? 'bg-gray-100 font-medium' 
          : 'text-gray-500 hover:bg-gray-50'}`}
        onClick={() => onStatusChange('pendiente')}
      >
        Pendientes <span className="ml-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">{counts.pending}</span>
      </button>
    </div>
  );
};

export default StatusTabs;