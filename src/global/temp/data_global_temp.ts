import { 
  UnifiedEmployee, 
  WorkShift, 
  License, 
  Dispositivo,
} from '../interfaces/unifiedTypes';

// Funciones auxiliares para fechas
const currentDate = new Date();
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Fechas para ingresos y egresos recientes
const fifteenDaysAgo = new Date(currentDate);
fifteenDaysAgo.setDate(currentDate.getDate() - 15);

const sevenDaysAgo = new Date(currentDate);
sevenDaysAgo.setDate(currentDate.getDate() - 7);

const fiveDaysAgo = new Date(currentDate);
fiveDaysAgo.setDate(currentDate.getDate() - 5);

const twentyDaysAgo = new Date(currentDate);
twentyDaysAgo.setDate(currentDate.getDate() - 20);

const twentyFiveDaysAgo = new Date(currentDate);
twentyFiveDaysAgo.setDate(currentDate.getDate() - 25);

// Definición de turnos de trabajo
export const workShifts: WorkShift[] = [
  { id: 'A', label: 'A', startTime: '08:00', endTime: '16:00', color: 'bg-indigo-600 text-white' },
  { id: 'M', label: 'M', startTime: '06:00', endTime: '14:00', color: 'bg-amber-700 text-white' },
  { id: 'N', label: 'N', startTime: '16:00', endTime: '00:00', color: 'bg-blue-600 text-white' },
  { id: 'S', label: 'S', startTime: '08:00', endTime: '19:00', color: 'bg-violet-600 text-white' },
  { id: 'T', label: 'T', startTime: '02:00', endTime: '10:00', color: 'bg-emerald-600 text-white' },
];

// Definición de licencias
export const licenses: License[] = [
  { code: 'D', label: 'DESCANSO', color: 'bg-red-200 text-red-700' },
  { code: 'LPM', label: 'LICENCIA POR MATERNIDAD', color: 'bg-orange-200 text-orange-700' },
  { code: 'LPTE', label: 'LICENCIA POR TRAMITE ESPECIAL', color: 'bg-blue-200 text-blue-700' },
  { code: 'E', label: 'ESTUDIOS', color: 'bg-indigo-200 text-indigo-700' },
  { code: 'TL', label: 'TRAMITE LEGAL', color: 'bg-gray-200 text-gray-700' },
  { code: 'NDH', label: 'NACIMIENTO DE UN HIJO', color: 'bg-rose-200 text-rose-700' },
  { code: 'M', label: 'MATRIMONIO', color: 'bg-purple-200 text-purple-700' },
  { code: 'LPF', label: 'LICENCIA POR FALLECIMIENTO', color: 'bg-lime-200 text-lime-700' },
  { code: 'EEM', label: 'ELABORACIÓN EXÁMENES MÉDICOS', color: 'bg-fuchsia-200 text-fuchsia-700' },
  { code: 'IPA', label: 'INCAPACIDAD POR ACCIDENTE', color: 'bg-cyan-200 text-cyan-700' },
  { code: 'V', label: 'VACATION', color: 'bg-red-200 text-red-700' },
];

// Definición de dispositivos
export const dispositivos: Dispositivo[] = [
  { id: 'disp1', nombre: 'BIO-GA-001', tipo: 'Biometric', ubicacion: 'Entrada Principal', ip: '192.168.1.100', sn: 'ZK2023120001', estado: 'online', ultimaSincronizacion: '14/2/2025, 10:30:00' },
  { id: 'disp2', nombre: 'ACC-GA-001', tipo: 'Access', ubicacion: 'Puerta Principal', ip: '192.168.1.101', sn: 'SP2023120002', estado: 'online', ultimaSincronizacion: '14/2/2025, 10:28:00' },
  { id: 'disp3', nombre: 'DIN-GA-001', tipo: 'Dining', ubicacion: 'Comedor Principal', ip: '192.168.1.102', sn: 'HK2023120003', estado: 'warning', ultimaSincronizacion: '14/2/2025, 9:15:00' },
  { id: 'disp4', nombre: 'BIO-GA-002', tipo: 'Biometric', ubicacion: 'Entrada Secundaria', ip: '192.168.1.103', sn: 'ZK2023120004', estado: 'offline', ultimaSincronizacion: '13/2/2025, 18:45:00' },
  { id: 'disp5', nombre: 'ACC-GA-002', tipo: 'Access', ubicacion: 'Puerta Empleados', ip: '192.168.1.104', sn: 'SP2023120005', estado: 'online', ultimaSincronizacion: '14/2/2025, 10:15:00' }
];

