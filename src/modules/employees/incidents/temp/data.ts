import { Employee, Marcaje, TipoVerificacion, TipoMarcaje, Dispositivo, Incidencia } from '../interface/types';

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
    horaInicio: '07:52 AM',
    horaFin: '---',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T07:52:00Z',
    resultado: "Verificado"
  },
  {
    id: '2',
    fecha: '14-02-2025',
    hora: '06:00 PM',
    horaInicio: '07:52 AM',
    horaFin: '06:00 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T18:00:00Z',
    resultado: "Verificado"
  },
  {
    id: '3',
    fecha: '15-02-2025',
    hora: '07:55 AM',
    horaInicio: '07:55 AM',
    horaFin: '---',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-15T07:55:00Z',
    resultado: "Verificado"
  },
  {
    id: '4',
    fecha: '15-02-2025',
    hora: '06:05 PM',
    horaInicio: '07:55 AM',
    horaFin: '06:05 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-15T18:05:00Z',
    resultado: "Verificado"
  },
  {
    id: '5',
    fecha: '16-02-2025',
    hora: '08:10 AM',
    horaInicio: '08:10 AM',
    horaFin: '---',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-16T08:10:00Z',
    resultado: "Verificado"
  },
  {
    id: '6',
    fecha: '16-02-2025',
    hora: '05:45 PM',
    horaInicio: '08:10 AM',
    horaFin: '05:45 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-16T17:45:00Z',
    resultado: "Verificado"
  },

  // Marcajes para empleado 1002
  {
    id: '7',
    fecha: '14-02-2025',
    hora: '08:00 AM',
    horaInicio: '08:00 AM',
    horaFin: '---',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T08:00:00Z',
    resultado: "Verificado"
  },
  {
    id: '8',
    fecha: '14-02-2025',
    hora: '05:00 PM',
    horaInicio: '08:00 AM',
    horaFin: '05:00 PM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T17:00:00Z',
    resultado: "Verificado"
  },
  {
    id: '9',
    fecha: '15-02-2025',
    hora: '08:15 AM',
    horaInicio: '08:15 AM',
    horaFin: '---',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-15T08:15:00Z',
    resultado: "Verificado"
  },
  {
    id: '10',
    fecha: '15-02-2025',
    hora: '05:10 PM',
    horaInicio: '08:15 AM',
    horaFin: '05:10 PM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-15T17:10:00Z',
    resultado: "Verificado"
  },

  // Marcajes para empleado 1003
  {
    id: '11',
    fecha: '14-02-2025',
    hora: '08:30 AM',
    horaInicio: '08:30 AM',
    horaFin: '---',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T08:30:00Z',
    resultado: "Verificado"
  },
  {
    id: '12',
    fecha: '14-02-2025',
    hora: '05:30 PM',
    horaInicio: '08:30 AM',
    horaFin: '05:30 PM',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T17:30:00Z',
    resultado: "Verificado"
  },

  // Marcajes para empleado 1004
  {
    id: '13',
    fecha: '14-02-2025',
    hora: '09:00 AM',
    horaInicio: '09:00 AM',
    horaFin: '---',
    empleadoId: '1004',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T09:00:00Z',
    resultado: "Verificado"
  },
  {
    id: '14',
    fecha: '14-02-2025',
    hora: '06:00 PM',
    horaInicio: '09:00 AM',
    horaFin: '06:00 PM',
    empleadoId: '1004',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T18:00:00Z',
    resultado: "Verificado"
  },
  
  // Marcajes para empleado 1005
  {
    id: '15',
    fecha: '14-02-2025',
    hora: '06:30 AM',
    horaInicio: '06:30 AM',
    horaFin: '---',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T06:30:00Z',
    resultado: "Verificado"
  },
  {
    id: '16',
    fecha: '14-02-2025',
    hora: '02:30 PM',
    horaInicio: '06:30 AM',
    horaFin: '02:30 PM',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T14:30:00Z',
    resultado: "Verificado"
  },
  
  // Marcajes para empleado 1006
  {
    id: '17',
    fecha: '14-02-2025',
    hora: '07:00 AM',
    horaInicio: '07:00 AM',
    horaFin: '---',
    empleadoId: '1006',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T07:00:00Z',
    resultado: "Verificado"
  },
  {
    id: '18',
    fecha: '14-02-2025',
    hora: '07:00 PM',
    horaInicio: '07:00 AM',
    horaFin: '07:00 PM',
    empleadoId: '1006',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T19:00:00Z',
    resultado: "Verificado"
  },
  
  // Marcajes para empleado 1007
  {
    id: '19',
    fecha: '14-02-2025',
    hora: '08:00 AM',
    horaInicio: '08:00 AM',
    horaFin: '---',
    empleadoId: '1007',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T08:00:00Z',
    resultado: "Verificado"
  },
  {
    id: '20',
    fecha: '14-02-2025',
    hora: '04:00 PM',
    horaInicio: '08:00 AM',
    horaFin: '04:00 PM',
    empleadoId: '1007',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    usuarioRegistro: 'Sistema',
    timestampRegistro: '2025-02-14T16:00:00Z',
    resultado: "Verificado"
  }
];

 enum TipoIncidencia {
  TARDANZA = 'tardanzas',
  PERMISO = 'permisos',
  SALIDA_INTEMPESTIVA = 'salidas',
  AUSENCIA = 'ausencias',
  SIN_HORARIO = 'sin-horario',
  HORAS_EXTRAS = 'horas-extras'
}

