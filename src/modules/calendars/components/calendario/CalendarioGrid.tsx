import React, { useMemo } from 'react';
import { 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  isToday,
  startOfDay,
  getDay
} from 'date-fns';
import { es } from 'date-fns/locale';
import { PeriodoTipo, AsignacionTurno, AsignacionPermiso } from '../../interfaces/Calendario';
import { Empleado } from '../../interfaces/Empleado';
import { Turno } from '../../interfaces/Turno';
import { Permiso } from '../../interfaces/Permiso';
import { TurnoPermisoBadge } from './TurnoPermisoBadge';
import { cn } from '../ui/utils';

interface CalendarioGridProps {
  empleados: Empleado[];
  turnos: Turno[];
  permisos: Permiso[];
  asignacionesTurnos: AsignacionTurno[];
  asignacionesPermisos: AsignacionPermiso[];
  periodoSeleccionado: PeriodoTipo;
  fechaActual: Date;
  onCeldaClick: (empleadoId: string, fecha: Date) => void;
}

export const CalendarioGrid: React.FC<CalendarioGridProps> = ({
  empleados,
  turnos,
  permisos,
  asignacionesTurnos,
  asignacionesPermisos,
  periodoSeleccionado,
  fechaActual,
  onCeldaClick
}) => {
  // Generar rango de fechas según el período seleccionado
  const diasCalendario = useMemo(() => {
    let inicio, fin;
    
    switch(periodoSeleccionado) {
      case 'diario':
        inicio = startOfDay(fechaActual);
        fin = startOfDay(fechaActual);
        break;
      case 'semanal':
        inicio = startOfWeek(fechaActual, { weekStartsOn: 1 }); // Semana empieza lunes
        fin = endOfWeek(fechaActual, { weekStartsOn: 1 });
        break;
      case 'quincenal':
        // Determinar si es primera o segunda quincena
        { const dia = fechaActual.getDate();
        if (dia <= 15) {
          inicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
          fin = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 15);
        } else {
          inicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 16);
          fin = endOfMonth(fechaActual);
        }
        break; }
      case 'mensual':
      default:
        inicio = startOfMonth(fechaActual);
        fin = endOfMonth(fechaActual);
        break;
    }
    
    return eachDayOfInterval({ start: inicio, end: fin });
  }, [periodoSeleccionado, fechaActual]);

  // Función para obtener asignaciones para un empleado en una fecha
  const obtenerAsignaciones = (empleadoId: string, fecha: string) => {
    const turnos = asignacionesTurnos.filter(
      asig => asig.empleadoId === empleadoId && asig.fecha === fecha
    );
    
    const permisos = asignacionesPermisos.filter(
      asig => asig.empleadoId === empleadoId && 
      (asig.fecha === fecha || 
        (asig.fechaFin && asig.fecha <= fecha && fecha <= asig.fechaFin))
    );
    
    return { turnos, permisos };
  };

  // Función para renderizar las asignaciones
  const renderizarAsignaciones = (empleadoId: string, fecha: string) => {
    const { turnos: turnosAsignados, permisos: permisosAsignados } = obtenerAsignaciones(empleadoId, fecha);
    
    return (
      <div className="flex flex-wrap gap-1">
        {turnosAsignados.map(asignacion => {
          const turno = turnos.find(t => t.id === asignacion.turnoId);
          if (!turno) return null;
          
          return (
            <TurnoPermisoBadge 
              key={`turno-${asignacion.id}`}
              item={turno}
              horaInicio={asignacion.horaInicio}
              horaFin={asignacion.horaFin}
              onClick={() => onCeldaClick(empleadoId, new Date(fecha))}
            />
          );
        })}
        
        {permisosAsignados.map(asignacion => {
          const permiso = permisos.find(p => p.id === asignacion.permisoId);
          if (!permiso) return null;
          
          return (
            <TurnoPermisoBadge 
              key={`permiso-${asignacion.id}`}
              item={permiso}
              horaInicio={asignacion.horaInicio}
              horaFin={asignacion.horaFin}
              onClick={() => onCeldaClick(empleadoId, new Date(fecha))}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative overflow-auto border rounded-md">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="border p-2 w-52">Empleados</th>
            {diasCalendario.map((dia, index) => {
              const esHoy = isToday(dia);
              const esFinde = getDay(dia) === 0 || getDay(dia) === 6; // 0 domingo, 6 sábado
              
              return (
                <th 
                  key={index} 
                  className={cn(
                    "border p-2 min-w-32 text-center",
                    esHoy && "bg-blue-50",
                    esFinde && "bg-gray-100"
                  )}
                >
                  <div className="font-medium">
                    {format(dia, 'EEEE', { locale: es })}
                  </div>
                  <div className={cn("text-sm", esHoy && "text-blue-500 font-bold")}>
                    {format(dia, 'd', { locale: es })}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id} className="hover:bg-gray-50">
              <td className="border p-2">
                <div className="font-medium">
                  {empleado.nombre} {empleado.apellidos}
                </div>
                {empleado.cargo && (
                  <div className="text-xs text-gray-500">{empleado.cargo}</div>
                )}
              </td>
              {diasCalendario.map((dia, index) => {
                const fechaStr = dia.toISOString().split('T')[0];
                return (
                  <td 
                    key={index} 
                    className={cn(
                      "border p-2 align-top relative cursor-pointer min-h-16",
                      isToday(dia) && "bg-blue-50",
                      (getDay(dia) === 0 || getDay(dia) === 6) && "bg-gray-50"
                    )}
                    onClick={() => onCeldaClick(empleado.id, dia)}
                  >
                    {renderizarAsignaciones(empleado.id, fechaStr)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};