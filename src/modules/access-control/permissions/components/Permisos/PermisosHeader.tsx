import React, { useState } from 'react';
import { Plus, Search, List, Grid, ChevronDown } from 'lucide-react';
import StatusTabs from './StatusTabs';

interface PermisosHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewClick: () => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    active: number;
    inactive: number;
    pending: number;
    total: number;
  };
  viewMode: 'list' | 'card';
  onViewModeChange: (mode: 'list' | 'card') => void;
  selectedType: string;
  selectedLevel: string;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLevelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PermisosHeader: React.FC<PermisosHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onNewClick,
  selectedStatus,
  onStatusChange,
  counts,
  viewMode,
  onViewModeChange,
}) => {
  const [viewMenuOpen, setViewMenuOpen] = useState(false);

  return (
    <>
      {/* Título y Botón de Nuevo */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Permisos de Acceso</h1>
          <p className="text-gray-500 text-sm">Gestión de permisos y control de acceso</p>
        </div>
        <button 
          onClick={onNewClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Nuevo Permiso
        </button>
      </div>

      {/* Tabs y Búsqueda en la misma línea */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-6">
        <StatusTabs 
          currentStatus={selectedStatus} 
          onStatusChange={onStatusChange} 
          counts={counts} 
        />

        <div className="flex mt-4 md:mt-0 space-x-2">
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por permisos de acceso"
                value={searchTerm}
                onChange={onSearchChange}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-80"
              />
            </div>

            {/* Menú desplegable para cambiar la vista */}
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                onClick={() => setViewMenuOpen(!viewMenuOpen)}
              >
                {viewMode === 'list' ? (
                  <>
                    <List className="h-4 w-4 mr-2" />
                    Modo Lista
                  </>
                ) : (
                  <>
                    <Grid className="h-4 w-4 mr-2" />
                    Modo Tarjeta
                  </>
                )}
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {viewMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <ul>
                    <li 
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${viewMode === 'list' ? 'text-blue-600 font-medium' : ''}`}
                      onClick={() => {
                        onViewModeChange('list');
                        setViewMenuOpen(false);
                      }}
                    >
                      <List className="h-4 w-4 mr-2" />
                      Vista Lista
                    </li>
                    <li 
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${viewMode === 'card' ? 'text-blue-600 font-medium' : ''}`}
                      onClick={() => {
                        onViewModeChange('card');
                        setViewMenuOpen(false);
                      }}
                    >
                      <Grid className="h-4 w-4 mr-2" />
                      Vista Tarjeta
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermisosHeader;