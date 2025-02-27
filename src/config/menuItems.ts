import { BarChart2, Users, Clock, Coffee, DoorClosed, Settings, Building2, Briefcase, Fingerprint, UserCheck, FileText, Mail, Utensils } from 'lucide-react';
import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Panel de Monitoreo',
    icon: BarChart2,
    path: '/dashboard'
  },
  {
    id: 'employees',
    label: 'Empleados',
    icon: Users,
    path: '/employees',
    children: [
      {
        id: 'employee-management',
        label: 'Gestión de Empleados',
        icon: UserCheck,
        path: '/employees/management'
      },
      {
        id: 'records',
        label: 'Expedientes',
        icon: FileText,
        path: '/employees/records'
      },
      {
        id: 'schedule-assignment',
        label: 'Asignación de Horarios',
        icon: Clock,
        path: '/employees/schedule'
      },
      {
        id: 'check-profiles',
        label: 'Perfiles de Marcaje',
        icon: Clock,
        path: '/employees/check-profiles'
      },
      {
        id: 'biometric',
        label: 'Información Biométrica',
        icon: Fingerprint,
        path: '/employees/biometric'
      }
    ]
  },
  {
    id: 'time-control',
    label: 'Control de Tiempo',
    icon: Clock,
    path: '/time-control',
    children: [
      {
        id: 'calendar',
        label: 'Planificador',
        icon: Clock,
        path: '/time-control/calendar'
      },
      {
        id: 'checks',
        label: 'Marcajes',
        icon: Clock,
        path: '/time-control/checks'
      },
      {
        id: 'hours-approval',
        label: 'Aprobación de Horas',
        icon: Clock,
        path: '/time-control/hours-approval'
      },
      {
        id: 'absence',
        label: 'Gestión de Ausencias',
        icon: Clock,
        path: '/time-control/absence'
      }
    ]
  },
  {
    id: 'dining',
    label: 'Control de Comedor',
    icon: Coffee,
    path: '/dining',
    children: [
      {
        id: 'dining-rooms',
        label: 'Comedores',
        icon: Coffee,
        path: '/dining/rooms'
      },
      {
        id: 'dining-schedule',
        label: 'Horarios de Comida',
        icon: Clock,
        path: '/dining/schedule'
      },
      {
        id: 'dining-access',
        label: 'Control de Acceso',
        icon: DoorClosed,
        path: '/dining/access'
      },
      {
        id: 'dining-reports',
        label: 'Reportes de Uso',
        icon: BarChart2,
        path: '/dining/reports'
      }
    ]
  },
  {
    id: 'access-control',
    label: 'Control de Acceso',
    icon: DoorClosed,
    path: '/access',
    children: [
      {
        id: 'doors',
        label: 'Puertas',
        icon: DoorClosed,
        path: '/access/doors'
      },
      {
        id: 'visitors',
        label: 'Visitantes',
        icon: Users,
        path: '/access/visitors'
      },
      {
        id: 'access-permissions',
        label: 'Permisos de Acceso',
        icon: UserCheck,
        path: '/access/permissions'
      },
      {
        id: 'monitoring',
        label: 'Monitoreo',
        icon: BarChart2,
        path: '/access/monitoring'
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reportes',
    icon: BarChart2,
    path: '/reports',
    children: [
      {
        id: 'attendance-reports',
        label: 'Asistencia',
        icon: Clock,
        path: '/reports/attendance'
      }
    ]
  },
  {
    id: 'administration',
    label: 'Administración',
    icon: Settings,
    path: '/administration',
    children: [
      {
        id: 'licenses',
        label: 'Gestión de Licencias',
        icon: FileText,
        path: '/administration/licenses'
      },
      {
        id: 'users',
        label: 'Usuarios',
        icon: UserCheck,
        path: '/administration/users'
      },
     
    ]
  },
  {
    id: 'system-config',
    label: 'Configuración del Sistema',
    icon: Settings,
    path: '/system-config',
    children: [
      {
        id: 'companies',
        label: 'Compañías',
        icon: Building2,
        path: '/system-config/structure'
      },
      {
        id: 'devices',
        label: 'Dispositivos',
        icon: Fingerprint,
        path: '/system-config/devices'
      },
      {
        id: 'employee-types',
        label: 'Tipos de Empleados',
        icon: UserCheck,
        path: '/system-config/employee-types'
      },
      {
        id: 'positions',
        label: 'Tipos de Acceso',
        icon: Briefcase,
        path: '/system-config/positions'
      },
      {
        id: 'contracts',
        label: 'Contratos',
        icon: FileText,
        path: '/system-config/contracts'
      },
      {
        id: 'diner',
        label: 'Comdedor',
        icon: Utensils,
        path: '/system-config/diner'
      },
      {
        id: 'email',
        label: 'Correo electronico',
        icon: Mail,
        path: '/system-config/email'
      },
      {
        id: 'general-config',
        label: 'Configuración General',
        icon: Settings,
        path: '/administration/config'
      }
    ]
  }
];