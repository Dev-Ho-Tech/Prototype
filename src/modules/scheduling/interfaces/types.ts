
export interface WorkShift {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  color: string;
}

export interface License {
  code: string;
  label: string;
  color: string;
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