import { BiometricData } from "./interfaces/BiometricData";
import { Device } from "./interfaces/device";

export const deviceTypes = [
  { value: 'biometric', label: 'Marcaje Biométrico' },
  { value: 'access', label: 'Control de Acceso' },
  { value: 'dining', label: 'Comedor' },
  { value: 'training', label: 'Formación' }
];

export const deviceBrands = [
  { value: 'zkteco', label: 'ZKTeco' },
  { value: 'suprema', label: 'Suprema' },
  { value: 'hikvision', label: 'Hikvision' },
  { value: 'dahua', label: 'Dahua' }
];

export const devicesData: Device[] = [
  {
    id: 'DEV001',
    name: 'BIO-GA-001',
    serialNumber: 'ZK2023120001',
    brand: 'zkteco',
    model: 'IN01-A',
    type: 'biometric',
    status: 'online',
    ip: '192.168.1.100',
    subnet: '255.255.255.0',
    mac: '00:1B:44:11:3A:B7',
    location: 'Entrada Principal',
    firmware: 'v2.5.3',
    timezone: 'America/Santo_Domingo',
    lastSync: '2025-02-14T10:30:00',
    capacity: {
      total: 3000,
      used: 2150,
      type: 'fingerprints'
    },
    operationMode: 'attendance',
    lastMaintenance: '2025-01-15',
    nextMaintenance: '2025-03-15',
    stats: {
      uptime: '99.8%',
      transactions: 1250,
      errors: 2,
      lastTransaction: '2025-02-14T10:28:00'
    }
  },
  {
    id: 'DEV002',
    name: 'ACC-GA-001',
    serialNumber: 'SP2023120002',
    brand: 'suprema',
    model: 'BioEntry W2',
    type: 'access',
    status: 'online',
    ip: '192.168.1.101',
    subnet: '255.255.255.0',
    mac: '00:1B:44:11:3A:B8',
    location: 'Puerta Principal',
    firmware: 'v1.8.2',
    timezone: 'America/Santo_Domingo',
    lastSync: '2025-02-14T10:28:00',
    capacity: {
      total: 1000,
      used: 850,
      type: 'users'
    },
    operationMode: 'access',
    lastMaintenance: '2025-01-20',
    nextMaintenance: '2025-03-20',
    stats: {
      uptime: '99.9%',
      transactions: 850,
      errors: 0,
      lastTransaction: '2025-02-14T10:25:00'
    }
  },
  {
    id: 'DEV003',
    name: 'DIN-GA-001',
    serialNumber: 'HK2023120003',
    brand: 'hikvision',
    model: 'DS-K1T671M',
    type: 'dining',
    status: 'warning',
    ip: '192.168.1.102',
    subnet: '255.255.255.0',
    mac: '00:1B:44:11:3A:B9',
    location: 'Comedor Principal',
    firmware: 'v1.2.1',
    timezone: 'America/Santo_Domingo',
    lastSync: '2025-02-14T09:15:00',
    capacity: {
      total: 500,
      used: 480,
      type: 'users'
    },
    operationMode: 'dining',
    lastMaintenance: '2025-01-10',
    nextMaintenance: '2025-03-10',
    stats: {
      uptime: '98.5%',
      transactions: 450,
      errors: 5,
      lastTransaction: '2025-02-14T09:10:00'
    }
  }
];

export const biometricData: BiometricData[] = [
  {
    employeeId: 'EMP001',
    name: 'Juan Pérez',
    fingerprints: {
      registered: 10,
      quality: 95,
      lastUpdate: '2025-02-14'
    },
    face: {
      registered: true,
      quality: 98,
      lastUpdate: '2025-02-14'
    },
    card: {
      registered: true,
      number: 'A123456',
      lastUpdate: '2025-02-14'
    },
    pin: {
      set: true,
      lastUpdate: '2025-02-14'
    },
    assignedDevices: ['DEV001', 'DEV002']
  }
];

