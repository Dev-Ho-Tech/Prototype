/* eslint-disable @typescript-eslint/no-explicit-any */

export interface WorkShift {
  id: string;
  label?: string;
  description?: string;
  color?: string;
  startTime?: string;
  endTime?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
  defaultDuration?: string;
  breaks?: {
    start: string;
    end: string;
    duration: number;
  }[];
}

export interface License {
  code: string;
  label: string;
  description?: string;
  color?: string;
  defaultDuration?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
  requiresApproval?: boolean;
}

export interface ScheduleEntry {
  date: string;
  shift: string;
  startTime: string;
  endTime: string;
  // Nuevos campos para marcajes biométricos
  actualEntryTime?: string;
  actualExitTime?: string;
  status?: 'onTime' | 'late' | 'early' | 'absent' | 'pending';
  isResizingStart?: boolean;
  isResizingEnd?: boolean;
  isMoving?: boolean;
  employeeId?: string;
  sensitivity?: number;
  initialX?: number;
}

export type Period = 'Diario' | 'Semanal' | 'Mensual' | 'Seleccionar fechas';

// Interfaz para los elementos arrastrables
export interface DragInfo {
  isResizing: boolean;
  isStartHandle?: boolean;
  startX: number;
  initialLeft: number;
  initialWidth: number;
  scheduleEntry?: ScheduleEntry;
}

export interface EmployeeFilters {
  sedes: string[];
  departamentos: string[];
  secciones: string[];
  unidades: string[];
}

export interface DragOperation {
  type: 'shift' | 'license' | 'move' | 'resize';
  elementId: string;
  initialX: number;
  initialY: number;
  currentX: number;
  currentY: number; 
  data: any;
}