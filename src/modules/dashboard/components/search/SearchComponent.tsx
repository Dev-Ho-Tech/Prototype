import React, { useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showAdvancedFilters: boolean;
  toggleAdvancedFilters: () => void;
  placeholder?: string;
  advancedFiltersComponent?: React.ReactNode;
  className?: string;
}

/**
 * Componente de búsqueda mejorado
 */
const SearchComponent: React.FC<SearchComponentProps> = ({
  searchTerm,
  setSearchTerm,
  showAdvancedFilters,
  toggleAdvancedFilters,
  placeholder = "Buscar por nombre, ID o departamento",
  advancedFiltersComponent = null,
  className = "relative flex-1"
}) => {
  const searchRef = useRef<HTMLDivElement>(null);

  // Efecto para manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAdvancedFilters && 
          searchRef.current && 
          !searchRef.current.contains(event.target as Node)) {
        toggleAdvancedFilters();
      }
    };

    // Añadir listener solo cuando el panel de filtros está abierto
    if (showAdvancedFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAdvancedFilters, toggleAdvancedFilters]);

  return (
    <div className={className} ref={searchRef}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-36 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={toggleAdvancedFilters}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-xs text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center"
        type="button"
      >
        {showAdvancedFilters ? 'Búsqueda simple' : 'Búsqueda avanzada'}
        <ChevronDown className={`ml-1 w-3 h-3 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Panel de filtros avanzados */}
      {showAdvancedFilters && advancedFiltersComponent && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm absolute left-0 z-20 w-96">
          {advancedFiltersComponent}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;