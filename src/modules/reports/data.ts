import type { ReportCategory, ReportColumn } from '../../types';

export const reportCategories: ReportCategory[] = [
  {
    id: 'attendance',
    name: 'Reportes de Asistencia',
    reports: [
      'Marcajes',
      'Horas Trabajadas',
      'Cumplimiento',
      'Tardanzas',
      'Ausencias',
      'Comparativas'
    ]
  },
  {
    id: 'incidents',
    name: 'Reportes de Incidencias',
    reports: [
      'Incidencias por Tipo',
      'Incidencias por Empleado',
      'Resolución de Incidencias'
    ]
  },
  {
    id: 'operations',
    name: 'Reportes Operativos',
    reports: [
      'Eficiencia Operativa',
      'Cobertura de Turnos',
      'Rotación de Personal'
    ]
  },
  {
    id: 'export',
    name: 'Exportación',
    reports: [
      'Exportar a Nómina',
      'Exportar a Excel',
      'Exportar a PDF'
    ]
  }
];

export const reportColumns: Record<string, ReportColumn[]> = {
  'Marcajes': [
    { field: 'employeeId', header: 'Código' },
    { field: 'employeeName', header: 'Empleado' },
    { field: 'department', header: 'Departamento' },
    { field: 'checkIn', header: 'Entrada' },
    { field: 'checkOut', header: 'Salida' },
    { field: 'totalHours', header: 'Horas' },
    { field: 'status', header: 'Estado' }
  ],
  'Horas Trabajadas': [
    { field: 'employeeId', header: 'Código' },
    { field: 'employeeName', header: 'Empleado' },
    { field: 'department', header: 'Departamento' },
    { field: 'regularHours', header: 'Horas Normales' },
    { field: 'overtimeHours', header: 'Horas Extras' },
    { field: 'nightHours', header: 'Horas Nocturnas' },
    { field: 'holidayHours', header: 'Horas Feriadas' },
    { field: 'totalHours', header: 'Total Horas' }
  ],
  'Cumplimiento': [
    { field: 'employeeId', header: 'Código' },
    { field: 'employeeName', header: 'Empleado' },
    { field: 'department', header: 'Departamento' },
    { field: 'scheduledDays', header: 'Días Programados' },
    { field: 'attendedDays', header: 'Días Asistidos' },
    { field: 'onTimeDays', header: 'Días a Tiempo' },
    { field: 'lateDays', header: 'Días con Tardanza' },
    { field: 'complianceRate', header: 'Tasa Cumplimiento' }
  ]
};

// Mock data for reports
export const mockReportData = {
  'Marcajes': [
    {
      employeeId: '1001',
      employeeName: 'Juan Pérez',
      department: 'Operaciones',
      checkIn: '08:00',
      checkOut: '17:00',
      totalHours: '9:00',
      status: 'A tiempo'
    },
    {
      employeeId: '1002',
      employeeName: 'María González',
      department: 'Front Desk',
      checkIn: '07:15',
      checkOut: '15:30',
      totalHours: '8:15',
      status: 'A tiempo'
    },
    {
      employeeId: '1003',
      employeeName: 'Carlos Rodríguez',
      department: 'Mantenimiento',
      checkIn: '08:20',
      checkOut: '17:00',
      totalHours: '8:40',
      status: 'Tardanza'
    }
  ],
  'Horas Trabajadas': [
    {
      employeeId: '1001',
      employeeName: 'Juan Pérez',
      department: 'Operaciones',
      regularHours: 160,
      overtimeHours: 12,
      nightHours: 0,
      holidayHours: 8,
      totalHours: 180
    },
    {
      employeeId: '1002',
      employeeName: 'María González',
      department: 'Front Desk',
      regularHours: 168,
      overtimeHours: 8,
      nightHours: 40,
      holidayHours: 0,
      totalHours: 216
    }
  ],
  'Cumplimiento': [
    {
      employeeId: '1001',
      employeeName: 'Juan Pérez',
      department: 'Operaciones',
      scheduledDays: 22,
      attendedDays: 21,
      onTimeDays: 20,
      lateDays: 1,
      complianceRate: '95%'
    },
    {
      employeeId: '1002',
      employeeName: 'María González',
      department: 'Front Desk',
      scheduledDays: 22,
      attendedDays: 22,
      onTimeDays: 22,
      lateDays: 0,
      complianceRate: '100%'
    }
  ]
};

export const reportStats = {
  attendance: {
    totalEmployees: 450,
    presentToday: 425,
    lateToday: 15,
    absentToday: 10,
    complianceRate: 94.5
  },
  hours: {
    regularHours: 16450,
    overtimeHours: 2180,
    nightHours: 845,
    holidayHours: 320,
    totalHours: 19795
  },
  compliance: {
    attendanceRate: 95,
    punctualityRate: 92,
    hoursCompletionRate: 98
  }
};