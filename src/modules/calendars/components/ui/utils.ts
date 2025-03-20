

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFecha(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatHora(hora: string): string {
  // Convierte formatos como "08:00" a "08:00 am"
  const [hours, minutes] = hora.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Función para generar un ID único basado en timestamp
export function generateId(prefix = ''): string {
  return `${prefix}${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Función para verificar si dos rangos de fechas se solapan
export function fechasSeSuperponen(
  inicio1: string, 
  fin1: string | undefined,
  inicio2: string,
  fin2: string | undefined
): boolean {
  // Si no hay fecha fin, se considera solo el día de inicio
  const fechaFin1 = fin1 || inicio1;
  const fechaFin2 = fin2 || inicio2;
  
  return inicio1 <= fechaFin2 && inicio2 <= fechaFin1;
}

// Función para generar array de días en un período
export function generarDiasPeriodo(
  tipo: 'diario' | 'semanal' | 'quincenal' | 'mensual',
  fecha: Date
): Date[] {
  const dias: Date[] = [];
  let inicio: Date;
  let fin: Date;
  
  switch(tipo) {
    case 'diario':
      return [new Date(fecha)];
      
    case 'semanal': {
      const day = fecha.getDay();
      const diff = fecha.getDate() - day + (day === 0 ? -6 : 1); // Ajustar cuando el día es domingo
      inicio = new Date(fecha.setDate(diff));
      fin = new Date(new Date(inicio).setDate(inicio.getDate() + 6));
      break;
    }
    
    case 'quincenal': {
      const day = fecha.getDate();
      if (day <= 15) {
        inicio = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
        fin = new Date(fecha.getFullYear(), fecha.getMonth(), 15);
      } else {
        inicio = new Date(fecha.getFullYear(), fecha.getMonth(), 16);
        fin = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0); // Último día del mes
      }
      break;
    }
    
    case 'mensual':
    default: {
      inicio = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
      fin = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0); // Último día del mes
      break;
    }
  }
  
  // Generar array de días
  let currentDate = new Date(inicio);
  while (currentDate <= fin) {
    dias.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dias;
}