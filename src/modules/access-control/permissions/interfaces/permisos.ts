export type PermisoEstado = 'activo' | 'inactivo' | 'pendiente';
export type TipoAutorizacion = 'tarjeta' | 'pin' | 'tarjeta_pin' | 'biometrico';
export type NivelAcceso = 'bajo' | 'medio' | 'alto' | 'critico';
export type TipoPermiso = 'empleado' | 'contratista' | 'visitante' | 'temporal';

export interface RangoHorario {
  inicio: string;
  fin: string;
  diasSemana: string[]; // ['lunes', 'martes', ...]
}


export interface PermisoFormData extends Omit<Permiso, 'id' | 'fechaCreacion' | 'fechaModificacion' | 'creadoPor' | 'modificadoPor' | 'usuariosAsignados'> {
  id?: string;
}

export interface PermisosFilterState {
  searchTerm: string;
  estado: PermisoEstado | 'todos';
  tipo: TipoPermiso | 'todos';
  nivel: NivelAcceso | 'todos';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortingState {
  column: keyof Permiso | null;
  direction: 'asc' | 'desc';
}

export interface Area {
  id?: string;
  nombre: string;
  ubicacion?: string;
  nivelSeguridad: 'bajo' | 'medio' | 'alto' | 'critico';
  requiereAutorizacionAdicional?: boolean;
}

export interface Horario {
  inicio: string;
  fin: string;
  diasSemana: string[];
}

export interface Permiso {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'empleado' | 'contratista' | 'visitante' | 'temporal';
  nivel: 'bajo' | 'medio' | 'alto' | 'critico';
  estado: 'activo' | 'inactivo' | 'pendiente';
  tipoAutorizacion?: 'tarjeta' | 'tarjeta_pin' | 'biometrico';
  areas: Area[];
  horarios?: Horario[];
  fechaCreacion: string;
  fechaModificacion: string;
  creadoPor: string;
  modificadoPor: string;
  usuariosAsignados: number;
  requiereAcompanante?: boolean;
  vencimiento?: string | null;
  permisos?: {
    crear: boolean;
    leer: boolean;
    actualizar: boolean;
    eliminar: boolean;
  };
}