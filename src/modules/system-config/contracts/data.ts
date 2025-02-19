interface Contract {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'fixed' | 'temporary' | 'internship';
  status: 'active' | 'inactive';
  duration: string;
  benefits: string[];
  requirements: string[];
  employeeCount: number;
  trialPeriod: string;
  workingHours: {
    perDay: number;
    perWeek: number;
  };
  overtimeAllowed: boolean;
  vacationDays: number;
}

export const contractsData: Contract[] = [
  {
    id: 'CON001',
    code: 'FT-IND',
    name: 'Tiempo Completo Indefinido',
    description: 'Contrato a tiempo completo por tiempo indefinido',
    type: 'fixed',
    status: 'active',
    duration: 'Indefinido',
    benefits: [
      'Seguro médico complementario',
      'Bonificación anual',
      'Vacaciones según ley',
      'Seguro de vida'
    ],
    requirements: [
      'Documentación personal',
      'Referencias laborales',
      'Certificado médico'
    ],
    employeeCount: 245,
    trialPeriod: '3 meses',
    workingHours: {
      perDay: 8,
      perWeek: 44
    },
    overtimeAllowed: true,
    vacationDays: 14
  },
  {
    id: 'CON002',
    code: 'TMP-3M',
    name: 'Temporal 3 Meses',
    description: 'Contrato temporal por 3 meses',
    type: 'temporary',
    status: 'active',
    duration: '3 meses',
    benefits: [
      'Seguro médico básico',
      'Vacaciones proporcionales'
    ],
    requirements: [
      'Documentación personal',
      'Certificado médico'
    ],
    employeeCount: 58,
    trialPeriod: '1 mes',
    workingHours: {
      perDay: 8,
      perWeek: 44
    },
    overtimeAllowed: true,
    vacationDays: 7
  },
  {
    id: 'CON003',
    code: 'INT-6M',
    name: 'Pasantía 6 Meses',
    description: 'Contrato de pasantía por 6 meses',
    type: 'internship',
    status: 'active',
    duration: '6 meses',
    benefits: [
      'Subsidio de transporte',
      'Alimentación'
    ],
    requirements: [
      'Carta de la universidad',
      'Seguro estudiantil',
      'Documentación personal'
    ],
    employeeCount: 12,
    trialPeriod: 'N/A',
    workingHours: {
      perDay: 6,
      perWeek: 30
    },
    overtimeAllowed: false,
    vacationDays: 0
  },
  {
    id: 'CON004',
    code: 'PT-IND',
    name: 'Tiempo Parcial Indefinido',
    description: 'Contrato a tiempo parcial por tiempo indefinido',
    type: 'fixed',
    status: 'active',
    duration: 'Indefinido',
    benefits: [
      'Seguro médico básico',
      'Bonificación proporcional',
      'Vacaciones según ley'
    ],
    requirements: [
      'Documentación personal',
      'Referencias laborales',
      'Certificado médico'
    ],
    employeeCount: 35,
    trialPeriod: '2 meses',
    workingHours: {
      perDay: 4,
      perWeek: 24
    },
    overtimeAllowed: false,
    vacationDays: 7
  },
  {
    id: 'CON005',
    code: 'TMP-6M',
    name: 'Temporal 6 Meses',
    description: 'Contrato temporal por 6 meses',
    type: 'temporary',
    status: 'active',
    duration: '6 meses',
    benefits: [
      'Seguro médico básico',
      'Vacaciones proporcionales',
      'Bonificación proporcional'
    ],
    requirements: [
      'Documentación personal',
      'Referencias laborales',
      'Certificado médico'
    ],
    employeeCount: 89,
    trialPeriod: '1 mes',
    workingHours: {
      perDay: 8,
      perWeek: 44
    },
    overtimeAllowed: true,
    vacationDays: 7
  },
  {
    id: 'CON006',
    code: 'SES-IND',
    name: 'Por Temporada',
    description: 'Contrato por temporada alta',
    type: 'temporary',
    status: 'active',
    duration: 'Variable',
    benefits: [
      'Seguro médico básico',
      'Alojamiento',
      'Alimentación'
    ],
    requirements: [
      'Documentación personal',
      'Certificado médico',
      'Disponibilidad para residir'
    ],
    employeeCount: 42,
    trialPeriod: '15 días',
    workingHours: {
      perDay: 8,
      perWeek: 44
    },
    overtimeAllowed: true,
    vacationDays: 0
  }
];