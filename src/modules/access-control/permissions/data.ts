import type { AccessProfile, AccessRequest } from '../../../types';

export const accessProfilesData: AccessProfile[] = [
  {
    id: 'PRF001',
    name: 'Empleado Administrativo',
    type: 'employee',
    status: 'active',
    description: 'Perfil estándar para personal administrativo',
    areas: [
      {
        id: 'AREA001',
        name: 'Oficinas Administrativas',
        securityLevel: 'medium',
        schedule: {
          enabled24_7: false,
          customHours: {
            start: '07:00',
            end: '19:00'
          }
        }
      },
      {
        id: 'AREA002',
        name: 'Áreas Comunes',
        securityLevel: 'low',
        schedule: {
          enabled24_7: true
        }
      }
    ],
    schedule: {
      shifts: ['Mañana', 'Tarde'],
      specialDays: [
        {
          date: '2025-12-25',
          allowed: false,
          reason: 'Navidad'
        }
      ],
      exceptions: []
    },
    assignedUsers: 45,
    lastModified: '2025-02-14T10:30:00',
    modifiedBy: 'Ana Ramírez'
  },
  {
    id: 'PRF002',
    name: 'Contratista Mantenimiento',
    type: 'contractor',
    status: 'active',
    description: 'Perfil para personal de mantenimiento externo',
    areas: [
      {
        id: 'AREA003',
        name: 'Cuarto de Máquinas',
        securityLevel: 'high',
        schedule: {
          enabled24_7: false,
          customHours: {
            start: '08:00',
            end: '17:00'
          }
        }
      }
    ],
    schedule: {
      shifts: ['Diurno'],
      specialDays: [],
      exceptions: [
        {
          startDate: '2025-03-01',
          endDate: '2025-03-15',
          reason: 'Mantenimiento programado'
        }
      ]
    },
    assignedUsers: 12,
    lastModified: '2025-02-13T15:45:00',
    modifiedBy: 'Carlos Méndez'
  },
  {
    id: 'PRF003',
    name: 'Visitante Corporativo',
    type: 'visitor',
    status: 'active',
    description: 'Perfil para visitantes de otras sedes',
    areas: [
      {
        id: 'AREA002',
        name: 'Áreas Comunes',
        securityLevel: 'low',
        schedule: {
          enabled24_7: true
        }
      },
      {
        id: 'AREA004',
        name: 'Sala de Reuniones',
        securityLevel: 'medium',
        schedule: {
          enabled24_7: false,
          customHours: {
            start: '08:00',
            end: '18:00'
          }
        }
      }
    ],
    schedule: {
      shifts: ['Diurno'],
      specialDays: [],
      exceptions: []
    },
    assignedUsers: 8,
    lastModified: '2025-02-12T09:20:00',
    modifiedBy: 'Roberto Jiménez'
  }
];

export const accessRequestsData: AccessRequest[] = [
  {
    id: 'REQ001',
    requesterId: 'EMP001',
    requesterName: 'Juan Pérez',
    requesterDepartment: 'Operaciones',
    type: 'new',
    status: 'pending',
    profile: 'Empleado Administrativo',
    areas: ['Oficinas Administrativas', 'Áreas Comunes'],
    reason: 'Nuevo ingreso al departamento de operaciones',
    startDate: '2025-03-01',
    endDate: null,
    approvers: [
      {
        id: 'APR001',
        name: 'Ana Ramírez',
        role: 'Supervisor',
        status: 'approved',
        date: '2025-02-14T10:00:00',
        comments: 'Aprobado según política'
      },
      {
        id: 'APR002',
        name: 'Carlos Méndez',
        role: 'Seguridad',
        status: 'pending'
      }
    ],
    createdAt: '2025-02-14T09:00:00',
    documents: [
      {
        name: 'Contrato.pdf',
        url: '/documents/contratos/emp001.pdf'
      }
    ]
  },
  {
    id: 'REQ002',
    requesterId: 'CON001',
    requesterName: 'María González',
    requesterDepartment: 'Mantenimiento',
    type: 'modification',
    status: 'approved',
    profile: 'Contratista Mantenimiento',
    areas: ['Cuarto de Máquinas'],
    reason: 'Extensión de acceso para proyecto especial',
    startDate: '2025-03-01',
    endDate: '2025-03-15',
    approvers: [
      {
        id: 'APR003',
        name: 'Roberto Jiménez',
        role: 'Gerente',
        status: 'approved',
        date: '2025-02-13T14:30:00',
        comments: 'Aprobado para proyecto de actualización'
      }
    ],
    createdAt: '2025-02-13T11:00:00',
    documents: [
      {
        name: 'Orden de trabajo.pdf',
        url: '/documents/ordenes/con001.pdf'
      }
    ]
  }
];