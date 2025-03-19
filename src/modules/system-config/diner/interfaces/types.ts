export interface Comedor {
  id: string;
  nombre: string;
  descripcion?: string;
  ubicacion: string;
  capacidadMaxima: number;
  cantidadMesas: number;
  encargado?: string;
  estado: 'activo' | 'inactivo';
  fechaCreacion: string;
}

export interface HorarioComida {
  id: string;
  nombre: string;        // Ejemplo: "Desayuno", "Almuerzo", "Cena", "Merienda"
  horaInicio: string;    // Formato "HH:MM"
  horaFin: string;       // Formato "HH:MM"
  diasSemana: DiaSemana[];
  capacidadMaxima: number;
  comedorId: string;
  estado: 'activo' | 'inactivo';
}

export interface EstacionComida {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo: 'buffet' | 'servido' | 'self-service' | 'otro';
  capacidadMaxima: number;
  comedorId: string;
  estado: 'activo' | 'inactivo';
}

export interface PerfilComida {
  id: string;
  nombre: string;
  descripcion?: string;
  ticketsDisponibles: number;
  horarioIds: string[];  // IDs de los horarios asociados
  estacionIds: string[]; // IDs de las estaciones asociadas
  estado: 'activo' | 'inactivo';
}

export enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sábado',
  DOMINGO = 'Domingo'
}

// Props para los formularios
export interface ComedorFormProps {
  comedor?: Comedor;
  onSave: (comedor: Comedor) => void;
  onCancel: () => void;
}

export interface HorarioComidaFormProps {
  horario?: HorarioComida;
  comedores: Comedor[];
  onSave: (horario: HorarioComida) => void;
  onCancel: () => void;
}

export interface EstacionComidaFormProps {
  estacion?: EstacionComida;
  comedores: Comedor[];
  onSave: (estacion: EstacionComida) => void;
  onCancel: () => void;
}

export interface PerfilComidaFormProps {
  perfil?: PerfilComida;
  horarios: HorarioComida[];
  estaciones: EstacionComida[];
  onSave: (perfil: PerfilComida) => void;
  onCancel: () => void;
}

// Props para las listas - Actualizados para soportar diferentes vistas
export interface ComedorListProps {
  comedores: Comedor[];
  onEdit: (comedor: Comedor) => void;
  onDelete: (id: string) => void;
  viewMode?: 'list' | 'card';
}

export interface HorarioComidaListProps {
  horarios: HorarioComida[];
  comedores: Comedor[];
  onEdit: (horario: HorarioComida) => void;
  onDelete: (id: string) => void;
}

export interface EstacionComidaListProps {
  estaciones: EstacionComida[];
  comedores: Comedor[];
  onEdit: (estacion: EstacionComida) => void;
  onDelete: (id: string) => void;
}

export interface PerfilComidaListProps {
  perfiles: PerfilComida[];
  horarios: HorarioComida[];
  estaciones: EstacionComida[];
  onEdit: (perfil: PerfilComida) => void;
  onDelete: (id: string) => void;
}

// Props para componentes de UI
export interface StatusTabsProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    active: number;
    inactive: number;
    total: number;
  }
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface ComedorCardProps {
  comedor: Comedor;
  onEdit: (comedor: Comedor) => void;
  onDelete: (id: string) => void;
  onView?: (comedor: Comedor) => void;
}

export interface ComedoresHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewClick: () => void;
  title: string;
  currentStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    active: number;
    inactive: number;
    total: number;
  };
  viewMode: 'list' | 'card';
  onViewModeChange: (mode: 'list' | 'card') => void;
}