// Definición de categorías organizacionales
export const locations = [
  { id: 'loc1', name: 'Hodelpa Gran Almirante' },
  { id: 'loc2', name: 'Hodelpa Garden' },
  { id: 'loc3', name: 'Centro Plaza Hodelpa' }
];

export const departments = [
  // Hodelpa Gran Almirante
  { id: 'dep1', name: 'Habitaciones', locationId: 'loc1' },
  { id: 'dep2', name: 'Alimentos y Bebidas', locationId: 'loc1' },
  { id: 'dep3', name: 'Generales y Adm.', locationId: 'loc1' },
  { id: 'dep4', name: 'Mantenimiento', locationId: 'loc1' },
  { id: 'dep5', name: 'Otros', locationId: 'loc1' },
  
  // Hodelpa Garden
  { id: 'dep6', name: 'Habitaciones', locationId: 'loc2' },
  { id: 'dep7', name: 'Alimentos y Bebidas', locationId: 'loc2' },
  { id: 'dep8', name: 'Generales y Adm.', locationId: 'loc2' },
  { id: 'dep9', name: 'Mantenimiento', locationId: 'loc2' },
  { id: 'dep10', name: 'Otros', locationId: 'loc2' },
  
  // Centro Plaza Hodelpa
  { id: 'dep11', name: 'Habitaciones', locationId: 'loc3' },
  { id: 'dep12', name: 'Alimentos y Bebidas', locationId: 'loc3' },
  { id: 'dep13', name: 'Generales y Adm.', locationId: 'loc3' },
  { id: 'dep14', name: 'Mantenimiento', locationId: 'loc3' },
  { id: 'dep15', name: 'Otros', locationId: 'loc3' }
];

// Datos combinados de empleados para el modelo unificado
const inactiveEmployees = [
  {
    id: '2001',
    codigo: '2001',
    primerNombre: 'Javier',
    segundoNombre: '',
    primerApellido: 'Castillo',
    segundoApellido: '',
    nombre: 'Javier',
    apellidos: 'Castillo',
    name: 'Javier Castillo',
    initial: 'J',
    telefono: '+1809-555-1001',
    correo: 'javier.castillo@hodelpa.com',
    position: 'Asistente de Cocina',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    unit: 'Cocina Fría',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'inactive', // Estado inactivo
    contractType: 'Indefinido',
    fechaInicialContrato: '2022-05-15',
    fechaFinalContrato: '2024-08-30', // Contrato finalizado hace unos meses
    displayName: 'Javier Castillo',
    fullName: 'Javier Castillo'
  },
  {
    id: '2002',
    codigo: '2002',
    primerNombre: 'Patricia',
    segundoNombre: 'Elena',
    primerApellido: 'Vásquez',
    segundoApellido: '',
    nombre: 'Patricia Elena',
    apellidos: 'Vásquez',
    name: 'Patricia Elena Vásquez',
    initial: 'P',
    telefono: '+1809-555-1002',
    correo: 'patricia.vasquez@hodelpa.com',
    position: 'Recepcionista',
    department: 'Habitaciones',
    section: 'Recepción',
    unit: 'Recepción Tarde',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Rostro',
    status: 'inactive', // Estado inactivo
    contractType: 'Temporal',
    fechaInicialContrato: '2023-11-01',
    fechaFinalContrato: '2024-05-01', // Contrato finalizado hace varios meses
    displayName: 'Patricia Elena Vásquez',
    fullName: 'Patricia Elena Vásquez'
  },
  {
    id: '2003',
    codigo: '2003',
    primerNombre: 'Manuel',
    segundoNombre: '',
    primerApellido: 'Ortiz',
    segundoApellido: '',
    nombre: 'Manuel',
    apellidos: 'Ortiz',
    name: 'Manuel Ortiz',
    initial: 'M',
    telefono: '+1809-555-1003',
    correo: 'manuel.ortiz@hodelpa.com',
    position: 'Mantenimiento',
    department: 'Mantenimiento',
    section: 'Mantenimiento',
    unit: 'Mantenimiento General',
    location: 'Centro Plaza Hodelpa',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'inactive', // Estado inactivo
    contractType: 'Indefinido',
    fechaInicialContrato: '2021-07-10',
    fechaFinalContrato: '2024-09-15', // Contrato finalizado recientemente
    displayName: 'Manuel Ortiz',
    fullName: 'Manuel Ortiz'
  }
];

