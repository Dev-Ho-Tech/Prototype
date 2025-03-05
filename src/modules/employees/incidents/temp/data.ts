import { Employee, Marcaje, TipoVerificacion, TipoMarcaje, Dispositivo } from '../interface/types';

export const dispositivos: Dispositivo[] = [
  { id: 'disp1', nombre: 'BIO-GA-001', tipo: 'Biometric', ubicacion: 'Entrada Principal', ip: '192.168.1.100', sn: 'ZK2023120001', estado: 'online', ultimaSincronizacion: '14/2/2025, 10:30:00' },
  { id: 'disp2', nombre: 'ACC-GA-001', tipo: 'Access', ubicacion: 'Puerta Principal', ip: '192.168.1.101', sn: 'SP2023120002', estado: 'online', ultimaSincronizacion: '14/2/2025, 10:28:00' },
  { id: 'disp3', nombre: 'DIN-GA-001', tipo: 'Dining', ubicacion: 'Comedor Principal', ip: '192.168.1.102', sn: 'HK2023120003', estado: 'warning', ultimaSincronizacion: '14/2/2025, 9:15:00' },
  { id: 'disp4', nombre: 'BIO-GA-002', tipo: 'Biometric', ubicacion: 'Entrada Secundaria', ip: '192.168.1.103', sn: 'ZK2023120004', estado: 'offline', ultimaSincronizacion: '13/2/2025, 18:45:00' },
  { id: 'disp5', nombre: 'ACC-GA-002', tipo: 'Access', ubicacion: 'Puerta Empleados', ip: '192.168.1.104', sn: 'SP2023120005', estado: 'online', ultimaSincronizacion: '14/2/2025, 10:15:00' }
];

export const employees: Employee[] = [
  {
    id: '1001',
    nombre: 'Ysidro Antonio',
    apellidos: 'Rosario Santos',
    position: 'Albañil',
    department: 'Mantenimiento',
    section: 'Mantenimiento',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1002',
    nombre: 'José Alfredo',
    apellidos: 'Toribio Mercado',
    position: 'Montador',
    department: 'Mantenimiento',
    section: 'Mantenimiento',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1003',
    nombre: 'Pablo Alexander',
    apellidos: 'Álvarez Paulino',
    position: 'Auxiliar De Contabilidad',
    department: 'Finanzas',
    section: 'Contabilidad',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1004',
    nombre: 'Johanna Cristina',
    apellidos: 'Cruz Hernandez',
    position: 'Encargada De Reservas',
    department: 'Recepción',
    section: 'Reservas',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1005',
    nombre: 'Pedro',
    apellidos: 'Rodríguez Rodríguez',
    position: 'Encargado De Desayuno',
    department: 'Alimentos y Bebidas',
    section: 'Restaurante',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1006',
    nombre: 'Gabriel',
    apellidos: 'Tavarez',
    position: 'Supervisor De Seguridad',
    department: 'Seguridad',
    section: 'Seguridad',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1007',
    nombre: 'Danilo Alcenio',
    apellidos: 'Mora Acevedo',
    position: 'Bellman',
    department: 'Front Desk',
    section: 'Servicio',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1008',
    nombre: 'Heriberto José',
    apellidos: 'Morel Cruceta',
    position: 'Capitán 2 B',
    department: 'Alimentos y Bebidas',
    section: 'Restaurante',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1009',
    nombre: 'José Eduardo',
    apellidos: 'Santos Morel',
    position: 'Chef Steward',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1010',
    nombre: 'Francisco',
    apellidos: 'Díaz Rodríguez',
    position: 'Cocinero',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1011',
    nombre: 'María Nieves',
    apellidos: 'Rosario',
    position: 'Auxiliar De Lavandería',
    department: 'Housekeeping',
    section: 'Lavandería',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1012',
    nombre: 'Melvin Antonio',
    apellidos: 'Jerez Cruz',
    position: 'Encargado De Lavandería',
    department: 'Housekeeping',
    section: 'Lavandería',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1013',
    nombre: 'Ramón',
    apellidos: 'Santana',
    position: 'Encargado (a) De Costos',
    department: 'Finanzas',
    section: 'Contabilidad',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1014',
    nombre: 'Juan Jesús',
    apellidos: 'De La',
    position: 'Encargado De Servibar',
    department: 'Alimentos y Bebidas',
    section: 'Bar',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1015',
    nombre: 'Fernando',
    apellidos: 'Rodríguez Paulino',
    position: 'Encargado De Panadería Y Paste',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1016',
    nombre: 'Remi Rafael',
    apellidos: 'Almonte Vasquez',
    position: 'Asistente De Reservas',
    department: 'Recepción',
    section: 'Reservas',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1017',
    nombre: 'Julio Antonio',
    apellidos: 'Pérez',
    position: 'Supervisor(a) De Ama De Llaves',
    department: 'Housekeeping',
    section: 'Habitaciones',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1018',
    nombre: 'Dionicio De',
    apellidos: 'Adames Almonte',
    position: 'Chofer',
    department: 'Servicios',
    section: 'Transporte',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1019',
    nombre: 'Abel',
    apellidos: 'Sánchez',
    position: 'Ayudante De Cocina',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  },
  {
    id: '1020',
    nombre: 'Abraham',
    apellidos: 'Espaillat',
    position: 'Jardinero',
    department: 'Mantenimiento',
    section: 'Áreas Verdes',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    containerType: 'Departamentos'
  }
];

export const marcajes: Marcaje[] = [
  // Marcajes para empleado 1001
  {
    id: '1',
    fecha: '14-02-2025',
    hora: '07:52 AM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '2',
    fecha: '14-02-2025',
    hora: '06:00 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },
  {
    id: '3',
    fecha: '15-02-2025',
    hora: '07:55 AM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '4',
    fecha: '15-02-2025',
    hora: '06:05 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },
  {
    id: '5',
    fecha: '16-02-2025',
    hora: '08:10 AM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '6',
    fecha: '16-02-2025',
    hora: '05:45 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },

  // Marcajes para empleado 1002
  {
    id: '7',
    fecha: '14-02-2025',
    hora: '08:00 AM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '8',
    fecha: '14-02-2025',
    hora: '05:00 PM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },
  {
    id: '9',
    fecha: '15-02-2025',
    hora: '08:15 AM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '10',
    fecha: '15-02-2025',
    hora: '05:10 PM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },

  // Marcajes para empleado 1003
  {
    id: '11',
    fecha: '14-02-2025',
    hora: '08:30 AM',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '12',
    fecha: '14-02-2025',
    hora: '05:30 PM',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },

  // Marcajes para empleado 1004
  {
    id: '13',
    fecha: '14-02-2025',
    hora: '09:00 AM',
    empleadoId: '1004',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '14',
    fecha: '14-02-2025',
    hora: '06:00 PM',
    empleadoId: '1004',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },
  
  // Marcajes para empleado 1005
  {
    id: '15',
    fecha: '14-02-2025',
    hora: '06:30 AM',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '16',
    fecha: '14-02-2025',
    hora: '02:30 PM',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },
  
  // Marcajes para empleado 1006
  {
    id: '17',
    fecha: '14-02-2025',
    hora: '07:00 AM',
    empleadoId: '1006',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '18',
    fecha: '14-02-2025',
    hora: '07:00 PM',
    empleadoId: '1006',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  },
  
  // Marcajes para empleado 1007
  {
    id: '19',
    fecha: '14-02-2025',
    hora: '08:00 AM',
    empleadoId: '1007',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false
  },
  {
    id: '20',
    fecha: '14-02-2025',
    hora: '04:00 PM',
    empleadoId: '1007',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false
  }
];