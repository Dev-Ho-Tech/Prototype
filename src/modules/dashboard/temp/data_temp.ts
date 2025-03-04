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
  // Marcajes para empleado ID 9 (Jose Del Nardo)
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
  // Marcajes para empleado ID 4 (Carlos Peña)
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
  // Marcajes para empleado ID 13 (Ana Mendoza)
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
  // Marcajes para empleado ID 15 (Valentina Romero)
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
  // Marcajes para empleado ID 19 (Mariana López)
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
  ]
};

// Departamentos y cargos
const departamentos = [
  'Marketing', 
  'Recursos Humanos', 
  'Finanzas', 
  'Ventas', 
  'Desarrollo', 
  'Diseño', 
  'Operaciones', 
  'Atención al Cliente'
];

const cargos = [
  'Analista', 
  'Gerente', 
  'Coordinador', 
  'Asistente', 
  'Director', 
  'Diseñador', 
  'Desarrollador', 
  'Consultor'
];

export const empleadosDataEnriquecida: Employee[] = [
  {
    id: 1,
    nombre: 'Marcel Arcuri',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Republica Dominicana',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Informatica',
    cargo: 'Gerente'
  },
  {
    id: 2,
    nombre: 'Gerardo Campos',
    foto: 'https://randomuser.me/api/portraits/men/33.jpg',
    estado: 'trabajando',
    horas: '9 hrs 45 min',
    pais: 'Ecuador',
    ultimaAccion: '07:45',
    dispositivo: 'computadora',
    ultimaAccion2: '17:30',
    dispositivo2: 'computadora',
    departamento: 'Operaciones',
    cargo: 'Director',
    marcajes: marcajesData[2]
  },
  {
    id: 3,
    nombre: 'Genesis Orias',
    foto: 'https://randomuser.me/api/portraits/women/32.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Colombia',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Estadistica',
    cargo: 'Analista'
  },
  {
    id: 4,
    nombre: 'Carlos Peña',
    foto: 'https://randomuser.me/api/portraits/men/34.jpg',
    estado: 'trabajando',
    horas: '8 hrs 45 min',
    pais: 'Venezuela',
    ultimaAccion: '06:45',
    ultimaAccion2: '15:30',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Marketing',
    cargo: 'Gerente',
    marcajes: marcajesData[4]
  },
  {
    id: 5,
    nombre: 'Jose Pereira',
    foto: 'https://randomuser.me/api/portraits/men/35.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Venezuela',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Ventas',
    cargo: 'Coordinador'
  },
  {
    id: 6,
    nombre: 'Jesus Pacheco',
    foto: 'https://randomuser.me/api/portraits/men/36.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Colombia',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Marketing',
    cargo: 'Diseñador'
  },
  {
    id: 7,
    nombre: 'Jesus Valero',
    foto: 'https://randomuser.me/api/portraits/men/37.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Colombia',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Finanzas',
    cargo: 'Analista'
  },
  {
    id: 8,
    nombre: 'Maria Guerra',
    foto: 'https://randomuser.me/api/portraits/women/33.jpg',
    estado: 'trabajando',
    horas: '9 hrs 15 min',
    pais: 'Colombia',
    ultimaAccion: '07:30',
    dispositivo: 'smartphone',
    ultimaAccion2: '16:45',
    dispositivo2: 'smartphone',
    departamento: 'Diseño',
    cargo: 'Diseñador',
    marcajes: marcajesData[8]
  },
  {
    id: 9,
    nombre: 'Jose Del Nardo',
    foto: 'https://randomuser.me/api/portraits/men/38.jpg',
    estado: 'trabajando',
    horas: '11 hrs 05 min',
    pais: 'Colombia',
    ultimaAccion: '08:15',
    ultimaAccion2: '19:20',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Desarrollo',
    cargo: 'Desarrollador',
    marcajes: marcajesData[9]
  },
  {
    id: 10,
    nombre: 'Fernando Martinez',
    foto: null,
    estado: 'planificado',
    horas: '0 hrs 0 min',
    pais: 'Colombia',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Desarrollo',
    cargo: 'Desarrollador'
  },
  {
    id: 11,
    nombre: 'Diego Cruz',
    foto: 'https://randomuser.me/api/portraits/men/40.jpg',
    estado: 'trabajó',
    horas: '0 hrs 40 min',
    pais: 'Colombia',
    ultimaAccion: '17:00',
    ultimaAccion2: '17:40',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Operaciones',
    cargo: 'Coordinador'
  },
  {
    id: 12,
    nombre: 'Xilean Trujillo',
    foto: 'https://randomuser.me/api/portraits/men/41.jpg',
    estado: 'trabajó',
    horas: '5 hrs 45 min',
    pais: 'Colombia',
    ultimaAccion: '08:55',
    ultimaAccion2: '14:40',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Atención al Cliente',
    cargo: 'Asistente'
  },
  {
    id: 13,
    nombre: 'Ana Mendoza',
    foto: 'https://randomuser.me/api/portraits/women/41.jpg',
    estado: 'trabajando',
    horas: '7 hrs 30 min',
    pais: 'Venezuela',
    ultimaAccion: '08:30',
    dispositivo: 'smartphone',
    departamento: 'Finanzas',
    cargo: 'Gerente',
    marcajes: marcajesData[13]
  },
  {
    id: 14,
    nombre: 'Luis García',
    foto: 'https://randomuser.me/api/portraits/men/42.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Colombia',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Recursos Humanos',
    cargo: 'Coordinador'
  },
  {
    id: 15,
    nombre: 'Valentina Romero',
    foto: 'https://randomuser.me/api/portraits/women/42.jpg',
    estado: 'trabajando',
    horas: '8 hrs 45 min',
    pais: 'Ecuador',
    ultimaAccion: '07:15',
    dispositivo: 'computadora',
    departamento: 'Ventas',
    cargo: 'Director',
    marcajes: marcajesData[15]
  },
  {
    id: 16,
    nombre: 'Pedro Silva',
    foto: 'https://randomuser.me/api/portraits/men/43.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Colombia',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Marketing',
    cargo: 'Asistente'
  },
  {
    id: 17,
    nombre: 'Carolina Jiménez',
    foto: 'https://randomuser.me/api/portraits/women/43.jpg',
    estado: 'trabajando',
    horas: '6 hrs 15 min',
    pais: 'Venezuela',
    ultimaAccion: '09:45',
    dispositivo: 'computadora',
    departamento: 'Diseño',
    cargo: 'Diseñador'
  },
  {
    id: 18,
    nombre: 'Roberto Flores',
    foto: 'https://randomuser.me/api/portraits/men/44.jpg',
    estado: 'planificado',
    horas: '0 hrs 0 min',
    pais: 'Colombia',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Ventas',
    cargo: 'Analista'
  },
  {
    id: 19,
    nombre: 'Mariana López',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    estado: 'trabajó',
    horas: '8 hrs 0 min',
    pais: 'Ecuador',
    ultimaAccion: '08:00',
    ultimaAccion2: '16:00',
    dispositivo: 'computadora',
    dispositivo2: 'computadora',
    departamento: 'Recursos Humanos',
    cargo: 'Gerente',
    marcajes: marcajesData[19]
  },
  {
    id: 20,
    nombre: 'Eduardo Torres',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    estado: 'trabajando',
    horas: '4 hrs 30 min',
    pais: 'Colombia',
    ultimaAccion: '10:30',
    dispositivo: 'computadora',
    departamento: 'Desarrollo',
    cargo: 'Desarrollador'
  },
  {
    id: 21,
    nombre: 'Sofía Ramírez',
    foto: 'https://randomuser.me/api/portraits/women/45.jpg',
    estado: 'ausencia',
    horas: '0 hrs 0 min',
    pais: 'Venezuela',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Atención al Cliente',
    cargo: 'Asistente'
  },
  {
    id: 22,
    nombre: 'Fernando Díaz',
    foto: 'https://randomuser.me/api/portraits/men/46.jpg',
    estado: 'trabajó',
    horas: '4 hrs 15 min',
    pais: 'Colombia',
    ultimaAccion: '08:30',
    ultimaAccion2: '12:45',
    dispositivo: 'computadora',
    dispositivo2: 'smartphone',
    departamento: 'Marketing',
    cargo: 'Coordinador'
  },
  {
    id: 23,
    nombre: 'Isabel Moreno',
    foto: 'https://randomuser.me/api/portraits/women/46.jpg',
    estado: 'permiso',
    horas: '0 hrs 0 min',
    pais: 'Ecuador',
    ultimaAccion: null,
    dispositivo: null,
    departamento: 'Finanzas',
    cargo: 'Analista'
  },
  {
    id: 24,
    nombre: 'Ricardo Vargas',
    foto: 'https://randomuser.me/api/portraits/men/47.jpg',
    estado: 'trabajando',
    horas: '7 hrs 45 min',
    pais: 'Colombia',
    ultimaAccion: '07:15',
    dispositivo: 'computadora',
    departamento: 'Operaciones',
    cargo: 'Director'
  }
];

// Datos para estadísticas
export const estadoDelDiaData = [
  { name: 'Trabajando', value: 15, color: '#4ade80' },
  { name: 'Trabajaron', value: 12, color: '#60a5fa' },
];

export const tiemposData = [
  { name: 'Trabajadas', value: 139, label: '7h 11m', color: '#4ade80' },
  { name: 'Planificadas', value: 132.25, label: '132h 15m', color: '#60a5fa' },
];

export const novedadesData = [
  { name: 'Tardanzas', value: 1, label: '3h 32m', color: '#bef264' },
  { name: 'Intempestivas', value: 2, label: '13h 27m', color: '#93c5fd' },
  { name: 'Permisos', value: 2, label: '47h 58m', color: '#fb923c' },
  { name: 'Ausencias', value: 9, label: '84h 0m', color: '#fca5a5' },
  { name: 'Sin Horario', value: 0, label: '0h 0m', color: '#a78bfa' },
  { name: 'Horas Extras', value: 0, label: '0h 0m', color: '#f472b6' },
];