const recentAdditions = [
  {
    id: '3001',
    codigo: '3001',
    primerNombre: 'Carolina',
    segundoNombre: '',
    primerApellido: 'Martínez',
    segundoApellido: '',
    nombre: 'Carolina',
    apellidos: 'Martínez',
    name: 'Carolina Martínez',
    initial: 'C',
    telefono: '+1809-555-2001',
    correo: 'carolina.martinez@hodelpa.com',
    position: 'Asistente de Eventos',
    department: 'Eventos',
    section: 'Eventos',
    unit: 'Eventos Corporativos',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Rostro',
    status: 'active',
    contractType: 'Temporal',
    fechaInicialContrato: formatDate(fifteenDaysAgo), // Contratada hace 15 días
    fechaFinalContrato: '2025-06-30',
    displayName: 'Carolina Martínez',
    fullName: 'Carolina Martínez'
  },
  {
    id: '3002',
    codigo: '3002',
    primerNombre: 'Fernando',
    segundoNombre: '',
    primerApellido: 'Ruiz',
    segundoApellido: 'Medina',
    nombre: 'Fernando',
    apellidos: 'Ruiz Medina',
    name: 'Fernando Ruiz Medina',
    initial: 'F',
    telefono: '+1809-555-2002',
    correo: 'fernando.ruiz@hodelpa.com',
    position: 'Bartender',
    department: 'Alimentos y Bebidas',
    section: 'Bar',
    unit: 'Bar Lounge',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: formatDate(sevenDaysAgo), // Contratado hace 7 días
    displayName: 'Fernando Ruiz Medina',
    fullName: 'Fernando Ruiz Medina'
  },
  {
    id: '3003',
    codigo: '3003',
    primerNombre: 'Gabriela',
    segundoNombre: 'María',
    primerApellido: 'Pérez',
    segundoApellido: 'Sánchez',
    nombre: 'Gabriela María',
    apellidos: 'Pérez Sánchez',
    name: 'Gabriela María Pérez Sánchez',
    initial: 'G',
    telefono: '+1809-555-2003',
    correo: 'gabriela.perez@hodelpa.com',
    position: 'Recepcionista',
    department: 'Habitaciones',
    section: 'Recepción',
    unit: 'Recepción Mañana',
    location: 'Centro Plaza Hodelpa',
    company: 'Caridelpa, S.A.',
    method: 'Rostro',
    status: 'active',
    contractType: 'Temporal',
    fechaInicialContrato: formatDate(currentDate), // Contratada hoy
    fechaFinalContrato: '2025-03-31',
    displayName: 'Gabriela María Pérez Sánchez',
    fullName: 'Gabriela María Pérez Sánchez'
  }
];

const recentExits = [
  {
    id: '4001',
    codigo: '4001',
    primerNombre: 'Héctor',
    segundoNombre: '',
    primerApellido: 'Durán',
    segundoApellido: '',
    nombre: 'Héctor',
    apellidos: 'Durán',
    name: 'Héctor Durán',
    initial: 'H',
    telefono: '+1809-555-3001',
    correo: 'hector.duran@hodelpa.com',
    position: 'Chef de Partida',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    unit: 'Cocina Fría',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'inactive',
    contractType: 'Temporal',
    fechaInicialContrato: '2023-09-01',
    fechaFinalContrato: formatDate(fiveDaysAgo), // Salió hace 5 días
    displayName: 'Héctor Durán',
    fullName: 'Héctor Durán'
  },
  {
    id: '4002',
    codigo: '4002',
    primerNombre: 'Leticia',
    segundoNombre: '',
    primerApellido: 'Núñez',
    segundoApellido: '',
    nombre: 'Leticia',
    apellidos: 'Núñez',
    name: 'Leticia Núñez',
    initial: 'L',
    telefono: '+1809-555-3002',
    correo: 'leticia.nunez@hodelpa.com',
    position: 'Camarera',
    department: 'Habitaciones',
    section: 'Habitaciones',
    unit: 'Limpieza VIP',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Rostro',
    status: 'inactive',
    contractType: 'Indefinido',
    fechaInicialContrato: '2022-03-15',
    fechaFinalContrato: formatDate(twentyDaysAgo), // Salió hace 20 días
    displayName: 'Leticia Núñez',
    fullName: 'Leticia Núñez'
  },
  {
    id: '4003',
    codigo: '4003',
    primerNombre: 'Oscar',
    segundoNombre: 'Roberto',
    primerApellido: 'Mejía',
    segundoApellido: '',
    nombre: 'Oscar Roberto',
    apellidos: 'Mejía',
    name: 'Oscar Roberto Mejía',
    initial: 'O',
    telefono: '+1809-555-3003',
    correo: 'oscar.mejia@hodelpa.com',
    position: 'Seguridad',
    department: 'Otros',
    section: 'Seguridad',
    unit: 'Seguridad Externa',
    location: 'Centro Plaza Hodelpa',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'inactive',
    contractType: 'Temporal',
    fechaInicialContrato: '2023-12-01',
    fechaFinalContrato: formatDate(twentyFiveDaysAgo), // Salió hace 25 días
    displayName: 'Oscar Roberto Mejía',
    fullName: 'Oscar Roberto Mejía'
  }
];


