import type { Company } from '../../../types';

export const companiesData: Company[] = [
  {
    id: 'HOD001',
    name: 'Hodelpa Hotels & Resorts',
    legalName: 'Hodelpa Hotels & Resorts, S.A.',
    rnc: '101-89745-2',
    logo: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=48&h=48&fit=crop',
    address: 'Calle El Sol #50',
    city: 'Santiago de los Caballeros',
    country: 'República Dominicana',
    phone: '809-580-1992',
    email: 'info@hodelpa.com',
    website: 'www.hodelpa.com',
    timezone: 'America/Santo_Domingo',
    currency: 'DOP',
    language: 'es',
    stats: {
      totalEmployees: 850,
      totalLocations: 5,
      activeDevices: 12
    },
    departments: [
      {
        id: 'HOD001-D001',
        name: 'Recursos Humanos',
        manager: 'María González',
        employeeCount: 15
      },
      {
        id: 'HOD001-D002',
        name: 'Alimentos y Bebidas',
        manager: 'Juan Pérez',
        employeeCount: 120
      },
      {
        id: 'HOD001-D003',
        name: 'Habitaciones',
        manager: 'Ana Ramírez',
        employeeCount: 85
      },
      {
        id: 'HOD001-D004',
        name: 'Mantenimiento',
        manager: 'Roberto Méndez',
        employeeCount: 45
      }
    ]
  },
  {
    id: 'CCN001',
    name: 'Grupo CCN',
    legalName: 'Centro Cuesta Nacional, S.A.S.',
    rnc: '102-73459-1',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=48&h=48&fit=crop',
    address: 'Av. Luperón #68',
    city: 'Santo Domingo',
    country: 'República Dominicana',
    phone: '809-537-5017',
    email: 'info@ccn.com.do',
    website: 'www.ccn.com.do',
    timezone: 'America/Santo_Domingo',
    currency: 'DOP',
    language: 'es',
    stats: {
      totalEmployees: 1200,
      totalLocations: 8,
      activeDevices: 24
    },
    departments: [
      {
        id: 'CCN001-D001',
        name: 'Recursos Humanos',
        manager: 'Carlos Santos',
        employeeCount: 25
      },
      {
        id: 'CCN001-D002',
        name: 'Operaciones',
        manager: 'Laura Mejía',
        employeeCount: 450
      },
      {
        id: 'CCN001-D003',
        name: 'Logística',
        manager: 'Pedro Hernández',
        employeeCount: 180
      }
    ]
  },
  {
    id: 'NAC001',
    name: 'Supermercados Nacional',
    legalName: 'Supermercados Nacional, S.A.S.',
    rnc: '103-84562-3',
    logo: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=48&h=48&fit=crop',
    address: 'Av. 27 de Febrero #208',
    city: 'Santo Domingo',
    country: 'República Dominicana',
    phone: '809-565-8284',
    email: 'info@nacional.com.do',
    website: 'www.nacional.com.do',
    timezone: 'America/Santo_Domingo',
    currency: 'DOP',
    language: 'es',
    stats: {
      totalEmployees: 2500,
      totalLocations: 15,
      activeDevices: 45
    },
    departments: [
      {
        id: 'NAC001-D001',
        name: 'Recursos Humanos',
        manager: 'Patricia Rodríguez',
        employeeCount: 35
      },
      {
        id: 'NAC001-D002',
        name: 'Ventas',
        manager: 'Miguel Torres',
        employeeCount: 850
      },
      {
        id: 'NAC001-D003',
        name: 'Almacén',
        manager: 'José Martínez',
        employeeCount: 320
      },
      {
        id: 'NAC001-D004',
        name: 'Mercadeo',
        manager: 'Carmen Díaz',
        employeeCount: 45
      }
    ]
  }
];