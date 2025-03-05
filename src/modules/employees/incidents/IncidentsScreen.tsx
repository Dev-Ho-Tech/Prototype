import React, { useState, useEffect, useRef } from 'react';
import { Employee, Marcaje, MarcajeFormData } from './interface/types';
import { employees as mockEmployees, marcajes as mockMarcajes, dispositivos } from './temp/data';
import EmployeeDetailHeader from './components/EmployeeDetailHeader';
// import TimelineViewer from './components/TimelineViewer';
import AddMarkModal from './components/AddMarkModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Pagination from './components/Pagination';
import { Calendar, Search, Filter, ChevronDown } from 'lucide-react';
import EnhancedTimeline from './components/EnhancedTimeline';
import AdvancedFilters from './components/AdvancedFilters';

// Función para generar un ID único
// Función para generar un ID único
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Definir interface para el estado de filtros
interface FilterState {
  sedes: string[];
  departamentos: string[];
  secciones: string[];
  unidades: string[];
}

const IncidenciasScreen: React.FC = () => {
  // Estados para lista de empleados
  const [employees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [panelWidth, setPanelWidth] = useState<number>(320); // Ancho inicial del panel izquierdo
  const [isResizing, setIsResizing] = useState<boolean>(false);
  
  // Estado para filtros avanzados
  const [filters, setFilters] = useState<FilterState>({
    sedes: [],
    departamentos: [],
    secciones: [],
    unidades: []
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Estados para filtros
  const [dateFilter, setDateFilter] = useState<string>('14-02-2025');
  const [startDateFilter, setStartDateFilter] = useState<string>('01-02-2025');
  const [endDateFilter, setEndDateFilter] = useState<string>('28-02-2025');
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados para vista detallada
  const [marcajes, setMarcajes] = useState<Marcaje[]>(mockMarcajes);
  const [filteredMarcajes, setFilteredMarcajes] = useState<Marcaje[]>([]);
  const [selectedMarcaje, setSelectedMarcaje] = useState<Marcaje | null>(null);
  
  // Estados para modales
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Ref para el panel
  const panelRef = useRef<HTMLDivElement>(null);

  // Filtrar marcajes por empleado y fecha
  useEffect(() => {
    if (selectedEmployee) {
      const filtered = marcajes.filter(
        m => m.empleadoId === selectedEmployee.id && m.fecha === dateFilter
      );
      setFilteredMarcajes(filtered);
      
      // Si hay marcajes filtrados, seleccionar automáticamente el más reciente para mostrar sus datos
      if (filtered.length > 0 && !selectedMarcaje) {
        // Ordenar por hora para encontrar el más reciente
        const sortedMarcajes = [...filtered].sort((a, b) => {
          // Convertir a formato 24h para comparar correctamente
          const getHour24 = (timeStr: string) => {
            const [time, ampm] = timeStr.split(' ');
            // eslint-disable-next-line prefer-const
            let [hours, minutes] = time.split(':').map(Number);
            if (ampm === 'PM' && hours < 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0;
            return hours * 60 + minutes;
          };
          
          return getHour24(b.hora) - getHour24(a.hora);
        });
        
        setSelectedMarcaje(sortedMarcajes[0]);
      }
    } else {
      setFilteredMarcajes([]);
      setSelectedMarcaje(null);
    }
  }, [selectedEmployee, marcajes, dateFilter, selectedMarcaje]);

  // Manejar selección de empleado
  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedMarcaje(null); // Resetear selección de marcaje al cambiar de empleado
  };

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Manejar agregar marcaje
  const handleAddMarcaje = (data: MarcajeFormData) => {
    if (selectedEmployee) {
      // Simular coordenadas para pruebas
      const coordenadas = {
        latitud: 18.46007921796652,  
        longitud: -69.95589601299955,
      };
  
      const newMarcaje: Marcaje = {
        id: generateId(),
        fecha: data.fecha.split('-').reverse().join('-'), // Convertir a formato DD-MM-YYYY
        hora: data.hora,
        empleadoId: selectedEmployee.id,
        dispositivo: dispositivos.find(d => d.id === data.dispositivo)?.nombre || data.dispositivo,
        tipoVerificacion: data.tipoVerificacion,
        tipoMarcaje: data.tipoMarcaje,
        esManual: true,
        observaciones: data.observaciones,
        usuarioRegistro: 'Usuario Actual',
        timestampRegistro: new Date().toISOString(),
        coordenadas: coordenadas, // Añadir coordenadas
        resultado: "Verificado" // Añadir resultado por defecto
      };
      
      setMarcajes([...marcajes, newMarcaje]);
      setSelectedMarcaje(newMarcaje); // Seleccionar automáticamente el nuevo marcaje
      setAddModalOpen(false);
    }
  };

  // Manejar eliminar marcaje
  const handleDeleteMarcaje = (id: string) => {
    // Verificar si estamos eliminando el marcaje seleccionado
    const isSelectedMarcaje = selectedMarcaje?.id === id;
    
    // Primero filtrar los marcajes
    const updatedMarcajes = marcajes.filter(m => m.id !== id);
    setMarcajes(updatedMarcajes);
    
    // Si eliminamos el marcaje seleccionado, seleccionamos otro si existe
    if (isSelectedMarcaje && selectedEmployee) {
      const remainingFiltered = updatedMarcajes.filter(
        m => m.empleadoId === selectedEmployee.id && m.fecha === dateFilter
      );
      
      if (remainingFiltered.length > 0) {
        setSelectedMarcaje(remainingFiltered[0]);
      } else {
        setSelectedMarcaje(null);
      }
    }
    
    setDeleteModalOpen(false);
  };

  // Manejar clic en marcador de la línea de tiempo
  const handleMarkerClick = (marcaje: Marcaje) => {
    setSelectedMarcaje(marcaje);
  };

  // Manejar selección de un marcaje de la lista
  const handleSelectMarcaje = (marcaje: Marcaje) => {
    setSelectedMarcaje(marcaje);
  };

  // Manejador para cambios en los filtros avanzados
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1);
  };

  // Función de búsqueda avanzada
  const filterEmployees = () => {
    return employees.filter(employee => {
      // Filtrar por término de búsqueda en varios campos
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearchTerm = !searchTerm || 
        employee.nombre.toLowerCase().includes(searchTermLower) || 
        employee.apellidos.toLowerCase().includes(searchTermLower) ||
        employee.id.includes(searchTerm) ||
        employee.position.toLowerCase().includes(searchTermLower) ||
        employee.department.toLowerCase().includes(searchTermLower) ||
        employee.location.toLowerCase().includes(searchTermLower);
      
      // Aplicar filtros de la nueva interfaz
      const matchesSedes = filters.sedes.length === 0 || 
        filters.sedes.includes(employee.location);
        
      const matchesDepartamentos = filters.departamentos.length === 0 || 
        filters.departamentos.includes(employee.department);
      
      const matchesSecciones = filters.secciones.length === 0 || 
        filters.secciones.includes(employee.section);
      
      // Por ahora, no aplicamos filtros por unidades ya que no tenemos ese campo en nuestra data
      const matchesUnidades = true;
      
      return matchesSearchTerm && matchesSedes && matchesDepartamentos && 
        matchesSecciones && matchesUnidades;
    });
  };

  // Obtener empleados filtrados
  const filteredEmployees = filterEmployees();

  // Calcular empleados paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Toggle para mostrar/ocultar filtros
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Toggle para mostrar/ocultar búsqueda avanzada
  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  // Manejar el inicio del redimensionamiento
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      // Establecer el nuevo ancho basado en la posición del cursor
      const newWidth = moveEvent.clientX;
      
      // Limitar el ancho a mínimos y máximos
      const minPanelWidth = 280; // Ancho mínimo del panel izquierdo
      const maxPanelWidth = window.innerWidth * 0.7; // Ancho máximo (70% de la ventana)
      
      // También asegurar que quede espacio suficiente para el panel derecho
      const minRightPanelWidth = 400; // Ancho mínimo que debe tener el panel derecho
      const maxAllowedLeftPanelWidth = window.innerWidth - minRightPanelWidth;
      
      // Calcular el ancho final respetando todas las restricciones
      const finalWidth = Math.max(minPanelWidth, Math.min(newWidth, maxPanelWidth, maxAllowedLeftPanelWidth));
      
      setPanelWidth(finalWidth);
    };
    
    const onMouseUp = () => {
      setIsResizing(false);
      // Eliminar event listeners cuando se suelta el ratón
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    // Agregar event listeners para seguir el movimiento del ratón
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Limpiar todos los filtros de búsqueda
  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      sedes: [],
      departamentos: [],
      secciones: [],
      unidades: []
    });
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden">
      {/* Panel izquierdo - Lista de empleados */}
      <div 
        ref={panelRef}
        className={`border-r border-gray-200 flex flex-col bg-white ${selectedEmployee ? '' : 'w-full'}`}
        style={selectedEmployee ? { width: `${panelWidth}px` } : {}}
      >
        {/* Título y botón para alternar tipo de búsqueda */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-gray-700">Empleados</h2>
            <button
              onClick={toggleAdvancedFilters}
              className="p-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center"
            >
              {showAdvancedFilters ? 'Búsqueda simple' : 'Búsqueda avanzada'}
              <ChevronDown className={`ml-1 w-3 h-3 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Contenedor de filtros */}
          <div className="overflow-hidden transition-all duration-300">
            {showAdvancedFilters ? (
              <AdvancedFilters 
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onFilterChange={handleFilterChange}
                onClearFilters={clearAllFilters}
                employees={employees} // Pasar la lista de empleados
              />
            ) : (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Tabla de empleados */}
        <div className="overflow-auto flex-1">
          <div className="divide-y divide-gray-200">
            {paginatedEmployees.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <div className="mb-2">
                  <Search className="h-8 w-8 text-gray-300 mx-auto" />
                </div>
                <p>No se encontraron empleados con los criterios de búsqueda.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              paginatedEmployees.map((employee) => {
                // Contar incidencias para este empleado (simulado)
                const incidenciasCount = Math.floor(Math.random() * 3) + 1;
                
                return (
                  <button
                    key={employee.id}
                    onClick={() => handleSelectEmployee(employee)}
                    className={`w-full text-left p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between ${
                      selectedEmployee?.id === employee.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {employee.nombre} {employee.apellidos}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{employee.position}</div>
                      <div className="text-xs text-gray-500">{employee.department}</div>
                      <div className="text-xs text-gray-400 mt-1">ID: {employee.id}</div>
                    </div>
                    <div>
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-800 font-medium text-xs">
                        {incidenciasCount}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Paginación */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <div className="text-xs text-gray-500 text-center mt-2">
            Mostrando {filteredEmployees.length > 0 ? `${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredEmployees.length)} de` : '0 de'} {filteredEmployees.length}
          </div>
        </div>
      </div>

      {/* Divisor redimensionable */}
      {selectedEmployee && (
        <div 
          className={`w-1 bg-gray-100 hover:bg-blue-300 cursor-col-resize ${isResizing ? 'bg-blue-400' : ''}`}
          onMouseDown={handleResizeStart}
        />
      )}

      {/* Panel derecho - Detalles del empleado seleccionado */}
      {selectedEmployee && (
        <div className="flex-1 overflow-auto bg-gray-100 min-w-[400px]">
          <div className="p-4">
            {/* Filtros */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium text-gray-700">Gestión de Incidencias</h2>
                <button 
                  onClick={toggleFilters}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              
              {showFilters && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Fecha específica:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="DD-MM-YYYY"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Fecha de inicio:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={startDateFilter}
                          onChange={(e) => setStartDateFilter(e.target.value)}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="DD-MM-YYYY"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Fecha de fin:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={endDateFilter}
                          onChange={(e) => setEndDateFilter(e.target.value)}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="DD-MM-YYYY"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Información detallada del empleado */}
            <EmployeeDetailHeader employee={selectedEmployee} />
            
            {/* Fechas de incidencias */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Fechas de incidencias</h3>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Fecha:
                  </label>
                  <input
                    type="text"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Hora:
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm">
                    {selectedMarcaje?.hora || "---"}
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Dispositivo:
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm">
                    {selectedMarcaje?.dispositivo || "---"}
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Tipo De Verificación:
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm">
                    {selectedMarcaje?.tipoVerificacion || "---"}
                  </div>
                </div>
              </div>
              
              {/* Visor de línea de tiempo */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Marcajes</h3>
                </div>
                {/* <TimelineViewer 
                  marcajes={filteredMarcajes}
                  onAddMarcaje={() => setAddModalOpen(true)}
                  onMarkerClick={handleMarkerClick}
                  selectedMarcajeId={selectedMarcaje?.id}
                  employee={selectedEmployee}
                /> */}
                <EnhancedTimeline 
                  marcajes={filteredMarcajes}
                  onMarkerClick={handleMarkerClick}
                  selectedMarcajeId={selectedMarcaje?.id}
                  employee={selectedEmployee}
                />
              </div>

              {/* Botones de acción */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center text-sm"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar marcaje
                </button>
                
                <button
                  onClick={() => selectedMarcaje && setDeleteModalOpen(true)}
                  disabled={!selectedMarcaje}
                  className={`px-4 py-2 rounded-md inline-flex items-center text-sm ${
                    selectedMarcaje
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-200 text-red-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar marcaje
                </button>
              </div>
            </div>
            
            {/* Lista de marcajes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-medium text-gray-700">Marcajes registrados</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispositivo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verificación</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMarcajes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No hay marcajes registrados para este empleado en la fecha seleccionada.
                        </td>
                      </tr>
                    ) : (
                      filteredMarcajes.map(marcaje => (
                        <tr 
                          key={marcaje.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${selectedMarcaje?.id === marcaje.id ? 'bg-blue-50' : ''}`}
                          onClick={() => handleSelectMarcaje(marcaje)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.fecha}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.hora}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.dispositivo}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              marcaje.tipoMarcaje === 'Entrada' 
                                ? 'bg-green-100 text-green-800' 
                                : marcaje.tipoMarcaje === 'Salida'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                            }`}>
                              {marcaje.tipoMarcaje}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.tipoVerificacion}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMarcaje(marcaje);
                                setDeleteModalOpen(true);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modales */}
      {selectedEmployee && (
        <>
          <AddMarkModal 
            isOpen={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onSubmit={handleAddMarcaje}
            empleadoNombre={`${selectedEmployee.nombre} ${selectedEmployee.apellidos}`}
            dispositivos={dispositivos}
          />
          
          <DeleteConfirmModal 
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => selectedMarcaje && handleDeleteMarcaje(selectedMarcaje.id)}
            itemName={selectedMarcaje 
              ? `${selectedMarcaje.fecha} - ${selectedMarcaje.hora} (${selectedMarcaje.tipoMarcaje})`
              : ''}
          />
        </>
      )}
    </div>
  );
};

export default IncidenciasScreen;