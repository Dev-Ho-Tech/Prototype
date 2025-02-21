import React, { useState, useRef } from 'react';
import { Search, Grid, List, Clock, MapPin, Settings, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { dashboardData, employeesData } from './data';
import { EmployeeMonitoringModal } from './components/EmployeeMonitoringModal';
import type { Employee, KPISettings } from '../../types';

function DashboardScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [kpiSettings, setKpiSettings] = useState<KPISettings>({
    tardanzas: true,
    permisos: true,
    ausencias: true,
    aTiempo: true,
    entradasRealizadas: true,
    salidasRegistradas: true,
    marcajesIncorrectos: true,
    salidasAntes: true,
    horasExtras: true,
    horasFlotantes: true,
    sinHorario: true,
    conHorario: true
  });

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Fixed to show exactly 10 items per page

  const kpiLabels: Record<keyof KPISettings, string> = {
    tardanzas: 'Tardanzas',
    permisos: 'Permisos',
    ausencias: 'Ausencias',
    aTiempo: 'A Tiempo',
    entradasRealizadas: 'Entradas Realizadas',
    salidasRegistradas: 'Salidas Registradas',
    marcajesIncorrectos: 'Marcajes Incorrectos',
    salidasAntes: 'Salidas Antes',
    horasExtras: 'Horas Extras',
    horasFlotantes: 'Horas Flotantes',
    sinHorario: 'Sin Horario',
    conHorario: 'Con Horario'
  };

  const filteredEmployees = employeesData.filter(employee => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchTermLower) ||
      employee.position.toLowerCase().includes(searchTermLower) ||
      employee.department.toLowerCase().includes(searchTermLower) ||
      employee.location.toLowerCase().includes(searchTermLower)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRestoreSettings = () => {
    setKpiSettings({
      tardanzas: true,
      permisos: true,
      ausencias: true,
      aTiempo: true,
      entradasRealizadas: true,
      salidasRegistradas: true,
      marcajesIncorrectos: true,
      salidasAntes: true,
      horasExtras: true,
      horasFlotantes: true,
      sinHorario: true,
      conHorario: true
    });
  };

  React.useEffect(() => {
    let mounted = true;

    const initializeDashboard = async () => {
      try {
        setIsLoading(true);
        // Simulate data loading - replace with actual data fetching
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (mounted) {
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load dashboard'));
          setIsLoading(false);
        }
      }
    };

    initializeDashboard();

    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      mounted = false;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">Error loading dashboard</div>
          <div className="text-gray-600">{error.message}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Panel de Monitoreo</h1>
            <p className="text-sm text-gray-500">Monitoreo en tiempo real de la asistencia de empleados</p>
          </div>
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
            
            {showSettings && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Mostrar/Ocultar KPIs</h3>
                  <button
                    onClick={handleRestoreSettings}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg flex items-center space-x-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-xs">Restaurar</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(kpiSettings).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setKpiSettings({ ...kpiSettings, [key]: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {kpiLabels[key as keyof KPISettings]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(dashboardData.kpiData).map(([key, data]) => (
            kpiSettings[key as keyof KPISettings] && (
              <div 
                key={key} 
                className="bg-white p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{kpiLabels[key as keyof KPISettings]}</p>
                    <p className={`text-2xl font-semibold ${data.color}`}>{data.value}</p>
                    <div className="flex items-center mt-1 text-sm">
                      {data.trend.startsWith('+') ? (
                        <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                      ) : data.trend.startsWith('-') ? (
                        <ArrowDownRight className="w-4 h-4 mr-1 text-red-500" />
                      ) : null}
                      <span className={data.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {data.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] p-6 aspect-square transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-900">Estado del día</h3>
                <div className="space-y-2">
                  {dashboardData.dayStatus.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm group cursor-pointer">
                      <div className="flex items-center mr-3">
                        <div 
                          className="w-2 h-2 rounded-full mr-2 transition-transform group-hover:scale-125"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.dayStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {dashboardData.dayStatus.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(17, 24, 39, 0.95)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-900">109</span>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] p-6 aspect-square transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-900">Horas trabajadas</h3>
                <div className="space-y-2">
                  {dashboardData.workingHours.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm group cursor-pointer">
                      <div className="flex items-center mr-3">
                        <div 
                          className="w-2 h-2 rounded-full mr-2 transition-transform group-hover:scale-125"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.workingHours}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {dashboardData.workingHours.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(17, 24, 39, 0.95)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-900">48</span>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] p-6 aspect-square transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-900">Eventos de tiempo</h3>
                <div className="space-y-2">
                  {dashboardData.timeEvents.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm group cursor-pointer">
                      <div className="flex items-center mr-3">
                        <div 
                          className="w-2 h-2 rounded-full mr-2 transition-transform group-hover:scale-125"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.timeEvents}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {dashboardData.timeEvents.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(17, 24, 39, 0.95)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-900">67</span>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, documento, departamento, compañía o unidad"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentEmployees.map((employee) => (
                  <div 
                    key={employee.id} 
                    className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden hover:shadow-md transition-shadow aspect-square"
                  >
                    <div className="p-4 h-full flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={employee.photo}
                              alt={employee.name}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                            />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                              employee.status === 'working' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{employee.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="truncate">{employee.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Entrada</span>
                          </div>
                          <span className="font-medium">
                            {employee.schedule[0].startTime || 'N/A'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Salida</span>
                          </div>
                          <span className="font-medium">
                            {employee.schedule[0].endTime || 'N/A'}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 border-b border-gray-300">
                            <span className="truncate">Horas en Tiempo Real</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Horas trabajadas hoy</span>
                          </div>
                          <span className="font-medium">
                            6h 30m
                          </span>
                        </div>

                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">

                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'working' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.status === 'working' ? 'Activo' : 'Inactivo'}
                          </span>

                          <button 
                            onClick={() => setSelectedEmployee(employee)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Empleado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departamento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={employee.photo}
                              alt={employee.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.position}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.documentId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            employee.status === 'working' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.status === 'working' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => setSelectedEmployee(employee)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredEmployees.length)}
                  </span>{' '}
                  de <span className="font-medium">{filteredEmployees.length}</span> resultados
                </p>
              </div>
              <div>
                <nav 
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm" 
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <ChevronLeft className="h-5 w-5 -ml-2" />
                  </button>

                  <button
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    const isCurrentPage = currentPage === pageNumber;
                    const isFirstPage = pageNumber === 1;
                    const isLastPage = pageNumber === totalPages;
                    const isWithinTwoPages = 
                      Math.abs(pageNumber - currentPage) <= 2 ||
                      isFirstPage ||
                      isLastPage;

                    if (!isWithinTwoPages) {
                      if (pageNumber === 2 || pageNumber === totalPages - 1) {
                        return (
                          <span
                            key={pageNumber}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                          isCurrentPage
                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                    <ChevronRight className="h-5 w-5 -ml-2" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedEmployee && (
        <EmployeeMonitoringModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

export default DashboardScreen;