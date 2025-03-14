import { ReportCategoryList } from '../interfaces/Report';

export const mockReportCategories: ReportCategoryList = [
  {
    id: 'hotel-hours',
    name: 'Hotelería - horas trabajadas',
    description: 'Reporte detallado del sector hotelero',
    path: '/hotel-hours',
    color: 'bg-yellow-400',
    icon: 'clock'
  },
  {
    id: 'no-schedule',
    name: 'Planilla sin horario',
    description: 'Empleados sin horario asignado',
    path: '/no-schedule',
    color: 'bg-pink-400',
    icon: 'calendar'
  },
  {
    id: 'biometric',
    name: 'Personas con biometría',
    description: 'Datos biométricos registrados',
    path: '/biometric',
    color: 'bg-green-400',
    icon: 'clipboard-check'
  },
  {
    id: 'bulk-upload',
    name: 'Carga masiva de personas',
    description: 'Importar múltiples empleados',
    path: '/bulk-upload',
    color: 'bg-green-400',
    icon: 'users'
  },
  {
    id: 'hotel-summary',
    name: 'Hotelería - sumatorio',
    description: 'Resumen métricas hoteleras',
    path: '/hotel-summary',
    color: 'bg-blue-400',
    icon: 'bar-chart-2'
  },
  {
    id: 'people-list',
    name: 'Listado de personas',
    description: 'Directorio completo de personal',
    path: '/people-list',
    color: 'bg-purple-400',
    icon: 'file-text'
  },
  {
    id: 'attendance',
    name: 'Marcajes de asistencia',
    description: 'Registro entradas y salidas',
    path: '/attendance',
    color: 'bg-purple-400',
    icon: 'clipboard-list'
  },
  {
    id: 'worked-time',
    name: 'Tiempo trabajado',
    description: 'Análisis de horas por persona',
    path: '/worked-time',
    color: 'bg-lime-400',
    icon: 'trending-up'
  },
  {
    id: 'pending-approval',
    name: 'Tiempo sin aprobar',
    description: 'Horas pendientes de aprobación',
    path: '/pending-approval',
    color: 'bg-cyan-400',
    icon: 'alert-triangle'
  }
];