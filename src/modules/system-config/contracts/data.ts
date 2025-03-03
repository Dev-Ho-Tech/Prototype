import { 
  Contract, 
  ContractType, 
  ScheduleLimitGroup 
} from './interfaces/types';

// Grupos de límite de horarios
export const scheduleLimitGroups: ScheduleLimitGroup[] = [
  {
    id: 'group-1',
    name: 'Semanal',
    type: 'weekly'
  },
  {
    id: 'group-2',
    name: 'Diario',
    type: 'daily'
  },
  {
    id: 'group-3',
    name: 'Quincenal',
    type: 'biweekly'
  },
  {
    id: 'group-4',
    name: 'Mensual',
    type: 'monthly'
  }
];

// Datos de muestra para contratos
export const contractsData: Contract[] = [
  {
    id: 'contract-1',
    code: '001',
    name: 'Administrativo',
    type: ContractType.FIXED,
    duration: 'Indefinido',
    workingHours: {
      perWeek: 40,
      maxDailyHours: 8,
      minOvertimeHours: 1,
      maxOvertimeHours: 2,
      nightShiftStart: '09:00 pm',
      nightShiftEnd: '07:00 am',
      startDay: 'Lunes',
      scheduleLimitGroup: 'Semanal'
    },
    overtimeAllowed: true,
    crossDays: false,
    autoApprove: false,
    ignoreAbsences: false,
    firstLastCheck: true,
    status: 'active',
    employeeCount: 32
  },
  {
    id: 'contract-2',
    code: '002',
    name: 'Operativo',
    type: ContractType.FIXED,
    duration: 'Indefinido',
    workingHours: {
      perWeek: 48,
      maxDailyHours: 10,
      minOvertimeHours: 1,
      maxOvertimeHours: 2,
      nightShiftStart: '09:00 pm',
      nightShiftEnd: '06:00 am',
      startDay: 'Lunes',
      scheduleLimitGroup: 'Semanal'
    },
    overtimeAllowed: true,
    crossDays: true,
    autoApprove: true,
    ignoreAbsences: false,
    firstLastCheck: true,
    status: 'active',
    employeeCount: 56
  },
  {
    id: 'contract-3',
    code: '003',
    name: 'Seguridad/mantenimiento',
    type: ContractType.FIXED,
    duration: 'Indefinido',
    workingHours: {
      perWeek: 48,
      maxDailyHours: 12,
      minOvertimeHours: 0,
      maxOvertimeHours: 4,
      nightShiftStart: '09:00 pm',
      nightShiftEnd: '07:00 am',
      startDay: 'Lunes',
      scheduleLimitGroup: 'Semanal'
    },
    overtimeAllowed: true,
    crossDays: true,
    autoApprove: true,
    ignoreAbsences: true,
    firstLastCheck: false,
    status: 'active',
    employeeCount: 14
  },
  {
    id: 'contract-4',
    code: '004',
    name: 'Pasante',
    type: ContractType.INTERNSHIP,
    duration: '6 meses',
    workingHours: {
      perWeek: 20,
      maxDailyHours: 4,
      minOvertimeHours: 0,
      maxOvertimeHours: 0,
      startDay: 'Lunes',
      scheduleLimitGroup: 'Semanal'
    },
    overtimeAllowed: false,
    crossDays: false,
    autoApprove: true,
    ignoreAbsences: false,
    firstLastCheck: true,
    status: 'active',
    employeeCount: 5
  },
  {
    id: 'contract-5',
    code: '005',
    name: 'Temporal',
    type: ContractType.TEMPORARY,
    duration: '3 meses',
    workingHours: {
      perWeek: 40,
      maxDailyHours: 8,
      minOvertimeHours: 1,
      maxOvertimeHours: 2,
      nightShiftStart: '09:00 pm',
      nightShiftEnd: '07:00 am',
      startDay: 'Lunes',
      scheduleLimitGroup: 'Semanal'
    },
    overtimeAllowed: true,
    crossDays: false,
    autoApprove: false,
    ignoreAbsences: false,
    firstLastCheck: true,
    status: 'active',
    employeeCount: 10
  }
];