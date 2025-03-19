// Tipos de documento
export type DocumentType = 'cedula' | 'passport' | 'license';

// Tipos de credenciales
export type CredentialType = 'card' | 'pin' | 'card_pin';

// Estados de visitantes
export type VisitorStatus = 'active' | 'pending' | 'completed' | 'cancelled';

// Interfaces principales
export interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  documentType: DocumentType;
  documentNumber: string;
  photo: string;
  status: VisitorStatus;
  visit: Visit;
  credentials: Credentials;
}

export interface Visit {
  reason: string;
  host: string;
  hostDepartment: string;
  startTime: string;
  endTime: string;
  duration: string;
}

export interface Credentials {
  type: CredentialType;
  requiresEscort: boolean;
  code?: string;
}

// Props para componentes
export interface VisitorListProps {
  visitors: Visitor[];
  onEdit: (visitor: Visitor) => void;
  onFinish?: (id: string) => void;
  searchTerm: string;
  selectedStatus: string;
  viewMode?: 'list' | 'card';
}

export interface VisitorCardProps {
  visitor: Visitor;
  onEdit: (visitor: Visitor) => void;
  onFinish?: (id: string) => void;
}

export interface VisitorFormProps {
  visitor?: Visitor | null;
  onClose: () => void;
  onSave: (visitor: Visitor) => void;
}

export interface VisitorsHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onNewClick: () => void;
  viewMode: 'list' | 'card';
  onViewModeChange: (mode: 'list' | 'card') => void;
}

export interface VisitorsStatsProps {
  current: number;
  scheduled: number;
  avgDuration: string;
  pending: number;
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

// Utilidades
export const getStatusColor = (status: VisitorStatus): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: VisitorStatus): string => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'completed':
      return 'Completado';
    case 'pending':
      return 'Pendiente';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};