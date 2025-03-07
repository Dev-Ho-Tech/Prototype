/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Search, ChevronDown, Download, Plus } from 'lucide-react';
import AdvancedFilters from './AdvancedFilters';
import { Employee } from '../../interface/types';

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  employees: Employee[];
  onAddNewEmployee: () => void;
}

export function SearchComponent({ 
  searchTerm, 
  setSearchTerm, 
  employees,
  onAddNewEmployee
}: SearchComponentProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [, setFilterState] = useState({
    sedes: [],
    departamentos: [],
    secciones: [],
    unidades: []
  });

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handleFilterChange = (filters: any) => {
    setFilterState(filters);
    // Aquí podríamos aplicar los filtros a la lista de empleados si fuera necesario
  };

  const clearAllFilters = () => {
    setFilterState({
      sedes: [],
      departamentos: [],
      secciones: [],
      unidades: []
    });
    setSearchTerm('');
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-700">Empleados</h2>
        <button
          onClick={toggleAdvancedFilters}
          className="p-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center"
        >
          {showAdvancedFilters ? 'Búsqueda simple' : 'Búsqueda avanzada'}
          <ChevronDown className={`ml-1 w-3 h-3 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 mr-4 overflow-hidden transition-all duration-300">
          {showAdvancedFilters ? (
            <AdvancedFilters 
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onFilterChange={handleFilterChange}
              onClearFilters={clearAllFilters}
              employees={employees}
            />
          ) : (
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, ID o departamento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3 ml-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={onAddNewEmployee}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Empleado</span>
          </button>
        </div>
      </div>
    </div>
  );
}