export interface AccessType {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Perfil de acceso que puede ser asignado a un tipo de acceso
export interface AccessProfile {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
}

// Detalles adicionales para un tipo de acceso
export interface AccessTypeDetail {
  id: string;
  accessTypeId: string;
  schedule?: AccessSchedule;
  associatedDevices: AssociatedDevice[];
}

// Horario de acceso
export interface AccessSchedule {
  id: string;
  name: string;
  timeStart: string;
  timeEnd: string;
  daysOfWeek: string[]; // Ej: ["Lunes", "Martes", etc.]
}

// Dispositivo asociado a un perfil de acceso
export interface AssociatedDevice {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location?: string;
  type: DeviceType;
}

// Tipo de dispositivo
export enum DeviceType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
  BOTH = 'BOTH'
}

// Props para el componente de listado de tipos de acceso
export interface AccessTypeListProps {
  accessTypes: AccessType[];
  onSelect: (accessType: AccessType) => void;
  onAdd: () => void;
  onEdit: (accessType: AccessType) => void;
  onDelete: (id: string) => void;
}

// Props para el formulario de tipo de acceso
export interface AccessTypeFormProps {
  accessType?: AccessType;
  accessProfiles: AccessProfile[];
  onSave: (accessType: AccessType) => void;
  onCancel: () => void;
}

// Props para el formulario de detalles de tipo de acceso
export interface AccessTypeDetailFormProps {
  accessTypeId: string;
  accessDetail?: AccessTypeDetail;
  accessSchedules: AccessSchedule[];
  availableDevices: AssociatedDevice[];
  onSave: (detail: AccessTypeDetail) => void;
  onCancel: () => void;
}

// Props para la selección de dispositivos asociados
export interface DeviceSelectionProps {
  availableDevices: AssociatedDevice[];
  selectedDevices: AssociatedDevice[];
  onDeviceToggle: (device: AssociatedDevice) => void;
}