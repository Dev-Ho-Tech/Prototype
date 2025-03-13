export interface ReportCategory {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  path: string;
}

export type ReportCategoryList = ReportCategory[];

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ReportFilter {
  dateRange: DateRange;
  employees?: string[]; // Employee IDs
  departments?: string[];
  categories?: string[]; // Report Category IDs
}

export interface TimeEntry {
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  hoursWorked?: number;
  status: 'present' | 'absent' | 'late' | 'incomplete' | 'pending';
  notes?: string;
}

export interface HotelHoursData {
  employeeId: string;
  date: Date;
  regularHours: number;
  extraHours: number;
  nightHours: number;
  holidayHours: number;
  totalHours: number;
}

export interface AttendanceData {
  employeeId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkIn?: Date;
  checkOut?: Date;
}

export interface BiometricData {
  employeeId: string;
  date: Date;
  deviceId: string;
  checkIn?: Date;
  checkOut?: Date;
  verified: boolean;
}

export type ReportData = TimeEntry[] | HotelHoursData[] | AttendanceData[] | BiometricData[];

export interface Report {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  filter: ReportFilter;
  data: ReportData;
  createdAt: Date;
  exportFormats: ('pdf' | 'excel' | 'csv' | 'xml')[];
}