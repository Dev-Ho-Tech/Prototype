export interface WorkShift {
  id: string;
  code: string;
  name: string;
  startTime: string;
  endTime: string;
  departments: string[];
  status: 'active' | 'inactive';
  workDays: WorkDay[];
  startDayOfWeek: DayOfWeek;
  breaks: Break[];
  requiresSupervision: boolean;
  autoApprove: boolean;
  notes: string;
  applyOnHolidays: boolean;
  allowDayCrossing: boolean;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface WorkDay {
  day: DayOfWeek;
  isActive: boolean;
}

export interface Break {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface TimeOption {
  value: string;
  label: string;
}