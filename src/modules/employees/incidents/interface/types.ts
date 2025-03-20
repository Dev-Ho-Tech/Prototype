//interfaces de IncidenciasScreen
export interface Employee {
  id: string;
  nombre: string;
  apellidos: string;
  position: string;
  department: string;
  location: string;
  section: string;
  company: string;
  photoUrl?: string;
  containerType?: string;
  containerName? : string;
  supervisor?: string;
  level4?: string;
  level5?: string;
}

export interface Dispositivo {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  ip: string;
  sn: string;
  estado: string;
  ultimaSincronizacion: string;
}

export enum TipoVerificacion {
  ROSTRO = 'Rostro',
  HUELLA = 'Huella',
  TARJETA = 'Tarjeta',
  MANUAL = 'Manual'
}

export enum TipoMarcaje {
  ENTRADA = 'Entrada',
  SALIDA = 'Salida',
  BREAK_INICIO = 'Inicio de Descanso',
  BREAK_FIN = 'Fin de Descanso',
  OTRO = 'Otro'
}

export interface Marcaje {
  id: string;
  fecha: string;
  hora: string;
  empleadoId: string;
  dispositivo: string;
  tipoVerificacion: TipoVerificacion;
  tipoMarcaje: TipoMarcaje;
  esManual: boolean;
  usuarioRegistro?: string;
  timestampRegistro?: string;
  observaciones?: string;
  coordenadas?: Coordenadas; 
  resultado?: "Verificado" | "No Verificado" | "Pendiente";
  horaInicio?: string;
  horaFin?: string;  
  
}

// export interface Incidencia {
//   id: string;
//   empleadoId: string;
//   fecha: string;
//   tipo: TipoIncidencia;
//   estado: 'Pendiente' | 'Justificada' | 'Injustificada';
//   descripcion?: string;
//   marcajeId?: string;
//   justificacion?: string;
// }

// Tipo para el formulario de nuevo marcaje
export interface MarcajeFormData {
  fecha: string;
  hora: string;
  dispositivo: string;
  tipoVerificacion: TipoVerificacion;
  tipoMarcaje: TipoMarcaje;
  observaciones?: string;
  coordenadas?: Coordenadas;
}

export interface Employee {
  id: string;
  nombre: string;
  apellidos: string;
  position: string;
  department: string;
  location: string;
  section: string;
  company: string;
  photoUrl?: string;
  containerType?: string;
}

export interface Marcaje {
  id: string;
  fecha: string;
  hora: string;
  empleadoId: string;
  dispositivo: string;
  tipoVerificacion: TipoVerificacion;
  tipoMarcaje: TipoMarcaje;
  esManual: boolean;
  usuarioRegistro?: string;
  timestampRegistro?: string;
  observaciones?: string;
}

export interface MarcajeFormData {
  fecha: string;
  hora: string;
  dispositivo: string;
  tipoVerificacion: TipoVerificacion;
  tipoMarcaje: TipoMarcaje;
  observaciones?: string;
}

export interface Coordenadas {
  latitud: number;
  longitud: number;
  descripcion?: string;
}

// Actualizar la interfaz Marcaje para incluir coordenadas y resultado
export interface Marcaje {
  id: string;
  fecha: string;
  hora: string;
  empleadoId: string;
  dispositivo: string;
  tipoVerificacion: TipoVerificacion;
  tipoMarcaje: TipoMarcaje;
  esManual: boolean;
  usuarioRegistro?: string;
  timestampRegistro?: string;
  observaciones?: string;
  coordenadas?: Coordenadas; // Nueva propiedad
  resultado?: "Verificado" | "No Verificado" | "Pendiente"; // Nueva propiedad
}

// Actualizar MarcajeFormData para incluir coordenadas
export interface MarcajeFormData {
  fecha: string;
  hora: string;
  dispositivo: string;
  tipoVerificacion: TipoVerificacion;
  tipoMarcaje: TipoMarcaje;
  observaciones?: string;
  coordenadas?: Coordenadas; // Nueva propiedad
}

export interface Coordenadas {
  latitud: number;
  longitud: number;
  descripcion?: string;
}

export enum TipoIncidencia {
  TARDANZA = 'tardanzas',
  PERMISO = 'permisos',
  SALIDA_INTEMPESTIVA = 'salidas',
  AUSENCIA = 'ausencias',
  SIN_HORARIO = 'sin-horario',
  HORAS_EXTRAS = 'horas-extras'
}

export interface Incidencia {
  id: string;
  empleadoId: string;
  fecha: string;
  tipo: TipoIncidencia;
  estado: 'Pendiente' | 'Justificada' | 'Injustificada' | 'Aprobada';
  descripcion?: string;
  marcajeId?: string;
  justificacion?: string;
}