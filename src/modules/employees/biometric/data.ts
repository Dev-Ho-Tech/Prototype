interface BiometricData {
  id: string;
  employeeId: string;
  employeeName: string;
  photo: string;
  department: string;
  registrationStatus: {
    fingerprints: {
      registered: number;
      total: number;
      quality: number;
      lastUpdate: string;
    };
    face: {
      registered: boolean;
      quality: number;
      lastUpdate: string;
    };
    card: {
      registered: boolean;
      number: string;
      lastUpdate: string;
    };
    pin: {
      set: boolean;
      lastUpdate: string;
    };
  };
  devices: string[];
  lastSync: string;
  status: 'complete' | 'incomplete' | 'pending';
}

export const biometricData: BiometricData[] = [
  {
    id: 'BIO001',
    employeeId: '1001',
    employeeName: 'Juan Pérez',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    department: 'Operaciones',
    registrationStatus: {
      fingerprints: {
        registered: 10,
        total: 10,
        quality: 95,
        lastUpdate: '2025-02-14'
      },
      face: {
        registered: true,
        quality: 98,
        lastUpdate: '2025-02-14'
      },
      card: {
        registered: true,
        number: 'A123456',
        lastUpdate: '2025-02-14'
      },
      pin: {
        set: true,
        lastUpdate: '2025-02-14'
      }
    },
    devices: ['BIO-GA-001', 'BIO-GA-002'],
    lastSync: '2025-02-14 10:30',
    status: 'complete'
  },
  {
    id: 'BIO002',
    employeeId: '1002',
    employeeName: 'María González',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    department: 'Front Desk',
    registrationStatus: {
      fingerprints: {
        registered: 8,
        total: 10,
        quality: 90,
        lastUpdate: '2025-02-14'
      },
      face: {
        registered: true,
        quality: 95,
        lastUpdate: '2025-02-14'
      },
      card: {
        registered: true,
        number: 'A123457',
        lastUpdate: '2025-02-14'
      },
      pin: {
        set: false,
        lastUpdate: ''
      }
    },
    devices: ['BIO-GA-001'],
    lastSync: '2025-02-14 09:15',
    status: 'incomplete'
  },
  {
    id: 'BIO003',
    employeeId: '1003',
    employeeName: 'Carlos Rodríguez',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop',
    department: 'Mantenimiento',
    registrationStatus: {
      fingerprints: {
        registered: 0,
        total: 10,
        quality: 0,
        lastUpdate: ''
      },
      face: {
        registered: false,
        quality: 0,
        lastUpdate: ''
      },
      card: {
        registered: false,
        number: '',
        lastUpdate: ''
      },
      pin: {
        set: false,
        lastUpdate: ''
      }
    },
    devices: [],
    lastSync: '',
    status: 'pending'
  }
];