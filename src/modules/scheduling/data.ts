// /* eslint-disable @typescript-eslint/no-explicit-any */
// //Data de SchedulingScreen
// import { Employee, WorkShift, License } from './interfaces/types';

// export const workShifts: WorkShift[] = [
//   { id: 'A', label: 'A', startTime: '08:00', endTime: '16:00', color: 'bg-indigo-600 text-white' },
//   { id: 'M', label: 'M', startTime: '06:00', endTime: '14:00', color: 'bg-amber-700 text-white' },
//   { id: 'N', label: 'N', startTime: '16:00', endTime: '00:00', color: 'bg-blue-600 text-white' },
//   { id: 'S', label: 'S', startTime: '08:00', endTime: '19:00', color: 'bg-violet-600 text-white' },
//   { id: 'T', label: 'T', startTime: '02:00', endTime: '10:00', color: 'bg-emerald-600 text-white' },
// ];

// export const licenses: License[] = [
//   { code: 'D', label: 'DESCANSO', color: 'bg-red-200 text-red-700' },
//   { code: 'LPM', label: 'LICENCIA POR MATERNIDAD', color: 'bg-orange-200 text-orange-700' },
//   { code: 'LPTE', label: 'LICENCIA POR TRAMITE ESPECIAL', color: 'bg-blue-200 text-blue-700' },
//   { code: 'E', label: 'ESTUDIOS', color: 'bg-indigo-200 text-indigo-700' },
//   { code: 'TL', label: 'TRAMITE LEGAL', color: 'bg-gray-200 text-gray-700' },
//   { code: 'NDH', label: 'NACIMIENTO DE UN HIJO', color: 'bg-rose-200 text-rose-700' },
//   { code: 'M', label: 'MATRIMONIO', color: 'bg-purple-200 text-purple-700' },
//   { code: 'LPF', label: 'LICENCIA POR FALLECIMIENTO', color: 'bg-lime-200 text-lime-700' },
//   { code: 'EEM', label: 'ELABORACIÓN EXÁMENES MÉDICOS', color: 'bg-fuchsia-200 text-fuchsia-700' },
//   { code: 'IPA', label: 'INCAPACIDAD POR ACCIDENTE', color: 'bg-cyan-200 text-cyan-700' },
//   { code: 'V', label: 'VACATION', color: 'bg-red-200 text-red-700' },
// ];

