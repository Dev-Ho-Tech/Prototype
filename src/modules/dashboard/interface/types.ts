export interface Employee {
  id: number;
  nombre: string;
  foto: string | null;
  estado: 'trabajando' | 'permiso' | 'ausencia' | 'planificado' | 'trabajó' | string;
  horas: string;
  pais: string;
  ultimaAccion: string | null;
  dispositivo: 'computadora' | 'smartphone' | null;
  ultimaAccion2?: string | null;
  dispositivo2?: 'computadora' | 'smartphone' | null;
  cargo?: string;
  departamento?: string;
}

export interface Marcaje {
  fecha: string;
  hora: string;
  tipo: 'entrada' | 'salida';
  dispositivo: 'computadora' | 'smartphone';
  metodo: 'facial' | 'manual' | 'smartphone' | 'computadora';
  localizacion: string;
}

export interface Planificacion {
  turno: string;
  horasPlanificadas: string;
  horasDescanso: string;
  estatus: string;
}

export interface Tiempos {
  trabajadas: string;
  extras: string;
  ausencias: string;
  permiso: string;
}