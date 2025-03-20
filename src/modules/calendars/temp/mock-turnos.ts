import { Turno } from '../interfaces/Turno';

export const turnos: Turno[] = [
  { 
    id: '1', 
    codigo: 'A', 
    nombre: 'Matutino', 
    horaInicio: '08:00 am', 
    horaFin: '16:00 pm', 
    color: 'bg-blue-100 text-blue-800',
    descripcion: 'Turno de mañana'
  },
  { 
    id: '2', 
    codigo: 'D', 
    nombre: 'Diurno', 
    horaInicio: '08:00 am', 
    horaFin: '05:00 pm', 
    color: 'bg-purple-100 text-purple-800',
    descripcion: 'Turno diurno completo'
  },
  { 
    id: '3', 
    codigo: 'N', 
    nombre: 'Nocturno', 
    horaInicio: '06:30 am', 
    horaFin: '05:30 pm', 
    color: 'bg-indigo-100 text-indigo-800',
    descripcion: 'Turno de noche'
  },
  { 
    id: '4', 
    codigo: 'T', 
    nombre: 'Tarde', 
    horaInicio: '02:00 pm', 
    horaFin: '10:00 pm', 
    color: 'bg-green-100 text-green-800',
    descripcion: 'Turno de tarde'
  },
  { 
    id: '5', 
    codigo: 'SD', 
    nombre: 'Standard', 
    horaInicio: '08:00 am', 
    horaFin: '06:00 pm', 
    color: 'bg-blue-100 text-blue-800',
    descripcion: 'Turno estándar'
  },
  { 
    id: '6', 
    codigo: 'EEM', 
    nombre: 'Elaboración exámenes médicos', 
    horaInicio: '10:00 am', 
    horaFin: '12:00 pm', 
    color: 'bg-pink-100 text-pink-800',
    descripcion: 'Elaboración de exámenes médicos'
  }
];
