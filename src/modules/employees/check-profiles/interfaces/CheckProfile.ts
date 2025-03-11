export interface CheckProfile {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  type: 'attendance' | 'access' | 'dining';
  methods: ('fingerprint' | 'face' | 'card' | 'pin')[];
  devices: string[];
  schedule: {
    startTime: string;
    endTime: string;
    days: number[];
  };
  validations: {
    requirePhoto: boolean;
    requireLocation: boolean;
    requireSupervisor: boolean;
    allowOvertime: boolean;
  };
  employeeCount: number;
  lastModified: string;
}

export interface CheckProfileCardProps {
  profile: CheckProfile;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface CheckProfileDetailProps {
  profile: CheckProfile;
  onEdit: () => void;
  onBack: () => void;
}

export interface CheckProfileFormProps {
  profile?: CheckProfile;
  isEditMode: boolean;
  onSave: (profile: CheckProfile) => void;
  onCancel: () => void;
}

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  profileName: string;
  onConfirm: () => void;
  onCancel: () => void;
}