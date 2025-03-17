import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import { Settings, FileText, FileSpreadsheet, Sliders } from 'lucide-react';

// Definir tipos para la configuración de horas
interface HoursConfig {
  id: string;
  name: string;
  description: string;
  regularHoursLimit: number;
  extraHoursRate: number;
  saturdayAfternoonRate: number;
  sundayRate: number;
  holidayRate: number;
  nightHoursRate: number;
  isDefault: boolean;
}

// Configuraciones de ejemplo
const hoursConfigs: HoursConfig[] = [
  {
    id: 'standard',
    name: 'Estándar',
    description: 'Configuración estándar de horas',
    regularHoursLimit: 8,
    extraHoursRate: 25,
    saturdayAfternoonRate: 50,
    sundayRate: 100,
    holidayRate: 100,
    nightHoursRate: 35,
    isDefault: true
  },
  {
    id: 'manufacturing',
    name: 'Manufactura',
    description: 'Configuración para sector de manufactura',
    regularHoursLimit: 8,
    extraHoursRate: 35,
    saturdayAfternoonRate: 75,
    sundayRate: 100,
    holidayRate: 150,
    nightHoursRate: 50,
    isDefault: false
  },
  {
    id: 'hospitality',
    name: 'Hotelería',
    description: 'Configuración para sector hotelero',
    regularHoursLimit: 9,
    extraHoursRate: 15,
    saturdayAfternoonRate: 25,
    sundayRate: 75,
    holidayRate: 100,
    nightHoursRate: 30,
    isDefault: false
  }
];

// Datos de ejemplo para las horas diarias
interface DailyHoursEntry {
  id: string;
  employeeId: string;
  date: Date;
  startTime: string;
  endTime: string;
  breakTime: number; // en minutos
  totalMinutes: number;
  isHoliday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  nightMinutes: number;
}

