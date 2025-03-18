import { Employee, Marcaje } from '../interface/types';

// Datos de marcajes de ejemplo
const marcajesData: Record<number, Marcaje[]> = {
  // Marcajes para empleado ID 2 (Gerardo Campos)
  2: [
    {
      fecha: '2023-10-15',
      hora: '07:45',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '17:30',
      tipo: 'salida',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  // Marcajes para empleado ID 8 (Maria Guerra)
  8: [
    {
      fecha: '2023-10-15',
      hora: '07:30',
      tipo: 'entrada',
      dispositivo: 'smartphone',
      metodo: 'facial',
      localizacion: 'Remoto'
    },
    {
      fecha: '2023-10-15',
      hora: '16:45',
      tipo: 'salida',
      dispositivo: 'smartphone',
      metodo: 'manual',
      localizacion: 'Remoto'
    }
  ],
  // Marcajes para empleado ID 9 (Jose Del Nardo) - Horas Extras
  9: [
    {
      fecha: '2023-10-15',
      hora: '08:15',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Secundaria'
    },
    {
      fecha: '2023-10-15',
      hora: '19:20',
      tipo: 'salida',
      dispositivo: 'smartphone',
      metodo: 'manual',
      localizacion: 'Oficina Secundaria'
    }
  ],
  // Marcajes para empleado ID 4 (Carlos Peña) - Horas Extras
  4: [
    {
      fecha: '2023-10-15',
      hora: '06:45',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '15:30',
      tipo: 'salida',
      dispositivo: 'smartphone',
      metodo: 'manual',
      localizacion: 'Remoto'
    }
  ],
  // Marcajes para empleado ID 13 (Ana Mendoza) - Tardanza
  13: [
    {
      fecha: '2023-10-15',
      hora: '08:30',
      tipo: 'entrada',
      dispositivo: 'smartphone',
      metodo: 'facial',
      localizacion: 'Sucursal Norte'
    }
  ],
  // Marcajes para empleado ID 15 (Valentina Romero) - Horas Extras
  15: [
    {
      fecha: '2023-10-15',
      hora: '07:15',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  // Marcajes para empleado ID 19 (Mariana López) - Normal
  19: [
    {
      fecha: '2023-10-15',
      hora: '08:00',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '16:00',
      tipo: 'salida',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  // Marcajes para empleado ID 17 (Carolina Jiménez) - Tardanza
  17: [
    {
      fecha: '2023-10-15',
      hora: '09:45',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  // Marcajes para empleado ID 20 (Eduardo Torres) - Tardanza
  20: [
    {
      fecha: '2023-10-15',
      hora: '10:30',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  // Marcajes para nuevos empleados con salidas intempestivas
  25: [
    {
      fecha: '2023-10-15',
      hora: '07:30',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '12:30',
      tipo: 'salida',
      dispositivo: 'smartphone',
      metodo: 'manual',
      localizacion: 'Remoto'
    }
  ],
  26: [
    {
      fecha: '2023-10-15',
      hora: '08:00',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '14:00',
      tipo: 'salida',
      dispositivo: 'smartphone',
      metodo: 'manual',
      localizacion: 'Remoto'
    }
  ],
  // Marcajes para nuevos empleados con horas extras
  27: [
    {
      fecha: '2023-10-15',
      hora: '07:00',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '18:30',
      tipo: 'salida',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  28: [
    {
      fecha: '2023-10-15',
      hora: '06:30',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '17:45',
      tipo: 'salida',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  29: [
    {
      fecha: '2023-10-15',
      hora: '07:10',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '19:15',
      tipo: 'salida',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ],
  30: [
    {
      fecha: '2023-10-15',
      hora: '08:00',
      tipo: 'entrada',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    },
    {
      fecha: '2023-10-15',
      hora: '18:00',
      tipo: 'salida',
      dispositivo: 'computadora',
      metodo: 'facial',
      localizacion: 'Oficina Principal'
    }
  ]
};

export const empleadosDataEnriquecida: Employee[] = [
  {
    id: 1,
    nombre: 'Marcel Arcuri',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Hodelpa Hotels & Resorts',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Recursos Humanos',
    cargo: 'Gerente',
    contrato: true, 
  },
  {
    id: 2,
    nombre: 'Gerardo Campos',
    foto: 'https://randomuser.me/api/portraits/men/33.jpg',
    estado: 'trabajando',
    horas: '5 hrs 25 min',
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '07:45',
    dispositivo: 'computadora',
    ultimaAccion2: '17:30',
    dispositivo2: 'computadora',
    departamento: 'Operaciones',
    cargo: 'Director',
    marcajes: marcajesData[2],
    contrato: true, 
  },
  {
    id: 3,
    nombre: 'Genesis Orias',
    foto: 'https://randomuser.me/api/portraits/women/32.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Hodelpa Garden Court',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Habitaciones',
    cargo: 'Analista',
    contrato: true, 
  },
  {
    id: 4,
    nombre: 'Carlos Peña',
    foto: 'https://randomuser.me/api/portraits/men/34.jpg',
    estado: 'trabajando',
    horas: '3 hrs 45 min', // Ya está bien para horas extras
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '06:45',
    ultimaAccion2: '15:30',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Alimentos y Bebidas',
    cargo: 'Gerente',
    marcajes: marcajesData[4],
    contrato: false, 
  },
  {
    id: 5,
    nombre: 'Jose Pereira',
    foto: 'https://randomuser.me/api/portraits/men/35.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Hodelpa Hotels & Resorts',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Administración de Personal',
    cargo: 'Coordinador',
    contrato: true, 
  },
  {
    id: 6,
    nombre: 'Jesus Pacheco',
    foto: 'https://randomuser.me/api/portraits/men/36.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Hodelpa Garden Court',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Operaciones',
    cargo: 'Diseñador',
    contrato: true, 
  },
  {
    id: 7,
    nombre: 'Jesus Valero',
    foto: 'https://randomuser.me/api/portraits/men/37.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Hodelpa Hotels & Resorts',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Reclutamiento y Selección',
    cargo: 'Analista',
    contrato: true, 
  },
  {
    id: 8,
    nombre: 'Maria Guerra',
    foto: 'https://randomuser.me/api/portraits/women/33.jpg',
    estado: 'trabajando',
    horas: '5 hrs 15 min', // Ya está bien para horas extras
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '07:30',
    dispositivo: 'smartphone',
    ultimaAccion2: '16:45',
    dispositivo2: 'smartphone',
    departamento: 'Housekeeping',
    cargo: 'Diseñador',
    marcajes: marcajesData[8],
    contrato: true, 
  },
  {
    id: 9,
    nombre: 'Jose Del Nardo',
    foto: 'https://randomuser.me/api/portraits/men/38.jpg',
    estado: 'trabajando',
    horas: '6 hrs 05 min', // Ya está bien para horas extras
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '08:15',
    ultimaAccion2: '19:20',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Cocina Principal',
    cargo: 'Desarrollador',
    marcajes: marcajesData[9],
    contrato: true, 
  },
  {
    id: 10,
    nombre: 'Fernando Martinez',
    foto: null,
    estado: 'planificado',
    horas: null, // Sin horario
    pais: 'Hodelpa Garden Court',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Supervisión de Sucursales',
    cargo: 'Desarrollador',
    tieneContrato: false,
    contrato: true, 
  },
  {
    id: 11,
    nombre: 'Diego Cruz',
    foto: 'https://randomuser.me/api/portraits/men/40.jpg',
    estado: 'trabajó',
    horas: '0 hrs 40 min',
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '17:00',
    ultimaAccion2: '17:40',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Restaurantes',
    cargo: 'Coordinador',
    contrato: true, 
  },
  {
    id: 12,
    nombre: 'Xilean Trujillo',
    foto: 'https://randomuser.me/api/portraits/men/41.jpg',
    estado: 'trabajó',
    horas: '5 hrs 45 min',
    pais: 'Hodelpa Garden Court',
    ultimaAccion: '08:55',
    ultimaAccion2: '14:40',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Housekeeping',
    cargo: 'Asistente',
    contrato: true, 
  },
  {
    id: 13,
    nombre: 'Ana Mendoza',
    foto: 'https://randomuser.me/api/portraits/women/41.jpg',
    estado: 'trabajando',
    horas: '2 hrs 30 min',
    pais: 'Hodelpa Hotels & Resorts',
    ultimaAccion: '08:30', // Tardanza (después de las 8:00)
    dispositivo: 'smartphone',
    departamento: 'Nómina y Compensación',
    cargo: 'Gerente',
    marcajes: marcajesData[13],
    tardanza: {
      tiene: true,
      tiempo: '00:30'
    },
    contrato: true, 
  },
  {
    id: 14,
    nombre: 'Luis García',
    foto: 'https://randomuser.me/api/portraits/men/42.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Grupo CCN',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Gestión de Tiendas',
    cargo: 'Coordinador',
    contrato: true, 
  },
  {
    id: 15,
    nombre: 'Valentina Romero',
    foto: 'https://randomuser.me/api/portraits/women/42.jpg',
    estado: 'trabajando',
    horas: '4 hrs 45 min', // Ya está bien para horas extras
    pais: 'Banco Popular Dominicano',
    ultimaAccion: '07:15',
    dispositivo: 'computadora',
    departamento: 'Red de Sucursales',
    cargo: 'Director',
    marcajes: marcajesData[15],
    contrato: true, 
  },
  {
    id: 16,
    nombre: 'Pedro Silva',
    foto: 'https://randomuser.me/api/portraits/men/43.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Bares',
    cargo: 'Asistente',
    contrato: false, 
  },
  {
    id: 17,
    nombre: 'Carolina Jiménez',
    foto: 'https://randomuser.me/api/portraits/women/43.jpg',
    estado: 'trabajando',
    horas: '6 hrs 15 min',
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '09:45', // Tardanza (después de las 8:00)
    dispositivo: 'computadora',
    departamento: 'Recepción',
    cargo: 'Supervisora',
    marcajes: marcajesData[17],
    tardanza: {
      tiene: true,
      tiempo: '01:45'
    },
    contrato: true, 
  },
  {
    id: 18,
    nombre: 'Roberto Flores',
    foto: 'https://randomuser.me/api/portraits/men/44.jpg',
    estado: 'planificado',
    horas: null, // Sin horario
    pais: 'Supermercados Nacional',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Operaciones Retail',
    cargo: 'Analista',
    tieneContrato: false,
    contrato: true, 
  },
  {
    id: 19,
    nombre: 'Mariana López',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    estado: 'trabajó',
    horas: '8 hrs 0 min',
    pais: 'Hodelpa Hotels & Resorts',
    ultimaAccion: '08:00',
    ultimaAccion2: '16:00',
    dispositivo: 'computadora',
    dispositivo2: 'computadora',
    departamento: 'Recursos Humanos',
    cargo: 'Gerente',
    marcajes: marcajesData[19],
    contrato: true, 
  },
  {
    id: 20,
    nombre: 'Eduardo Torres',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    estado: 'trabajando',
    horas: '4 hrs 30 min',
    pais: 'Hodelpa Garden Court',
    ultimaAccion: '10:30', // Tardanza (después de las 8:00)
    dispositivo: 'computadora',
    departamento: 'Habitaciones',
    cargo: 'Desarrollador',
    marcajes: marcajesData[20],
    tardanza: {
      tiene: true,
      tiempo: '02:30'
    },
    contrato: true, 
  },
  {
    id: 21,
    nombre: 'Sofía Ramírez',
    foto: 'https://randomuser.me/api/portraits/women/45.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Banco Popular Dominicano',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Banca Personal',
    cargo: 'Asistente',
    contrato: true, 
  },
  {
    id: 22,
    nombre: 'Fernando Díaz',
    foto: 'https://randomuser.me/api/portraits/men/46.jpg',
    estado: 'trabajó',
    horas: '4 hrs 15 min',
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '08:30',
    ultimaAccion2: '12:45',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Lavandería',
    cargo: 'Coordinador',
    contrato: true, 
  },
  {
    id: 23,
    nombre: 'Isabel Moreno',
    foto: 'https://randomuser.me/api/portraits/women/46.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Selección de Personal',
    cargo: 'Analista',
    contrato: true, 
  },
  {
    id: 24,
    nombre: 'Ricardo Vargas',
    foto: 'https://randomuser.me/api/portraits/men/47.jpg',
    estado: 'trabajando',
    horas: '3 hrs 45 min',
    pais: 'Hodelpa Garden Court',
    ultimaAccion: '07:15',
    dispositivo: 'computadora',
    departamento: 'Evaluación y Desarrollo',
    cargo: 'Director',
    contrato: true, 
  },
  // Nuevos empleados con salidas intempestivas
  {
    id: 25,
    nombre: 'Laura Castillo',
    foto: 'https://randomuser.me/api/portraits/women/50.jpg',
    estado: 'trabajando',
    horas: '5 hrs 0 min',
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '07:30',
    ultimaAccion2: '12:30', // Salida intempestiva
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Ventas',
    cargo: 'Ejecutiva',
    marcajes: marcajesData[25],
    contrato: true, 
  },
  {
    id: 26,
    nombre: 'Manuel Rodriguez',
    foto: 'https://randomuser.me/api/portraits/men/50.jpg',
    estado: 'trabajando',
    horas: '6 hrs 0 min',
    pais: 'Hodelpa Garden Court',
    ultimaAccion: '08:00',
    ultimaAccion2: '14:00', // Salida intempestiva
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Finanzas',
    cargo: 'Contador',
    marcajes: marcajesData[26],
    contrato: true, 
  },
  // Agregar más empleados sin horario
  {
    id: 27,
    nombre: 'Daniel Ortega',
    foto: 'https://randomuser.me/api/portraits/men/51.jpg',
    estado: 'trabajando',
    horas: '5 hrs 30 min', // Horas extras
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '07:00',
    ultimaAccion2: '18:30',
    dispositivo: 'computadora',
    dispositivo2: 'computadora',
    departamento: 'Sistemas',
    cargo: 'Analista IT',
    marcajes: marcajesData[27],
    contrato: true, 
  },
  {
    id: 28,
    nombre: 'Lucía Mendez',
    foto: 'https://randomuser.me/api/portraits/women/51.jpg',
    estado: 'trabajando',
    horas: '3 hrs 15 min', // Horas extras
    pais: 'Hodelpa Garden Court',
    ultimaAccion: '06:30',
    ultimaAccion2: '17:45',
    dispositivo: 'computadora',
    dispositivo2: 'computadora',
    departamento: 'Contabilidad',
    cargo: 'Contadora',
    marcajes: marcajesData[28],
    contrato: true, 
  },
  {
    id: 29,
    nombre: 'Javier Santos',
    foto: 'https://randomuser.me/api/portraits/men/52.jpg',
    estado: 'trabajando',
    horas: '5 hrs 5 min', // Horas extras
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: '07:10',
    ultimaAccion2: '19:15',
    dispositivo: 'computadora',
    dispositivo2: 'computadora',
    departamento: 'Seguridad',
    cargo: 'Supervisor',
    marcajes: marcajesData[29],
    contrato: false, 
  },
  {
    id: 30,
    nombre: 'Clara Duarte',
    foto: 'https://randomuser.me/api/portraits/women/52.jpg',
    estado: 'trabajando',
    horas: '6 hrs 0 min', // Horas extras
    pais: 'Hodelpa Garden Court',
    ultimaAccion: '08:00',
    ultimaAccion2: '18:00',
    dispositivo: 'computadora',
    dispositivo2: 'computadora',
    departamento: 'Marketing',
    cargo: 'Diseñadora',
    marcajes: marcajesData[30],
    contrato: true, 
  },
  // Empleados sin horario
  {
    id: 31,
    nombre: 'Miguel Torres',
    foto: 'https://randomuser.me/api/portraits/men/53.jpg',
    estado: 'planificado',
    horas: null, // Sin horario
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Mantenimiento',
    cargo: 'Técnico',
    tieneContrato: false,
    contrato: false, 
  },
  {
    id: 32,
    nombre: 'Elena Gomez',
    foto: 'https://randomuser.me/api/portraits/women/53.jpg',
    estado: 'planificado',
    horas: null, // Sin horario
    pais: 'Hodelpa Garden Court',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Limpieza',
    cargo: 'Supervisora',
    tieneContrato: false,
    contrato: true, 
  },
  {
    id: 33,
    nombre: 'Carlos Martinez',
    foto: 'https://randomuser.me/api/portraits/men/54.jpg',
    estado: 'planificado',
    horas: null, // Sin horario
    pais: 'Hodelpa Gran Almirante',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Cocina',
    cargo: 'Chef',
    tieneContrato: false,
    contrato: true, 
  }
];

// Datos para estadísticas actualizados con los nuevos conteos
export const estadoDelDiaData = [
  { name: 'Trabajando', value: 15, color: '#4ade80' },
  { name: 'Trabajaron', value: 12, color: '#60a5fa' },
];

export const tiemposData = [
  { name: 'Trabajadas', value: 139, label: '7h 11m', color: '#4ade80' },
  { name: 'Planificadas', value: 132.25, label: '132h 15m', color: '#60a5fa' },
];

export const novedadesData = [
  { name: 'Tardanzas', value: 3, label: '4h 45m', color: '#bef264' },
  { name: 'Intempestivas', value: 3, label: '15h 30m', color: '#93c5fd' },
  { name: 'Permisos', value: 5, label: '47h 58m', color: '#fb923c' },
  { name: 'Ausencias', value: 9, label: '84h 0m', color: '#fca5a5' },
  { name: 'Sin Horario', value: 5, label: '0h 0m', color: '#a78bfa' },
  { name: 'Horas Extras', value: 7, label: '25h 30m', color: '#f472b6' },
];