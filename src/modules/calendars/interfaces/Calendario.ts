export type PeriodoTipo = 'diario' | 'semanal' | 'quincenal' | 'mensual';

export interface AsignacionTurno {
  id: string;
  empleadoId: string;
  turnoId: string;
  fecha: string; // formato ISO
  horaInicio?: string; // para casos donde se personaliza
  horaFin?: string; // para casos donde se personaliza
}

export interface AsignacionPermiso {
  id: string;
  empleadoId: string;
  permisoId: string;
  fecha: string; // formato ISO
  fechaFin?: string; // para permisos de varios días
  horaInicio?: string;
  horaFin?: string;
  motivo?: string;
}

export interface DiaCalendario {
  fecha: string; // formato ISO
  diaSemana: number; // 0-6 (domingo-sábado)
  esFeriado: boolean;
  feriado?: string;
}