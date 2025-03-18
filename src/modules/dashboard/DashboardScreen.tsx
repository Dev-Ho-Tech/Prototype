import React, { useState } from 'react';
import { Grid, List, ArrowLeft, X, Map } from 'lucide-react';
import { empleadosDataEnriquecida, estadoDelDiaData, tiemposData } from './temp/data_temp';
import EmployeeListView from './components/EmployeeListView';
import StatisticsPanels from './components/StatisticsPanels';
import EmployeeDetailView from './components/EmployeeDetailViewProps';
import MapView from './components/MapView/MapView';
import { Employee } from './interface/types';
import DashboardScreenTemp from './DashboardScreen_temp';
import SearchComponent from './components/search/SearchComponent';
import AdvancedFiltersDashboard from './components/search/AdvancedFiltersDashboard';


interface FilterState {
  pais: string[];
  estado: string[];
  departamento: string[];
}

const DashboardScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState<boolean>(false);
  const [showOldDashboard, setShowOldDashboard] = useState<boolean>(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState<boolean>(false);
  
  // Estado para mostrar/ocultar filtros avanzados
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  
  // Estado para almacenar los filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    pais: [],
    estado: [],
    departamento: []
  });
  
  // Estado para rastrear el filtro activo de KPI
  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);
  
  // Función para convertir hora (HH:MM) a minutos desde medianoche
  const parseTimeToMinutes = (timeStr: string): number => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  // Definir itemsPerPage según el modo de vista
  const itemsPerPage = viewMode === 'grid' ? 18 : 8;

  // Función para alternar la visibilidad de los filtros avanzados
  const toggleAdvancedFilters = (): void => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  // Función para manejar cambios en los filtros avanzados
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (filters: any): void => {
    console.log("Filtros recibidos:", filters); // Log para debugging
    
    // Convertir los filtros al formato que espera el dashboard
    const convertedFilters = {
      pais: filters.sedes || [],
      estado: filters.departamentos || [],
      departamento: filters.secciones || []
    };
    
    console.log("Filtros convertidos:", convertedFilters); // Log para debugging
    setAppliedFilters(convertedFilters);
  };

  // Función para limpiar todos los filtros
  const clearAllFilters = (): void => {
    setAppliedFilters({
      pais: [],
      estado: [],
      departamento: []
    });
    setSearchTerm('');
  };

  // CORREGIDO: Lógica de filtrado mejorada para departamentos
  const filteredEmpleados = empleadosDataEnriquecida.filter(empleado => {
    // Para debugging
    if (appliedFilters.estado.length > 0 || appliedFilters.departamento.length > 0) {
      console.log(`Evaluando empleado: ${empleado.nombre}, pais: ${empleado.pais}, departamento: ${empleado.departamento}, estado: ${empleado.estado}`);
    }
    
    // Primero aplicar filtro de búsqueda
    const matchesSearch = 
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.pais.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Lógica para filtros avanzados
    let matchesAdvancedFilters = true;
    
    // Verificar filtro de país/sede si hay alguno seleccionado
    if (appliedFilters.pais.length > 0) {
      if (!empleado.pais || !appliedFilters.pais.includes(empleado.pais)) {
        matchesAdvancedFilters = false;
      }
    }
    
    // CORREGIDO: El campo "estado" en los filtros corresponde al campo "departamento" en el empleado
    if (matchesAdvancedFilters && appliedFilters.estado.length > 0) {
      // Aquí está el cambio crucial - usamos departamento en lugar de estado
      if (!empleado.departamento || !appliedFilters.estado.includes(empleado.departamento)) {
        matchesAdvancedFilters = false;
      }
    }
    
    // CORREGIDO: El campo "departamento" en los filtros corresponde a las secciones
    if (matchesAdvancedFilters && appliedFilters.departamento.length > 0) {
      // En este caso, usamos estado para match con secciones
      if (!empleado.estado || !appliedFilters.departamento.includes(empleado.estado)) {
        matchesAdvancedFilters = false;
      }
    }
    
    // Para debugging
    if ((appliedFilters.estado.length > 0 || appliedFilters.departamento.length > 0) && matchesAdvancedFilters) {
      console.log(`MATCH: ${empleado.nombre}`);
    }
    
    // Si no hay filtro KPI activo, sólo aplicar la búsqueda y filtros avanzados
    if (!activeKpiFilter) {
      return matchesSearch && matchesAdvancedFilters;
    }
    
    // Aplicar filtro según el KPI seleccionado junto con búsqueda y filtros avanzados
    switch (activeKpiFilter) {
      case 'tardanzas':
        // Filtra empleados con tardanzas
        return matchesSearch && matchesAdvancedFilters && 
               empleado.estado === 'trabajando' && 
               (empleado.ultimaAccion && parseTimeToMinutes(empleado.ultimaAccion) > 480);
      
      case 'permisos':
        return matchesSearch && matchesAdvancedFilters && empleado.estado === 'permiso';
      
      case 'salidas':
        // Salidas intempestivas
        return matchesSearch && matchesAdvancedFilters && 
               empleado.estado === 'trabajando' && empleado.ultimaAccion2;
      
      case 'ausencias':
        return matchesSearch && matchesAdvancedFilters && empleado.estado === 'ausencia';
      
      case 'sin-horario':
        // Sin horario asignado
        return matchesSearch && matchesAdvancedFilters && !empleado.horas;
      
      case 'horas-extras':
        // Horas extras
        return matchesSearch && matchesAdvancedFilters && 
               empleado.horas && 
               parseFloat(empleado.horas.split(' ')[0]) > 8;
      
      default:
        return matchesSearch && matchesAdvancedFilters;
    }
  });

  const handleEmployeeSelect = (employee: Employee): void => {
    setSelectedEmployee(employee);
    setShowEmployeeDetail(true);
  };

  const handleBackToDashboard = (): void => {
    setShowEmployeeDetail(false);
    setSelectedEmployee(null);
  };
  
  // Handler para cuando se hace clic en un KPI
  const handleKpiFilterChange = (kpiId: string): void => {
    if (activeKpiFilter === kpiId) {
      // Si ya está seleccionado, lo deseleccionamos
      setActiveKpiFilter(null);
    } else {
      // Si no está seleccionado, lo seleccionamos
      setActiveKpiFilter(kpiId);
    }
  };
  
  // Función para limpiar el filtro activo
  const clearActiveFilter = (): void => {
    setActiveKpiFilter(null);
  };

  // Cambiar entre modos de vista
  const setViewModeAndResetMapFullscreen = (mode: 'grid' | 'list' | 'map'): void => {
    setViewMode(mode);
    if (mode !== 'map') {
      setIsMapFullscreen(false);
    }
    // Cerrar filtros avanzados al cambiar de vista
    setShowAdvancedFilters(false);
  };

  // Manejar el cambio de estado de pantalla completa del mapa
  const handleToggleMapFullscreen = (): void => {
    setIsMapFullscreen(!isMapFullscreen);
  };

  if (showOldDashboard) {
    return <DashboardScreenTemp />;
  }

  if (showEmployeeDetail && selectedEmployee) {
    return (
      <EmployeeDetailView 
        employee={selectedEmployee}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Si el mapa está en pantalla completa, mostrarlo como componente independiente
  if (viewMode === 'map' && isMapFullscreen) {
    return (
      <MapView 
        onClose={() => setViewMode('grid')}
        isFullscreen={true}
        onToggleFullscreen={handleToggleMapFullscreen}
      />
    );
  }

  // Determinar si se debe mostrar el buscador global (sólo en modos grid y list)
  const showGlobalSearch = viewMode !== 'map';
  
  // Determinar si se debe mostrar el panel de estadísticas (sólo en modos grid y list)
  const showStatisticsPanel = viewMode !== 'map';

  // Verificar si hay filtros avanzados aplicados
  const hasAppliedAdvancedFilters = 
    appliedFilters.pais.length > 0 || 
    appliedFilters.estado.length > 0 || 
    appliedFilters.departamento.length > 0;

  // Convertir los datos de empleados al formato que espera AdvancedFiltersDashboard
  // CORREGIDO: Mapeando las propiedades correctamente según los nuevos conocimientos
  const formattedEmployees = empleadosDataEnriquecida.map(emp => {
    return {
      id: emp.id.toString(),
      displayName: emp.nombre || '',
      // Sede es pais
      location: emp.pais || '',
      // Departamento es departamento
      department: emp.departamento || '',
      // Estado es section (en el filtro)
      section: emp.estado || '',
      unit: '' // No hay unidad en los datos del ejemplo
    };
  });

  // Función para obtener texto de filtros avanzados sin duplicados
  const getFilterDisplayText = () => {
    // Combinar todos los filtros
    const allFilters = [
      ...appliedFilters.pais,
      ...appliedFilters.estado,
      ...appliedFilters.departamento
    ];
    
    // Eliminar duplicados
    const uniqueFilters = [...new Set(allFilters)];
    
    // Tomar solo los primeros 3 para mostrar
    const displayFilters = uniqueFilters.slice(0, 3);
    
    return `${displayFilters.join(', ')}${uniqueFilters.length > 3 ? '...' : ''}`;
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4">
        {/* Cabecera simplificada */}
        <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg shadow">
          <div className="text-xl font-bold text-gray-800">
            Panel de monitoreo
          </div>
          
          {/* Buscador - solo se muestra en vistas grid y list */}
          {showGlobalSearch ? (
          <SearchComponent 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showAdvancedFilters={showAdvancedFilters}
            toggleAdvancedFilters={toggleAdvancedFilters}
            placeholder="Buscar por código, Cédula, Género, Tipo de Trabajo, Departamento, Sección, Unidad..."
            className="relative flex-1 max-w-3xl lg:max-w-4xl mx-4 lg:mx-8"
            advancedFiltersComponent={
              <AdvancedFiltersDashboard
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onFilterChange={handleFilterChange}
                onClearFilters={clearAllFilters}
                employees={formattedEmployees}
              />
            }
          />
        ) : (
          // Espacio flexible para mantener el layout cuando no se muestra el buscador
          <div className="flex-1"></div>
        )}

          <div className="flex items-center space-x-2">
            {/* <button
              onClick={() => setShowOldDashboard(true)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              title="Panel anterior"
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button> */}
            <button
              onClick={() => setViewModeAndResetMapFullscreen('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vista de cuadrícula"
              type="button"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewModeAndResetMapFullscreen('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vista de lista"
              type="button"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewModeAndResetMapFullscreen('map')}
              className={`p-2 rounded-lg ${
                viewMode === 'map'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vista de mapa"
              type="button"
            >
              <Map className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtros aplicados (mostrar cuando hay filtros avanzados o KPI seleccionado) */}
        {(activeKpiFilter || hasAppliedAdvancedFilters) && showStatisticsPanel && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4 flex items-center justify-between">
            <div className="flex items-center">
              {activeKpiFilter && (
                <span className="font-medium text-blue-700 mr-4">
                  Filtro KPI: {activeKpiFilter.charAt(0).toUpperCase() + activeKpiFilter.slice(1)}
                </span>
              )}
              
              {hasAppliedAdvancedFilters && (
                <span className="font-medium text-blue-700">
                  Filtros avanzados: {getFilterDisplayText()}
                </span>
              )}
              
              <span className="ml-2 text-blue-700 bg-blue-100 rounded-full px-2 py-0.5 text-sm">
                {filteredEmpleados.length} resultados
              </span>
            </div>
            <button
              onClick={() => {
                clearActiveFilter();
                clearAllFilters();
              }}
              className="text-blue-700 hover:text-blue-900 flex items-center"
              type="button"
            >
              <X className="w-4 h-4 mr-1" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        )}

        {/* Paneles de estadísticas - solo se muestran en vistas grid y list */}
        {showStatisticsPanel && (
          <StatisticsPanels 
            estadoDelDiaData={estadoDelDiaData}
            tiemposData={tiemposData}
            activeKpiFilter={activeKpiFilter}
            onKpiFilterChange={handleKpiFilterChange}
          />
        )}

        {/* Contenido según el modo de vista seleccionado */}
        {viewMode === 'map' ? (
          <div className="bg-white rounded-lg shadow-lg mt-4" style={{ height: 'calc(100vh - 120px)' }}>
            <MapView 
              onClose={() => setViewMode('grid')}
              isFullscreen={false}
              onToggleFullscreen={handleToggleMapFullscreen}
            />
          </div>
        ) : (
          /* Vista de lista/cuadrícula de empleados */
          <EmployeeListView 
            currentEmpleados={filteredEmpleados}
            viewMode={viewMode}
            onEmployeeSelect={handleEmployeeSelect}
            itemsPerPage={itemsPerPage}
            activeFilter={activeKpiFilter} 
          />
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;