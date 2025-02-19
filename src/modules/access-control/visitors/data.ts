import type { Visitor } from '../../../types';

export const visitorsData: Visitor[] = [
  {
    id: 'VIS001',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    firstName: 'Juan',
    lastName: 'Martínez',
    documentType: 'cedula',
    documentNumber: '001-1234567-8',
    company: 'Proveedor ABC',
    email: 'jmartinez@proveedorabc.com',
    phone: '809-555-0101',
    status: 'active',
    visit: {
      reason: 'Mantenimiento de equipos',
      host: 'Carlos Méndez',
      hostDepartment: 'Mantenimiento',
      areas: ['Área Técnica', 'Cuarto de Máquinas'],
      startTime: '2025-02-14T09:00:00',
      endTime: '2025-02-14T17:00:00',
      duration: '8h'
    },
    credentials: {
      type: 'card',
      cardNumber: 'V-0001',
      requiresEscort: true,
      escortName: 'Pedro Ramírez'
    },
    movements: [
      {
        location: 'Entrada Principal',
        time: '2025-02-14T09:00:00',
        type: 'entry'
      }
    ],
    createdAt: '2025-02-14T08:45:00',
    createdBy: 'Ana Ramírez'
  },
  {
    id: 'VIS002',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    firstName: 'María',
    lastName: 'González',
    documentType: 'passport',
    documentNumber: 'P123456',
    company: 'Consultores XYZ',
    email: 'mgonzalez@xyz.com',
    phone: '809-555-0102',
    status: 'pending',
    visit: {
      reason: 'Reunión de negocios',
      host: 'Roberto Jiménez',
      hostDepartment: 'Ventas',
      areas: ['Sala de Reuniones'],
      startTime: '2025-02-15T10:00:00',
      endTime: '2025-02-15T12:00:00',
      duration: '2h'
    },
    credentials: {
      type: 'pin',
      pin: '1234',
      requiresEscort: false
    },
    movements: [],
    createdAt: '2025-02-14T15:30:00',
    createdBy: 'Luis Pérez'
  },
  {
    id: 'VIS003',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    firstName: 'Roberto',
    lastName: 'Santos',
    documentType: 'cedula',
    documentNumber: '402-8765432-1',
    company: 'Auditores Asociados',
    email: 'rsantos@auditores.com',
    phone: '809-555-0103',
    status: 'completed',
    visit: {
      reason: 'Auditoría financiera',
      host: 'Carmen Díaz',
      hostDepartment: 'Finanzas',
      areas: ['Oficinas Administrativas', 'Archivo'],
      startTime: '2025-02-13T09:00:00',
      endTime: '2025-02-13T18:00:00',
      duration: '9h'
    },
    credentials: {
      type: 'both',
      cardNumber: 'V-0002',
      pin: '5678',
      requiresEscort: false
    },
    movements: [
      {
        location: 'Entrada Principal',
        time: '2025-02-13T09:00:00',
        type: 'entry'
      },
      {
        location: 'Entrada Principal',
        time: '2025-02-13T18:00:00',
        type: 'exit'
      }
    ],
    createdAt: '2025-02-13T08:30:00',
    createdBy: 'Ana Ramírez'
  }
];