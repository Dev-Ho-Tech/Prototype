import { HotelHoursData, AttendanceData, BiometricData } from '../interfaces/Report';
import { mockEmployees } from './employees';

// Helper to generate random hours
const randomHours = (max: number = 8, min: number = 0): number => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

// Create 15 days of data for each employee
const generateHotelHoursData = (): HotelHoursData[] => {
  const data: HotelHoursData[] = [];
  const currentDate = new Date();
  
  mockEmployees.forEach(employee => {
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      
      const regularHours = randomHours(8, 5);
      const extraHours = randomHours(4, 0);
      const nightHours = randomHours(2, 0);
      const holidayHours = i % 7 === 0 ? randomHours(8, 4) : 0; // Sundays are holidays
      
      data.push({
        employeeId: employee.id,
        date: date,
        regularHours,
        extraHours,
        nightHours,
        holidayHours,
        totalHours: regularHours + extraHours + nightHours + holidayHours
      });
    }
  });
  
  return data;
};

const generateAttendanceData = (): AttendanceData[] => {
  const data: AttendanceData[] = [];
  const currentDate = new Date();
  const statuses: ('present' | 'absent' | 'late' | 'excused')[] = ['present', 'absent', 'late', 'excused'];
  
  mockEmployees.forEach(employee => {
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      
      // Random check-in time between 7am and 9am
      const checkInHour = Math.floor(Math.random() * 2) + 7;
      const checkInMinute = Math.floor(Math.random() * 60);
      const checkIn = new Date(date);
      checkIn.setHours(checkInHour, checkInMinute);
      
      // Random check-out time between 4pm and 6pm
      const checkOutHour = Math.floor(Math.random() * 2) + 16;
      const checkOutMinute = Math.floor(Math.random() * 60);
      const checkOut = new Date(date);
      checkOut.setHours(checkOutHour, checkOutMinute);
      
      // Randomly select a status
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      data.push({
        employeeId: employee.id,
        date: date,
        status,
        checkIn: status !== 'absent' ? checkIn : undefined,
        checkOut: status === 'present' ? checkOut : undefined,
      });
    }
  });
  
  return data;
};

const generateBiometricData = (): BiometricData[] => {
  const data: BiometricData[] = [];
  const currentDate = new Date();
  const devices = ['DEV001', 'DEV002', 'DEV003'];
  
  mockEmployees.forEach(employee => {
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      
      // Random check-in time between 7am and 9am
      const checkInHour = Math.floor(Math.random() * 2) + 7;
      const checkInMinute = Math.floor(Math.random() * 60);
      const checkIn = new Date(date);
      checkIn.setHours(checkInHour, checkInMinute);
      
      // Random check-out time between 4pm and 6pm
      const checkOutHour = Math.floor(Math.random() * 2) + 16;
      const checkOutMinute = Math.floor(Math.random() * 60);
      const checkOut = new Date(date);
      checkOut.setHours(checkOutHour, checkOutMinute);
      
      // Randomly select a device
      const deviceId = devices[Math.floor(Math.random() * devices.length)];
      
      // 90% chance of verification success
      const verified = Math.random() < 0.9;
      
      data.push({
        employeeId: employee.id,
        date: date,
        deviceId,
        checkIn,
        checkOut,
        verified
      });
    }
  });
  
  return data;
};

export const mockHotelHoursData = generateHotelHoursData();
export const mockAttendanceData = generateAttendanceData();
export const mockBiometricData = generateBiometricData();