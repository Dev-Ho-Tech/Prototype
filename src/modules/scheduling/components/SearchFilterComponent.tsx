/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
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

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const onSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="mb-0">
      {showAdvancedFilters ? (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="relative w-full p-4 mb-2">
            <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar Empleado, ID, Nro docum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-36 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={toggleAdvancedFilters}
              className="absolute right-7 top-1/2 transform -translate-y-1/2 p-1 text-xs text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center"
            >
              Búsqueda simple
              <ChevronDown className="ml-1 w-3 h-3 rotate-180" />
            </button>
          </div>
          
          {/* Componente AdvancedFilters */}
          <AdvancedFilters 
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            employees={employees.map(emp => convertToSpecificModel(emp, 'employee'))}
          />
        </div>
      ) : (
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, ID o departamento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-36 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={toggleAdvancedFilters}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-xs text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center"
          >
            Búsqueda avanzada
            <ChevronDown className="ml-1 w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilterComponent;