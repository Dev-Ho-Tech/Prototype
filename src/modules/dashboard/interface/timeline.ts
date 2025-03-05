// Interfaz para los marcajes (iconos de entrada, salida, etc.)
export interface Marcaje {
  id: string;
  time: string;
  type: string;
  device: string;
  method: string;
  position: string;
  color: string;
  horasTrabajadas: string;
  entrada: string;
  salida: string;
  esHoraExtra: boolean;
  estadoHoraExtra?: string;
  aprobadoPor?: string;
  comentarios?: string;
  fechaAprobacion?: string;
}

// Interfaz para los segmentos de tiempo (barras de tiempo trabajado, descanso, etc.)
export interface Segmento {
  id: string;
  tipo: string;
  inicio: string;
  fin: string;
  ancho: string;
  color: string;
  horasTrabajadas: string;
  entrada: string;
  salida: string;
  esHoraExtra: boolean;
  estadoHoraExtra?: string;
  aprobadoPor?: string;
  comentarios?: string;
  fechaAprobacion?: string;
}

// Tipo para el item activo en el tooltip
export type ActiveItem = {
  tipo: 'marcaje';
  data: Marcaje | undefined;
} | {
  tipo: 'segmento';
  data: Segmento | undefined;
};