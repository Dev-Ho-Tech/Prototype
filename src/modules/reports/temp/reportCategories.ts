import { ReportCategoryList } from '../interfaces/Report';

export const mockReportCategories: ReportCategoryList = [
  {
    id: 'hotel-hours',
    name: 'Hotelería - horas trabajadas',
    description: 'Reporte de horas trabajadas en el hotel',
    icon: 'document-text', // Asumiendo que usaremos alguna biblioteca de iconos
    color: 'bg-amber-500',
    path: '/hotel-hours' // Ruta relativa que será combinada con la base
  },
  {
    id: 'schedule-without-hours',
    name: 'Planilla sin horario',
    description: 'Reporte de empleados sin horario asignado',
    icon: 'document-text',
    color: 'bg-red-300',
    path: '/schedule-without-hours'
  },
  {
    id: 'biometric-persons',
    name: 'Personas con biometría',
    description: 'Reporte de personas con registro biométrico',
    icon: 'document-text',
    color: 'bg-green-400',
    path: '/biometric-persons'
  },
  {
    id: 'bulk-person-upload',
    name: 'Carga masiva de personas',
    description: 'Herramienta para carga masiva de personas',
    icon: 'document-text',
    color: 'bg-emerald-400',
    path: '/bulk-person-upload'
  },
  {
    id: 'hotel-summary',
    name: 'Hotelería - sumatorio',
    description: 'Reporte sumatorio de hotelería',
    icon: 'document-text',
    color: 'bg-blue-400',
    path: '/hotel-summary'
  },
  {
    id: 'person-list',
    name: 'Listado de personas',
    description: 'Reporte con listado de personas',
    icon: 'document-text',
    color: 'bg-pink-400',
    path: '/person-list'
  },
  {
    id: 'attendance-marks',
    name: 'Marcajes de asistencia',
    description: 'Reporte de marcajes de asistencia',
    icon: 'flag',
    color: 'bg-purple-400',
    path: '/attendance-marks'
  },
  {
    id: 'time-worked',
    name: 'Tiempo trabajado',
    description: 'Reporte de tiempo trabajado',
    icon: 'calendar',
    color: 'bg-lime-400',
    path: '/time-worked'
  },
  {
    id: 'unapproved-time',
    name: 'Tiempo sin aprobar',
    description: 'Reporte de tiempo sin aprobar',
    icon: 'document-text',
    color: 'bg-cyan-400',
    path: '/unapproved-time'
  }
];