export type PermisoEstado = 'activo' | 'inactivo' | 'pendiente';
export type TipoAutorizacion = 'tarjeta' | 'pin' | 'tarjeta_pin' | 'biometrico';
export type NivelAcceso = 'bajo' | 'medio' | 'alto' | 'critico';
export type TipoPermiso = 'empleado' | 'contratista' | 'visitante' | 'temporal';

export interface RangoHorario {
  inicio: string;
  fin: string;
  diasSemana: string[]; // ['lunes', 'martes', ...]
}

export interface Area {
  id: string;
  nombre: string;
  ubicacion: string;
  nivelSeguridad: NivelAcceso;
  requiereAutorizacionAdicional: boolean;
}

export interface Permiso {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoPermiso;
  estado: PermisoEstado;
  nivel: NivelAcceso;
  tipoAutorizacion: TipoAutorizacion;
  areas: Area[];
  horarios: RangoHorario[];
  fechaCreacion: string;
  fechaModificacion: string;
  creadoPor: string;
  modificadoPor: string;
  usuariosAsignados: number;
  requiereAcompanante: boolean;
  vencimiento: string | null;
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