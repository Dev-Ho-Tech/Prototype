import { Permiso } from '../interfaces/Permiso';

export const permisos: Permiso[] = [
  { 
    id: '1', 
    codigo: 'D', 
    nombre: 'DESCANSO', 
    color: 'bg-red-100 text-red-800',
    descripcion: 'Día libre programado'
  },
  { 
    id: '2', 
    codigo: 'LPM', 
    nombre: 'LICENCIA POR MATERNIDAD', 
    color: 'bg-orange-100 text-orange-800',
    descripcion: 'Licencia por maternidad'
  },
  { 
    id: '3', 
    codigo: 'V', 
    nombre: 'VACACIONES', 
    color: 'bg-blue-100 text-blue-800',
    descripcion: 'Período de vacaciones'
  },
  { 
    id: '4', 
    codigo: 'R', 
    nombre: 'RECORRIDO', 
    color: 'bg-indigo-100 text-indigo-800',
    descripcion: 'Recorrido o visita'
  },
  { 
    id: '5', 
    codigo: 'TL', 
    nombre: 'TRÁMITE LEGAL', 
    color: 'bg-gray-100 text-gray-800',
    descripcion: 'Trámite legal'
  },
  { 
    id: '6', 
    codigo: 'LPP', 
    nombre: 'LICENCIA POR PATERNIDAD', 
    color: 'bg-purple-100 text-purple-800',
    descripcion: 'Licencia por paternidad'
  },
  { 
    id: '7', 
    codigo: 'VAC', 
    nombre: 'VISITA A CLIENTE', 
    color: 'bg-blue-100 text-blue-800',
    descripcion: 'Visita a cliente'
  },
  { 
    id: '8', 
    codigo: 'LM', 
    nombre: 'LICENCIA MÉDICA', 
    color: 'bg-green-100 text-green-800',
    descripcion: 'Licencia médica'
  },
  { 
    id: '9', 
    codigo: 'TDC', 
    nombre: 'TRABAJO DESDE CASA', 
    color: 'bg-teal-100 text-teal-800',
    descripcion: 'Trabajo desde casa'
  }
];