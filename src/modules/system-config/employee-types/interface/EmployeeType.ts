export interface EmployeeType {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  intelliTime: boolean;
  intelliLunch: boolean;
  emailRequired: boolean;
  signatureRequired: boolean;
  requiredFields: string[];
  checkMethod?: string;
  accessLevel?: string;
  diningAccess?: boolean;
  overtimeAllowed?: boolean;
  description?: string;
}
