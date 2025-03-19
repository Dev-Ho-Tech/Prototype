import { Visitor } from '../interfaces/types';

export const visitorsData: Visitor[] = [
  {
    id: 'visitor-1',
    firstName: 'Juan',
    lastName: 'Pérez',
    company: 'ABC Consultores',
    documentType: 'cedula',
    documentNumber: '12345678',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'active',
    visit: {
      reason: 'Reunión con Recursos Humanos',
      host: 'María Gómez',
      hostDepartment: 'RRHH',
      startTime: '2023-09-15T10:00:00',
      endTime: '2023-09-15T11:30:00',
      duration: '1h 30m'
    },
    credentials: {
      type: 'card',
      requiresEscort: false
    }
  },
  {
    id: 'visitor-2',
    firstName: 'Ana',
    lastName: 'Rodríguez',
    company: 'Tecnología XYZ',
    documentType: 'passport',
    documentNumber: 'AB123456',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'pending',
    visit: {
      reason: 'Entrevista de trabajo',
      host: 'Carlos Martínez',
      hostDepartment: 'Tecnología',
      startTime: '2023-09-16T14:00:00',
      endTime: '2023-09-16T15:00:00',
      duration: '1h'
    },
    credentials: {
      type: 'card_pin',
      requiresEscort: true
    }
  },
  {
    id: 'visitor-3',
    firstName: 'Roberto',
    lastName: 'Fernández',
    company: 'Constructora Norte',
    documentType: 'cedula',
    documentNumber: '87654321',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'completed',
    visit: {
      reason: 'Entrega de documentos',
      host: 'Lucia Sánchez',
      hostDepartment: 'Legal',
      startTime: '2023-09-14T09:30:00',
      endTime: '2023-09-14T10:15:00',
      duration: '45m'
    },
    credentials: {
      type: 'pin',
      requiresEscort: false
    }
  },
  {
    id: 'visitor-4',
    firstName: 'Sofía',
    lastName: 'López',
    company: 'Diseño Gráfico SL',
    documentType: 'license',
    documentNumber: 'LIC-56789',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'active',
    visit: {
      reason: 'Presentación de proyecto',
      host: 'Gabriel Torres',
      hostDepartment: 'Marketing',
      startTime: '2023-09-15T13:30:00',
      endTime: '2023-09-15T15:00:00',
      duration: '1h 30m'
    },
    credentials: {
      type: 'card',
      requiresEscort: false
    }
  },
  {
    id: 'visitor-5',
    firstName: 'Miguel',
    lastName: 'Hernández',
    company: 'Consultoría Global',
    documentType: 'cedula',
    documentNumber: '98765432',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: 'cancelled',
    visit: {
      reason: 'Auditoría financiera',
      host: 'Patricia Ramos',
      hostDepartment: 'Finanzas',
      startTime: '2023-09-14T11:00:00',
      endTime: '2023-09-14T16:00:00',
      duration: '5h'
    },
    credentials: {
      type: 'card_pin',
      requiresEscort: true
    }
  },
  {
    id: 'visitor-6',
    firstName: 'Laura',
    lastName: 'Díaz',
    company: 'Seguros Nacional',
    documentType: 'cedula',
    documentNumber: '45678912',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    status: 'pending',
    visit: {
      reason: 'Entrega de propuesta',
      host: 'Fernando Ramírez',
      hostDepartment: 'Operaciones',
      startTime: '2023-09-17T10:30:00',
      endTime: '2023-09-17T12:00:00',
      duration: '1h 30m'
    },
    credentials: {
      type: 'pin',
      requiresEscort: false
    }
  },
  {
    id: 'visitor-7',
    firstName: 'Carlos',
    lastName: 'Mendoza',
    company: 'Independiente',
    documentType: 'passport',
    documentNumber: 'CD987654',
    photo: 'https://randomuser.me/api/portraits/men/7.jpg',
    status: 'active',
    visit: {
      reason: 'Servicio técnico',
      host: 'Mariana Silva',
      hostDepartment: 'IT',
      startTime: '2023-09-15T09:00:00',
      endTime: '2023-09-15T12:00:00',
      duration: '3h'
    },
    credentials: {
      type: 'card',
      requiresEscort: true
    }
  },
  {
    id: 'visitor-8',
    firstName: 'Elena',
    lastName: 'García',
    company: 'Universidad Central',
    documentType: 'cedula',
    documentNumber: '36925814',
    photo: 'https://randomuser.me/api/portraits/women/8.jpg',
    status: 'pending',
    visit: {
      reason: 'Convenio educativo',
      host: 'Javier Morales',
      hostDepartment: 'Dirección',
      startTime: '2023-09-18T15:00:00',
      endTime: '2023-09-18T16:30:00',
      duration: '1h 30m'
    },
    credentials: {
      type: 'card_pin',
      requiresEscort: false
    }
  },
  {
    id: 'visitor-9',
    firstName: 'Alejandro',
    lastName: 'Vargas',
    company: 'Proveedores SA',
    documentType: 'license',
    documentNumber: 'LIC-12356',
    photo: 'https://randomuser.me/api/portraits/men/9.jpg',
    status: 'completed',
    visit: {
      reason: 'Entrega de materiales',
      host: 'Sandra Castro',
      hostDepartment: 'Compras',
      startTime: '2023-09-14T14:00:00',
      endTime: '2023-09-14T15:00:00',
      duration: '1h'
    },
    credentials: {
      type: 'card',
      requiresEscort: false
    }
  },
  {
    id: 'visitor-10',
    firstName: 'Natalia',
    lastName: 'Rojas',
    company: 'Medios Digitales',
    documentType: 'cedula',
    documentNumber: '74185296',
    photo: 'https://randomuser.me/api/portraits/women/10.jpg',
    status: 'pending',
    visit: {
      reason: 'Sesión fotográfica',
      host: 'Diego Ortiz',
      hostDepartment: 'Comunicaciones',
      startTime: '2023-09-19T10:00:00',
      endTime: '2023-09-19T13:00:00',
      duration: '3h'
    },
    credentials: {
      type: 'pin',
      requiresEscort: true
    }
  }
];