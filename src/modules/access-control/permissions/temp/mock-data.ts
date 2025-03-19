import { Permiso } from '../interfaces/permisos';  

export const mockPermisosData: Permiso[] = [
  {
    id: 'PERM-001',
    nombre: 'Acceso Básico Empleados',
    descripcion: 'Permiso estándar para empleados que incluye acceso a áreas comunes y oficinas durante horario laboral',
    tipo: 'empleado',
    estado: 'activo',
    nivel: 'bajo',
    tipoAutorizacion: 'tarjeta',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-002',
        nombre: 'Oficinas Generales',
        ubicacion: 'Piso 1-3',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-003',
        nombre: 'Comedor',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '08:00',
        fin: '18:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
      }
    ],
    fechaCreacion: '2023-01-15T09:00:00Z',
    fechaModificacion: '2023-06-20T14:30:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Admin',
    usuariosAsignados: 120,
    requiereAcompanante: false,
    vencimiento: null
  },
  {
    id: 'PERM-002',
    nombre: 'Acceso Directivos',
    descripcion: 'Permiso ampliado para directivos con acceso a todas las áreas incluyendo salas de juntas y oficinas ejecutivas',
    tipo: 'empleado',
    estado: 'activo',
    nivel: 'alto',
    tipoAutorizacion: 'tarjeta_pin',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-002',
        nombre: 'Oficinas Generales',
        ubicacion: 'Piso 1-3',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-004',
        nombre: 'Sala de Juntas Ejecutiva',
        ubicacion: 'Piso 4',
        nivelSeguridad: 'alto',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-005',
        nombre: 'Oficinas Directivas',
        ubicacion: 'Piso 4',
        nivelSeguridad: 'alto',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '07:00',
        fin: '22:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
      }
    ],
    fechaCreacion: '2023-01-15T09:15:00Z',
    fechaModificacion: '2023-07-10T11:45:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Admin',
    usuariosAsignados: 8,
    requiereAcompanante: false,
    vencimiento: null
  },
  {
    id: 'PERM-003',
    nombre: 'Acceso Contratistas TI',
    descripcion: 'Permiso específico para contratistas de TI con acceso a servidores y áreas técnicas',
    tipo: 'contratista',
    estado: 'activo',
    nivel: 'medio',
    tipoAutorizacion: 'tarjeta_pin',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-006',
        nombre: 'Sala de Servidores',
        ubicacion: 'Sótano',
        nivelSeguridad: 'alto',
        requiereAutorizacionAdicional: true
      },
      {
        id: 'AREA-007',
        nombre: 'Área Técnica',
        ubicacion: 'Piso 2',
        nivelSeguridad: 'medio',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '09:00',
        fin: '18:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
      }
    ],
    fechaCreacion: '2023-02-10T14:20:00Z',
    fechaModificacion: '2023-08-05T16:30:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Supervisor IT',
    usuariosAsignados: 15,
    requiereAcompanante: true,
    vencimiento: '2023-12-31'
  },
  {
    id: 'PERM-004',
    nombre: 'Acceso Visitantes',
    descripcion: 'Permiso básico para visitantes con acceso limitado a áreas comunes y recepción',
    tipo: 'visitante',
    estado: 'activo',
    nivel: 'bajo',
    tipoAutorizacion: 'tarjeta',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-008',
        nombre: 'Sala de Espera',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-009',
        nombre: 'Salas de Reuniones Visitantes',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '09:00',
        fin: '17:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
      }
    ],
    fechaCreacion: '2023-03-05T10:00:00Z',
    fechaModificacion: '2023-03-05T10:00:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Admin',
    usuariosAsignados: 250,
    requiereAcompanante: true,
    vencimiento: null
  },
  {
    id: 'PERM-005',
    nombre: 'Acceso Mantenimiento',
    descripcion: 'Permiso para personal de mantenimiento con acceso a áreas técnicas y servicios',
    tipo: 'contratista',
    estado: 'activo',
    nivel: 'medio',
    tipoAutorizacion: 'tarjeta',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-010',
        nombre: 'Cuarto de Máquinas',
        ubicacion: 'Sótano',
        nivelSeguridad: 'medio',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-011',
        nombre: 'Azotea',
        ubicacion: 'Techo',
        nivelSeguridad: 'medio',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '07:00',
        fin: '16:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
      },
      {
        inicio: '09:00',
        fin: '14:00',
        diasSemana: ['sabado']
      }
    ],
    fechaCreacion: '2023-04-12T08:45:00Z',
    fechaModificacion: '2023-08-20T11:15:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Supervisor Mantenimiento',
    usuariosAsignados: 12,
    requiereAcompanante: false,
    vencimiento: '2024-04-12'
  },
  {
    id: 'PERM-006',
    nombre: 'Acceso Seguridad',
    descripcion: 'Permiso para personal de seguridad con acceso a todas las áreas',
    tipo: 'empleado',
    estado: 'activo',
    nivel: 'alto',
    tipoAutorizacion: 'biometrico',
    areas: [
      {
        id: 'AREA-ALL',
        nombre: 'Todas las áreas',
        ubicacion: 'Edificio completo',
        nivelSeguridad: 'alto',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '00:00',
        fin: '23:59',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
      }
    ],
    fechaCreacion: '2023-01-15T09:30:00Z',
    fechaModificacion: '2023-05-10T13:20:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Jefe de Seguridad',
    usuariosAsignados: 24,
    requiereAcompanante: false,
    vencimiento: null
  },
  {
    id: 'PERM-007',
    nombre: 'Acceso Temporal Evento',
    descripcion: 'Permiso temporal para evento corporativo con acceso a auditorio y áreas comunes',
    tipo: 'temporal',
    estado: 'pendiente',
    nivel: 'bajo',
    tipoAutorizacion: 'tarjeta',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-012',
        nombre: 'Auditorio',
        ubicacion: 'Piso 1',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-003',
        nombre: 'Comedor',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '08:30',
        fin: '18:30',
        diasSemana: ['miercoles', 'jueves', 'viernes']
      }
    ],
    fechaCreacion: '2023-09-01T15:00:00Z',
    fechaModificacion: '2023-09-01T15:00:00Z',
    creadoPor: 'Coordinador Eventos',
    modificadoPor: 'Coordinador Eventos',
    usuariosAsignados: 0,
    requiereAcompanante: false,
    vencimiento: '2023-09-15'
  },
  {
    id: 'PERM-008',
    nombre: 'Acceso Limpieza',
    descripcion: 'Permiso para personal de limpieza con acceso a oficinas fuera de horario laboral',
    tipo: 'contratista',
    estado: 'inactivo',
    nivel: 'bajo',
    tipoAutorizacion: 'tarjeta',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-002',
        nombre: 'Oficinas Generales',
        ubicacion: 'Piso 1-3',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-003',
        nombre: 'Comedor',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      }
    ],
    horarios: [
      {
        inicio: '18:00',
        fin: '22:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
      },
      {
        inicio: '09:00',
        fin: '15:00',
        diasSemana: ['sabado']
      }
    ],
    fechaCreacion: '2023-05-20T10:15:00Z',
    fechaModificacion: '2023-08-30T09:45:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Admin',
    usuariosAsignados: 18,
    requiereAcompanante: false,
    vencimiento: null
  },
  {
    id: 'PERM-009',
    nombre: 'Acceso Proveedores',
    descripcion: 'Permiso para proveedores con acceso a almacén y áreas de entrega',
    tipo: 'visitante',
    estado: 'activo',
    nivel: 'bajo',
    tipoAutorizacion: 'tarjeta',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-013',
        nombre: 'Muelle de Carga',
        ubicacion: 'Planta Baja Posterior',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-014',
        nombre: 'Almacén',
        ubicacion: 'Sótano',
        nivelSeguridad: 'medio',
        requiereAutorizacionAdicional: true
      }
    ],
    horarios: [
      {
        inicio: '09:00',
        fin: '17:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
      }
    ],
    fechaCreacion: '2023-06-05T11:30:00Z',
    fechaModificacion: '2023-07-15T14:00:00Z',
    creadoPor: 'Admin',
    modificadoPor: 'Jefe de Almacén',
    usuariosAsignados: 30,
    requiereAcompanante: true,
    vencimiento: null
  },
  {
    id: 'PERM-010',
    nombre: 'Acceso Auditores',
    descripcion: 'Permiso temporal para auditores externos con acceso a oficinas financieras',
    tipo: 'visitante',
    estado: 'pendiente',
    nivel: 'medio',
    tipoAutorizacion: 'tarjeta_pin',
    areas: [
      {
        id: 'AREA-001',
        nombre: 'Recepción',
        ubicacion: 'Planta Baja',
        nivelSeguridad: 'bajo',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-015',
        nombre: 'Oficinas Finanzas',
        ubicacion: 'Piso 3',
        nivelSeguridad: 'medio',
        requiereAutorizacionAdicional: false
      },
      {
        id: 'AREA-016',
        nombre: 'Archivo Financiero',
        ubicacion: 'Piso 3',
        nivelSeguridad: 'alto',
        requiereAutorizacionAdicional: true
      }
    ],
    horarios: [
      {
        inicio: '09:00',
        fin: '18:00',
        diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
      }
    ],
    fechaCreacion: '2023-09-10T09:00:00Z',
    fechaModificacion: '2023-09-10T09:00:00Z',
    creadoPor: 'Director Financiero',
    modificadoPor: 'Director Financiero',
    usuariosAsignados: 0,
    requiereAcompanante: true,
    vencimiento: '2023-10-15'
  }
];