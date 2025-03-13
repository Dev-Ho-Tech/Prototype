export type CheckProfileType = 'attendance' | 'access' | 'dining';
export type CheckProfileStatus = 'active' | 'inactive';
export type CheckMethodType = 'fingerprint' | 'face' | 'card' | 'pin' | 'mobile';

export interface CheckProfileSchedule {
  startTime: string;
  endTime: string;
  daysOfWeek?: number[]; // 0-6, donde 0 es domingo
  tolerance?: number; // minutos de tolerancia
}

export interface CheckProfileValidations {
  requirePhoto: boolean;
  requireLocation: boolean;
  requireSupervisorApproval?: boolean;
  allowOvertime?: boolean;
  maxDistanceMeters?: number;
}

export interface CheckProfile {
  id: string;
  name: string;
  description: string;
  type: CheckProfileType;
  status: CheckProfileStatus;
  employeeCount: number;
  schedule: CheckProfileSchedule;
  methods: CheckMethodType[];
  validations: CheckProfileValidations;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  locations?: string[];
  departments?: string[];
}

export type CheckProfileFormData = Omit<CheckProfile, 'id' | 'employeeCount' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;