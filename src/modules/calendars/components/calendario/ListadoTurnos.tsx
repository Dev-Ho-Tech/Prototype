/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { format, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  CalendarIcon, 
  Filter,
  Download,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/Badge';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { AsignacionTurno, AsignacionPermiso } from '../../interfaces/Calendario';
import { Empleado } from '../../interfaces/Empleado';
import { Turno } from '../../interfaces/Turno';
import { Permiso } from '../../interfaces/Permiso';
import { cn } from '../ui/utils';
import { DeleteHorarioModal } from './DeleteHorarioModal';
import { DetalleHorarioModal } from './DetalleHorarioModal';

interface ListadoTurnosProps {
  empleados: Empleado[];
  turnos: Turno[];
  permisos: Permiso[];
  asignacionesTurnos: AsignacionTurno[];
  asignacionesPermisos: AsignacionPermiso[];
  fechaActual: Date;
  onEmpleadoClick: (empleado: Empleado) => void;
  onCeldaClick: (empleadoId: string, fecha: Date) => void;
}

export const ListadoTurnos: React.FC<ListadoTurnosProps> = ({
  empleados,
  turnos,
  permisos,
  asignacionesTurnos,
  asignacionesPermisos,
  onEmpleadoClick,
  onCeldaClick
}) => {
  const [filtroActivo, setFiltroActivo] = useState<'todos' | 'turnos' | 'permisos'>('todos');
  const [ordenarPor, setOrdenarPor] = useState<'nombre' | 'departamento'>('nombre');

  // Estado para modales
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false);
  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState<any>(null);

  // Combinar asignaciones de turnos y permisos
  const asignaciones = useMemo(() => {
    const todas = [];

    // Añadir turnos
    if (filtroActivo === 'todos' || filtroActivo === 'turnos') {
      for (const asig of asignacionesTurnos) {
        const empleado = empleados.find(e => e.id === asig.empleadoId);
        if (!empleado) continue;

        const turnoObj = turnos.find(t => t.id === asig.turnoId);
        if (!turnoObj) continue;

        todas.push({
          id: asig.id,
          tipo: 'turno' as const,
          tipoId: asig.turnoId,
          empleadoId: asig.empleadoId,
          empleadoNombre: `${empleado.nombre} ${empleado.apellidos}`,
          empleado: `${empleado.nombre} ${empleado.apellidos}`,
          departamento: empleado.departamento || 'Sin departamento',
          cargo: empleado.cargo || 'Sin cargo',
          fecha: new Date(asig.fecha),
          fechaFin: null,
          horaInicio: asig.horaInicio,
          horaFin: asig.horaFin,
          motivo: null,
          tipoNombre: turnoObj.nombre,
          codigo: turnoObj.codigo,
          color: turnoObj.color,
          fechaStr: format(new Date(asig.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })
        });
      }
    }

    // Añadir permisos
    if (filtroActivo === 'todos' || filtroActivo === 'permisos') {
      for (const asig of asignacionesPermisos) {
        const empleado = empleados.find(e => e.id === asig.empleadoId);
        if (!empleado) continue;

        const permisoObj = permisos.find(p => p.id === asig.permisoId);
        if (!permisoObj) continue;

        todas.push({
          id: asig.id,
          tipo: 'permiso' as const,
          tipoId: asig.permisoId,
          empleadoId: asig.empleadoId,
          empleadoNombre: `${empleado.nombre} ${empleado.apellidos}`,
          empleado: `${empleado.nombre} ${empleado.apellidos}`,
          departamento: empleado.departamento || 'Sin departamento',
          cargo: empleado.cargo || 'Sin cargo',
          fecha: new Date(asig.fecha),
          fechaFin: asig.fechaFin ? new Date(asig.fechaFin) : null,
          horaInicio: asig.horaInicio,
          horaFin: asig.horaFin,
          motivo: asig.motivo,
          tipoNombre: permisoObj.nombre,
          codigo: permisoObj.codigo,
          color: permisoObj.color,
          fechaStr: format(new Date(asig.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })
        });
      }
    }

    // Ordenar por nombre o departamento
    if (ordenarPor === 'nombre') {
      todas.sort((a, b) => a.empleado.localeCompare(b.empleado));
    } else if (ordenarPor === 'departamento') {
      todas.sort((a, b) => a.departamento.localeCompare(b.departamento));
    }

    // Ordenar por fecha (más reciente primero)
    todas.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

    return todas;
  }, [asignacionesTurnos, asignacionesPermisos, empleados, turnos, permisos, filtroActivo, ordenarPor]);

  // Cambiar filtro
  const handleFiltroChange = (filtro: 'todos' | 'turnos' | 'permisos') => {
    setFiltroActivo(filtro);
  };

  // Cambiar ordenación
  const handleOrdenChange = (orden: 'nombre' | 'departamento') => {
    setOrdenarPor(orden);
  };
  
  // Exportar a Excel (simulado)
  const handleExportar = () => {
    alert('Funcionalidad de exportación a Excel (próximamente)');
  };

  // Manejo de acciones en la tabla
  const handleVerDetalle = (asignacion: any) => {
    setAsignacionSeleccionada(asignacion);
    setMostrarModalDetalle(true);
  };

  const handleEditarAsignacion = (asignacion: any) => {
    onCeldaClick(asignacion.empleadoId, asignacion.fecha);
  };

  const handleEliminarAsignacion = (asignacion: any) => {
    setAsignacionSeleccionada(asignacion);
    setMostrarModalEliminar(true);
  };

  // Confirmar eliminación
  const confirmarEliminar = () => {
    // Aquí iría la lógica para eliminar la asignación
    console.log("Eliminando asignación:", asignacionSeleccionada.id);
    alert(`Asignación ${asignacionSeleccionada.id} eliminada (simulado)`);
    setMostrarModalEliminar(false);
  };

  return (
    <div className="space-y-4">
      {/* Barra de herramientas superior */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-md border shadow-sm overflow-hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("rounded-none", filtroActivo === 'todos' && "bg-blue-50 text-blue-600")}
              onClick={() => handleFiltroChange('todos')}
            >
              Todos
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("rounded-none", filtroActivo === 'turnos' && "bg-blue-50 text-blue-600")}
              onClick={() => handleFiltroChange('turnos')}
            >
              Turnos
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("rounded-none", filtroActivo === 'permisos' && "bg-blue-50 text-blue-600")}
              onClick={() => handleFiltroChange('permisos')}
            >
              Permisos
            </Button>
          </div>
          
          <Dropdown>
            <DropdownTrigger>
              <Button variant="outline" size="sm" className="bg-white">
                <Filter className="h-4 w-4 mr-2" />
                Ordenar
              </Button>
            </DropdownTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleOrdenChange('nombre')}>
                Por Nombre {ordenarPor === 'nombre' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOrdenChange('departamento')}>
                Por Departamento {ordenarPor === 'departamento' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </Dropdown>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-white" onClick={handleExportar}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
            onClick={() => empleados.length > 0 && onEmpleadoClick(empleados[0])}
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir
          </Button>
        </div>
      </div>

      {/* Tabla de asignaciones */}
      <div className="bg-white rounded-md border shadow-sm overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="p-3 font-medium">Empleado</th>
              <th className="p-3 font-medium">Departamento</th>
              <th className="p-3 font-medium">Tipo</th>
              <th className="p-3 font-medium">Fecha</th>
              <th className="p-3 font-medium">Horario</th>
              <th className="p-3 font-medium">Motivo</th>
              <th className="p-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {asignaciones.length > 0 ? (
              asignaciones.map((asignacion, index) => {
                const esHoy = isToday(asignacion.fecha);
                
                return (
                  <tr key={`${asignacion.id}-${index}`} className="hover:bg-blue-50">
                    <td 
                      className="p-3 font-medium cursor-pointer" 
                      onClick={() => {
                        const empleado = empleados.find(e => e.id === asignacion.empleadoId);
                        if (empleado) onEmpleadoClick(empleado);
                      }}
                    >
                      {asignacion.empleadoNombre}
                    </td>
                    <td className="p-3 text-gray-600">{asignacion.departamento}</td>
                    <td className="p-3">
                      <Badge className={cn("font-medium", asignacion.color)}>
                        {asignacion.codigo} - {asignacion.tipoNombre}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className={cn("flex items-center", esHoy && "text-blue-600 font-medium")}>
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {format(asignacion.fecha, 'dd MMM yyyy', { locale: es })}
                        {asignacion.fechaFin && (
                          <> - {format(asignacion.fechaFin, 'dd MMM yyyy', { locale: es })}</>
                        )}
                      </span>
                    </td>
                    <td className="p-3">
                      {asignacion.horaInicio} - {asignacion.horaFin}
                    </td>
                    <td className="p-3 max-w-xs truncate">
                      {asignacion.motivo}
                    </td>
                    <td className="p-3 text-right">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerDetalle(asignacion)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditarAsignacion(asignacion)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleEliminarAsignacion(asignacion)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No hay {filtroActivo === 'todos' ? 'asignaciones' : filtroActivo} para mostrar.
                  <div className="mt-2">
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      size="sm"
                      onClick={() => empleados.length > 0 && onEmpleadoClick(empleados[0])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir nueva asignación
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para eliminar horario */}
      {mostrarModalEliminar && asignacionSeleccionada && (
        <DeleteHorarioModal
          tipoAsignacion={asignacionSeleccionada.tipo === 'turno' ? 'Turno' : 'Permiso'}
          nombreEmpleado={asignacionSeleccionada.empleadoNombre}
          fechaAsignacion={asignacionSeleccionada.fechaStr}
          onDelete={confirmarEliminar}
          onCancel={() => setMostrarModalEliminar(false)}
        />
      )}

      {/* Modal para ver detalles */}
      {mostrarModalDetalle && asignacionSeleccionada && (
        <DetalleHorarioModal
          asignacion={asignacionSeleccionada}
          onClose={() => setMostrarModalDetalle(false)}
          onEdit={() => {
            setMostrarModalDetalle(false);
            handleEditarAsignacion(asignacionSeleccionada);
          }}
        />
      )}
    </div>
  );
};