// export const employees: Employee[] = [
//   {
//     id: '1001',
//     name: 'Carmen Rodríguez',
//     position: 'Recepcionista',
//     department: 'Front Desk',
//     location: 'Hodelpa Gran Almirante',
//     code: '1001',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:05',
//         actualExitTime: '14:02',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:15',
//         actualExitTime: '14:05',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:03',
//         actualExitTime: '13:45',
//         status: 'early'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1002',
//     name: 'Luis Méndez',
//     position: 'Chef Ejecutivo',
//     department: 'Cocina',
//     location: 'Hodelpa Garden Court',
//     code: '1002',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '07:55',
//         actualExitTime: '19:10',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '19:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         status: 'absent'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00' 
//       },
//     ]
//   },
//   {
//     id: '1003',
//     name: 'Ana María Santos',
//     position: 'Camarera',
//     department: 'Housekeeping',
//     location: 'Hodelpa Gran Almirante',
//     code: '1003',
//     contractType: 'Temporal',
//     schedule: [
//       { date: '2025-02-10', shift: 'LPM', startTime: '', endTime: '' },
//       { date: '2025-02-11', shift: 'LPM', startTime: '', endTime: '' },
//       { date: '2025-02-12', shift: 'LPM', startTime: '', endTime: '' },
//       { date: '2025-02-13', shift: 'LPM', startTime: '', endTime: '' },
//       { date: '2025-02-14', shift: 'LPM', startTime: '', endTime: '' },
//       { date: '2025-02-15', shift: 'LPM', startTime: '', endTime: '' },
//       { date: '2025-02-16', shift: 'LPM', startTime: '', endTime: '' },
//     ]
//   },
//   {
//     id: '1004',
//     name: 'Roberto Jiménez',
//     position: 'Seguridad',
//     department: 'Seguridad',
//     location: 'Hodelpa Garden Court',
//     code: '1004',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '15:55',
//         actualExitTime: '00:05',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '15:50',
//         actualExitTime: '00:10',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:20',
//         actualExitTime: '00:05',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1005',
//     name: 'María Fernanda Torres',
//     position: 'Bartender',
//     department: 'Bar',
//     location: 'Hodelpa Gran Almirante',
//     code: '1005',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'T', 
//         startTime: '02:00', 
//         endTime: '10:00',
//         actualEntryTime: '02:10',
//         actualExitTime: '10:05',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'T', 
//         startTime: '02:00', 
//         endTime: '10:00',
//         actualEntryTime: '02:05',
//         actualExitTime: '10:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'T', 
//         startTime: '02:00', 
//         endTime: '10:00',
//         actualEntryTime: '02:00',
//         actualExitTime: '09:45',
//         status: 'early'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'T', 
//         startTime: '02:00', 
//         endTime: '10:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'T', 
//         startTime: '02:00', 
//         endTime: '10:00' 
//       },
//     ]
//   },
//   {
//     id: '1006',
//     name: 'José Carlos Ramírez',
//     position: 'Mantenimiento',
//     department: 'Mantenimiento',
//     location: 'Hodelpa Garden Court',
//     code: '1006',
//     contractType: 'Por Proyecto',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '16:05',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:10',
//         actualExitTime: '16:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:05',
//         actualExitTime: '15:30',
//         status: 'early'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         status: 'absent'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00' 
//       },
//     ]
//   },
//   {
//     id: '1007',
//     name: 'Isabel Morales',
//     position: 'Recepcionista',
//     department: 'Front Desk',
//     location: 'Hodelpa Garden Court',
//     code: '1007',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'E', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:00',
//         actualExitTime: '14:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:05',
//         actualExitTime: '14:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:25',
//         actualExitTime: '14:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//     ]
//   },
//   {
//     id: '1008',
//     name: 'Miguel Ángel Pérez',
//     position: 'Chef de Partida',
//     department: 'Cocina',
//     location: 'Hodelpa Gran Almirante',
//     code: '1008',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '08:05',
//         actualExitTime: '19:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '08:15',
//         actualExitTime: '19:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '18:30',
//         status: 'early'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1009',
//     name: 'Laura Guzmán',
//     position: 'Camarera',
//     department: 'Housekeeping',
//     location: 'Hodelpa Garden Court',
//     code: '1009',
//     contractType: 'Temporal',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:10',
//         actualExitTime: '14:05',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'V', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'V', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'V', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'V', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'V', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'V', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1010',
//     name: 'Daniel Herrera',
//     position: 'Seguridad',
//     department: 'Seguridad',
//     location: 'Hodelpa Gran Almirante',
//     code: '1010',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:05',
//         actualExitTime: '00:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:00',
//         actualExitTime: '00:05',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         status: 'absent'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1011',
//     name: 'Gabriela Sánchez',
//     position: 'Supervisora de Recepción',
//     department: 'Front Desk',
//     location: 'Hodelpa Gran Almirante',
//     code: '1011',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '07:55',
//         actualExitTime: '16:10',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:02',
//         actualExitTime: '16:05',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:25',
//         actualExitTime: '16:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'TL', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1012',
//     name: 'Fernando Martínez',
//     position: 'Sommelier',
//     department: 'Restaurante',
//     location: 'Hodelpa Garden Court',
//     code: '1012',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:00',
//         actualExitTime: '00:05',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:10',
//         actualExitTime: '00:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:05',
//         actualExitTime: '23:45',
//         status: 'early'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1013',
//     name: 'Patricia Reyes',
//     position: 'Masajista',
//     department: 'Spa',
//     location: 'Hodelpa Gran Almirante',
//     code: '1013',
//     contractType: 'Por Hora',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:00',
//         actualExitTime: '14:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:15',
//         actualExitTime: '14:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'EEM', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         status: 'absent'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//     ]
//   },
//   {
//     id: '1014',
//     name: 'Héctor Gómez',
//     position: 'Técnico de Sistemas',
//     department: 'IT',
//     location: 'Hodelpa Gran Almirante',
//     code: '1014',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '16:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:05',
//         actualExitTime: '16:10',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '15:30',
//         status: 'early'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00' 
//       },
//     ]
//   },
//   {
//     id: '1015',
//     name: 'Carolina Medina',
//     position: 'Contadora',
//     department: 'Finanzas',
//     location: 'Hodelpa Garden Court',
//     code: '1015',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '16:05',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:20',
//         actualExitTime: '16:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '16:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '07:55',
//         actualExitTime: '16:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1016',
//     name: 'Javier Espinal',
//     position: 'Botones',
//     department: 'Front Desk',
//     location: 'Hodelpa Gran Almirante',
//     code: '1016',
//     contractType: 'Temporal',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:10',
//         actualExitTime: '14:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:00',
//         actualExitTime: '13:45',
//         status: 'early'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:00',
//         actualExitTime: '14:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1017',
//     name: 'Alejandra Rosario',
//     position: 'Cocinera',
//     department: 'Cocina',
//     location: 'Hodelpa Garden Court',
//     code: '1017',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '08:05',
//         actualExitTime: '19:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '19:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00',
//         actualEntryTime: '08:30',
//         actualExitTime: '19:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'S', 
//         startTime: '08:00', 
//         endTime: '19:00' 
//       },
//     ]
//   },
//   {
//     id: '1018',
//     name: 'Rafael Ortiz',
//     position: 'Jardinero',
//     department: 'Mantenimiento',
//     location: 'Hodelpa Garden Court',
//     code: '1018',
//     contractType: 'Por Proyecto',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00',
//         actualEntryTime: '06:00',
//         actualExitTime: '14:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'IPA', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'IPA', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'IPA', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'M', 
//         startTime: '06:00', 
//         endTime: '14:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   },
//   {
//     id: '1019',
//     name: 'Lucía Hernández',
//     position: 'Maître',
//     department: 'Restaurante',
//     location: 'Hodelpa Gran Almirante',
//     code: '1019',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:00',
//         actualExitTime: '00:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '16:05',
//         actualExitTime: '00:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00',
//         actualEntryTime: '15:55',
//         actualExitTime: '00:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'N', 
//         startTime: '16:00', 
//         endTime: '00:00' 
//       },
//     ]
//   },
//   {
//     id: '1020',
//     name: 'Elena Peralta',
//     position: 'Relaciones Públicas',
//     department: 'Marketing',
//     location: 'Hodelpa Gran Almirante',
//     code: '1020',
//     contractType: 'Indefinido',
//     schedule: [
//       { 
//         date: '2025-02-10', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:00',
//         actualExitTime: '16:00',
//         status: 'onTime'
//       },
//       { 
//         date: '2025-02-11', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00',
//         actualEntryTime: '08:10',
//         actualExitTime: '16:00',
//         status: 'late'
//       },
//       { 
//         date: '2025-02-12', 
//         shift: 'NDH', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-13', 
//         shift: 'NDH', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-14', 
//         shift: 'A', 
//         startTime: '08:00', 
//         endTime: '16:00' 
//       },
//       { 
//         date: '2025-02-15', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//       { 
//         date: '2025-02-16', 
//         shift: 'D', 
//         startTime: '', 
//         endTime: '' 
//       },
//     ]
//   }
// ];

