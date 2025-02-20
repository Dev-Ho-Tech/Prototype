import React from 'react';
import { Search } from 'lucide-react';
import type { Shift, ShiftType } from '../types';

const SHIFT_TYPES: ShiftType[] = ['morning', 'afternoon', 'night', 'weekend', 'holiday'];

const SHIFT_TYPE_LABELS: Record<ShiftType, string> = {
  morning: 'Mañana',
  afternoon: 'Tarde',
  night: 'Noche',
  weekend: 'Fin de Semana',
  holiday: 'Festivo'
};

const mockShifts: Shift[] = [
  {
    id: '1',
    name: 'Turno Mañana A',
    type: 'morning',
    startTime: '07:00',
    endTime: '15:00',
    employees: ['1', '2']
  },
  {
    id: '2',
    name: 'Turno Tarde B',
    type: 'afternoon',
    startTime: '15:00',
    endTime: '23:00',
    employees: ['3']
  }
];

export function ShiftManager() {
  const [shifts] = React.useState<Shift[]>(mockShifts);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<ShiftType | 'all'>('all');

  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch = shift.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || shift.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión de Turnos</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar turnos..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as ShiftType | 'all')}
        >
          <option value="all">Todos los tipos</option>
          {SHIFT_TYPES.map((type) => (
            <option key={type} value={type}>
              {SHIFT_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShifts.map((shift) => (
          <div
            key={shift.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{shift.name}</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                {SHIFT_TYPE_LABELS[shift.type]}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>Horario: {shift.startTime} - {shift.endTime}</p>
              <p>Empleados asignados: {shift.employees.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}