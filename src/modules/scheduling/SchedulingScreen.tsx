import React, { useState, useRef } from 'react';
import { Search, Calendar, Clock, ChevronDown, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { workShifts, licenses, employees } from './data';
import { EmployeeInfo } from '../../components/common/EmployeeInfo';
import type { Employee, ScheduleEntry } from '../../types';

export function SchedulingScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Semanal');
  const [selectedDate, setSelectedDate] = useState('2025-02-14');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(employees[0]);
  const [showShifts, setShowShifts] = useState(true);
  const [showLicenses, setShowLicenses] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [dragInfo, setDragInfo] = useState<{
    isResizing: boolean;
    isStartHandle?: boolean;
    startX: number;
    initialLeft: number;
    initialWidth: number;
    scheduleEntry?: ScheduleEntry;
  } | null>(null);

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = (i + 6).toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMouseDown = (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const isRightEdge = e.clientX - rect.left > rect.width - 10;
    const isLeftEdge = e.clientX - rect.left < 10;

    if (isRightEdge || isLeftEdge) {
      setDragInfo({
        isResizing: true,
        isStartHandle: isLeftEdge,
        startX: e.clientX,
        initialLeft: rect.left,
        initialWidth: rect.width,
        scheduleEntry
      });
      
      // Agregar clase para el elemento que se está arrastrando
      const element = e.currentTarget as HTMLElement;
      element.classList.add('dragging');
    } else {
      setDragInfo({
        isResizing: false,
        startX: e.clientX,
        initialLeft: rect.left,
        initialWidth: rect.width,
        scheduleEntry
      });
      
      // Agregar clase para el elemento que se está arrastrando
      const element = e.currentTarget as HTMLElement;
      element.classList.add('dragging');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragInfo || !dragInfo.scheduleEntry) return;

    const gridRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cellWidth = gridRect.width / 13;
    
    // Actualizar la posición del elemento en tiempo real
    const element = e.currentTarget.querySelector('.dragging') as HTMLElement;
    if (element) {
      if (dragInfo.isResizing) {
        if (dragInfo.isStartHandle) {
          const diff = e.clientX - dragInfo.startX;
          const newLeft = Math.max(0, dragInfo.initialLeft + diff - gridRect.left);
          const hour = 5 + Math.floor(newLeft / cellWidth);
          const endHour = parseInt(dragInfo.scheduleEntry.endTime);
          
          if (hour < endHour) {
            element.style.left = `${(hour - 5) * (100 / 13)}%`;
            element.style.width = `${(endHour - hour) * (100 / 13)}%`;
            dragInfo.scheduleEntry.startTime = `${hour.toString().padStart(2, '0')}:00`;
          }
        } else {
          const diff = e.clientX - dragInfo.startX;
          const newWidth = Math.max(cellWidth, dragInfo.initialWidth + diff);
          const hours = Math.round(newWidth / cellWidth);
          const startHour = parseInt(dragInfo.scheduleEntry.startTime);
          
          element.style.width = `${hours * (100 / 13)}%`;
          dragInfo.scheduleEntry.endTime = `${(startHour + hours).toString().padStart(2, '0')}:00`;
        }
      } else {
        const diff = e.clientX - dragInfo.startX;
        const cells = Math.round(diff / cellWidth);
        const newLeft = dragInfo.initialLeft + (cells * cellWidth);
        const hour = 5 + Math.floor((newLeft - gridRect.left) / cellWidth);
        const duration = parseInt(dragInfo.scheduleEntry.endTime) - parseInt(dragInfo.scheduleEntry.startTime);
        
        element.style.left = `${(hour - 5) * (100 / 13)}%`;
        dragInfo.scheduleEntry.startTime = `${hour.toString().padStart(2, '0')}:00`;
        dragInfo.scheduleEntry.endTime = `${(hour + duration).toString().padStart(2, '0')}:00`;
      }
    }
  };

  const handleMouseUp = () => {
    // Remover clase de arrastre
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement) {
      draggingElement.classList.remove('dragging');
    }
    setDragInfo(null);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="p-4 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, cargo o departamento"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1">Periodo</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Semanal</option>
                  <option>Mensual</option>
                </select>
              </div>
              <div className="relative">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-48 pl-3 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            <button className="px-4 py-2 mt-5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
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
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Left Panel - Employee List */}
        <div className="w-96 border border-gray-200 rounded-lg bg-white flex flex-col mr-4 ml-4">
          <div className="p-2 bg-[#1d4ed8] border-b border-gray-200 flex justify-center rounded-tl-lg rounded-tr-lg">
              <h3 className="font-medium text-gray-900 text-md text-white">Empleados</h3>
          </div>

          <div className="flex-1 overflow-auto">
            {filteredEmployees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                    <p className="text-sm text-gray-500">{employee.department}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {employee.schedule[0].shift === 'D' ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      Turno {employee.schedule[0].shift}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Schedule Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedEmployee && <EmployeeInfo employee={selectedEmployee} />}

          {/* flex-1 */}
          <div className="overflow-auto rounded-lg mr-4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-[auto,1fr] border border-gray-200 rounded-lg">
                <div className="w-20 rounded-tl-lg bg-gray-50 border-r border-gray-200"></div>
                <div className="grid grid-cols-[repeat(13,minmax(80px,1fr))]">
                  {timeSlots.slice(0, -1).map(time => (
                    <div key={time} className="px-2 py-1 text-xs text-gray-500 border-r border-gray-200 last:border-r-0">
                      {time}
                    </div>
                  ))}
                </div>

                {weekDays.map((day, dayIndex) => {
                  const date = new Date(selectedDate);
                  date.setDate(date.getDate() - date.getDay() + dayIndex + 1);
                  const formattedDate = date.toISOString().split('T')[0];
                  const schedule = selectedEmployee?.schedule.find(s => s.date === formattedDate);

                  return (
                    <React.Fragment key={day}>
                      <div className="rounded-bl-lg w-20 px-2 py-3 text-xs border-t border-gray-200 bg-gray-50 ">
                        <div className="font-medium">{day}</div>
                        <div className="text-gray-500">
                          {formattedDate.split('-').slice(1).join('/')}
                        </div>
                      </div>
                      <div 
                        className="relative border-t border-gray-200 grid grid-cols-[repeat(13,minmax(80px,1fr))]"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                      >
                        {schedule && (
                          <div
                            className={`absolute inset-y-0 m-1 rounded flex items-center px-2 cursor-move ${
                              schedule.shift === 'D' || schedule.shift === 'V' || schedule.shift === 'LPM'
                                ? licenses.find(l => l.code === schedule.shift)?.color
                                : workShifts.find(s => s.id === schedule.shift)?.color
                            }`}
                            style={{
                              left: `${((parseInt(schedule.startTime.split(':')[0]) - 5) / 13) * 100}%`,
                              width: schedule.startTime && schedule.endTime
                                ? `${((parseInt(schedule.endTime.split(':')[0]) - parseInt(schedule.startTime.split(':')[0])) / 13) * 100}%`
                                : '100%'
                            }}
                            onMouseDown={(e) => handleMouseDown(e, schedule)}
                          >
                            <div className="flex items-center space-x-2 text-xs">
                              <span>
                                {schedule.shift === 'D' || schedule.shift === 'V' || schedule.shift === 'LPM'
                                  ? licenses.find(l => l.code === schedule.shift)?.label
                                  : `Turno ${schedule.shift}`}
                              </span>
                              {schedule.startTime && schedule.endTime && (
                                <>
                                  <span>•</span>
                                  <span>{schedule.startTime} - {schedule.endTime}</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legends */}
          {/* bg-white */}
          <div className="border-t border-gray-200">
            <div>
            {/* grid sm:grid-cols-1 lg:grid-cols-2 */}
              {/* flex space-x-6 */}
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 mt-4">
                {showShifts && (
                  <div className="flex-1 border bg-white p-4 rounded-lg mb-4 mr-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Turnos de trabajo</h4>
                    {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 */}
                    {/* grid grid-cols-3 gap-2 */}
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {workShifts.map(shift => (
                        <div
                          key={shift.id}
                          className="flex items-center space-x-2 text-sm mb-2 mr-2"
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${shift.color}`}>
                            {shift.label}
                          </div>
                          <span className="text-gray-600">
                            {shift.startTime}-{shift.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showLicenses && (
                  <div className="flex-1 border bg-white p-4 rounded-lg mb-4 mr-4">
                    <h4 className="text-md font-medium text-gray-900 mb-2 mb-4">Licencias y permisos</h4>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {licenses.slice(0, 6).map(license => (
                        <div
                          key={license.code}
                          className={`px-2 py-1 rounded text-xs mb-2 mr-2 ${license.color}`}
                        >
                          {license.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}