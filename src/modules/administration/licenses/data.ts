import { License } from '../../../types';

export const licensesData: License[] = [
  {
    id: 'LIC-001',
    companyName: 'Hodelpa Hotels & Resorts',
    rnc: '101-89745-2',
    expirationDate: '2025-12-31',
    allowedCompanies: 5,
    usedCompanies: 3,
    allowedEmployees: 1000,
    activeEmployees: 850,
    modules: ['Control de Tiempo', 'Control de Accesos', 'Control de Comedor', 'Control de Capacitación'],
    status: 'active',
    contactInfo: {
      name: 'María González',
      email: 'mgonzalez@hodelpa.com',
      phone: '809-555-0100'
    }
  },
  {
    id: 'LIC-002',
    companyName: 'Grupo CCN',
    rnc: '102-73459-1',
    expirationDate: '2025-06-30',
    allowedCompanies: 3,
    usedCompanies: 2,
    allowedEmployees: 500,
    activeEmployees: 423,
    modules: ['Control de Tiempo', 'Control de Accesos'],
    status: 'active',
    contactInfo: {
      name: 'Juan Pérez',
      email: 'jperez@ccn.com.do',
      phone: '809-555-0200'
    }
  },
  {
    id: 'LIC-003',
    companyName: 'Supermercados Nacional',
    rnc: '103-84562-3',
    expirationDate: '2024-03-15',
    allowedCompanies: 10,
    usedCompanies: 8,
    allowedEmployees: 2000,
    activeEmployees: 1850,
    modules: ['Control de Tiempo', 'Control de Accesos', 'Control de Comedor'],
    status: 'active',
    contactInfo: {
      name: 'Roberto Méndez',
      email: 'rmendez@nacional.com.do',
      phone: '809-555-0300'
    }
  },
  {
    id: 'LIC-004',
    companyName: 'Banco Popular Dominicano',
    rnc: '104-95673-4',
    expirationDate: '2025-09-30',
    allowedCompanies: 15,
    usedCompanies: 12,
    allowedEmployees: 5000,
    activeEmployees: 4200,
    modules: ['Control de Tiempo', 'Control de Accesos', 'Control de Comedor', 'Control de Capacitación'],
    status: 'active',
    contactInfo: {
      name: 'Ana Ramírez',
      email: 'aramirez@bpd.com.do',
      phone: '809-555-0400'
    }
  },
  {
    id: 'LIC-005',
    companyName: 'Grupo Ramos',
    rnc: '105-86794-5',
    expirationDate: '2024-01-31',
    allowedCompanies: 8,
    usedCompanies: 6,
    allowedEmployees: 3000,
    activeEmployees: 2800,
    modules: ['Control de Tiempo', 'Control de Accesos', 'Control de Comedor'],
    status: 'active',
    contactInfo: {
      name: 'Carlos Santos',
      email: 'csantos@ramos.com.do',
      phone: '809-555-0500'
    }
  }
];