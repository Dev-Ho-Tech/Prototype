import React, { useState, useEffect } from 'react';
import { Search, Grid, List, ArrowLeft, X } from 'lucide-react';
import { empleadosDataEnriquecida, estadoDelDiaData, tiemposData } from './temp/data_temp';
import EmployeeListView from './components/EmployeeListView';
import StatisticsPanels from './components/StatisticsPanels';
import EmployeeDetailView from './components/EmployeeDetailViewProps';
import { Employee } from './interface/types';
import DashboardScreenTemp from './DashboardScreen_temp';

const DashboardScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);
  const [showOldDashboard, setShowOldDashboard] = useState(false);
  
  // Nuevo estado para rastrear el filtro activo de KPI
  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);
  
  // Función para convertir hora (HH:MM) a minutos desde medianoche
  const parseTimeToMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  // Definir itemsPerPage según el modo de vista
  const itemsPerPage = viewMode === 'grid' ? 18 : 8;

  // Filtrar empleados según el término de búsqueda y el filtro KPI activo
  const filteredEmpleados = empleadosDataEnriquecida.filter(empleado => {
    // Primero aplicar filtro de búsqueda
    const matchesSearch = 
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.pais.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Si no hay filtro KPI activo, solo aplicar la búsqueda
    if (!activeKpiFilter) {
      return matchesSearch;
    }
    
    // Aplicar filtro según el KPI seleccionado y también la búsqueda
    switch (activeKpiFilter) {
      case 'tardanzas':
        // Filtra empleados con tardanzas (asumo que tienen una propiedad tardanza o algún indicador)
        return matchesSearch && empleado.estado === 'trabajando' && 
               (empleado.ultimaAccion && parseTimeToMinutes(empleado.ultimaAccion) > 480); // 8:00 AM en minutos
      
      case 'permisos':
        return matchesSearch && empleado.estado === 'permiso';
      
      case 'salidas':
        // Asumimos que salidas intempestivas son aquellos que tienen salida antes de tiempo
        return matchesSearch && empleado.estado === 'trabajando' && empleado.ultimaAccion2;
      
      case 'ausencias':
        return matchesSearch && empleado.estado === 'ausencia';
      
      case 'sin-horario':
        // Asumimos que sin horario son empleados sin horas planificadas
        return matchesSearch && !empleado.horas;
      
      case 'horas-extras':
        // Para horas extras, buscamos empleados que trabajaron más de 8 horas
        return matchesSearch && 
               empleado.horas && 
               parseFloat(empleado.horas.split(' ')[0]) > 8;
      
      default:
        return matchesSearch;
    }
  });
  
  // Reiniciar a la primera página cuando cambie el modo de vista o el término de búsqueda
  useEffect(() => {
    // No necesitamos manejar la página actual aquí, ya que ahora lo hace el componente EmployeeListView
  }, [viewMode, searchTerm, activeKpiFilter]);

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetail(true);
  };

  const handleBackToDashboard = () => {
    setShowEmployeeDetail(false);
    setSelectedEmployee(null);
  };
  
  // Handler para cuando se hace clic en un KPI
  const handleKpiFilterChange = (kpiId: string) => {
    if (activeKpiFilter === kpiId) {
      // Si ya está seleccionado, lo deseleccionamos
      setActiveKpiFilter(null);
    } else {
      // Si no está seleccionado, lo seleccionamos
      setActiveKpiFilter(kpiId);
    }
  };
  
  // Función para limpiar el filtro activo
  const clearActiveFilter = () => {
    setActiveKpiFilter(null);
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

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4">
        {/* Cabecera simplificada */}
        <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg shadow">
          <div className="text-xl font-bold text-gray-800">
            Panel de monitoreo
          </div>
          
          <div className="relative flex-1 max-w-2xl mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowOldDashboard(true)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              title="Panel anterior"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vista de cuadrícula"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vista de lista"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtro activo (mostrar solo si hay un filtro seleccionado) */}
        {activeKpiFilter && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium text-blue-700">
                Filtro activo: {activeKpiFilter.charAt(0).toUpperCase() + activeKpiFilter.slice(1)}
              </span>
              <span className="ml-2 text-blue-700 bg-blue-100 rounded-full px-2 py-0.5 text-sm">
                {filteredEmpleados.length} resultados
              </span>
            </div>
            <button
              onClick={clearActiveFilter}
              className="text-blue-700 hover:text-blue-900 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              <span>Limpiar filtro</span>
            </button>
          </div>
        )}

        {/* Paneles de estadísticas con handler para filtro */}
        <StatisticsPanels 
          estadoDelDiaData={estadoDelDiaData}
          tiemposData={tiemposData}
          activeKpiFilter={activeKpiFilter}
          onKpiFilterChange={handleKpiFilterChange}
        />

        {/* Vista de lista/cuadrícula de empleados */}
        <EmployeeListView 
          currentEmpleados={filteredEmpleados}
          viewMode={viewMode}
          onEmployeeSelect={handleEmployeeSelect}
          itemsPerPage={itemsPerPage}
          activeFilter={activeKpiFilter} 
        />
      </div>
    </div>
  );
};

export default DashboardScreen;