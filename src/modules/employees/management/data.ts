import { Employee } from "./interface/types";

export const locationData = [
  { name: 'Hodelpa Gran Almirante', value: 200, color: '#4F46E5' },
  { name: 'Hodelpa Garden', value: 150, color: '#818CF8' },
  { name: 'Centro Plaza Hodelpa', value: 38, color: '#C7D2FE' }
];

export const departmentData = [
  { name: 'Habitaciones', value: 120, color: '#EF4444' },
  { name: 'Alimentos y Bebidas', value: 80, color: '#F59E0B' },
  { name: 'Generales y Adm.', value: 70, color: '#10B981' },
  { name: 'Mantenimiento', value: 60, color: '#3B82F6' },
  { name: 'Otros', value: 58, color: '#6366F1' }
];

// Sample employee data
export const employeesaa = [
  {
    id: '1010008284',
    name: 'Kinsys Chevalier',
    position: 'Cocinero',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    method: 'Biométrico',
    initial: 'K'
  },
  {
    id: '1010008285',
    name: 'Maria Rodriguez',
    position: 'Recepcionista',
    location: 'Hodelpa Garden',
    department: 'Front Desk',
    method: 'Biométrico',
    initial: 'M'
  },
  {
    id: '1010008286',
    name: 'Juan Perez',
    position: 'Mantenimiento',
    location: 'Centro Plaza Hodelpa',
    department: 'Mantenimiento',
    method: 'Biométrico',
    initial: 'J'
  },
  {
    id: '1010008287',
    name: 'Ana Martinez',
    position: 'Camarera',
    location: 'Hodelpa Gran Almirante',
    department: 'Habitaciones',
    method: 'Biométrico',
    initial: 'A'
  },
  {
    id: '1010008288',
    name: 'Carlos Santos',
    position: 'Bartender',
    location: 'Hodelpa Garden',
    department: 'Alimentos y Bebidas',
    method: 'Biométrico',
    initial: 'C'
  },
  {
    id: '1010008289',
    name: 'Laura Mendez',
    position: 'Supervisora',
    location: 'Centro Plaza Hodelpa',
    department: 'Habitaciones',
    method: 'Biométrico',
    initial: 'L'
  },
  {
    id: '1010008290',
    name: 'Pedro Guzman',
    position: 'Chef',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    method: 'Biométrico',
    initial: 'P'
  },
  {
    id: '1010008291',
    name: 'Sofia Ramirez',
    position: 'Contadora',
    location: 'Hodelpa Garden',
    department: 'Generales y Adm.',
    method: 'Biométrico',
    initial: 'S'
  },
  {
    id: '1010008292',
    name: 'Roberto Diaz',
    position: 'Seguridad',
    location: 'Centro Plaza Hodelpa',
    department: 'Generales y Adm.',
    method: 'Biométrico',
    initial: 'R'
  },
  {
    id: '1010008293',
    name: 'Isabel Torres',
    position: 'Coordinadora',
    location: 'Hodelpa Gran Almirante',
    department: 'Front Desk',
    method: 'Biométrico',
    initial: 'I'
  }
];