export const globalEmployees: UnifiedEmployee[] = [
  {
    id: '1001',
    codigo: '1001',
    primerNombre: 'Carmen',
    segundoNombre: '',
    primerApellido: 'Rodríguez',
    segundoApellido: '',
    nombre: 'Carmen',
    apellidos: 'Rodríguez',
    name: 'Carmen Rodríguez',
    initial: 'C',
    telefono: '+1809-555-0001',
    correo: 'carmen.rodriguez@hodelpa.com',
    position: 'Recepcionista',
    department: 'Front Desk',
    section: 'Recepción',
    unit: 'Recepción Mañana',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: '2023-01-15',
    displayName: 'Carmen Rodríguez',
    fullName: 'Carmen Rodríguez',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'M', 
        startTime: '06:00', 
        endTime: '14:00',
        actualEntryTime: '06:05',
        actualExitTime: '14:02',
        status: 'onTime'
      },
      { 
        date: '2025-02-11', 
        shift: 'M', 
        startTime: '06:00', 
        endTime: '14:00',
        actualEntryTime: '06:15',
        actualExitTime: '14:05',
        status: 'late'
      },
      { 
        date: '2025-02-12', 
        shift: 'D', 
        startTime: '06:00', 
        endTime: '16:00',
      },
      { 
        date: '2025-02-13', 
        shift: 'M', 
        startTime: '06:00', 
        endTime: '14:00',
        actualEntryTime: '06:03',
        actualExitTime: '13:45',
        status: 'early'
      },
      { 
        date: '2025-02-14', 
        shift: 'M', 
        startTime: '06:00', 
        endTime: '14:00' 
      }
    ]
  },
  {
    id: '1002',
    codigo: '1002',
    primerNombre: 'Luis',
    segundoNombre: '',
    primerApellido: 'Méndez',
    segundoApellido: '',
    nombre: 'Luis',
    apellidos: 'Méndez',
    name: 'Luis Méndez',
    initial: 'L',
    telefono: '+1809-555-0002',
    correo: 'luis.mendez@hodelpa.com',
    position: 'Chef Ejecutivo',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    unit: 'Cocina Principal',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: '2022-03-01',
    displayName: 'Luis Méndez',
    fullName: 'Luis Méndez',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'S', 
        startTime: '08:00', 
        endTime: '19:00',
        actualEntryTime: '07:55',
        actualExitTime: '19:10',
        status: 'onTime'
      },
      { 
        date: '2025-02-11', 
        shift: 'S', 
        startTime: '08:00', 
        endTime: '19:00',
        actualEntryTime: '08:00',
        actualExitTime: '19:00',
        status: 'onTime'
      },
      { 
        date: '2025-02-12', 
        shift: 'S', 
        startTime: '08:00', 
        endTime: '19:00',
        status: 'absent'
      }
    ]
  },
  {
    id: '1003',
    codigo: '1003',
    primerNombre: 'Ana',
    segundoNombre: 'María',
    primerApellido: 'Santos',
    segundoApellido: '',
    nombre: 'Ana María',
    apellidos: 'Santos',
    name: 'Ana María Santos',
    initial: 'A',
    telefono: '+1809-555-0003',
    correo: 'ana.santos@hodelpa.com',
    position: 'Camarera',
    department: 'Habitaciones',
    section: 'Habitaciones',
    unit: 'Limpieza General',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Temporal',
    fechaInicialContrato: '2024-06-15',
    fechaFinalContrato: '2025-06-14',
    displayName: 'Ana María Santos',
    fullName: 'Ana María Santos',
    schedule: [
      { date: '2025-02-10', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-11', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-12', shift: 'LPM', startTime: '', endTime: '' }
    ]
  },
  {
    id: '1004',
    codigo: '1004',
    primerNombre: 'Roberto',
    segundoNombre: '',
    primerApellido: 'Jiménez',
    segundoApellido: '',
    nombre: 'Roberto',
    apellidos: 'Jiménez',
    name: 'Roberto Jiménez',
    initial: 'R',
    telefono: '+1809-555-0004',
    correo: 'roberto.jimenez@hodelpa.com',
    position: 'Seguridad',
    department: 'Otros',
    section: 'Seguridad',
    unit: 'Seguridad Interna',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Rostro',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: '2023-04-01',
    displayName: 'Roberto Jiménez',
    fullName: 'Roberto Jiménez',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'N', 
        startTime: '16:00', 
        endTime: '00:00',
        actualEntryTime: '15:55',
        actualExitTime: '00:05',
        status: 'onTime'
      },
      { 
        date: '2025-02-11', 
        shift: 'N', 
        startTime: '16:00', 
        endTime: '00:00',
        actualEntryTime: '15:50',
        actualExitTime: '00:10',
        status: 'onTime'
      }
    ]
  },
  {
    id: '1005',
    codigo: '1005',
    primerNombre: 'María',
    segundoNombre: 'Fernanda',
    primerApellido: 'Torres',
    segundoApellido: '',
    nombre: 'María Fernanda',
    apellidos: 'Torres',
    name: 'María Fernanda Torres',
    initial: 'M',
    telefono: '+1809-555-0005',
    correo: 'maria.torres@hodelpa.com',
    position: 'Bartender',
    department: 'Alimentos y Bebidas',
    section: 'Bar',
    unit: 'Bar Principal',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: '2022-08-15',
    displayName: 'María Fernanda Torres',
    fullName: 'María Fernanda Torres',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'T', 
        startTime: '02:00', 
        endTime: '10:00',
        actualEntryTime: '02:10',
        actualExitTime: '10:05',
        status: 'late'
      },
      { 
        date: '2025-02-11', 
        shift: 'T', 
        startTime: '02:00', 
        endTime: '10:00',
        actualEntryTime: '02:05',
        actualExitTime: '10:00',
        status: 'onTime'
      }
    ]
  },
  {
    id: '1006',
    codigo: '1006',
    primerNombre: 'José',
    segundoNombre: 'Carlos',
    primerApellido: 'Ramírez',
    segundoApellido: '',
    nombre: 'José Carlos',
    apellidos: 'Ramírez',
    name: 'José Carlos Ramírez',
    initial: 'J',
    telefono: '+1809-555-0006',
    correo: 'jose.ramirez@hodelpa.com',
    position: 'Mantenimiento',
    department: 'Mantenimiento',
    section: 'Mantenimiento',
    unit: 'Mantenimiento General',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Por Proyecto',
    fechaInicialContrato: '2024-01-15',
    fechaFinalContrato: '2025-07-14',
    displayName: 'José Carlos Ramírez',
    fullName: 'José Carlos Ramírez',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'A', 
        startTime: '08:00', 
        endTime: '16:00',
        actualEntryTime: '08:00',
        actualExitTime: '16:05',
        status: 'onTime'
      },
      { 
        date: '2025-02-11', 
        shift: 'A', 
        startTime: '08:00', 
        endTime: '16:00',
        actualEntryTime: '08:10',
        actualExitTime: '16:00',
        status: 'late'
      }
    ]
  },
  {
    id: '1007',
    codigo: '1007',
    primerNombre: 'Isabel',
    segundoNombre: '',
    primerApellido: 'Morales',
    segundoApellido: '',
    nombre: 'Isabel',
    apellidos: 'Morales',
    name: 'Isabel Morales',
    initial: 'I',
    telefono: '+1809-555-0007',
    correo: 'isabel.morales@hodelpa.com',
    position: 'Recepcionista',
    department: 'Habitaciones',
    section: 'Recepción',
    unit: 'Recepción Tarde',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: '2022-05-01',
    displayName: 'Isabel Morales',
    fullName: 'Isabel Morales',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'E', 
        startTime: '', 
        endTime: '' 
      },
      { 
        date: '2025-02-11', 
        shift: 'M', 
        startTime: '06:00', 
        endTime: '14:00',
        actualEntryTime: '06:00',
        actualExitTime: '14:00',
        status: 'onTime'
      }
    ]
  },
  {
    id: '1008',
    codigo: '1008',
    primerNombre: 'Miguel',
    segundoNombre: 'Ángel',
    primerApellido: 'Pérez',
    segundoApellido: '',
    nombre: 'Miguel Ángel',
    apellidos: 'Pérez',
    name: 'Miguel Ángel Pérez',
    initial: 'M',
    telefono: '+1809-555-0008',
    correo: 'miguel.perez@hodelpa.com',
    position: 'Chef de Partida',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    unit: 'Cocina Caliente',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Rostro',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: '2023-02-15',
    displayName: 'Miguel Ángel Pérez',
    fullName: 'Miguel Ángel Pérez',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'S', 
        startTime: '08:00', 
        endTime: '19:00',
        actualEntryTime: '08:05',
        actualExitTime: '19:00',
        status: 'onTime'
      },
      { 
        date: '2025-02-11', 
        shift: 'S', 
        startTime: '08:00', 
        endTime: '19:00',
        actualEntryTime: '08:15',
        actualExitTime: '19:00',
        status: 'late'
      }
    ]
  },
  {
    id: '1009',
    codigo: '1009',
    primerNombre: 'Laura',
    segundoNombre: '',
    primerApellido: 'Guzmán',
    segundoApellido: '',
    nombre: 'Laura',
    apellidos: 'Guzmán',
    name: 'Laura Guzmán',
// Already moved above
    position: 'Camarera',
    department: 'Habitaciones',
    section: 'Habitaciones',
    unit: 'Limpieza General',
    location: 'Hodelpa Garden',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Temporal',
    fechaInicialContrato: '2024-07-01',
    fechaFinalContrato: '2025-01-31',
    displayName: 'Laura Guzmán',
    fullName: 'Laura Guzmán',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'M', 
        startTime: '06:00', 
        endTime: '14:00',
        actualEntryTime: '06:10',
        actualExitTime: '14:05',
        status: 'late'
      },
      { 
        date: '2025-02-11', 
        shift: 'V', 
        startTime: '', 
        endTime: '' 
      }
    ]
  },
  {
    id: '1010',
    codigo: '1010',
    primerNombre: 'Daniel',
    segundoNombre: '',
    primerApellido: 'Herrera',
    segundoApellido: '',
    nombre: 'Daniel',
    apellidos: 'Herrera',
    name: 'Daniel Herrera',
    initial: 'D',
    telefono: '+1809-555-0010',
    correo: 'daniel.herrera@hodelpa.com',
    position: 'Seguridad',
    department: 'Otros',
    section: 'Seguridad',
    unit: 'Seguridad Interna',
    location: 'Hodelpa Gran Almirante',
    company: 'Caridelpa, S.A.',
    method: 'Huella',
    status: 'active',
    contractType: 'Indefinido',
    fechaInicialContrato: '2023-03-15',
    displayName: 'Daniel Herrera',
    fullName: 'Daniel Herrera',
    schedule: [
      { 
        date: '2025-02-10', 
        shift: 'N', 
        startTime: '16:00', 
        endTime: '00:00',
        actualEntryTime: '16:05',
        actualExitTime: '00:00',
        status: 'onTime'
      },
      { 
        date: '2025-02-11', 
        shift: 'N', 
        startTime: '16:00', 
        endTime: '00:00',
        actualEntryTime: '16:00',
        actualExitTime: '00:05',
        status: 'onTime'
      }
    ]
  },
 ...inactiveEmployees.map(emp => ({ ...emp, status: 'inactive' as const })),
 ...recentAdditions.map(emp => ({ ...emp, status: 'active' as const })),
 ...recentExits.map(emp => ({ ...emp, status: 'inactive' as const }))

];