export const incidencias: Incidencia[] = [
  // Tardanzas
  {
    id: 'inc-1',
    empleadoId: '1001',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.TARDANZA,
    estado: 'Pendiente',
    descripcion: 'Llegó 22 minutos tarde',
    marcajeId: '1'
  },
  {
    id: 'inc-2',
    empleadoId: '1004',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.TARDANZA,
    estado: 'Pendiente',
    descripcion: 'Llegó 60 minutos tarde',
    marcajeId: '13'
  },
  {
    id: 'inc-3',
    empleadoId: '1009',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.TARDANZA,
    estado: 'Justificada',
    descripcion: 'Llegó 15 minutos tarde',
    justificacion: 'Problemas con el transporte público'
  },
  {
    id: 'inc-4',
    empleadoId: '1012',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.TARDANZA,
    estado: 'Pendiente',
    descripcion: 'Llegó 10 minutos tarde'
  },
  
  // Permisos
  {
    id: 'inc-5',
    empleadoId: '1002',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.PERMISO,
    estado: 'Justificada',
    descripcion: 'Permiso por cita médica',
    justificacion: 'Presentó constancia médica'
  },
  {
    id: 'inc-6',
    empleadoId: '1007',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.PERMISO,
    estado: 'Justificada',
    descripcion: 'Permiso por trámites personales',
    justificacion: 'Autorizado por supervisor'
  },
  {
    id: 'inc-7',
    empleadoId: '1013',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.PERMISO,
    estado: 'Pendiente',
    descripcion: 'Solicita salir 2 horas antes'
  },
  {
    id: 'inc-8',
    empleadoId: '1016',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.PERMISO,
    estado: 'Justificada',
    descripcion: 'Permiso por emergencia familiar',
    justificacion: 'Autorizado por gerencia'
  },
  
  // Salidas intempestivas
  {
    id: 'inc-9',
    empleadoId: '1003',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió sin autorización a las 3:15 PM',
    marcajeId: '12'
  },
  {
    id: 'inc-10',
    empleadoId: '1005',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Injustificada',
    descripcion: 'Salió antes del horario establecido',
    marcajeId: '16'
  },
  {
    id: 'inc-11',
    empleadoId: '1008',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió sin registrar la salida'
  },
  {
    id: 'inc-12',
    empleadoId: '1010',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió durante el turno sin autorización'
  },
  {
    id: 'inc-13',
    empleadoId: '1014',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió durante el turno sin autorización'
  },
  {
    id: 'inc-14',
    empleadoId: '1015',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió durante el turno sin autorización'
  },
  {
    id: 'inc-15',
    empleadoId: '1017',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió durante el turno sin autorización'
  },
  {
    id: 'inc-16',
    empleadoId: '1018',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió durante el turno sin autorización'
  },
  {
    id: 'inc-17',
    empleadoId: '1019',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió durante el turno sin autorización'
  },
  {
    id: 'inc-18',
    empleadoId: '1020',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SALIDA_INTEMPESTIVA,
    estado: 'Pendiente',
    descripcion: 'Salió durante el turno sin autorización'
  },
  
  // Ausencias
  {
    id: 'inc-19',
    empleadoId: '1006',
    fecha: '15-02-2025',
    tipo: TipoIncidencia.AUSENCIA,
    estado: 'Injustificada',
    descripcion: 'No se presentó a trabajar'
  },
  {
    id: 'inc-20',
    empleadoId: '1011',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.AUSENCIA,
    estado: 'Pendiente',
    descripcion: 'No se presentó a trabajar'
  },
  {
    id: 'inc-21',
    empleadoId: '1019',
    fecha: '15-02-2025',
    tipo: TipoIncidencia.AUSENCIA,
    estado: 'Justificada',
    descripcion: 'Ausencia por enfermedad',
    justificacion: 'Presentó constancia médica'
  },
  {
    id: 'inc-22',
    empleadoId: '1020',
    fecha: '15-02-2025',
    tipo: TipoIncidencia.AUSENCIA,
    estado: 'Pendiente',
    descripcion: 'No se presentó a trabajar'
  },
  {
    id: 'inc-23',
    empleadoId: '1018',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.AUSENCIA,
    estado: 'Pendiente',
    descripcion: 'No se presentó a trabajar'
  },
  
  // Sin horario
  {
    id: 'inc-24',
    empleadoId: '1009',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SIN_HORARIO,
    estado: 'Pendiente',
    descripcion: 'Empleado sin horario asignado'
  },
  {
    id: 'inc-25',
    empleadoId: '1013',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SIN_HORARIO,
    estado: 'Pendiente',
    descripcion: 'Empleado sin horario asignado'
  },
  {
    id: 'inc-26',
    empleadoId: '1016',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SIN_HORARIO,
    estado: 'Pendiente',
    descripcion: 'Empleado sin horario asignado'
  },
  {
    id: 'inc-27',
    empleadoId: '1017',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SIN_HORARIO,
    estado: 'Pendiente',
    descripcion: 'Empleado sin horario asignado'
  },
  {
    id: 'inc-28',
    empleadoId: '1008',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.SIN_HORARIO,
    estado: 'Pendiente',
    descripcion: 'Empleado sin horario asignado'
  },
  
  // Horas extras
  {
    id: 'inc-29',
    empleadoId: '1001',
    fecha: '15-02-2025',
    tipo: TipoIncidencia.HORAS_EXTRAS,
    estado: 'Pendiente',
    descripcion: '2 horas extras'
  },
  {
    id: 'inc-30',
    empleadoId: '1002',
    fecha: '15-02-2025',
    tipo: TipoIncidencia.HORAS_EXTRAS,
    estado: 'Aprobada',
    descripcion: '1.5 horas extras',
    justificacion: 'Autorizado por supervisor'
  },
  {
    id: 'inc-31',
    empleadoId: '1004',
    fecha: '15-02-2025',
    tipo: TipoIncidencia.HORAS_EXTRAS,
    estado: 'Pendiente',
    descripcion: '1 hora extra'
  },
  {
    id: 'inc-32',
    empleadoId: '1006',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.HORAS_EXTRAS,
    estado: 'Aprobada',
    descripcion: '2 horas extras',
    justificacion: 'Autorizado por supervisor'
  },
  {
    id: 'inc-33',
    empleadoId: '1007',
    fecha: '15-02-2025',
    tipo: TipoIncidencia.HORAS_EXTRAS,
    estado: 'Pendiente',
    descripcion: '1 hora extra'
  },
  {
    id: 'inc-34',
    empleadoId: '1010',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.HORAS_EXTRAS,
    estado: 'Aprobada',
    descripcion: '1.5 horas extras',
    justificacion: 'Autorizado por supervisor'
  },
  {
    id: 'inc-35',
    empleadoId: '1012',
    fecha: '14-02-2025',
    tipo: TipoIncidencia.HORAS_EXTRAS,
    estado: 'Pendiente',
    descripcion: '2 horas extras'
  }
];