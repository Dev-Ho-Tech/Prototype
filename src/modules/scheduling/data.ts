import { Employee, WorkShift, License } from '../../types';

export const workShifts: WorkShift[] = [
  { id: 'A', label: 'A', startTime: '08:00', endTime: '16:00', color: 'bg-indigo-600 text-white' },
  { id: 'M', label: 'M', startTime: '06:00', endTime: '14:00', color: 'bg-amber-700 text-white' },
  { id: 'N', label: 'N', startTime: '16:00', endTime: '00:00', color: 'bg-blue-600 text-white' },
  { id: 'S', label: 'S', startTime: '08:00', endTime: '19:00', color: 'bg-violet-600 text-white' },
  { id: 'T', label: 'T', startTime: '02:00', endTime: '10:00', color: 'bg-emerald-600 text-white' },
];

export const licenses: License[] = [
  { code: 'D', label: 'DESCANSO', color: 'bg-red-200 text-red-700' },
  { code: 'LPM', label: 'LICENCIA POR MATERNIDAD', color: 'bg-orange-200 text-orange-700' },
  { code: 'LPTE', label: 'LICENCIA POR TRAMITE ESPECIAL', color: 'bg-blue-200 text-blue-700' },
  { code: 'E', label: 'ESTUDIOS', color: 'bg-indigo-200 text-indigo-700' },
  { code: 'TL', label: 'TRAMITE LEGAL', color: 'bg-gray-200 text-gray-700' },
  { code: 'NDH', label: 'NACIMIENTO DE UN HIJO', color: 'bg-rose-200 text-rose-700' },
  { code: 'M', label: 'MATRIMONIO', color: 'bg-purple-200 text-purple-700' },
  { code: 'LPF', label: 'LICENCIA POR FALLECIMIENTO', color: 'bg-lime-200 text-lime-700' },
  { code: 'EEM', label: 'ELABORACIÓN EXÁMENES MÉDICOS', color: 'bg-fuchsia-200 text-fuchsia-700' },
  { code: 'IPA', label: 'INCAPACIDAD POR ACCIDENTE', color: 'bg-cyan-200 text-cyan-700' },
  { code: 'V', label: 'VACATION', color: 'bg-red-200 text-red-700' },
];

export const employees: Employee[] = [
  {
    id: '1001',
    name: 'Carmen Rodríguez',
    position: 'Recepcionista',
    department: 'Front Desk',
    location: 'Hodelpa Gran Almirante',
    schedule: [
      { date: '2025-02-10', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-11', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-12', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-13', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-14', shift: 'M', startTime: '06:00', endTime: '14:00' },
    ]
  },
  {
    id: '1002',
    name: 'Luis Méndez',
    position: 'Chef Ejecutivo',
    department: 'Cocina',
    location: 'Hodelpa Garden Court',
    schedule: [
      { date: '2025-02-10', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-11', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-12', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-13', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-14', shift: 'D', startTime: '', endTime: '' },
    ]
  },
  {
    id: '1003',
    name: 'Ana María Santos',
    position: 'Camarera',
    department: 'Housekeeping',
    location: 'Hodelpa Gran Almirante',
    schedule: [
      { date: '2025-02-10', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-11', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-12', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-13', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-14', shift: 'LPM', startTime: '', endTime: '' },
    ]
  },
  {
    id: '1004',
    name: 'Roberto Jiménez',
    position: 'Seguridad',
    department: 'Seguridad',
    location: 'Hodelpa Garden Court',
    schedule: [
      { date: '2025-02-10', shift: 'N', startTime: '16:00', endTime: '00:00' },
      { date: '2025-02-11', shift: 'N', startTime: '16:00', endTime: '00:00' },
      { date: '2025-02-12', shift: 'N', startTime: '16:00', endTime: '00:00' },
      { date: '2025-02-13', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-14', shift: 'N', startTime: '16:00', endTime: '00:00' },
    ]
  },
  {
    id: '1005',
    name: 'María Fernanda Torres',
    position: 'Bartender',
    department: 'Bar',
    location: 'Hodelpa Gran Almirante',
    schedule: [
      { date: '2025-02-10', shift: 'T', startTime: '02:00', endTime: '10:00' },
      { date: '2025-02-11', shift: 'T', startTime: '02:00', endTime: '10:00' },
      { date: '2025-02-12', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-13', shift: 'T', startTime: '02:00', endTime: '10:00' },
      { date: '2025-02-14', shift: 'T', startTime: '02:00', endTime: '10:00' },
    ]
  },
  {
    id: '1006',
    name: 'José Carlos Ramírez',
    position: 'Mantenimiento',
    department: 'Mantenimiento',
    location: 'Hodelpa Garden Court',
    schedule: [
      { date: '2025-02-10', shift: 'A', startTime: '08:00', endTime: '16:00' },
      { date: '2025-02-11', shift: 'A', startTime: '08:00', endTime: '16:00' },
      { date: '2025-02-12', shift: 'A', startTime: '08:00', endTime: '16:00' },
      { date: '2025-02-13', shift: 'A', startTime: '08:00', endTime: '16:00' },
      { date: '2025-02-14', shift: 'D', startTime: '', endTime: '' },
    ]
  },
  {
    id: '1007',
    name: 'Isabel Morales',
    position: 'Recepcionista',
    department: 'Front Desk',
    location: 'Hodelpa Garden Court',
    schedule: [
      { date: '2025-02-10', shift: 'E', startTime: '', endTime: '' },
      { date: '2025-02-11', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-12', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-13', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-14', shift: 'D', startTime: '', endTime: '' },
    ]
  },
  {
    id: '1008',
    name: 'Miguel Ángel Pérez',
    position: 'Chef de Partida',
    department: 'Cocina',
    location: 'Hodelpa Gran Almirante',
    schedule: [
      { date: '2025-02-10', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-11', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-12', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-13', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-14', shift: 'S', startTime: '08:00', endTime: '19:00' },
    ]
  },
  {
    id: '1009',
    name: 'Laura Guzmán',
    position: 'Camarera',
    department: 'Housekeeping',
    location: 'Hodelpa Garden Court',
    schedule: [
      { date: '2025-02-10', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: 'V', shift: 'V', startTime: '', endTime: '' },
      { date: 'V', shift: 'V', startTime: '', endTime: '' },
      { date: 'V', shift: 'V', startTime: '', endTime: '' },
      { date: 'V', shift: 'V', startTime: '', endTime: '' },
    ]
  },
  {
    id: '1010',
    name: 'Daniel Herrera',
    position: 'Seguridad',
    department: 'Seguridad',
    location: 'Hodelpa Gran Almirante',
    schedule: [
      { date: '2025-02-10', shift: 'N', startTime: '16:00', endTime: '00:00' },
      { date: '2025-02-11', shift: 'N', startTime: '16:00', endTime: '00:00' },
      { date: '2025-02-12', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-13', shift: 'N', startTime: '16:00', endTime: '00:00' },
      { date: '2025-02-14', shift: 'N', startTime: '16:00', endTime: '00:00' },
    ]
  }
  // ... más empleados con diferentes escenarios
];