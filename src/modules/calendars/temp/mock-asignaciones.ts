import { AsignacionTurno, AsignacionPermiso } from '../interfaces/Calendario';

// Función para generar fechas de ejemplo
const generarFecha = (año: number, mes: number, dia: number) => {
  return new Date(año, mes - 1, dia).toISOString().split('T')[0];
};

export const asignacionesTurnos: AsignacionTurno[] = [
  // Asignaciones para SD (Standard) para varios empleados
  { id: '1', empleadoId: '2', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '2', empleadoId: '2', turnoId: '5', fecha: generarFecha(2025, 3, 18) },
  { id: '3', empleadoId: '3', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '4', empleadoId: '3', turnoId: '5', fecha: generarFecha(2025, 3, 19) },
  { id: '5', empleadoId: '4', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '6', empleadoId: '4', turnoId: '5', fecha: generarFecha(2025, 3, 18) },
  { id: '7', empleadoId: '4', turnoId: '5', fecha: generarFecha(2025, 3, 19) },
  { id: '8', empleadoId: '5', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '9', empleadoId: '5', turnoId: '5', fecha: generarFecha(2025, 3, 18) },
  { id: '10', empleadoId: '5', turnoId: '5', fecha: generarFecha(2025, 3, 19) },
  { id: '11', empleadoId: '6', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '12', empleadoId: '6', turnoId: '5', fecha: generarFecha(2025, 3, 18) },
  { id: '13', empleadoId: '7', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '14', empleadoId: '7', turnoId: '5', fecha: generarFecha(2025, 3, 18) },
  { id: '15', empleadoId: '7', turnoId: '5', fecha: generarFecha(2025, 3, 19) },
  { id: '16', empleadoId: '8', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '17', empleadoId: '8', turnoId: '5', fecha: generarFecha(2025, 3, 18) },
  { id: '18', empleadoId: '9', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '19', empleadoId: '9', turnoId: '5', fecha: generarFecha(2025, 3, 20) },
  { id: '20', empleadoId: '9', turnoId: '5', fecha: generarFecha(2025, 3, 21) },
  { id: '21', empleadoId: '9', turnoId: '5', fecha: generarFecha(2025, 3, 22) },
  { id: '22', empleadoId: '12', turnoId: '5', fecha: generarFecha(2025, 3, 17) },
  { id: '23', empleadoId: '12', turnoId: '5', fecha: generarFecha(2025, 3, 18) },
  { id: '24', empleadoId: '12', turnoId: '5', fecha: generarFecha(2025, 3, 19) },
  // Elaboración de exámenes médicos para Jose Lopez
  { id: '25', empleadoId: '10', turnoId: '6', fecha: generarFecha(2025, 3, 19) },
];

export const asignacionesPermisos: AsignacionPermiso[] = [
  // No hay asignaciones de permisos en el ejemplo, pero siguiendo el mismo patrón:
  { id: '1', empleadoId: '11', permisoId: '3', fecha: generarFecha(2025, 3, 20), fechaFin: generarFecha(2025, 3, 25), motivo: 'Vacaciones programadas' }
];