interface Employee {
  initial?: string;
  name?: string;
  position?: string;
  department?: string;
  location?: string;
  id?: string;
}


export interface EmployeeProfileHeaderProps {
  employee: Employee;
  onClose: () => void;
}

