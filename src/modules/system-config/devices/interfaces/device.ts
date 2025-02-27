export interface Device {
  id?: string | number;
  name: string;
  serialNumber: string;
  brand: string;
  model: string;
  type: 'biometric' | 'camera' | 'rfid' | 'card' | string;
  ip: string;
  subnet: string;
  location: string;
  timezone: string;
  operationMode: 'attendance' | 'access' | 'dining' | string;
  capacity: {
    total: number;
    used: number;
    type: 'fingerprints' | 'faces' | 'users' | string;
  };
  status?: string;
  mac?: string;
  firmware?: string;
  lastSync?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  stats?: {
    uptime: string;
    transactions: number;
    errors: number;
    lastTransaction: string;
  };  
  
}