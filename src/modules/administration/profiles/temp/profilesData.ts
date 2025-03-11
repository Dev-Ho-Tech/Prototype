import { Profile } from '../interfaces/Profile';
import { PermissionCategory } from '../interfaces/Profile';

export const profilesData: Profile[] = [
  {
    id: '1',
    name: 'Administrador General',
    description: 'Acceso completo a todas las funcionalidades del sistema',
    assignedUsers: 3,
    status: 'active',
    permissions: [
      { id: '1-1', name: 'Ver empleados', category: 'Empleados', isEnabled: true },
      { id: '1-2', name: 'Crear empleados', category: 'Empleados', isEnabled: true },
      { id: '1-3', name: 'Editar empleados', category: 'Empleados', isEnabled: true },
      { id: '1-4', name: 'Eliminar empleados', category: 'Empleados', isEnabled: true },
      { id: '1-5', name: 'Gestionar usuarios', category: 'Administración', isEnabled: true },
      { id: '1-6', name: 'Gestionar perfiles', category: 'Administración', isEnabled: true },
      { id: '1-7', name: 'Configuración general', category: 'Administración', isEnabled: true },
      { id: '1-8', name: 'Descargar reportes', category: 'Reportes', isEnabled: true }
    ]
  },
  {
    id: '2',
    name: 'Supervisor de Recursos Humanos',
    description: 'Gestión de empleados y control de asistencia',
    assignedUsers: 8,
    status: 'active',
    permissions: [
      { id: '2-1', name: 'Ver empleados', category: 'Empleados', isEnabled: true },
      { id: '2-2', name: 'Crear empleados', category: 'Empleados', isEnabled: true },
      { id: '2-3', name: 'Editar empleados', category: 'Empleados', isEnabled: true },
      { id: '2-4', name: 'Eliminar empleados', category: 'Empleados', isEnabled: false },
      { id: '2-5', name: 'Gestionar usuarios', category: 'Administración', isEnabled: false },
      { id: '2-6', name: 'Gestionar perfiles', category: 'Administración', isEnabled: false },
      { id: '2-7', name: 'Configuración general', category: 'Administración', isEnabled: false },
      { id: '2-8', name: 'Descargar reportes', category: 'Reportes', isEnabled: true }
    ]
  },
  {
    id: '3',
    name: 'Gerente de Operaciones',
    description: 'Acceso a reportes y gestión de departamentos',
    assignedUsers: 5,
    status: 'active',
    permissions: [
      { id: '3-1', name: 'Ver empleados', category: 'Empleados', isEnabled: true },
      { id: '3-2', name: 'Crear empleados', category: 'Empleados', isEnabled: false },
      { id: '3-3', name: 'Editar empleados', category: 'Empleados', isEnabled: false },
      { id: '3-4', name: 'Eliminar empleados', category: 'Empleados', isEnabled: false },
      { id: '3-5', name: 'Gestionar usuarios', category: 'Administración', isEnabled: false },
      { id: '3-6', name: 'Gestionar perfiles', category: 'Administración', isEnabled: false },
      { id: '3-7', name: 'Configuración general', category: 'Administración', isEnabled: false },
      { id: '3-8', name: 'Descargar reportes', category: 'Reportes', isEnabled: true }
    ]
  }
];

export const permissionCategories: PermissionCategory[] = [
  {
    id: 'cat-1',
    name: 'Empleados',
    permissions: [
      { id: 'perm-1', name: 'Ver empleados', category: 'Empleados', isEnabled: false },
      { id: 'perm-2', name: 'Crear empleados', category: 'Empleados', isEnabled: false },
      { id: 'perm-3', name: 'Editar empleados', category: 'Empleados', isEnabled: false },
      { id: 'perm-4', name: 'Eliminar empleados', category: 'Empleados', isEnabled: false }
    ],
    isExpanded: true
  },
  {
    id: 'cat-2',
    name: 'Administración',
    permissions: [
      { id: 'perm-5', name: 'Gestionar usuarios', category: 'Administración', isEnabled: false },
      { id: 'perm-6', name: 'Gestionar perfiles', category: 'Administración', isEnabled: false },
      { id: 'perm-7', name: 'Configuración general', category: 'Administración', isEnabled: false }
    ],
    isExpanded: true
  },
  {
    id: 'cat-3',
    name: 'Reportes',
    permissions: [
      { id: 'perm-8', name: 'Descargar reportes', category: 'Reportes', isEnabled: false }
    ],
    isExpanded: true
  }
];