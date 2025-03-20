/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from 'react';
import { EmpleadosList } from './components/calendario/EmpleadosList';
import { CalendarioHeader } from './components/calendario/CalendarioHeader';
import { CalendarioGrid } from './components/calendario/CalendarioGrid';
import { TurnoPermisoModal } from './components/calendario/TurnoPermisoModal';
import { VistaSelector } from './components/calendario/VistaSelector';
import { PeriodoTipo, AsignacionTurno, AsignacionPermiso } from './interfaces/Calendario';
import { Empleado } from './interfaces/Empleado';
import { empleados } from './temp/mock-empleados';
import { turnos } from './temp/mock-turnos';
import { permisos } from './temp/mock-permisos';
import { asignacionesTurnos, asignacionesPermisos } from './temp/mock-asignaciones';

type TipoVista = 'calendario' | 'lista' | 'tarjetas';

const CalendarioPage: React.FC = () => {
  // Estado para el período y la fecha
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<PeriodoTipo>('semanal');
  const [fechaActual, setFechaActual] = useState<Date>(new Date());
  const [mes, setMes] = useState<Date>(new Date());
  
  // Estado para la vista
  const [tipoVista, setTipoVista] = useState<TipoVista>('calendario');
  
  // Estado para filtrar empleados
  const [searchQuery, setSearchQuery] = useState('');
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState<Empleado[]>(empleados);
  
  // Estado para turnos y permisos
  const [asignacionesT, setAsignacionesT] = useState<AsignacionTurno[]>(asignacionesTurnos);
  const [asignacionesP, setAsignacionesP] = useState<AsignacionPermiso[]>(asignacionesPermisos);
  
  // Estado para el modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<{id: string, nombre: string} | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  
  // Estado para copiar/pegar asignaciones
  // const [asignacionCopiada, setAsignacionCopiada] = useState<any | null>(null);

  // Filtrar empleados cuando cambia el término de búsqueda
  useEffect(() => {
    if (!searchQuery.trim()) {
      setEmpleadosFiltrados(empleados);
      return;
    }
    
    const filtrados = empleados.filter(emp => 
      `${emp.nombre} ${emp.apellidos}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEmpleadosFiltrados(filtrados);
  }, [searchQuery]);

  // Manejador para el cambio de período
  const handlePeriodoChange = useCallback((periodo: PeriodoTipo) => {
    setPeriodoSeleccionado(periodo);
  }, []);

  // Manejador para el cambio de fecha
  const handleFechaChange = useCallback((fecha: Date) => {
    setFechaActual(fecha);
  }, []);

  // Manejador para el cambio de mes
  const handleMesChange = useCallback((nuevaFecha: Date) => {
    setMes(nuevaFecha);
    setFechaActual(nuevaFecha);
  }, []);

  // Manejador para la búsqueda
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Manejador para el clic en celda
  const handleCeldaClick = useCallback((empleadoId: string, fecha: Date) => {
    const emp = empleados.find(e => e.id === empleadoId);
    if (emp) {
      setEmpleadoSeleccionado({
        id: emp.id,
        nombre: `${emp.nombre} ${emp.apellidos}`
      });
      setFechaSeleccionada(fecha);
      setModalAbierto(true);
    }
  }, []);

  // Manejador para guardar asignación
  const handleGuardarAsignacion = useCallback((data: any) => {
    if (data.tipo === 'turno') {
      // Crear nueva asignación de turno
      const nuevaAsignacion: AsignacionTurno = {
        id: `t${Date.now()}`,
        empleadoId: data.empleadoId,
        turnoId: data.tipoId,
        fecha: data.fechaInicio,
        horaInicio: data.horaInicio,
        horaFin: data.horaFin
      };
      
      setAsignacionesT(prev => [...prev, nuevaAsignacion]);
    } else if (data.tipo === 'permiso') {
      // Crear nueva asignación de permiso
      const nuevaAsignacion: AsignacionPermiso = {
        id: `p${Date.now()}`,
        empleadoId: data.empleadoId,
        permisoId: data.tipoId,
        fecha: data.fechaInicio,
        fechaFin: data.fechaFin,
        horaInicio: data.horaInicio,
        horaFin: data.horaFin,
        motivo: data.motivo
      };
      
      setAsignacionesP(prev => [...prev, nuevaAsignacion]);
    }
  }, []);

  // Manejador para copiar
  const handleCopiar = useCallback(() => {
    // Implementación básica - en una aplicación real, esto sería más complejo
    alert("Función de copiar activada - Seleccione las asignaciones que desea copiar");
  }, []);

  // Manejador para pegar
  const handlePegar = useCallback(() => {
    // Implementación básica - en una aplicación real, esto sería más complejo
    alert("Función de pegar activada - Seleccione donde desea pegar las asignaciones");
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Calendario de Turnos y Permisos</h1>
      
      <div className="mb-4">
        <VistaSelector 
          vistaActual={tipoVista} 
          onVistaChange={setTipoVista} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Panel lateral de empleados - visible en todas las vistas */}
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-sm border h-full">
            <h2 className="font-semibold text-lg mb-4">Empleados</h2>
            <EmpleadosList 
              empleados={empleadosFiltrados} 
              onEmpleadoClick={(empleado) => {
                setEmpleadoSeleccionado({
                  id: empleado.id,
                  nombre: `${empleado.nombre} ${empleado.apellidos}`
                });
              }}
            />
          </div>
        </div>
        
        {/* Panel principal - cambia según la vista seleccionada */}
        <div className="md:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <CalendarioHeader 
              periodoSeleccionado={periodoSeleccionado}
              onPeriodoChange={handlePeriodoChange}
              mes={mes}
              onMesChange={handleMesChange}
              fecha={fechaActual}
              onFechaChange={handleFechaChange}
              onSearch={handleSearch}
              onCopiar={handleCopiar}
              onPegar={handlePegar}
              turnos={turnos}
              permisos={permisos}
            />
            
            {tipoVista === 'calendario' && (
              <CalendarioGrid 
                empleados={empleadosFiltrados}
                turnos={turnos}
                permisos={permisos}
                asignacionesTurnos={asignacionesT}
                asignacionesPermisos={asignacionesP}
                periodoSeleccionado={periodoSeleccionado}
                fechaActual={fechaActual}
                onCeldaClick={handleCeldaClick}
              />
            )}
            
            {tipoVista === 'lista' && (
              <div className="p-8 text-center text-gray-500">
                Vista de lista - En desarrollo
              </div>
            )}
            
            {tipoVista === 'tarjetas' && (
              <div className="p-8 text-center text-gray-500">
                Vista de tarjetas - En desarrollo
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Panel de información sobre turnos y permisos */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Turnos de Trabajo</h2>
          <div className="grid grid-cols-2 gap-3">
            {turnos.map(turno => (
              <div key={turno.id} className="flex items-center">
                <span className={`w-4 h-4 rounded-full mr-2 ${turno.color.split(' ')[0]}`}></span>
                <div>
                  <div className="font-semibold">{turno.codigo} - {turno.nombre}</div>
                  <div className="text-xs text-gray-500">
                    {turno.horaInicio} - {turno.horaFin}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Permisos</h2>
          <div className="grid grid-cols-2 gap-3">
            {permisos.map(permiso => (
              <div key={permiso.id} className="flex items-center">
                <span className={`w-4 h-4 rounded-full mr-2 ${permiso.color.split(' ')[0]}`}></span>
                <div>
                  <div className="font-semibold">{permiso.codigo} - {permiso.nombre}</div>
                  {permiso.descripcion && (
                    <div className="text-xs text-gray-500">{permiso.descripcion}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal para agregar/editar turnos y permisos */}
      {empleadoSeleccionado && fechaSeleccionada && (
        <TurnoPermisoModal 
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          turnos={turnos}
          permisos={permisos}
          empleadoId={empleadoSeleccionado.id}
          empleadoNombre={empleadoSeleccionado.nombre}
          fechaInicial={fechaSeleccionada}
          onGuardar={handleGuardarAsignacion}
        />
      )}
    </div>
  );
};

export default CalendarioPage;