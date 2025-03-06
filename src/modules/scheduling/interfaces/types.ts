//Interfaces de SchedulingScreen
export interface Employee {
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  genero?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  fechaNacimiento?: string;
  telefono?: string;
  correo?: string;
  permitirVisitas?: boolean;
  codigo?: string;
  modalidadTiempo?: string;
  fechaInicialContrato?: string;
  fechaFinalContrato?: string;
  empresa?: string;
  sede?: string;
  tipoPlanificacion?: string;
  cargo?: string;
  perfilesMarcaje?: string[];
  profileImage?: string;
  name?: string;
  position?: string;
  department?: string;
  initial?: string;
  section: string;
  unit?: string;
  method: string;
  id: string;
  status?: 'active' | 'inactive';
  email?: string;
  phone?: string;
  startDate?: string;
  location?: string;
  
}

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