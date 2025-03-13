// import { CheckProfile } from './interfaces/CheckProfile';
import { v4 as uuidv4 } from 'uuid';
import { CheckProfile } from '../interfaces/CheckProfile';

export const checkProfilesData: CheckProfile[] = [
  {
    id: uuidv4(),
    name: 'Perfil de Asistencia Estándar',
    description: 'Perfil básico para el registro de asistencia de empleados regulares',
    type: 'attendance',
    status: 'active',
    employeeCount: 156,
    schedule: {
      startTime: '08:00',
      endTime: '17:00',
      tolerance: 15
    },
    methods: ['fingerprint', 'face', 'card'],
    validations: {
      requirePhoto: true,
      requireLocation: true,
      maxDistanceMeters: 100
    },
    createdAt: new Date(2023, 3, 15),
    updatedAt: new Date(2023, 5, 20)
  },
  {
    id: uuidv4(),
    name: 'Acceso Principal',
    description: 'Control de acceso para entrada principal del edificio',
    type: 'access',
    status: 'active',
    employeeCount: 245,
    schedule: {
      startTime: '00:00',
      endTime: '23:59'
    },
    methods: ['card', 'fingerprint'],
    validations: {
      requirePhoto: true,
      requireLocation: false
    },
    createdAt: new Date(2023, 2, 10),
    updatedAt: new Date(2023, 4, 5)
  },
  {
    id: uuidv4(),
    name: 'Comedor Principal',
    description: 'Perfil para control de acceso al comedor corporativo',
    type: 'dining',
    status: 'active',
    employeeCount: 180,
    schedule: {
      startTime: '12:00',
      endTime: '15:00',
      tolerance: 30
    },
    methods: ['card'],
    validations: {
      requirePhoto: false,
      requireLocation: false
    },
    createdAt: new Date(2023, 1, 20),
    updatedAt: new Date(2023, 3, 15)
  },
  {
    id: uuidv4(),
    name: 'Turno Nocturno',
    description: 'Perfil para personal que trabaja en horario nocturno',
    type: 'attendance',
    status: 'active',
    employeeCount: 45,
    schedule: {
      startTime: '20:00',
      endTime: '06:00',
      tolerance: 10
    },
    methods: ['fingerprint', 'face'],
    validations: {
      requirePhoto: true,
      requireLocation: true,
      maxDistanceMeters: 50,
      requireSupervisorApproval: true
    },
    createdAt: new Date(2023, 4, 1),
    updatedAt: new Date(2023, 4, 1)
  },
  {
    id: uuidv4(),
    name: 'Acceso Restringido',
    description: 'Perfil para áreas de alta seguridad',
    type: 'access',
    status: 'active',
    employeeCount: 12,
    schedule: {
      startTime: '08:00',
      endTime: '18:00'
    },
    methods: ['fingerprint', 'face', 'pin'],
    validations: {
      requirePhoto: true,
      requireLocation: true,
      requireSupervisorApproval: true
    },
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2023, 2, 20)
  },
  {
    id: uuidv4(),
    name: 'Comedor Ejecutivo',
    description: 'Acceso exclusivo para directivos al comedor ejecutivo',
    type: 'dining',
    status: 'inactive',
    employeeCount: 8,
    schedule: {
      startTime: '12:30',
      endTime: '14:30'
    },
    methods: ['card', 'fingerprint'],
    validations: {
      requirePhoto: false,
      requireLocation: false
    },
    createdAt: new Date(2023, 5, 1),
    updatedAt: new Date(2023, 6, 15)
  },
  {
    id: uuidv4(),
    name: 'Horario Flexible',
    description: 'Para empleados con horario flexible',
    type: 'attendance',
    status: 'active',
    employeeCount: 78,
    schedule: {
      startTime: '07:00',
      endTime: '19:00',
      tolerance: 60
    },
    methods: ['fingerprint', 'mobile'],
    validations: {
      requirePhoto: false,
      requireLocation: true,
      maxDistanceMeters: 500,
      allowOvertime: true
    },
    createdAt: new Date(2023, 3, 10),
    updatedAt: new Date(2023, 3, 10)
  },
  {
    id: uuidv4(),
    name: 'Emergencias',
    description: 'Perfil para personal médico y de emergencias',
    type: 'access',
    status: 'active',
    employeeCount: 32,
    schedule: {
      startTime: '00:00',
      endTime: '23:59'
    },
    methods: ['card', 'pin', 'mobile'],
    validations: {
      requirePhoto: false,
      requireLocation: false,
      allowOvertime: true
    },
    createdAt: new Date(2023, 2, 5),
    updatedAt: new Date(2023, 5, 1)
  },
  {
    id: uuidv4(),
    name: 'Turnos Rotativos',
    description: 'Para personal con turnos rotativos',
    type: 'attendance',
    status: 'active',
    employeeCount: 64,
    schedule: {
      startTime: '06:00',
      endTime: '22:00',
      tolerance: 15
    },
    methods: ['fingerprint', 'face'],
    validations: {
      requirePhoto: true,
      requireLocation: true,
      maxDistanceMeters: 100,
      requireSupervisorApproval: true
    },
    createdAt: new Date(2023, 1, 1),
    updatedAt: new Date(2023, 4, 15)
  }
];