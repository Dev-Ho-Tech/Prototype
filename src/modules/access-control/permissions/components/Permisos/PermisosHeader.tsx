/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Search } from 'lucide-react';
import { PermisosFilterState } from '../../interfaces/permisos';  

interface PermisosHeaderProps {
  filters: PermisosFilterState;
  onFilterChange: (filterKey: keyof PermisosFilterState, value: any) => void;
  onNewPermiso: () => void;
}

export function PermisosHeader({ filters, onFilterChange, onNewPermiso }: PermisosHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Permisos de Acceso</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestión de permisos y control de acceso
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 min-w-0 md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar permisos..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={onNewPermiso}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Permiso</span>
        </button>
      </div>
    </div>
  );
}