// Existing types...

export interface OrganizationalNode {
  id: string;
  name: string;
  type: 'company' | 'branch' | 'department' | 'section' | 'unit';
  description?: string;
  code?: string;
  manager?: string;
  status: 'active' | 'inactive';
  children?: OrganizationalNode[];
  parent?: string;
  level: number;
  metadata?: {
    employeeCount?: number;
    location?: string;
    contact?: {
      managerFullName: string;
      position: string;
      email: string;
      phone: string;
      extension?: string;
      physicalLocation: {
        building: string;
        floor: string;
        office: string;
      };
    };
  };
}

export interface OrganizationalStructure {
  id: string;
  name: string;
  code: string;
  root: OrganizationalNode;
  metadata: {
    totalEmployees: number;
    totalDepartments: number;
    totalBranches: number;
    lastUpdated: string;
    updatedBy: string;
  };
}