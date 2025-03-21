/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from 'react';
import { EmpleadosList } from './components/calendario/EmpleadosList';
import { CalendarioHeader } from './components/calendario/CalendarioHeader';
import { CalendarioGrid } from './components/calendario/CalendarioGrid';
import { ListadoTurnos } from './components/calendario/ListadoTurnos';
import { TurnoPermisoModal } from './components/calendario/TurnoPermisoModal';
import { VistaSelector } from './components/calendario/VistaSelector';
import { PeriodoTipo, AsignacionTurno, AsignacionPermiso } from './interfaces/Calendario';
import { Empleado } from './interfaces/Empleado';
import { empleados } from './temp/mock-empleados';
import { turnos } from './temp/mock-turnos';
import { permisos } from './temp/mock-permisos';
import { asignacionesTurnos, asignacionesPermisos } from './temp/mock-asignaciones';
import { DeleteHorarioModal } from './components/calendario/DeleteHorarioModal';
import { DetalleHorarioModal } from './components/calendario/DetalleHorarioModal';

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
  
  // Estado para modales adicionales
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false);
  const [asignacionSeleccionada] = useState<any>(null);
  
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

  // Manejador para cuando se selecciona un empleado desde la lista
  const handleEmpleadoClick = useCallback((empleado: Empleado) => {
    setEmpleadoSeleccionado({
      id: empleado.id,
      nombre: `${empleado.nombre} ${empleado.apellidos}`
    });
    setFechaSeleccionada(new Date()); // Por defecto usamos la fecha actual
    setModalAbierto(true);
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
      
      console.log("Turno guardado para fecha:", data.fechaInicio);
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
      
      console.log("Permiso guardado para fecha:", data.fechaInicio, "hasta", data.fechaFin);
    }

    // Cerramos el modal después de guardar
    setModalAbierto(false);
  }, []);

  // Manejador para eliminar asignación
  const handleEliminarAsignacion = useCallback((id: string) => {
    // Verificar si es un turno o un permiso
    if (id.startsWith('t')) {
      setAsignacionesT(prev => prev.filter(asig => asig.id !== id));
    } else if (id.startsWith('p')) {
      setAsignacionesP(prev => prev.filter(asig => asig.id !== id));
    }
    
    setMostrarModalEliminar(false);
  }, []);

  // Manejador para ver detalle de asignación
  // const handleVerDetalle = useCallback((asignacion: any) => {
  //   setAsignacionSeleccionada(asignacion);
  //   setMostrarModalDetalle(true);
  // }, []);

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

  // Determina si mostrar o no el panel de empleados
  // Se oculta en caso de:
  // 1. Vista en modo "lista"
  // 2. Periodo seleccionado es "quincenal" o "mensual"
  const mostrarPanelEmpleados = tipoVista !== 'lista' && 
    (periodoSeleccionado === 'diario' || periodoSeleccionado === 'semanal');

  // Layout dinámico basado en la visibilidad del panel de empleados
  const layoutClases = mostrarPanelEmpleados 
    ? "grid grid-cols-1 md:grid-cols-4 gap-6" 
    : "grid grid-cols-1 gap-6";
  
  const contenidoPrincipalClases = mostrarPanelEmpleados 
    ? "md:col-span-3" 
    : "md:col-span-1";

  const mostrarLeyenda = tipoVista !== 'lista';

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Calendario de Turnos y Permisos</h1>
      
      <div className="mb-4">
        <VistaSelector 
          vistaActual={tipoVista} 
          onVistaChange={setTipoVista} 
        />
      </div>
      
      <div className={layoutClases}>
        {/* Panel lateral de empleados - solo visible en ciertas vistas y periodos */}
        {mostrarPanelEmpleados && (
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border h-full">
              <h2 className="font-semibold text-lg mb-4">Empleados</h2>
              <EmpleadosList 
                empleados={empleadosFiltrados} 
                onEmpleadoClick={handleEmpleadoClick}
              />
            </div>
          </div>
        )}
        
        {/* Panel principal - cambia según la vista seleccionada */}
        <div className={contenidoPrincipalClases}>
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
              <ListadoTurnos
                empleados={empleadosFiltrados}
                turnos={turnos}
                permisos={permisos}
                asignacionesTurnos={asignacionesT}
                asignacionesPermisos={asignacionesP}
                fechaActual={fechaActual}
                onEmpleadoClick={handleEmpleadoClick}
                onCeldaClick={handleCeldaClick}
              />
            )}
            
            {tipoVista === 'tarjetas' && (
              <div className="p-8 text-center text-gray-500">
                Vista de tarjetas - En desarrollo
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Panel de información sobre turnos y permisos - solo visible en ciertas vistas */}
      {mostrarLeyenda && (
      <div className="mt-6">

        {/* Tabs de filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {(() => {
            // Estado local para el tab activo
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [tabActivo, setTabActivo] = React.useState('todos');
            
            // Filtrar elementos según el tab activo
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const elementosFiltrados = React.useMemo(() => {
              if (tabActivo === 'todos') return [...turnos, ...permisos];
              if (tabActivo === 'turnos') return turnos;
              if (tabActivo === 'permisos') return permisos;
              return [];
            }, [tabActivo]);
            
            return (
              <>
                <div className="flex items-center border-b">
                  <button 
                    className={`px-6 py-3 font-medium transition-colors ${
                      tabActivo === 'todos' 
                        ? 'text-blue-600 border-b-2 border-blue-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setTabActivo('todos')}
                  >
                    Todos ({turnos.length + permisos.length})
                  </button>
                  <button 
                    className={`px-6 py-3 font-medium transition-colors ${
                      tabActivo === 'turnos' 
                        ? 'text-blue-600 border-b-2 border-blue-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setTabActivo('turnos')}
                  >
                    Turnos ({turnos.length})
                  </button>
                  <button 
                    className={`px-6 py-3 font-medium transition-colors ${
                      tabActivo === 'permisos' 
                        ? 'text-blue-600 border-b-2 border-blue-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setTabActivo('permisos')}
                  >
                    Permisos ({permisos.length})
                  </button>
                </div>
                
                <div className="p-5">
                  {tabActivo === 'todos' && (
                    <>
                      {/* Sección de Turnos */}
                      {turnos.length > 0 && (
                        <div className="mb-5">
                          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">
                            <span className="border-l-4 border-blue-500 pl-2">Turnos de Trabajo</span>
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {turnos.map(turno => (
                              <div key={turno.id} className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                                <div className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center ${turno.color}`}>
                                  <span className="font-bold text-xs">{turno.codigo}</span>
                                </div>
                                <div className="ml-2 min-w-0">
                                  <div className="font-medium text-sm truncate">{turno.nombre}</div>
                                  <div className="text-xs text-gray-500 truncate">
                                    {turno.horaInicio} - {turno.horaFin}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Sección de Permisos */}
                      {permisos.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">
                            <span className="border-l-4 border-purple-500 pl-2">Permisos</span>
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {permisos.map(permiso => (
                              <div key={permiso.id} className="flex items-center p-2 rounded-lg hover:bg-purple-50 transition-colors border border-gray-100">
                                <div className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center ${permiso.color}`}>
                                  <span className="font-bold text-xs">{permiso.codigo}</span>
                                </div>
                                <div className="ml-2 min-w-0">
                                  <div className="font-medium text-sm truncate">{permiso.nombre}</div>
                                  {permiso.descripcion && (
                                    <div className="text-xs text-gray-500 truncate">{permiso.descripcion}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Tab de solo Turnos */}
                  {tabActivo === 'turnos' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {turnos.map(turno => (
                        <div key={turno.id} className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                          <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${turno.color}`}>
                            <span className="font-bold text-xs">{turno.codigo}</span>
                          </div>
                          <div className="ml-3 min-w-0">
                            <div className="font-medium text-sm truncate">{turno.nombre}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {turno.horaInicio} - {turno.horaFin}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Tab de solo Permisos */}
                  {tabActivo === 'permisos' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {permisos.map(permiso => (
                        <div key={permiso.id} className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors border border-gray-100">
                          <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${permiso.color}`}>
                            <span className="font-bold text-xs">{permiso.codigo}</span>
                          </div>
                          <div className="ml-3 min-w-0">
                            <div className="font-medium text-sm truncate">{permiso.nombre}</div>
                            {permiso.descripcion && (
                              <div className="text-xs text-gray-500 truncate">{permiso.descripcion}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Mensaje cuando no hay elementos */}
                  {elementosFiltrados.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      No hay {tabActivo} configurados actualmente.
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    )}
      
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
      
      {/* Modal para eliminación */}
      {mostrarModalEliminar && asignacionSeleccionada && (
        <DeleteHorarioModal 
          tipoAsignacion={asignacionSeleccionada.tipo === 'turno' ? 'Turno' : 'Permiso'}
          nombreEmpleado={asignacionSeleccionada.empleado}
          fechaAsignacion={asignacionSeleccionada.fechaStr}
          onDelete={() => handleEliminarAsignacion(asignacionSeleccionada.id)}
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
            handleCeldaClick(asignacionSeleccionada.empleadoId, asignacionSeleccionada.fecha);
          }}
        />
      )}
    </div>
  );
};

export default CalendarioPage;