// // Sedes (Locations)
// export const locations = [
//   { id: 'loc1', name: 'Hodelpa Gran Almirante' },
//   { id: 'loc2', name: 'Hodelpa Garden Court' }
// ];

// // Departamentos
// export const departments = [
//   { id: 'dep1', name: 'Front Desk', locationId: 'loc1' },
//   { id: 'dep2', name: 'Cocina', locationId: 'loc1' },
//   { id: 'dep3', name: 'Housekeeping', locationId: 'loc1' },
//   { id: 'dep4', name: 'Seguridad', locationId: 'loc1' },
//   { id: 'dep5', name: 'Bar', locationId: 'loc1' },
//   { id: 'dep6', name: 'Mantenimiento', locationId: 'loc1' },
//   { id: 'dep7', name: 'Spa', locationId: 'loc1' },
//   { id: 'dep8', name: 'IT', locationId: 'loc1' },
//   { id: 'dep9', name: 'Marketing', locationId: 'loc1' },
//   { id: 'dep10', name: 'Front Desk', locationId: 'loc2' },
//   { id: 'dep11', name: 'Cocina', locationId: 'loc2' },
//   { id: 'dep12', name: 'Housekeeping', locationId: 'loc2' },
//   { id: 'dep13', name: 'Seguridad', locationId: 'loc2' },
//   { id: 'dep14', name: 'Mantenimiento', locationId: 'loc2' },
//   { id: 'dep15', name: 'Restaurante', locationId: 'loc2' },
//   { id: 'dep16', name: 'Finanzas', locationId: 'loc2' }
// ];

