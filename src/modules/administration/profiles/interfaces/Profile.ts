export interface Profile {
  id: string;
  name: string;
  description: string;
  assignedUsers: number;
  status: 'active' | 'inactive';
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  category: string;
  isEnabled: boolean;
}

export interface PermissionCategory {
  id: string;
  name: string;
  permissions: Permission[];
  isExpanded?: boolean;
}