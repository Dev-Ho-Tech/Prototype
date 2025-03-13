export interface Employee {
  id: string;
  name: string;
  lastName: string;
  position?: string;
  department?: string;
  active: boolean;
}

export type EmployeeList = Employee[];