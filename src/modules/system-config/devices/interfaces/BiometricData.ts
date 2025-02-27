export interface BiometricData {
  employeeId: string;
  name: string;
  fingerprints: {
    registered: number;
    quality: number;
    lastUpdate: string;
  };
  face: {
    registered: boolean;
    quality: number;
    lastUpdate: string;
  };
  card: {
    registered: boolean;
    number: string;
    lastUpdate: string;
  };
  pin: {
    set: boolean;
    lastUpdate: string;
  };
  assignedDevices: string[];
}