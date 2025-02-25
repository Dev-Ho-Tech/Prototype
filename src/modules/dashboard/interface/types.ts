export interface Employee {
  id: number;
  nombre: string;
  foto: string | null;
  estado: 'trabajando' | 'permiso' | 'ausencia' | 'planificado' | 'trabajó';
  horas: string;
  pais: string;
  ultimaAccion: string | null;
  ultimaAccion2?: string | null;
  dispositivo: 'computadora' | 'movil' | null;
  dispositivo2?: 'computadora' | 'movil' | null;
}