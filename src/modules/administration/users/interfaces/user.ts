export interface Permission {
  approveHours: boolean;
  modifyChecks: boolean;
  manageReports: boolean;
  adminAccess?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  departments: string[];
  permissions: Permission;
  lastLogin: string;
  status: 'active' | 'inactive';
  avatar?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  startDate?: string;
  twoFactorEnabled?: boolean;
  endDate?: string;
}

export interface Role {
  value: string;
  label: string;
  description?: string;
}