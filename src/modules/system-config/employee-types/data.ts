interface EmployeeType {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  checkMethod: string;
  accessLevel: string;
  diningAccess: boolean;
  overtimeAllowed: boolean;
  maxHoursPerDay: number;
  maxHoursPerWeek: number;
  benefits: string[];
}

export const employeeTypesData: EmployeeType[] = [
  {
    id: 'ET001',
    code: 'ADM',
    name: 'Administrativo',
    description: 'Personal administrativo y gerencial',
    status: 'active',
    checkMethod: 'Biométrico',
    accessLevel: 'Total',
    diningAccess: true,
    overtimeAllowed: true,
    maxHoursPerDay: 8,
    maxHoursPerWeek: 44,
    benefits: [
      'Seguro médico complementario',
      'Bonificación anual',
      'Vacaciones extendidas'
    ]
  },
  {
    id: 'ET002',
    code: 'OPE',
    name: 'Operativo',
    description: 'Personal de operaciones y servicios',
    status: 'active',
    checkMethod: 'Biométrico/Tarjeta',
    accessLevel: 'Restringido',
    diningAccess: true,
    overtimeAllowed: true,
    maxHoursPerDay: 8,
    maxHoursPerWeek: 44,
    benefits: [
      'Seguro médico básico',
      'Bonificación anual'
    ]
  },
  {
    id: 'ET003',
    code: 'TMP',
    name: 'Temporal',
    description: 'Personal contratado por tiempo definido',
    status: 'active',
    checkMethod: 'Tarjeta',
    accessLevel: 'Básico',
    diningAccess: true,
    overtimeAllowed: false,
    maxHoursPerDay: 8,
    maxHoursPerWeek: 44,
    benefits: [
      'Seguro médico básico'
    ]
  },
  {
    id: 'ET004',
    code: 'PRA',
    name: 'Practicante',
    description: 'Estudiantes en prácticas profesionales',
    status: 'active',
    checkMethod: 'Tarjeta',
    accessLevel: 'Limitado',
    diningAccess: true,
    overtimeAllowed: false,
    maxHoursPerDay: 6,
    maxHoursPerWeek: 30,
    benefits: [
      'Seguro contra accidentes',
      'Alimentación'
    ]
  },
  {
    id: 'ET005',
    code: 'EJE',
    name: 'Ejecutivo',
    description: 'Personal de alta dirección',
    status: 'active',
    checkMethod: 'Biométrico',
    accessLevel: 'Total Plus',
    diningAccess: true,
    overtimeAllowed: true,
    maxHoursPerDay: 8,
    maxHoursPerWeek: 44,
    benefits: [
      'Seguro médico internacional',
      'Bonificación anual',
      'Vacaciones extendidas',
      'Seguro de vida',
      'Plan de retiro'
    ]
  }
];