export const employees: Employee[] = [
  {
    id: '1010008284',
    name: 'Kinsys Chevalier',
    position: 'Cocinero',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    method: 'Biométrico',
    initial: 'K',
    status: 'active'
  },
  {
    id: '1010008285',
    name: 'María Rodríguez',
    position: 'Recepcionista',
    location: 'Hodelpa Gran Almirante',
    department: 'Habitaciones',
    section: 'Recepción',
    method: 'Biométrico',
    initial: 'M',
    status: 'active'
  },
  {
    id: '1010008286',
    name: 'Juan Pérez',
    position: 'Supervisor',
    location: 'Hodelpa Garden',
    department: 'Mantenimiento',
    section: 'Áreas Comunes',
    method: 'Biométrico',
    initial: 'J',
    status: 'active'
  },
  {
    id: '1010008287',
    name: 'Ana Jiménez',
    position: 'Camarera',
    location: 'Hodelpa Garden',
    department: 'Habitaciones',
    section: 'Pisos',
    method: 'Huella',
    initial: 'A',
    status: 'active'
  },
  {
    id: '1010008288',
    name: 'Luis Martínez',
    position: 'Coordinador',
    location: 'Centro Plaza Hodelpa',
    department: 'Generales y Adm.',
    section: 'Recursos Humanos',
    method: 'Rostro',
    initial: 'L',
    status: 'active'
  },
  {
    id: '1010008289',
    name: 'Carmen Díaz',
    position: 'Asistente',
    location: 'Centro Plaza Hodelpa',
    department: 'Generales y Adm.',
    section: 'Administración',
    method: 'Huella',
    initial: 'C',
    status: 'inactive'
  },
  {
    id: '1010008290',
    name: 'Roberto Sánchez',
    position: 'Bartender',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    section: 'Bar',
    method: 'Rostro',
    initial: 'R',
    status: 'active'
  },
  {
    id: '1010008291',
    name: 'Patricia Gómez',
    position: 'Encargada',
    location: 'Hodelpa Garden',
    department: 'Otros',
    section: 'Eventos',
    method: 'Huella',
    initial: 'P',
    status: 'active'
  },
  {
    id: '1010008292',
    name: 'Miguel Torres',
    position: 'Técnico',
    location: 'Centro Plaza Hodelpa',
    department: 'Mantenimiento',
    section: 'Sistemas',
    method: 'Rostro',
    initial: 'M',
    status: 'active'
  },
  {
    id: '1010008293',
    name: 'Sofía Ramírez',
    position: 'Gerente',
    location: 'Hodelpa Gran Almirante',
    department: 'Generales y Adm.',
    section: 'Dirección',
    method: 'Biométrico',
    initial: 'S',
    status: 'active'
  },
  {
    id: '1010008294',
    name: 'Eduardo Morales',
    position: 'Mesero',
    location: 'Hodelpa Garden',
    department: 'Alimentos y Bebidas',
    section: 'Restaurante',
    method: 'Huella',
    initial: 'E',
    status: 'inactive'
  },
  {
    id: '1010008295',
    name: 'Laura Herrera',
    position: 'Recepcionista',
    location: 'Centro Plaza Hodelpa',
    department: 'Habitaciones',
    section: 'Recepción',
    method: 'Rostro',
    initial: 'L',
    status: 'active'
  },
  {
    id: '1010008284',
    name: 'Kinsys Chevalier',
    position: 'Cocinero',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    method: 'Biométrico',
    initial: 'K',
    status: 'active'
  },
  {
    id: '1010008285',
    name: 'María Rodríguez',
    position: 'Recepcionista',
    location: 'Hodelpa Gran Almirante',
    department: 'Habitaciones',
    section: 'Recepción',
    method: 'Biométrico',
    initial: 'M',
    status: 'active'
  },
  {
    id: '1010008286',
    name: 'Juan Pérez',
    position: 'Supervisor',
    location: 'Hodelpa Garden',
    department: 'Mantenimiento',
    section: 'Áreas Comunes',
    method: 'Biométrico',
    initial: 'J',
    status: 'active'
  },
  {
    id: '1010008287',
    name: 'Ana Jiménez',
    position: 'Camarera',
    location: 'Hodelpa Garden',
    department: 'Habitaciones',
    section: 'Pisos',
    method: 'Huella',
    initial: 'A',
    status: 'active'
  },
  {
    id: '1010008288',
    name: 'Luis Martínez',
    position: 'Coordinador',
    location: 'Centro Plaza Hodelpa',
    department: 'Generales y Adm.',
    section: 'Recursos Humanos',
    method: 'Rostro',
    initial: 'L',
    status: 'active'
  },
  {
    id: '1010008289',
    name: 'Carmen Díaz',
    position: 'Asistente',
    location: 'Centro Plaza Hodelpa',
    department: 'Generales y Adm.',
    section: 'Administración',
    method: 'Huella',
    initial: 'C',
    status: 'inactive'
  },
  {
    id: '1010008290',
    name: 'Roberto Sánchez',
    position: 'Bartender',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    section: 'Bar',
    method: 'Rostro',
    initial: 'R',
    status: 'active'
  },
  {
    id: '1010008291',
    name: 'Patricia Gómez',
    position: 'Encargada',
    location: 'Hodelpa Garden',
    department: 'Otros',
    section: 'Eventos',
    method: 'Huella',
    initial: 'P',
    status: 'active'
  },
  {
    id: '1010008292',
    name: 'Miguel Torres',
    position: 'Técnico',
    location: 'Centro Plaza Hodelpa',
    department: 'Mantenimiento',
    section: 'Sistemas',
    method: 'Rostro',
    initial: 'M',
    status: 'active'
  },
  {
    id: '1010008293',
    name: 'Sofía Ramírez',
    position: 'Gerente',
    location: 'Hodelpa Gran Almirante',
    department: 'Generales y Adm.',
    section: 'Dirección',
    method: 'Biométrico',
    initial: 'S',
    status: 'active'
  },
  {
    id: '1010008294',
    name: 'Eduardo Morales',
    position: 'Mesero',
    location: 'Hodelpa Garden',
    department: 'Alimentos y Bebidas',
    section: 'Restaurante',
    method: 'Huella',
    initial: 'E',
    status: 'inactive'
  },
  {
    id: '1010008295',
    name: 'Laura Herrera',
    position: 'Recepcionista',
    location: 'Centro Plaza Hodelpa',
    department: 'Habitaciones',
    section: 'Recepción',
    method: 'Rostro',
    initial: 'L',
    status: 'active'
  },
  // Nuevos empleados agregados
  {
    id: '1010008296',
    name: 'Gabriel Castillo',
    position: 'Chef Ejecutivo',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    method: 'Biométrico',
    initial: 'G',
    status: 'active'
  },
  {
    id: '1010008297',
    name: 'Carolina Vargas',
    position: 'Supervisora de Limpieza',
    location: 'Hodelpa Garden',
    department: 'Habitaciones',
    section: 'Pisos',
    method: 'Huella',
    initial: 'C',
    status: 'active'
  },
  {
    id: '1010008298',
    name: 'Alejandro Mendoza',
    position: 'Electricista',
    location: 'Centro Plaza Hodelpa',
    department: 'Mantenimiento',
    section: 'Técnicos',
    method: 'Rostro',
    initial: 'A',
    status: 'active'
  },
  {
    id: '1010008299',
    name: 'Valentina Torres',
    position: 'Contadora',
    location: 'Hodelpa Gran Almirante',
    department: 'Generales y Adm.',
    section: 'Finanzas',
    method: 'Biométrico',
    initial: 'V',
    status: 'active'
  },
  {
    id: '1010008300',
    name: 'Diego Fuentes',
    position: 'Barman',
    location: 'Hodelpa Garden',
    department: 'Alimentos y Bebidas',
    section: 'Bar',
    method: 'Huella',
    initial: 'D',
    status: 'active'
  },
  {
    id: '1010008301',
    name: 'Natalia Rojas',
    position: 'Organizadora de Eventos',
    location: 'Centro Plaza Hodelpa',
    department: 'Otros',
    section: 'Eventos',
    method: 'Rostro',
    initial: 'N',
    status: 'active'
  },
  {
    id: '1010008302',
    name: 'Javier Moreno',
    position: 'Seguridad',
    location: 'Hodelpa Gran Almirante',
    department: 'Otros',
    section: 'Seguridad',
    method: 'Biométrico',
    initial: 'J',
    status: 'active'
  },
  {
    id: '1010008303',
    name: 'Camila Ortega',
    position: 'Ama de llaves',
    location: 'Hodelpa Garden',
    department: 'Habitaciones',
    section: 'Pisos',
    method: 'Huella',
    initial: 'C',
    status: 'inactive'
  },
  {
    id: '1010008304',
    name: 'Sebastián López',
    position: 'Jardinero',
    location: 'Hodelpa Gran Almirante',
    department: 'Mantenimiento',
    section: 'Jardines',
    method: 'Rostro',
    initial: 'S',
    status: 'active'
  },
  {
    id: '1010008305',
    name: 'Marcela Vega',
    position: 'Asistente de Dirección',
    location: 'Centro Plaza Hodelpa',
    department: 'Generales y Adm.',
    section: 'Dirección',
    method: 'Biométrico',
    initial: 'M',
    status: 'active'
  },
  {
    id: '1010008306',
    name: 'Pablo Reyes',
    position: 'Cocinero',
    location: 'Hodelpa Garden',
    department: 'Alimentos y Bebidas',
    section: 'Cocina',
    method: 'Huella',
    initial: 'P',
    status: 'active'
  },
  {
    id: '1010008307',
    name: 'Daniela Paredes',
    position: 'Recepcionista Nocturna',
    location: 'Hodelpa Gran Almirante',
    department: 'Habitaciones',
    section: 'Recepción',
    method: 'Rostro',
    initial: 'D',
    status: 'active'
  },
  {
    id: '1010008308',
    name: 'Ricardo Molina',
    position: 'Técnico en Informática',
    location: 'Centro Plaza Hodelpa',
    department: 'Mantenimiento',
    section: 'Sistemas',
    method: 'Biométrico',
    initial: 'R',
    status: 'active'
  },
  {
    id: '1010008309',
    name: 'Isabel Navarro',
    position: 'Coordinadora de RRHH',
    location: 'Hodelpa Garden',
    department: 'Generales y Adm.',
    section: 'Recursos Humanos',
    method: 'Huella',
    initial: 'I',
    status: 'active'
  },
  {
    id: '1010008310',
    name: 'Fernando Araya',
    position: 'Sommelier',
    location: 'Hodelpa Gran Almirante',
    department: 'Alimentos y Bebidas',
    section: 'Restaurante',
    method: 'Rostro',
    initial: 'F',
    status: 'inactive'
  },
  {
    id: '1010008311',
    name: 'Mariana Castro',
    position: 'Community Manager',
    location: 'Centro Plaza Hodelpa',
    department: 'Generales y Adm.',
    section: 'Marketing',
    method: 'Biométrico',
    initial: 'M',
    status: 'active'
  },
  {
    id: '1010008312',
    name: 'Hugo Delgado',
    position: 'Lavandera',
    location: 'Hodelpa Garden',
    department: 'Habitaciones',
    section: 'Lavandería',
    method: 'Huella',
    initial: 'H',
    status: 'active'
  }
];