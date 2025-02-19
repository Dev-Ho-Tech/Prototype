import type { Door } from '../../../types';

export const doorsData: Door[] = [
  {
    id: 'DR001',
    name: 'Entrada Principal',
    location: 'Hodelpa Gran Almirante',
    type: 'biometric',
    status: 'active',
    lastAccess: '2025-02-14T10:30:00',
    device: 'BIO-GA-001',
    description: 'Puerta principal de acceso al hotel',
    photo: 'https://images.unsplash.com/photo-1555971875-e2fee6aa0aed?w=400&h=300&fit=crop',
    securityLevel: 'high',
    schedule: {
      enabled24_7: true,
      customHours: null
    },
    restrictions: {
      authorizedGroups: ['Empleados', 'Administrativos', 'Seguridad'],
      specialProtocols: ['Emergencia', 'Mantenimiento']
    },
    stats: {
      totalAccesses: 1250,
      deniedAccesses: 23,
      averageDaily: 180
    },
    connectionStatus: 'online',
    lastMaintenance: '2025-01-15',
    nextMaintenance: '2025-03-15'
  },
  {
    id: 'DR002',
    name: 'Acceso Empleados',
    location: 'Hodelpa Gran Almirante',
    type: 'card',
    status: 'active',
    lastAccess: '2025-02-14T10:28:00',
    device: 'ACC-GA-001',
    description: 'Entrada exclusiva para personal',
    photo: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400&h=300&fit=crop',
    securityLevel: 'medium',
    schedule: {
      enabled24_7: false,
      customHours: {
        start: '05:00',
        end: '23:00'
      }
    },
    restrictions: {
      authorizedGroups: ['Empleados'],
      specialProtocols: ['Mantenimiento']
    },
    stats: {
      totalAccesses: 850,
      deniedAccesses: 15,
      averageDaily: 120
    },
    connectionStatus: 'online',
    lastMaintenance: '2025-01-20',
    nextMaintenance: '2025-03-20'
  },
  {
    id: 'DR003',
    name: 'Almacén Principal',
    location: 'Hodelpa Garden Court',
    type: 'biometric',
    status: 'warning',
    lastAccess: '2025-02-14T09:15:00',
    device: 'BIO-GC-001',
    description: 'Acceso al almacén principal',
    photo: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=400&h=300&fit=crop',
    securityLevel: 'high',
    schedule: {
      enabled24_7: false,
      customHours: {
        start: '06:00',
        end: '22:00'
      }
    },
    restrictions: {
      authorizedGroups: ['Almacén', 'Supervisores'],
      specialProtocols: ['Inventario', 'Mantenimiento']
    },
    stats: {
      totalAccesses: 450,
      deniedAccesses: 28,
      averageDaily: 65
    },
    connectionStatus: 'warning',
    lastMaintenance: '2025-01-10',
    nextMaintenance: '2025-03-10'
  },
  {
    id: 'DR004',
    name: 'Oficinas Administrativas',
    location: 'Centro Plaza Hodelpa',
    type: 'biometric',
    status: 'inactive',
    lastAccess: '2025-02-13T18:45:00',
    device: 'BIO-CP-001',
    description: 'Acceso a área de oficinas',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    securityLevel: 'medium',
    schedule: {
      enabled24_7: false,
      customHours: {
        start: '07:00',
        end: '19:00'
      }
    },
    restrictions: {
      authorizedGroups: ['Administrativos'],
      specialProtocols: ['Emergencia']
    },
    stats: {
      totalAccesses: 320,
      deniedAccesses: 8,
      averageDaily: 45
    },
    connectionStatus: 'offline',
    lastMaintenance: '2025-01-25',
    nextMaintenance: '2025-03-25'
  }
];