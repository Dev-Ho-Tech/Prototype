/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import AdvancedFilters from './AdvancedFilter';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';
import { convertToSpecificModel } from '../../../global/interfaces/unifiedTypes';

interface SearchFilterComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  employees: UnifiedEmployee[];
}

const SearchFilterComponent: React.FC<SearchFilterComponentProps> = ({
  searchTerm,
  setSearchTerm,
  onFilterChange,
  onClearFilters,
  employees
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const advancedFiltersRef = useRef<HTMLDivElement>(null);

  // Manejador para cerrar los filtros avanzados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        advancedFiltersRef.current && 
        !advancedFiltersRef.current.contains(event.target as Node) &&
        showAdvancedFilters
      ) {
        setShowAdvancedFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAdvancedFilters]);

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const onSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="relative">
      {/* Barra de búsqueda siempre visible */}
      <div className="relative w-[590px] w-full ">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por código, Cédula, Género, Tipo de Trabajo, Departamento, Sección, Unidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-36 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={toggleAdvancedFilters}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-xs text-blue-600 hover:bg-blue-50 rounded-md flex items-center"
          >
            {showAdvancedFilters ? 'Búsqueda simple' : 'Búsqueda avanzada'}
            <ChevronDown className={`ml-1 w-3 h-3 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Panel de filtros avanzados (montado sobre el contenido) */}
      {showAdvancedFilters && (
        <div 
          ref={advancedFiltersRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-50"
          style={{ width: '100%', maxHeight: '80vh', overflowY: 'auto' }}
        >
          {/* Componente AdvancedFilters */}
          <AdvancedFilters 
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            employees={employees.map(emp => convertToSpecificModel(emp, 'employee'))}
          />
        </div>
      )}
    </div>
  );
};

export default SearchFilterComponent;