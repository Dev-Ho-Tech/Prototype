import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, Clock, MapPin, Building2, Users, ChevronLeft, ChevronRight, Coffee, Download } from 'lucide-react';
import { diningSchedulesData } from '../data';

export function DiningScheduleScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDiningRoom, setSelectedDiningRoom] = useState('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

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

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Horarios de Comida</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los horarios y turnos de los comedores
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
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
                  value={selectedDiningRoom}
                  onChange={(e) => setSelectedDiningRoom(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos los comedores</option>
                  <option value="DR001">Comedor Principal</option>
                  <option value="DR002">Comedor Ejecutivo</option>
                </select>
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-8 gap-4">
              {/* Time slots column */}
              <div className="space-y-6">
                <div className="h-10"></div>
                {['Desayuno', 'Almuerzo', 'Cena'].map((meal) => (
                  <div key={meal} className="h-24 flex items-center">
                    <span className="text-sm font-medium text-gray-500">
                      {meal}
                    </span>
                  </div>
                ))}
              </div>

              {/* Days columns */}
              {weekDays.map((day, dayIndex) => {
                const date = new Date(currentDate);
                date.setDate(date.getDate() - date.getDay() + dayIndex + 1);

                return (
                  <div key={day} className="space-y-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{day}</div>
                      <div className="text-sm text-gray-500">{date.toLocaleDateString()}</div>
                    </div>

                    {['breakfast', 'lunch', 'dinner'].map((type) => {
                      const schedule = diningSchedulesData.find(s => s.type === type);
                      return (
                        <div key={type} className="h-24 bg-gray-50 rounded-lg p-2">
                          {schedule && (
                            <div className="h-full bg-white rounded border border-gray-200 p-2">
                              <div className="text-xs font-medium text-gray-900">
                                {schedule.startTime} - {schedule.endTime}
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                {schedule.currentBookings}/{schedule.capacity}
                              </div>
                              <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                                <div
                                  className="bg-blue-600 h-1 rounded-full"
                                  style={{ width: `${(schedule.currentBookings / schedule.capacity) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}