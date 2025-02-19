import type { MapData, AccessEvent, Door, AccessStats } from '../../../types';

export const monitoringData = {
  mapData: {
    doors: [
      {
        id: 'DR001',
        name: 'Entrada Principal',
        location: 'Hodelpa Gran Almirante',
        status: 'online',
        lastEvent: 'Acceso autorizado - Juan Pérez',
        alert: null
      },
      {
        id: 'DR002',
        name: 'Acceso Empleados',
        location: 'Hodelpa Gran Almirante',
        status: 'online',
        lastEvent: 'Acceso autorizado - María González',
        alert: null
      },
      {
        id: 'DR003',
        name: 'Almacén Principal',
        location: 'Hodelpa Garden Court',
        status: 'warning',
        lastEvent: 'Intento fallido de acceso',
        alert: 'Múltiples intentos fallidos'
      },
      {
        id: 'DR004',
        name: 'Oficinas Administrativas',
        location: 'Centro Plaza Hodelpa',
        status: 'offline',
        lastEvent: 'Último acceso hace 2 horas',
        alert: 'Dispositivo sin conexión'
      }
    ]
  },
  events: [
    {
      id: 'EVT001',
      type: 'entry',
      door: 'Entrada Principal',
      user: 'Juan Pérez',
      timestamp: '2025-02-14T10:30:00',
      details: 'Acceso autorizado'
    },
    {
      id: 'EVT002',
      type: 'denied',
      door: 'Almacén Principal',
      user: 'Carlos Rodríguez',
      timestamp: '2025-02-14T10:28:00',
      details: 'Credenciales inválidas'
    },
    {
      id: 'EVT003',
      type: 'alert',
      door: 'Oficinas Administrativas',
      user: 'Sistema',
      timestamp: '2025-02-14T10:25:00',
      details: 'Dispositivo sin conexión'
    },
    {
      id: 'EVT004',
      type: 'exit',
      door: 'Acceso Empleados',
      user: 'María González',
      timestamp: '2025-02-14T10:20:00',
      details: 'Salida registrada'
    }
  ],
  doors: [
    {
      id: 'DR001',
      name: 'Entrada Principal',
      location: 'Hodelpa Gran Almirante',
      status: 'online',
      type: 'biometric',
      lastAccess: '2025-02-14T10:30:00'
    },
    {
      id: 'DR002',
      name: 'Acceso Empleados',
      location: 'Hodelpa Gran Almirante',
      status: 'online',
      type: 'card',
      lastAccess: '2025-02-14T10:28:00'
    },
    {
      id: 'DR003',
      name: 'Almacén Principal',
      location: 'Hodelpa Garden Court',
      status: 'warning',
      type: 'biometric',
      lastAccess: '2025-02-14T09:15:00'
    }
  ],
  stats: {
    peakHour: '08:30 AM',
    peakHourPercentage: 85,
    occupancy: 65,
    hotspots: [
      { location: 'Entrada Principal', accessCount: 450 },
      { location: 'Acceso Empleados', accessCount: 380 },
      { location: 'Almacén Principal', accessCount: 120 }
    ],
    trends: [
      { name: 'Accesos diarios', change: 12 },
      { name: 'Tiempo promedio', change: -5 },
      { name: 'Intentos fallidos', change: -8 }
    ],
    anomalies: [
      {
        title: 'Múltiples intentos fallidos',
        description: 'Detectados 5 intentos fallidos en Almacén Principal',
        time: 'Hace 5 minutos'
      },
      {
        title: 'Dispositivo sin conexión',
        description: 'Oficinas Administrativas sin conexión',
        time: 'Hace 15 minutos'
      }
    ]
  }
};