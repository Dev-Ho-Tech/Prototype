import type { Employee } from '../../types';

export const employeesData: Employee[] = [
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
  }
];

interface Check {
  id: string;
  employee: {
    id: string;
    name: string;
    position: string;
    photo: string;
  };
  schedule: {
    shift: string;
    startTime: string;
    endTime: string;
  };
  checkIn: string;
  checkOut: string | null;
  duration: string;
  status: 'onTime' | 'late' | 'absent';
  location: string;
  device: string;
}

export const checksData: Check[] = [
  {
    id: 'CHK001',
    employee: {
      id: 'EMP001',
      name: 'Juan Pérez',
      position: 'Recepcionista',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
    },
    schedule: {
      shift: 'M',
      startTime: '06:00',
      endTime: '14:00'
    },
    checkIn: '06:00',
    checkOut: '14:00',
    duration: '8h 00m',
    status: 'onTime',
    location: 'Entrada Principal',
    device: 'BIO-001'
  },
  {
    id: 'CHK002',
    employee: {
      id: 'EMP002',
      name: 'María González',
      position: 'Camarera',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop'
    },
    schedule: {
      shift: 'M',
      startTime: '06:00',
      endTime: '14:00'
    },
    checkIn: '06:15',
    checkOut: null,
    duration: '2h 45m',
    status: 'late',
    location: 'Entrada Personal',
    device: 'BIO-002'
  },
  {
    id: 'CHK003',
    employee: {
      id: 'EMP003',
      name: 'Carlos Rodríguez',
      position: 'Chef',
      photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop'
    },
    schedule: {
      shift: 'M',
      startTime: '05:00',
      endTime: '13:00'
    },
    checkIn: '05:00',
    checkOut: null,
    duration: '4h 00m',
    status: 'onTime',
    location: 'Entrada Cocina',
    device: 'BIO-003'
  }
];

interface HourApproval {
  id: string;
  employee: {
    id: string;
    name: string;
    position: string;
    photo: string;
  };
  date: string;
  type: 'regular' | 'overtime' | 'holiday';
  hours: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  approver: string | null;
  approvedAt: string | null;
  comments: string | null;
}

export const hourApprovalsData: HourApproval[] = [
  {
    id: 'APR001',
    employee: {
      id: 'EMP001',
      name: 'Juan Pérez',
      position: 'Recepcionista',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
    },
    date: '2025-02-14',
    type: 'overtime',
    hours: 2.5,
    status: 'pending',
    submittedBy: 'Ana Ramírez',
    submittedAt: '2025-02-14T15:00:00',
    approver: null,
    approvedAt: null,
    comments: 'Cubriendo turno extra por ausencia'
  },
  {
    id: 'APR002',
    employee: {
      id: 'EMP002',
      name: 'María González',
      position: 'Camarera',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop'
    },
    date: '2025-02-14',
    type: 'holiday',
    hours: 8,
    status: 'approved',
    submittedBy: 'Carlos Méndez',
    submittedAt: '2025-02-14T09:00:00',
    approver: 'Roberto Jiménez',
    approvedAt: '2025-02-14T10:30:00',
    comments: 'Trabajo en día feriado'
  }
];

interface Absence {
  id: string;
  employee: {
    id: string;
    name: string;
    position: string;
    photo: string;
  };
  type: 'vacation' | 'sick' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  approver: string | null;
  documents: {
    name: string;
    url: string;
  }[];
}

export const absencesData: Absence[] = [
  {
    id: 'ABS001',
    employee: {
      id: 'EMP001',
      name: 'Juan Pérez',
      position: 'Recepcionista',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
    },
    type: 'vacation',
    startDate: '2025-03-15',
    endDate: '2025-03-30',
    status: 'approved',
    reason: 'Vacaciones anuales',
    approver: 'Ana Ramírez',
    documents: []
  },
  {
    id: 'ABS002',
    employee: {
      id: 'EMP002',
      name: 'María González',
      position: 'Camarera',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop'
    },
    type: 'sick',
    startDate: '2025-02-14',
    endDate: '2025-02-16',
    status: 'pending',
    reason: 'Reposo médico',
    approver: null,
    documents: [
      {
        name: 'Certificado médico.pdf',
        url: '/documents/cert-001.pdf'
      }
    ]
  }
];

export const workShifts = [
  { id: 'A', label: 'A', startTime: '08:00', endTime: '16:00', color: 'bg-indigo-600 text-white' },
  { id: 'M', label: 'M', startTime: '06:00', endTime: '14:00', color: 'bg-amber-700 text-white' },
  { id: 'N', label: 'N', startTime: '16:00', endTime: '00:00', color: 'bg-blue-600 text-white' },
  { id: 'S', label: 'S', startTime: '08:00', endTime: '19:00', color: 'bg-violet-600 text-white' },
  { id: 'T', label: 'T', startTime: '02:00', endTime: '10:00', color: 'bg-emerald-600 text-white' },
];

export const licenses = [
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