// Generar datos simulados
const generateMockData = (): DailyHoursEntry[] => {
  const mockData: DailyHoursEntry[] = [];
  const employees = ['1', '2', '3', '4', '5'];
  const startDate = new Date('2025-02-15');
  const endDate = new Date('2025-03-15');
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;
    const isHoliday = [
      '2025-02-17', // Ejemplo de día festivo
      '2025-03-10'  // Ejemplo de día festivo
    ].includes(date.toISOString().split('T')[0]);
    
    employees.forEach(employeeId => {
      // Simular algunos días sin trabajo
      if (Math.random() < 0.2) return;
      
      // Generar datos aleatorios para este día y empleado
      const startHour = 7 + Math.floor(Math.random() * 3); // Entre 7 y 9
      const startTime = `${startHour.toString().padStart(2, '0')}:${Math.random() < 0.5 ? '00' : '30'}`;
      
      let workHours = 8 + (Math.random() < 0.3 ? Math.floor(Math.random() * 4) : 0); // Entre 8 y 12 horas
      if (isSaturday) workHours = 5; // Medio día en sábado
      if (isSunday || isHoliday) workHours = 0; // No trabajo en domingo o festivo por defecto
      
      // Algunos trabajan el domingo o festivo
      if ((isSunday || isHoliday) && Math.random() < 0.2) {
        workHours = 6 + Math.floor(Math.random() * 3); // Entre 6 y 8 horas
      }
      
      // Calcular hora de fin
      const endHour = startHour + workHours;
      const endMinutes = Math.random() < 0.5 ? '00' : '30';
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMinutes}`;
      
      // Tiempo de descanso
      const breakTime = workHours > 6 ? 60 : 30; // 1 hora si trabaja más de 6 horas, 30 min en caso contrario
      
      // Calcular total de minutos trabajados
      const totalMinutes = (workHours * 60) - breakTime;
      
      // Calcular minutos nocturnos (después de las 19:00)
      let nightMinutes = 0;
      if (endHour >= 19) {
        nightMinutes = (endHour - 19) * 60 + (endMinutes === '30' ? 30 : 0);
      }
      
      mockData.push({
        id: `${employeeId}-${date.toISOString().split('T')[0]}`,
        employeeId,
        date: new Date(date),
        startTime,
        endTime,
        breakTime,
        totalMinutes,
        isHoliday,
        isSaturday,
        isSunday,
        nightMinutes
      });
    });
  }
  
  return mockData;
};

const mockDailyHoursData = generateMockData();

const DailyHoursConsolidatedReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'daily-hours-consolidated' });

  const [selectedConfig, setSelectedConfig] = useState<string>(hoursConfigs.find(config => config.isDefault)?.id || 'standard');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [sortField, setSortField] = useState<'employee' | 'date' | 'totalHours'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Filtrar datos según la fecha y empleados seleccionados
  const filteredData = useMemo(() => {
    return mockDailyHoursData.filter(entry => {
      const entryDate = new Date(entry.date);
      const inDateRange = entryDate >= filter.dateRange.startDate && entryDate <= filter.dateRange.endDate;
      
      const employeeIncluded = filter.employees && filter.employees.length > 0 
        ? filter.employees.includes(entry.employeeId)
        : true;
        
      return inDateRange && employeeIncluded;
    });
  }, [mockDailyHoursData, filter.dateRange, filter.employees]);

  // Obtener la configuración actual
  const currentConfig = useMemo(() => {
    return hoursConfigs.find(config => config.id === selectedConfig) || hoursConfigs[0];
  }, [selectedConfig]);

  // Calcular las horas según la configuración seleccionada
  const calculatedHours = useMemo(() => {
    // Agrupar datos por empleado
    const employeeDataMap = new Map();
    
    filteredData.forEach(entry => {
      const employee = employees.find(e => e.id === entry.employeeId);
      if (!employee) return;
      
      if (!employeeDataMap.has(entry.employeeId)) {
        employeeDataMap.set(entry.employeeId, {
          id: employee.id,
          name: `${employee.name} ${employee.lastName}`,
          position: employee.position,
          department: employee.department,
          entries: [],
          regularHours: 0,
          extraHours: 0,
          saturdayAfternoonHours: 0,
          sundayHours: 0,
          holidayHours: 0,
          nightHours: 0,
          totalHours: 0,
          totalAmount: 0 // Valor monetario total basado en las tasas
        });
      }
      
      const employeeData = employeeDataMap.get(entry.employeeId);
      
      // Convertir minutos a horas
      const totalHours = entry.totalMinutes / 60;
      let regularHours = 0;
      let extraHours = 0;
      let saturdayAfternoonHours = 0;
      let sundayHours = 0;
      let holidayHours = 0;
      let nightHours = entry.nightMinutes / 60;
      
      if (entry.isHoliday) {
        holidayHours = totalHours;
      } else if (entry.isSunday) {
        sundayHours = totalHours;
      } else if (entry.isSaturday) {
        // Si es sábado, asumimos que la tarde comienza a las 12:00
        const startHour = parseInt(entry.startTime.split(':')[0]);
        const endHour = parseInt(entry.endTime.split(':')[0]);
        
        if (endHour <= 12) {
          // Si termina antes del mediodía, todas son horas regulares
          regularHours = totalHours;
        } else if (startHour >= 12) {
          // Si comienza después del mediodía, todas son horas de tarifa especial
          saturdayAfternoonHours = totalHours;
        } else {
          // Si cruza el mediodía, dividir entre regular y tarifa especial
          const hoursBeforeNoon = 12 - startHour;
          regularHours = Math.min(hoursBeforeNoon, totalHours);
          saturdayAfternoonHours = totalHours - regularHours;
        }
      } else {
        // Día normal
        regularHours = Math.min(currentConfig.regularHoursLimit, totalHours);
        extraHours = Math.max(0, totalHours - regularHours);
      }
      
      // Añadir al total del empleado
      employeeData.regularHours += regularHours;
      employeeData.extraHours += extraHours;
      employeeData.saturdayAfternoonHours += saturdayAfternoonHours;
      employeeData.sundayHours += sundayHours;
      employeeData.holidayHours += holidayHours;
      employeeData.nightHours += nightHours;
      employeeData.totalHours += totalHours;
      
      // Calcular importe según las tasas (simulado, no representa valor real)
      const amount = 
        regularHours * 1 + // tarifa base
        extraHours * (1 + currentConfig.extraHoursRate / 100) +
        saturdayAfternoonHours * (1 + currentConfig.saturdayAfternoonRate / 100) +
        sundayHours * (1 + currentConfig.sundayRate / 100) +
        holidayHours * (1 + currentConfig.holidayRate / 100) +
        nightHours * (1 + currentConfig.nightHoursRate / 100);
      
      employeeData.totalAmount += amount;
      
      // Guardar la entrada original con los cálculos
      employeeData.entries.push({
        ...entry,
        calculatedData: {
          regularHours,
          extraHours,
          saturdayAfternoonHours,
          sundayHours,
          holidayHours,
          nightHours,
          totalHours,
          amount
        }
      });
    });
    
    return Array.from(employeeDataMap.values());
  }, [filteredData, employees, currentConfig]);

  // Ordenar empleados
  const sortedData = useMemo(() => {
    return [...calculatedHours].sort((a, b) => {
      if (sortField === 'employee') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'totalHours') {
        return sortDirection === 'asc'
          ? a.totalHours - b.totalHours
          : b.totalHours - a.totalHours;
      } else {
        // Por defecto, ordenar por fecha de la entrada más reciente
        const lastEntryA = a.entries.sort((x, y) => 
          new Date(y.date).getTime() - new Date(x.date).getTime()
        )[0]?.date || new Date(0);
        
        const lastEntryB = b.entries.sort((x, y) => 
          new Date(y.date).getTime() - new Date(x.date).getTime()
        )[0]?.date || new Date(0);
        
        return sortDirection === 'asc'
          ? new Date(lastEntryA).getTime() - new Date(lastEntryB).getTime()
          : new Date(lastEntryB).getTime() - new Date(lastEntryA).getTime();
      }
    });
  }, [calculatedHours, sortField, sortDirection]);

  // Detalles del empleado seleccionado
  const selectedEmployeeDetails = useMemo(() => {
    if (!selectedEmployeeId) return null;
    return sortedData.find(employee => employee.id === selectedEmployeeId) || null;
  }, [selectedEmployeeId, sortedData]);

  // Manejar cambio de ordenamiento
  const handleSort = (field: 'employee' | 'date' | 'totalHours') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Formatear horas
  const formatHours = (hours: number): string => {
    return hours.toFixed(2);
  };

  // Formatear fecha
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Manejar cambio de configuración
  const handleConfigChange = (configId: string) => {
    setSelectedConfig(configId);
  };

  // Exportar datos
  const handleExportEmployee = (employeeId: string, format: 'excel' | 'pdf') => {
    const employee = calculatedHours.find(e => e.id === employeeId);
    if (!employee) return;
    
    alert(`Exportando datos de ${employee.name} en formato ${format.toUpperCase()}`);
  };

  return (
    <ReportLayout
      title="Consolidado de Horas por Día"
      description="Reporte detallado de horas trabajadas por empleado con configuración personalizable"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      {/* Selección de configuración */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              Configuración de Horas
            </h3>
            <div className="flex flex-wrap gap-2">
              {hoursConfigs.map(config => (
                <button
                  key={config.id}
                  type="button"
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    selectedConfig === config.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleConfigChange(config.id)}
                >
                  {config.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowConfigModal(true)}
            >
              <Sliders className="h-4 w-4 mr-2" />
              Ajustar Configuración
            </button>
          </div>
        </div>
        
        {/* Mostrar detalles de la configuración actual */}
        {currentConfig && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">{currentConfig.name} - {currentConfig.description}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <span className="text-xs text-gray-500">Horas regulares:</span>
                <p className="text-sm font-medium">{currentConfig.regularHoursLimit} hrs</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Extra:</span>
                <p className="text-sm font-medium">+{currentConfig.extraHoursRate}%</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Sábado tarde:</span>
                <p className="text-sm font-medium">+{currentConfig.saturdayAfternoonRate}%</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Domingo:</span>
                <p className="text-sm font-medium">+{currentConfig.sundayRate}%</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Festivo:</span>
                <p className="text-sm font-medium">+{currentConfig.holidayRate}%</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Nocturnas:</span>
                <p className="text-sm font-medium">+{currentConfig.nightHoursRate}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
  
      <div className="flex flex-col md:flex-row">
        {/* Lista de empleados con resumen */}
        <div className={`${selectedEmployeeDetails ? 'md:w-2/3' : 'w-full'} overflow-x-auto transition-all duration-300`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('employee')}
                >
                  <div className="flex items-center">
                    Empleado
                    {sortField === 'employee' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reg.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Extra
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sáb.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dom.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fest.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Noct.
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalHours')}
                >
                  <div className="flex items-center">
                    Total
                    {sortField === 'totalHours' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((employee) => (
                <tr 
                  key={employee.id}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedEmployeeId === employee.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedEmployeeId(selectedEmployeeId === employee.id ? null : employee.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                      {employee.position && (
                        <div className="text-sm text-gray-500">
                          {employee.position}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(employee.regularHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(employee.extraHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(employee.saturdayAfternoonHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(employee.sundayHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(employee.holidayHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(employee.nightHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {formatHours(employee.totalHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleExportEmployee(employee.id, 'excel')}
                      >
                        <FileSpreadsheet className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleExportEmployee(employee.id, 'pdf')}
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {sortedData.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No hay datos para mostrar con los filtros seleccionados.
            </div>
          )}
        </div>
        
        {/* Detalle del empleado seleccionado */}
        {selectedEmployeeDetails && (
          <div className="md:w-1/3 md:ml-6 mt-6 md:mt-0 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalle por Día: {selectedEmployeeDetails.name}
              </h2>
            </div>
            
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entrada
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salida
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedEmployeeDetails.entries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(entry.date)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {entry.startTime}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {entry.endTime}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                          {formatHours(entry.totalMinutes / 60)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {entry.isHoliday ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              Festivo
                            </span>
                          ) : entry.isSunday ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                              Domingo
                            </span>
                          ) : entry.isSaturday ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Sábado
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Regular
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              
              {selectedEmployeeDetails.entries.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No hay entradas para mostrar en el período seleccionado.
                </div>
              )}
            </div>
            
            {/* Resumen del empleado */}
            {selectedEmployeeDetails.entries.length > 0 && (
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Resumen</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs text-gray-500">Total Horas Regulares</h4>
                    <p className="text-sm font-medium">{formatHours(selectedEmployeeDetails.regularHours)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Total Horas Extra</h4>
                    <p className="text-sm font-medium">{formatHours(selectedEmployeeDetails.extraHours)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Total Sábados</h4>
                    <p className="text-sm font-medium">{formatHours(selectedEmployeeDetails.saturdayAfternoonHours)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Total Domingos</h4>
                    <p className="text-sm font-medium">{formatHours(selectedEmployeeDetails.sundayHours)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Total Festivos</h4>
                    <p className="text-sm font-medium">{formatHours(selectedEmployeeDetails.holidayHours)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Total Nocturnas</h4>
                    <p className="text-sm font-medium">{formatHours(selectedEmployeeDetails.nightHours)}</p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-700">Total Horas</h4>
                    <p className="text-lg font-semibold text-blue-600">{formatHours(selectedEmployeeDetails.totalHours)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
  
      {/* Modal para configuración de tarifas - se mostraría si showConfigModal es true */}
      {showConfigModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
  
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Ajustar Configuración de Horas
                    </h3>
                    <div className="mt-4">
                      {/* Aquí iría el formulario de configuración */}
                      <p className="text-sm text-gray-500">
                        Esta funcionalidad permitiría ajustar las tarifas y límites para el cálculo de horas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowConfigModal(false)}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowConfigModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ReportLayout>
  );
}

export default DailyHoursConsolidatedReport;