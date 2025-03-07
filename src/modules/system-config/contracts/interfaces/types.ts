export interface Contract {
  id: string;
  code: string;
  name: string;
  type: ContractType;
  duration?: string;
  workingHours: WorkingHoursConfig;
  overtimeAllowed: boolean;
  crossDays: boolean;
  autoApprove: boolean;
  ignoreAbsences: boolean;
  firstLastCheck: boolean;
  status: 'active' | 'inactive';
  employeeCount?: number;
  concepts: string[]; 
}

// Tipo de contrato
export enum ContractType {
  FIXED = 'fixed',
  TEMPORARY = 'temporary',
  INTERNSHIP = 'internship'
}

// Configuración de horas de trabajo
export interface WorkingHoursConfig {
  perWeek: number;
  maxDailyHours?: number;
  minOvertimeHours?: number;
  maxOvertimeHours?: number;
  nightShiftStart?: string;
  nightShiftEnd?: string;
  startDay?: string;
  scheduleLimitGroup?: string;
}

// Grupo de asignación de turnos
export interface ScheduleLimitGroup {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'biweekly' | 'monthly';
}

// Props para el listado de contratos
export interface ContractListProps {
  contracts: Contract[];
  onSelect: (contract: Contract) => void;
  onAdd: () => void;
  onSearch: (searchTerm: string) => void;
  onFilterByType: (type: string) => void;
}

// Props para el formulario de contrato
export interface ContractFormProps {
  contract?: Contract;
  onSave: (contract: Contract) => void;
  onCancel: () => void;
  scheduleLimitGroups: ScheduleLimitGroup[];
}

// Props para el detalle del contrato
export interface ContractDetailProps {
  contract: Contract;
  onEdit: () => void;
  onBack: () => void;
}