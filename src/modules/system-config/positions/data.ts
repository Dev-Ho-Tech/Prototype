interface Position {
  id: string;
  name: string;
  department: string;
  level: string;
  employeeCount: number;
  status: 'active' | 'inactive';
  education: string;
  experience: string;
  requirements: string[];
  description: string;
}

export const positionsData: Position[] = [
  {
    id: 'POS001',
    name: 'Gerente de Recursos Humanos',
    department: 'Recursos Humanos',
    level: 'Gerencial',
    employeeCount: 3,
    status: 'active',
    education: 'Licenciatura',
    experience: '5+ años',
    requirements: [
      'Licenciatura en RRHH o afines',
      'Experiencia en gestión de personal',
      'Conocimientos de legislación laboral'
    ],
    description: 'Responsable de la gestión del talento humano y políticas de personal'
  },
  {
    id: 'POS002',
    name: 'Recepcionista',
    department: 'Front Desk',
    level: 'Operativo',
    employeeCount: 12,
    status: 'active',
    education: 'Técnico',
    experience: '1-2 años',
    requirements: [
      'Técnico en hotelería',
      'Inglés avanzado',
      'Experiencia en atención al cliente'
    ],
    description: 'Atención a huéspedes y gestión de reservas'
  },
  {
    id: 'POS003',
    name: 'Chef Ejecutivo',
    department: 'Alimentos y Bebidas',
    level: 'Gerencial',
    employeeCount: 1,
    status: 'active',
    education: 'Profesional',
    experience: '8+ años',
    requirements: [
      'Graduado de escuela culinaria',
      'Experiencia en gestión de cocina',
      'Certificaciones internacionales'
    ],
    description: 'Dirección de operaciones culinarias y menús'
  },
  {
    id: 'POS004',
    name: 'Camarera',
    department: 'Housekeeping',
    level: 'Operativo',
    employeeCount: 25,
    status: 'active',
    education: 'Básica',
    experience: '1+ años',
    requirements: [
      'Experiencia en limpieza',
      'Atención al detalle',
      'Trabajo en equipo'
    ],
    description: 'Limpieza y mantenimiento de habitaciones'
  },
  {
    id: 'POS005',
    name: 'Supervisor de Seguridad',
    department: 'Seguridad',
    level: 'Supervisión',
    employeeCount: 4,
    status: 'active',
    education: 'Técnico',
    experience: '3+ años',
    requirements: [
      'Formación en seguridad',
      'Licencia de portación',
      'Experiencia en supervisión'
    ],
    description: 'Coordinación de equipo de seguridad y protocolos'
  },
  {
    id: 'POS006',
    name: 'Contador General',
    department: 'Finanzas',
    level: 'Gerencial',
    employeeCount: 1,
    status: 'active',
    education: 'Licenciatura',
    experience: '5+ años',
    requirements: [
      'Licenciatura en Contabilidad',
      'Conocimiento de normas NIIF',
      'Experiencia en hotelería'
    ],
    description: 'Gestión contable y financiera'
  }
];