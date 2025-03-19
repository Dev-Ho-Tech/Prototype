import React from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import StatusTabs from './StatusTabs';

interface ComedoresHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewClick: () => void;
  title: string;
  currentStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    active: number;
    inactive: number;
    total: number;
  };
}

const ComedoresHeader: React.FC<ComedoresHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onNewClick,
  title,
  currentStatus,
  onStatusChange,
  counts
}) => {
  return (
    <div className="mb-6">
      {/* Título y Botón de Nuevo */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Administración de Comedores</h2>
          <p className="text-gray-500 text-sm">Gestione los comedores, horarios, estaciones y perfiles</p>
        </div>
        <button 
          onClick={onNewClick}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Nuevo {title}
        </button>
      </div>

      {/* Tabs y Búsqueda */}
      <div className="flex justify-between items-center mb-4">
        <StatusTabs 
          currentStatus={currentStatus} 
          onStatusChange={onStatusChange} 
          counts={counts} 
        />
        
        <div className="flex space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700">
            Modo Lista
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComedoresHeader;