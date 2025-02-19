import type { DiningRoom, DiningSchedule, DiningAccess, DiningReport } from '../../types';

export const diningRoomsData: DiningRoom[] = [
  {
    id: 'DR001',
    name: 'Comedor Principal',
    location: 'Hodelpa Gran Almirante',
    description: 'Comedor principal para empleados',
    capacity: 120,
    currentOccupancy: 45,
    status: 'active',
    devices: ['DIN-GA-001', 'DIN-GA-002'],
    schedule: {
      startTime: '06:00',
      endTime: '22:00',
      shifts: [
        { type: 'breakfast', startTime: '06:00', endTime: '10:00' },
        { type: 'lunch', startTime: '12:00', endTime: '15:00' },
        { type: 'dinner', startTime: '18:00', endTime: '22:00' }
      ]
    },
    restrictions: {
      maxTimePerPerson: 45,
      maxCapacityPerShift: 80,
      requiresReservation: false
    },
    stats: {
      dailyAverage: 350,
      peakHour: '12:30',
      averageStayTime: 32
    }
  },
  {
    id: 'DR002',
    name: 'Comedor Ejecutivo',
    location: 'Hodelpa Garden Court',
    description: 'Comedor exclusivo para personal administrativo',
    capacity: 40,
    currentOccupancy: 12,
    status: 'active',
    devices: ['DIN-GC-001'],
    schedule: {
      startTime: '07:00',
      endTime: '16:00',
      shifts: [
        { type: 'breakfast', startTime: '07:00', endTime: '10:00' },
        { type: 'lunch', startTime: '12:00', endTime: '15:00' }
      ]
    },
    restrictions: {
      maxTimePerPerson: 60,
      maxCapacityPerShift: 30,
      requiresReservation: true
    },
    stats: {
      dailyAverage: 85,
      peakHour: '13:00',
      averageStayTime: 45
    }
  }
];

export const diningSchedulesData: DiningSchedule[] = [
  {
    id: 'DS001',
    diningRoom: 'DR001',
    type: 'breakfast',
    startTime: '06:00',
    endTime: '10:00',
    capacity: 80,
    assignedGroups: ['Housekeeping', 'Kitchen', 'Maintenance'],
    currentBookings: 45,
    status: 'active'
  },
  {
    id: 'DS002',
    diningRoom: 'DR001',
    type: 'lunch',
    startTime: '12:00',
    endTime: '15:00',
    capacity: 80,
    assignedGroups: ['Administration', 'Front Desk', 'Sales'],
    currentBookings: 65,
    status: 'active'
  }
];

export const diningAccessData: DiningAccess[] = [
  {
    id: 'DA001',
    employeeId: 'EMP001',
    employeeName: 'Juan Pérez',
    department: 'Housekeeping',
    diningRoom: 'DR001',
    accessTime: '2025-02-14T07:15:00',
    exitTime: '2025-02-14T07:45:00',
    mealType: 'breakfast',
    status: 'completed',
    device: 'DIN-GA-001'
  },
  {
    id: 'DA002',
    employeeId: 'EMP002',
    employeeName: 'María González',
    department: 'Administration',
    diningRoom: 'DR002',
    accessTime: '2025-02-14T12:30:00',
    exitTime: null,
    mealType: 'lunch',
    status: 'inProgress',
    device: 'DIN-GC-001'
  }
];

export const diningReportsData: DiningReport[] = [
  {
    date: '2025-02-14',
    diningRoom: 'DR001',
    totalAccesses: 350,
    byMealType: {
      breakfast: 120,
      lunch: 150,
      dinner: 80
    },
    byDepartment: {
      'Housekeeping': 85,
      'Kitchen': 45,
      'Maintenance': 65,
      'Administration': 95,
      'Front Desk': 60
    },
    averageStayTime: 35,
    peakHours: {
      breakfast: '07:30',
      lunch: '12:30',
      dinner: '19:00'
    },
    capacityUtilization: 75
  }
];