export const deviceEvents = [
  {
    id: 'EVT001',
    deviceId: 'DEV001',
    type: 'transaction',
    timestamp: '2025-02-14T10:28:00',
    description: 'Marcaje exitoso - Juan Pérez',
    status: 'success'
  },
  {
    id: 'EVT002',
    deviceId: 'DEV001',
    type: 'error',
    timestamp: '2025-02-14T10:25:00',
    description: 'Error de lectura biométrica',
    status: 'error'
  },
  {
    id: 'EVT003',
    deviceId: 'DEV002',
    type: 'access',
    timestamp: '2025-02-14T10:20:00',
    description: 'Acceso autorizado - María González',
    status: 'success'
  }
];

export const eventosDetallados = [
  {
    id: 'EVT001',
    deviceId: 'DEV001',
    timestamp: '2025-02-14T10:28:00',
    employeeName: 'Juan Pérez',
    employeeId: 'EMP001',
    eventType: 'ENTRADA',
    verificationType: 'VERIFICADO',
    verificationMethod: 'HUELLA_DIGITAL',
    details: 'Marcaje exitoso - Entrada registrada'
  },
  {
    id: 'EVT002',
    deviceId: 'DEV001',
    timestamp: '2025-02-14T10:25:00',
    employeeName: 'María González',
    employeeId: 'EMP002',
    eventType: 'ENTRADA',
    verificationType: 'NO_VERIFICADO',
    verificationMethod: 'HUELLA_DIGITAL',
    details: 'Error de lectura biométrica - Segundo intento exitoso'
  },
  {
    id: 'EVT003',
    deviceId: 'DEV002',
    timestamp: '2025-02-14T10:20:00',
    employeeName: 'María González',
    employeeId: 'EMP002',
    eventType: 'ENTRADA',
    verificationType: 'VERIFICADO',
    verificationMethod: 'ROSTRO',
    details: 'Acceso autorizado - Entrada registrada'
  },
  {
    id: 'EVT004',
    deviceId: 'DEV001',
    timestamp: '2025-02-14T17:35:00',
    employeeName: 'Juan Pérez',
    employeeId: 'EMP001',
    eventType: 'SALIDA',
    verificationType: 'VERIFICADO',
    verificationMethod: 'HUELLA_DIGITAL',
    details: 'Marcaje exitoso - Salida registrada'
  },
  {
    id: 'EVT005',
    deviceId: 'DEV001',
    timestamp: '2025-02-14T17:40:00',
    employeeName: 'María González',
    employeeId: 'EMP002',
    eventType: 'SALIDA',
    verificationType: 'VERIFICADO',
    verificationMethod: 'TARJETA',
    details: 'Marcaje exitoso - Salida registrada'
  },
  {
    id: 'EVT006',
    deviceId: 'DEV003',
    timestamp: '2025-02-14T12:15:00',
    employeeName: 'Carlos Rodríguez',
    employeeId: 'EMP003',
    eventType: 'COMEDOR',
    verificationType: 'VERIFICADO',
    verificationMethod: 'TARJETA',
    details: 'Acceso a comedor autorizado'
  }
];

export const estructuras = [
  {
    id: 'caldelpa-empresas',
    name: 'Caldelpa S.a.(Empresas)',
    type: 'company',
    children: [
      {
        id: 'comercial-caldelpa',
        name: 'Comercial Caldelpa S.a.(Empresa)',
        type: 'branch',
        children: [
          {
            id: 'recursos-humanos-cc',
            name: 'Recursos Humanos',
            type: 'department',
            children: []
          },
          {
            id: 'finanzas-cc',
            name: 'Finanzas',
            type: 'department',
            children: []
          }
        ]
      },
      {
        id: 'positiva-inmobiliaria',
        name: 'Positiva (Inmobiliaria)',
        type: 'branch',
        children: [
          {
            id: 'marketing-pi',
            name: 'Marketing',
            type: 'department',
            children: []
          }
        ]
      },
      {
        id: 'caldelpa-operaciones',
        name: 'Caldelpa S.a.(Operaciones)',
        type: 'branch',
        children: [
          {
            id: 'logistica-co',
            name: 'Logística',
            type: 'department',
            children: []
          }
        ]
      },
      {
        id: 'instalaciones-hotelera',
        name: 'Instalaciones Hotelera CHO Clima (empresa)',
        type: 'branch',
        children: [
          {
            id: 'mantenimiento-ih',
            name: 'Mantenimiento',
            type: 'department',
            children: []
          }
        ]
      }
    ]
  }
];