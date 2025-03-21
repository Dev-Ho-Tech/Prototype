export interface License {
  id: string;
  companyName: string;
  rnc: string;
  usedCompanies: number;
  allowedCompanies: number;
  activeEmployees: number;
  allowedEmployees: number;
  expirationDate: string;
  modules: string[];
  status: 'active' | 'inactive';
  creationDate?: string;
  lastUpdate?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}