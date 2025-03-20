/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Period } from '../interfaces/types';
import SearchFilterComponent from './SearchFilterComponent';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';

interface TopBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  showShifts: boolean;
  setShowShifts: (show: boolean) => void;
  showLicenses: boolean;
  setShowLicenses: (show: boolean) => void;
  startDate?: string;
  setStartDate?: (date: string) => void;
  endDate?: string;
  setEndDate?: (date: string) => void;
  // Props para filtros
  locations: any[];
  departments: any[];
  employees: UnifiedEmployee[];
  onAdvancedFilterChange: (filters: any) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedPeriod,
  setSelectedPeriod,
  selectedDate,
  setSelectedDate,
  showShifts,
  setShowShifts,
  showLicenses,
  setShowLicenses,
  startDate = '',
  setStartDate = () => {},
  endDate = '',
  setEndDate = () => {},
  // locations = [],
  // departments = [],
  employees = [],
  onAdvancedFilterChange = () => {}
}) => {
  // Estado local para manejar la visibilidad del selector de fechas
  const [showDateRange, setShowDateRange] = useState(selectedPeriod === 'Seleccionar fechas');
  
  // Inicializar fechas si no están definidas
  const [localStartDate, setLocalStartDate] = useState(startDate || selectedDate);
  const [localEndDate, setLocalEndDate] = useState(endDate || selectedDate);

  // Actualizar el estado showDateRange cuando cambia selectedPeriod
  useEffect(() => {
    setShowDateRange(selectedPeriod === 'Seleccionar fechas');
  }, [selectedPeriod]);

  // Función para ir al día actual
  const goToToday = () => {
    const today = new Date();
    // Formato YYYY-MM-DD
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  };

  // Función para manejar cambios en el periodo
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = e.target.value as Period;
    setSelectedPeriod(newPeriod);
    setShowDateRange(newPeriod === 'Seleccionar fechas');
    
    // Si seleccionamos "Seleccionar fechas", inicializar las fechas de inicio y fin
    if (newPeriod === 'Seleccionar fechas') {
      setLocalStartDate(selectedDate);
      setLocalEndDate(selectedDate);
      
      if (setStartDate) setStartDate(selectedDate);
      if (setEndDate) setEndDate(selectedDate);
    }
  };

  // Función para buscar en el rango de fechas
  const handleSearchDateRange = () => {
    if (setStartDate) setStartDate(localStartDate);
    if (setEndDate) setEndDate(localEndDate);
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (filters: any) => {
    onAdvancedFilterChange(filters);
  };

  // Función para limpiar filtros
  const clearAllFilters = () => {
    setSearchTerm('');
    onAdvancedFilterChange({
      sedes: [],
      departamentos: [],
      secciones: [],
      unidades: []
    });
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center">
        {/* Contenedor para búsqueda en un lado */}
        <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
          <SearchFilterComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
            employees={employees}
          />
        </div>

        {/* Contenedor para los otros controles alineados en el centro/derecha */}
        <div className="w-full md:w-2/3 flex flex-wrap items-center justify-end space-x-2">
          {/* Controles de periodo y fecha */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Periodo</label>
              <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="px-2 py-1 pr-6 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Diario</option>
                <option>Semanal</option>
                <option>Mensual</option>
                <option>Seleccionar fechas</option>
              </select>
            </div>

            {showDateRange ? (
              <>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Fecha desde</label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="date"
                      value={localStartDate}
                      onChange={(e) => setLocalStartDate(e.target.value)}
                      className="w-36 pl-7 pr-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Fecha hasta</label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="date"
                      value={localEndDate}
                      onChange={(e) => setLocalEndDate(e.target.value)}
                      className="w-36 pl-7 pr-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button 
                  className="px-3 py-1 mt-5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  onClick={handleSearchDateRange}
                >
                  Buscar
                </button>
                <div className="w-[2px] h-6 bg-gray-300 mt-5 mx-1"></div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Fecha</label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-36 pl-7 pr-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button 
                  className="px-3 py-1 mt-5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  onClick={goToToday}
                >
                  Hoy
                </button>
              </>
            )}
          </div>
          
          {/* Separador */}
          <div className="w-[2px] h-6 bg-gray-300 mt-5 mx-2 hidden md:block"></div>
          
          {/* Botones de acciones */}
          <div className="flex items-center space-x-2 mt-5 md:mt-0 translate-y-2.5">
            <button
              onClick={() => setShowShifts(!showShifts)}
              className={`px-3 py-1 rounded-lg text-sm border ${
                showShifts ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700'
              }`}
            >
              Turnos de trabajo
            </button>
            <button
              onClick={() => setShowLicenses(!showLicenses)}
              className={`px-3 py-1 rounded-lg text-sm border ${
                showLicenses ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700'
              }`}
            >
              Licencias y permisos
            </button>
            {/* <button
              className="px-3 py-1 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Guardar cambios
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;