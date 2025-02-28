import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { Period } from '../interfaces/types';

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
  setShowLicenses
}) => {
  // Función para ir al día actual
  const goToToday = () => {
    const today = new Date();
    // Formato YYYY-MM-DD
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nombre, cargo o departamento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-96 pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Periodo</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as Period)}
              className="px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Semanal</option>
              <option>Diario</option>
              <option>Mensual</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Fecha</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48 pl-9 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button 
            className="px-4 py-2 mt-5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            onClick={goToToday}
          >
            Hoy
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowShifts(!showShifts)}
            className={`px-4 py-2 rounded-lg text-sm border ${
              showShifts ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700'
            }`}
          >
            Turnos de trabajo
          </button>
          <button
            onClick={() => setShowLicenses(!showLicenses)}
            className={`px-4 py-2 rounded-lg text-sm border ${
              showLicenses ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700'
            }`}
          >
            Licencias y permisos
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;