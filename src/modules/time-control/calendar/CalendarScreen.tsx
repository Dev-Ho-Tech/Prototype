import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, Clock, MapPin, Building2, Users, ChevronLeft, ChevronRight, MoreVertical, Download } from 'lucide-react';
import { EmployeeList } from './components/EmployeeList';
import { ScheduleGrid } from './components/ScheduleGrid';
import { EmployeeDetails } from './components/EmployeeDetails';
import { employeesData } from '../data';

export function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(employeesData[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Left Panel - Employee List */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <EmployeeList
          employees={employeesData}
          selectedEmployee={selectedEmployee}
          onSelectEmployee={setSelectedEmployee}
        />
      </div>

      {/* Center Panel - Schedule Grid */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreviousWeek}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-medium text-gray-900">
                  {currentDate.toLocaleDateString('es', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <button
                onClick={handleNextWeek}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los departamentos</option>
                <option value="front_desk">Front Desk</option>
                <option value="housekeeping">Housekeeping</option>
                <option value="fb">Alimentos y Bebidas</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas las sedes</option>
                <option value="gran_almirante">Gran Almirante</option>
                <option value="garden_court">Garden Court</option>
                <option value="centro_plaza">Centro Plaza</option>
              </select>
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'calendar'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <CalendarIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'timeline'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                </button>
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Presente</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Ausente</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Tardanza</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Permiso</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">No programado</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <ScheduleGrid
            currentDate={currentDate}
            selectedEmployee={selectedEmployee}
            onShowDetails={() => setShowDetails(true)}
            viewMode={viewMode}
          />
        </div>
      </div>

      {/* Right Panel - Details */}
      {showDetails && (
        <div className="w-96 border-l border-gray-200 bg-white">
          <EmployeeDetails
            employee={selectedEmployee}
            onClose={() => setShowDetails(false)}
          />
        </div>
      )}
    </div>
  );
}