import { User } from "../interfaces/user";

export const usersData: User[] = [
  {
    id: 'USR001',
    firstName: 'Carlos',
    lastName: 'Méndez',
    email: 'cmendez@hodelpa.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    role: 'admin',
    departments: ['Recursos Humanos', 'Administración'],
    permissions: {
      approveHours: true,
      modifyChecks: true,
      manageReports: true
    },
    status: 'active',
    lastLogin: '2025-02-14T08:30:00',
    startDate: '2024-01-01',
    twoFactorEnabled: true
  },
  {
    id: 'USR002',
    firstName: 'Ana',
    lastName: 'Ramírez',
    email: 'aramirez@hodelpa.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    role: 'supervisor',
    departments: ['Front Desk', 'Housekeeping'],
    permissions: {
      approveHours: true,
      modifyChecks: true,
      manageReports: false
    },
    status: 'active',
    lastLogin: '2025-02-14T09:15:00',
    startDate: '2024-02-01',
    twoFactorEnabled: false
  },
  {
    id: 'USR003',
    firstName: 'Roberto',
    lastName: 'García',
    email: 'rgarcia@hodelpa.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    role: 'manager',
    departments: ['Alimentos y Bebidas'],
    permissions: {
      approveHours: true,
      modifyChecks: false,
      manageReports: true
    },
    status: 'active',
    lastLogin: '2025-02-14T07:45:00',
    startDate: '2024-01-15',
    twoFactorEnabled: true
  },
  {
    id: 'USR004',
    firstName: 'María',
    lastName: 'Santos',
    email: 'msantos@hodelpa.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    role: 'supervisor',
    departments: ['Mantenimiento'],
    permissions: {
      approveHours: true,
      modifyChecks: true,
      manageReports: false
    },
    status: 'inactive',
    lastLogin: '2025-02-13T16:20:00',
    startDate: '2024-01-01',
    endDate: '2025-02-13',
    twoFactorEnabled: false
  },
  {
    id: 'USR005',
    firstName: 'Luis',
    lastName: 'Pérez',
    email: 'lperez@hodelpa.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    role: 'manager',
    departments: ['Seguridad'],
    permissions: {
      approveHours: true,
      modifyChecks: true,
      manageReports: true
    },
    status: 'active',
    lastLogin: '2025-02-14T10:00:00',
    startDate: '2024-02-01',
    twoFactorEnabled: true
  }
];

export const departments = [
  'Recursos Humanos',
  'Administración',
  'Front Desk',
  'Housekeeping',
  'Alimentos y Bebidas',
  'Mantenimiento',
  'Seguridad',
  'Contabilidad',
  'Marketing',
  'Ventas'
];

export const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'manager', label: 'Gerente' },
  { value: 'user', label: 'Usuario' }
];