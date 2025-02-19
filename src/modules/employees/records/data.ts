import type { EmployeeRecord, Document } from '../../../types';

export const documentTypes: Document[] = [
  {
    id: 'DOC001',
    type: 'identification',
    name: 'Documento de Identidad',
    description: 'Cédula o pasaporte vigente',
    required: true,
    expirationRequired: true,
    validationRules: {
      fileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
      maxSize: 5242880, // 5MB
    }
  },
  {
    id: 'DOC002',
    type: 'photo',
    name: 'Foto 2x2',
    description: 'Fotografía reciente tipo carnet',
    required: true,
    expirationRequired: false,
    validationRules: {
      fileTypes: ['image/jpeg', 'image/png'],
      maxSize: 2097152, // 2MB
      dimensions: {
        width: 400,
        height: 400
      }
    }
  },
  {
    id: 'DOC003',
    type: 'resume',
    name: 'Curriculum Vitae',
    description: 'CV actualizado',
    required: true,
    expirationRequired: false,
    validationRules: {
      fileTypes: ['application/pdf'],
      maxSize: 10485760 // 10MB
    }
  },
  {
    id: 'DOC004',
    type: 'diploma',
    name: 'Título Académico',
    description: 'Título universitario o técnico',
    required: false,
    expirationRequired: false,
    validationRules: {
      fileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
      maxSize: 5242880 // 5MB
    }
  },
  {
    id: 'DOC005',
    type: 'certificate',
    name: 'Certificado Médico',
    description: 'Certificado médico pre-empleo',
    required: true,
    expirationRequired: true,
    validationRules: {
      fileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
      maxSize: 5242880 // 5MB
    }
  }
];

export const employeeRecordsData: EmployeeRecord[] = [
  {
    id: 'EMP001',
    code: '1001',
    firstName: 'Juan',
    lastName: 'Pérez',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    status: 'active',
    position: 'Gerente de Operaciones',
    department: 'Operaciones',
    location: 'Hodelpa Gran Almirante',
    startDate: '2024-01-15',
    personalInfo: {
      birthDate: '1985-06-15',
      gender: 'M',
      maritalStatus: 'Casado',
      nationality: 'Dominicana',
      idType: 'Cédula',
      idNumber: '001-1234567-8',
      address: 'Calle Principal #123, Santiago',
      phone: '809-555-0101',
      email: 'juan.perez@hodelpa.com',
      emergencyContact: {
        name: 'María Pérez',
        relationship: 'Esposa',
        phone: '809-555-0102'
      }
    },
    employmentInfo: {
      contractType: 'Tiempo Completo Indefinido',
      schedule: 'Lunes a Viernes 8:00 AM - 5:00 PM',
      supervisor: 'Carlos Méndez',
      salary: {
        amount: 85000,
        currency: 'DOP',
        type: 'monthly'
      },
      bankInfo: {
        bank: 'Banco Popular',
        accountType: 'Ahorro',
        accountNumber: '123456789'
      }
    },
    attendance: {
      checkProfile: 'Gerencial',
      defaultSchedule: 'ADM-001',
      exceptions: [
        {
          type: 'Vacaciones',
          startDate: '2025-03-15',
          endDate: '2025-03-30',
          description: 'Vacaciones anuales'
        }
      ]
    },
    documents: [
      {
        id: 'DOC001-EMP001',
        type: 'identification',
        name: 'Cédula de Identidad',
        uploadDate: '2024-01-10',
        expirationDate: '2028-01-10',
        status: 'valid',
        url: '/documents/emp001/cedula.pdf'
      },
      {
        id: 'DOC002-EMP001',
        type: 'certificate',
        name: 'Certificado Médico',
        uploadDate: '2024-01-10',
        expirationDate: '2025-01-10',
        status: 'valid',
        url: '/documents/emp001/certificado.pdf'
      }
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Certificado médico vence en 30 días',
        date: '2024-12-10'
      }
    ]
  },
  {
    id: 'EMP002',
    code: '1002',
    firstName: 'María',
    lastName: 'González',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    status: 'active',
    position: 'Recepcionista',
    department: 'Front Desk',
    location: 'Hodelpa Garden Court',
    startDate: '2024-02-01',
    personalInfo: {
      birthDate: '1992-08-20',
      gender: 'F',
      maritalStatus: 'Soltera',
      nationality: 'Dominicana',
      idType: 'Cédula',
      idNumber: '402-2345678-9',
      address: 'Av. Las Carreras #45, Santiago',
      phone: '809-555-0201',
      email: 'maria.gonzalez@hodelpa.com',
      emergencyContact: {
        name: 'Pedro González',
        relationship: 'Padre',
        phone: '809-555-0202'
      }
    },
    employmentInfo: {
      contractType: 'Tiempo Completo Indefinido',
      schedule: 'Rotativo',
      supervisor: 'Ana Ramírez',
      salary: {
        amount: 25000,
        currency: 'DOP',
        type: 'monthly'
      },
      bankInfo: {
        bank: 'Banreservas',
        accountType: 'Nómina',
        accountNumber: '987654321'
      }
    },
    attendance: {
      checkProfile: 'Operativo',
      defaultSchedule: 'REC-001',
      exceptions: []
    },
    documents: [
      {
        id: 'DOC001-EMP002',
        type: 'identification',
        name: 'Cédula de Identidad',
        uploadDate: '2024-01-25',
        expirationDate: '2028-01-25',
        status: 'valid',
        url: '/documents/emp002/cedula.pdf'
      }
    ],
    alerts: []
  }
];