import { WorkShift } from '../interfaces/WorkShift';

export const departments = [
  { id: '1', name: 'Producción' },
  { id: '2', name: 'Administración' },
  { id: '3', name: 'Recursos Humanos' },
  { id: '4', name: 'Ventas' },
  { id: '5', name: 'Logística' },
  { id: '6', name: 'Tecnología' },
  { id: '7', name: 'Marketing' }
];

export const workShiftsData: WorkShift[] = [
  {
    id: '1',
    code: '001',
    name: 'Mañana',
    startTime: '07:00 AM',
    endTime: '03:00 PM',
    departments: ['Producción', 'Administración'],
    status: 'active',
    workDays: [
      { day: 'monday', isActive: true },
      { day: 'tuesday', isActive: true },
      { day: 'wednesday', isActive: true },
      { day: 'thursday', isActive: true },
      { day: 'friday', isActive: true },
      { day: 'saturday', isActive: false },
      { day: 'sunday', isActive: false }
    ],
    startDayOfWeek: 'monday',
    breaks: [
      { id: '1-1', startTime: '12:00', endTime: '13:00', description: 'Almuerzo' }
    ],
    requiresSupervision: false,
    autoApprove: true,
    notes: '',
    applyOnHolidays: false,
    allowDayCrossing: false
  },
  {
    id: '2',
    code: '002',
    name: 'Tarde',
    startTime: '03:00 PM',
    endTime: '11:00 PM',
    departments: ['Producción'],
    status: 'active',
    workDays: [
      { day: 'monday', isActive: true },
      { day: 'tuesday', isActive: true },
      { day: 'wednesday', isActive: true },
      { day: 'thursday', isActive: true },
      { day: 'friday', isActive: true },
      { day: 'saturday', isActive: false },
      { day: 'sunday', isActive: false }
    ],
    startDayOfWeek: 'monday',
    breaks: [
      { id: '2-1', startTime: '19:00', endTime: '20:00', description: 'Cena' }
    ],
    requiresSupervision: false,
    autoApprove: true,
    notes: '',
    applyOnHolidays: false,
    allowDayCrossing: false
  },
  {
    id: '3',
    code: '003',
    name: 'Noche',
    startTime: '11:00 PM',
    endTime: '07:00 AM',
    departments: ['Producción'],
    status: 'active',
    workDays: [
      { day: 'monday', isActive: true },
      { day: 'tuesday', isActive: true },
      { day: 'wednesday', isActive: true },
      { day: 'thursday', isActive: true },
      { day: 'friday', isActive: true },
      { day: 'saturday', isActive: false },
      { day: 'sunday', isActive: false }
    ],
    startDayOfWeek: 'monday',
    breaks: [
      { id: '3-1', startTime: '03:00', endTime: '03:30', description: 'Refrigerio' }
    ],
    requiresSupervision: true,
    autoApprove: false,
    notes: 'Turno con rotación semanal',
    applyOnHolidays: false,
    allowDayCrossing: true
  },
  {
    id: '4',
    code: '004',
    name: 'Administrativo',
    startTime: '08:00 AM',
    endTime: '05:00 PM',
    departments: ['Administración', 'Recursos Humanos'],
    status: 'active',
    workDays: [
      { day: 'monday', isActive: true },
      { day: 'tuesday', isActive: true },
      { day: 'wednesday', isActive: true },
      { day: 'thursday', isActive: true },
      { day: 'friday', isActive: true },
      { day: 'saturday', isActive: false },
      { day: 'sunday', isActive: false }
    ],
    startDayOfWeek: 'monday',
    breaks: [
      { id: '4-1', startTime: '12:00', endTime: '13:00', description: 'Almuerzo' }
    ],
    requiresSupervision: false,
    autoApprove: true,
    notes: '',
    applyOnHolidays: false,
    allowDayCrossing: false
  },
  {
    id: '5',
    code: '005',
    name: 'Fin de Semana',
    startTime: '08:00 AM',
    endTime: '08:00 PM',
    departments: ['Ventas'],
    status: 'inactive',
    workDays: [
      { day: 'monday', isActive: false },
      { day: 'tuesday', isActive: false },
      { day: 'wednesday', isActive: false },
      { day: 'thursday', isActive: false },
      { day: 'friday', isActive: false },
      { day: 'saturday', isActive: true },
      { day: 'sunday', isActive: true }
    ],
    startDayOfWeek: 'saturday',
    breaks: [
      { id: '5-1', startTime: '13:00', endTime: '14:00', description: 'Almuerzo' }
    ],
    requiresSupervision: false,
    autoApprove: true,
    notes: 'Solo aplica para personal de ventas',
    applyOnHolidays: true,
    allowDayCrossing: false
  }
];

// Opciones de tiempo para selectores
export const hours = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];

export const minutes = [
  '00', '15', '30', '45'
];

export const ampm = ['AM', 'PM'];

export const daysOfWeek = [
  { value: 'monday', label: 'Lunes' },
  { value: 'tuesday', label: 'Martes' },
  { value: 'wednesday', label: 'Miércoles' },
  { value: 'thursday', label: 'Jueves' },
  { value: 'friday', label: 'Viernes' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' }
];

export const translateDay = (day: string): string => {
  const translations: Record<string, string> = {
    'monday': 'Lun',
    'tuesday': 'Mar',
    'wednesday': 'Mié',
    'thursday': 'Jue',
    'friday': 'Vie',
    'saturday': 'Sáb',
    'sunday': 'Dom'
  };
  return translations[day] || day;
};

export const translateDayFull = (day: string): string => {
  const translations: Record<string, string> = {
    'monday': 'Lunes',
    'tuesday': 'Martes',
    'wednesday': 'Miércoles',
    'thursday': 'Jueves',
    'friday': 'Viernes',
    'saturday': 'Sábado',
    'sunday': 'Domingo'
  };
  return translations[day] || day;
};