// // Secciones
// export const sections = [
//   { id: 'sec1', name: 'Recepción', departmentId: 'dep1' },
//   { id: 'sec2', name: 'Reservas', departmentId: 'dep1' },
//   { id: 'sec3', name: 'Cocina Caliente', departmentId: 'dep2' },
//   { id: 'sec4', name: 'Cocina Fría', departmentId: 'dep2' },
//   { id: 'sec5', name: 'Pastelería', departmentId: 'dep2' },
//   { id: 'sec6', name: 'Habitaciones', departmentId: 'dep3' },
//   { id: 'sec7', name: 'Áreas Comunes', departmentId: 'dep3' },
//   { id: 'sec8', name: 'Seguridad Interna', departmentId: 'dep4' },
//   { id: 'sec9', name: 'Seguridad Externa', departmentId: 'dep4' },
//   { id: 'sec10', name: 'Bar Principal', departmentId: 'dep5' },
//   { id: 'sec11', name: 'Bar Piscina', departmentId: 'dep5' },
//   { id: 'sec12', name: 'Reparaciones', departmentId: 'dep6' },
//   { id: 'sec13', name: 'Jardinería', departmentId: 'dep6' },
//   { id: 'sec14', name: 'Masajes', departmentId: 'dep7' },
//   { id: 'sec15', name: 'Soporte Técnico', departmentId: 'dep8' },
//   { id: 'sec16', name: 'Redes', departmentId: 'dep8' },
//   { id: 'sec17', name: 'Publicidad', departmentId: 'dep9' },
//   { id: 'sec18', name: 'Relaciones Públicas', departmentId: 'dep9' },
//   { id: 'sec19', name: 'Recepción', departmentId: 'dep10' },
//   { id: 'sec20', name: 'Cocina Principal', departmentId: 'dep11' },
//   { id: 'sec21', name: 'Habitaciones', departmentId: 'dep12' },
//   { id: 'sec22', name: 'Seguridad', departmentId: 'dep13' },
//   { id: 'sec23', name: 'Reparaciones', departmentId: 'dep14' },
//   { id: 'sec24', name: 'Servicio', departmentId: 'dep15' },
//   { id: 'sec25', name: 'Contabilidad', departmentId: 'dep16' }
// ];

// // Unidades
// export const units = [
//   { id: 'uni1', name: 'Recepción Mañana', sectionId: 'sec1' },
//   { id: 'uni2', name: 'Recepción Tarde', sectionId: 'sec1' },
//   { id: 'uni3', name: 'Recepción Noche', sectionId: 'sec1' },
//   { id: 'uni4', name: 'Reservas Nacionales', sectionId: 'sec2' },
//   { id: 'uni5', name: 'Reservas Internacionales', sectionId: 'sec2' },
//   { id: 'uni6', name: 'Carnes', sectionId: 'sec3' },
//   { id: 'uni7', name: 'Guarniciones', sectionId: 'sec3' },
//   { id: 'uni8', name: 'Ensaladas', sectionId: 'sec4' },
//   { id: 'uni9', name: 'Postres', sectionId: 'sec5' },
//   { id: 'uni10', name: 'Limpieza General', sectionId: 'sec6' },
//   { id: 'uni11', name: 'Supervisión', sectionId: 'sec6' },
//   { id: 'uni12', name: 'Áreas Públicas', sectionId: 'sec7' },
//   { id: 'uni13', name: 'Guardia Diurna', sectionId: 'sec8' },
//   { id: 'uni14', name: 'Guardia Nocturna', sectionId: 'sec8' },
//   { id: 'uni15', name: 'Perímetro', sectionId: 'sec9' },
//   { id: 'uni16', name: 'Bartenders', sectionId: 'sec10' },
//   { id: 'uni17', name: 'Meseros Bar', sectionId: 'sec10' },
//   { id: 'uni18', name: 'Bartenders Piscina', sectionId: 'sec11' },
//   { id: 'uni19', name: 'Mantenimiento General', sectionId: 'sec12' },
//   { id: 'uni20', name: 'Aire Acondicionado', sectionId: 'sec12' },
//   { id: 'uni21', name: 'Jardineros', sectionId: 'sec13' },
//   { id: 'uni22', name: 'Terapeutas', sectionId: 'sec14' },
//   { id: 'uni23', name: 'Técnicos IT', sectionId: 'sec15' },
//   { id: 'uni24', name: 'Community Managers', sectionId: 'sec17' },
//   { id: 'uni25', name: 'Promotores', sectionId: 'sec18' }
// ];

// // Función auxiliar para mapear IDs a departamentos, secciones, etc.
// export const mapEmployeeToOrganization = (employee: any) => {
//   // Mapear la location del empleado al id correspondiente
//   const locationName = employee.location;
//   const location = locations.find(loc => loc.name === locationName);
//   const locationId = location ? location.id : null;
  
//   // Mapear el departamento del empleado al id correspondiente
//   const departmentName = employee.department;
//   let department = null;
//   if (locationId) {
//     department = departments.find(
//       dep => dep.name === departmentName && dep.locationId === locationId
//     );
//   } else {
//     department = departments.find(dep => dep.name === departmentName);
//   }
//   const departmentId = department ? department.id : null;
  
//   // No tenemos suficiente información para mapear directamente a secciones y unidades
//   // Pero podríamos hacer un mapeo aproximado basado en el cargo
  
//   return {
//     ...employee,
//     locationId,
//     departmentId
//   };
// };