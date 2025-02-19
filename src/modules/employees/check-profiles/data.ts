interface CheckProfile {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  type: 'attendance' | 'access' | 'dining';
  methods: ('fingerprint' | 'face' | 'card' | 'pin')[];
  devices: string[];
  schedule: {
    startTime: string;
    endTime: string;
    days: number[];
  };
  validations: {
    requirePhoto: boolean;
    requireLocation: boolean;
    requireSupervisor: boolean;
    allowOvertime: boolean;
  };
  employeeCount: number;
  lastModified: string;
}

export const checkProfilesData: CheckProfile[] = [
  {
    id: 'PRF001',
    name: 'Administrativo General',
    description: 'Perfil estándar para personal administrativo',
    status: 'active',
    type: 'attendance',
    methods: ['fingerprint', 'face'],
    devices: ['BIO-GA-001', 'BIO-GA-002', 'BIO-GA-003'],
    schedule: {
      startTime: '07:00',
      endTime: '18:00',
      days: [1, 2, 3, 4, 5]
    },
    validations: {
      requirePhoto: false,
      requireLocation: true,
      requireSupervisor: false,
      allowOvertime: true
    },
    employeeCount: 45,
    lastModified: '2025-02-14 10:30'
  },
  {
    id: 'PRF002',
    name: 'Operativo 24/7',
    description: 'Perfil para personal operativo con turnos rotativos',
    status: 'active',
    type: 'attendance',
    methods: ['fingerprint', 'card'],
    devices: ['BIO-GA-001', 'BIO-GA-002'],
    schedule: {
      startTime: '00:00',
      endTime: '23:59',
      days: [1, 2, 3, 4, 5, 6, 7]
    },
    validations: {
      requirePhoto: true,
      requireLocation: true,
      requireSupervisor: true,
      allowOvertime: true
    },
    employeeCount: 120,
    lastModified: '2025-02-14 09:15'
  },
  {
    id: 'PRF003',
    name: 'Acceso VIP',
    description: 'Perfil de acceso para ejecutivos',
    status: 'active',
    type: 'access',
    methods: ['fingerprint', 'face', 'card'],
    devices: ['ACC-GA-001', 'ACC-GA-002'],
    schedule: {
      startTime: '06:00',
      endTime: '22:00',
      days: [1, 2, 3, 4, 5, 6, 7]
    },
    validations: {
      requirePhoto: false,
      requireLocation: true,
      requireSupervisor: false,
      allowOvertime: false
    },
    employeeCount: 15,
    lastModified: '2025-02-14 11:45'
  },
  {
    id: 'PRF004',
    name: 'Comedor General',
    description: 'Perfil de acceso al comedor para empleados',
    status: 'active',
    type: 'dining',
    methods: ['card', 'pin'],
    devices: ['DIN-GA-001'],
    schedule: {
      startTime: '11:00',
      endTime: '15:00',
      days: [1, 2, 3, 4, 5]
    },
    validations: {
      requirePhoto: false,
      requireLocation: true,
      requireSupervisor: false,
      allowOvertime: false
    },
    employeeCount: 280,
    lastModified: '2025-02-14 08:20'
  }
];