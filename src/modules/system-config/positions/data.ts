import { 
  AccessType, 
  AccessProfile, 
  AccessTypeDetail, 
  AccessSchedule,
  AssociatedDevice,
  DeviceType 
} from './interfaces/types';

// Perfiles de acceso disponibles
export const accessProfiles: AccessProfile[] = [
  {
    id: 'profile-1',
    name: 'Principal',
    description: 'Perfil de acceso principal con permisos completos',
    isDefault: true
  },
  {
    id: 'profile-2',
    name: 'Visitante',
    description: 'Perfil de acceso limitado para visitantes'
  },
  {
    id: 'profile-3',
    name: 'Proveedor',
    description: 'Perfil de acceso para proveedores con acceso a áreas específicas'
  },
  {
    id: 'profile-4',
    name: 'Contratista',
    description: 'Perfil de acceso para contratistas temporales'
  }
];

// Tipos de acceso
export const accessTypes: AccessType[] = [
  {
    id: 'access-type-1',
    name: 'Visitante',
    description: 'Acceso temporal para visitantes de la empresa',
    isActive: true,
    createdAt: '2023-05-15T10:30:00',
    updatedAt: '2023-06-20T14:45:00'
  },
  {
    id: 'access-type-2',
    name: 'Proveedor',
    description: 'Acceso para proveedores regulares',
    isActive: true,
    createdAt: '2023-05-15T11:20:00',
    updatedAt: '2023-07-10T09:15:00'
  },
  {
    id: 'access-type-3',
    name: 'Contratista',
    description: 'Acceso para contratistas con proyectos en curso',
    isActive: true,
    createdAt: '2023-06-05T09:00:00',
    updatedAt: '2023-07-15T16:30:00'
  },
  {
    id: 'access-type-4',
    name: 'Transporte',
    description: 'Acceso para personal de transporte y logística',
    isActive: false,
    createdAt: '2023-07-01T08:45:00',
    updatedAt: '2023-07-20T11:10:00'
  }
];

// Horarios de acceso disponibles
export const accessSchedules: AccessSchedule[] = [
  {
    id: 'schedule-1',
    name: 'Horario Laboral',
    timeStart: '08:00',
    timeEnd: '18:00',
    daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  },
  {
    id: 'schedule-2',
    name: 'Horario Extendido',
    timeStart: '07:00',
    timeEnd: '22:00',
    daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  },
  {
    id: 'schedule-3',
    name: 'Fin de Semana',
    timeStart: '09:00',
    timeEnd: '17:00',
    daysOfWeek: ['Sábado', 'Domingo']
  }
];

// Dispositivos disponibles
export const associatedDevices: AssociatedDevice[] = [
  {
    id: 'device-1',
    name: 'Transporte Salida 2',
    model: 'SpeedFace-5-td',
    serialNumber: 'CKVD10269149',
    location: 'Puerta principal',
    type: DeviceType.EXIT
  },
  {
    id: 'device-2',
    name: 'Entrada De Personal',
    model: 'SpeedFace-5-rfid',
    serialNumber: 'CKVF21150464',
    location: 'Entrada de empleados',
    type: DeviceType.ENTRY
  },
  {
    id: 'device-3',
    name: 'Transporte Entrada 1',
    model: 'SpeedFace-5-rfid',
    serialNumber: 'CKVF21150496',
    location: 'Entrada de carga',
    type: DeviceType.ENTRY
  },
  {
    id: 'device-4',
    name: 'Transporte Entrada 2',
    model: 'SpeedFace-5-td',
    serialNumber: 'CKVD10269126',
    location: 'Entrada secundaria',
    type: DeviceType.ENTRY
  },
  {
    id: 'device-5',
    name: 'Transporte 1 Salida',
    model: 'SpeedFace-5-td',
    serialNumber: 'CKVD10269029',
    location: 'Salida principal',
    type: DeviceType.EXIT
  },
  {
    id: 'device-6',
    name: 'Salida De Personal',
    model: 'SpeedFace-5-rfid',
    serialNumber: 'CKVF21160410',
    location: 'Salida de empleados',
    type: DeviceType.EXIT
  }
];

// Detalles de los tipos de acceso
export const accessTypeDetails: AccessTypeDetail[] = [
  {
    id: 'detail-1',
    accessTypeId: 'access-type-1',
    schedule: accessSchedules[0],
    associatedDevices: [associatedDevices[1], associatedDevices[5]]
  },
  {
    id: 'detail-2',
    accessTypeId: 'access-type-2',
    schedule: accessSchedules[1],
    associatedDevices: [associatedDevices[0], associatedDevices[2], associatedDevices[4]]
  },
  {
    id: 'detail-3',
    accessTypeId: 'access-type-3',
    schedule: accessSchedules[0],
    associatedDevices: [associatedDevices[1], associatedDevices[2], associatedDevices[5]]
  }
];