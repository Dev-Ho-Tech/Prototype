/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const advancedFiltersRef = useRef<HTMLDivElement>(null);

  // Efecto para manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verificar si el clic fue en algún elemento dentro del panel de filtros avanzados
      const wasClickInside = 
        searchRef.current?.contains(event.target as Node) || 
        advancedFiltersRef.current?.contains(event.target as Node);
      
      // Sólo cerrar si el clic fue completamente fuera del componente de búsqueda y del panel de filtros
      if (showAdvancedFilters && !wasClickInside) {
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
        <div 
          ref={advancedFiltersRef} 
          className="bg-white rounded-lg border border-gray-200 shadow-sm absolute left-0 z-20 w-96"
          onClick={(e) => {
            // Evitar que los clics dentro del panel de filtros propaguen al documento
            e.stopPropagation();
          }}
        >
          {/* Clonar el componente y modificar sus props para evitar que se cierre el panel */}
          {React.cloneElement(advancedFiltersComponent as React.ReactElement, {
            // Aseguramos que el callback onFilterChange no cierre el panel
            onFilterChange: (filters: any) => {
              // Obtener la función original
              const originalOnFilterChange = (advancedFiltersComponent as React.ReactElement).props.onFilterChange;
              
              // Llamar a la función original sin cerrar el panel
              if (originalOnFilterChange) {
                originalOnFilterChange(filters);
              }
            }
          })}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;