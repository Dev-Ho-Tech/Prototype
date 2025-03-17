import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import { Employee } from '../interfaces/Employee';
import { HotelHoursData } from '../interfaces/Report';
import { ChevronLeft, FileText, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmployeeHoursData {
  employee: Employee;
  regularHours: number;
  extraHours: number;
  nightHours: number;
  holidayHours: number;
  totalHours: number;
  entries: HotelHoursData[];
}

const HotelHoursReport: React.FC = () => {
  const navigate = useNavigate();
  const { 
    employees, 
    filter, 
    filteredHotelHoursData, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'hotel-hours' });

  const [sortField, setSortField] = useState<keyof EmployeeHoursData>('totalHours');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Procesar los datos para agruparlos por empleado
  const employeesHoursData = useMemo(() => {
    const employeeMap = new Map<string, EmployeeHoursData>();

    // Inicializar mapa de empleados
    employees.forEach(employee => {
      employeeMap.set(employee.id, {
        employee,
        regularHours: 0,
        extraHours: 0,
        nightHours: 0,
        holidayHours: 0,
        totalHours: 0,
        entries: []
      });
    });

    // Acumular horas por empleado
    filteredHotelHoursData.forEach(entry => {
      const employeeData = employeeMap.get(entry.employeeId);
      
      if (employeeData) {
        employeeData.regularHours += entry.regularHours;
        employeeData.extraHours += entry.extraHours;
        employeeData.nightHours += entry.nightHours;
        employeeData.holidayHours += entry.holidayHours;
        employeeData.totalHours += entry.totalHours;
        employeeData.entries.push(entry);
      }
    });

    return Array.from(employeeMap.values())
      .filter(data => data.entries.length > 0)
      .sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        
        if (sortField === 'employee') {
          const nameA = `${a.employee.name} ${a.employee.lastName}`;
          const nameB = `${b.employee.name} ${b.employee.lastName}`;
          return sortDirection === 'asc' 
            ? nameA.localeCompare(nameB) 
            : nameB.localeCompare(nameA);
        } else {
          return sortDirection === 'asc' 
            ? (fieldA as number) - (fieldB as number) 
            : (fieldB as number) - (fieldA as number);
        }
      });
  }, [employees, filteredHotelHoursData, sortField, sortDirection]);

  const handleSort = (field: keyof EmployeeHoursData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Calcular totales
  const totals = useMemo(() => {
    return employeesHoursData.reduce(
      (acc, curr) => {
        acc.regularHours += curr.regularHours;
        acc.extraHours += curr.extraHours;
        acc.nightHours += curr.nightHours;
        acc.holidayHours += curr.holidayHours;
        acc.totalHours += curr.totalHours;
        return acc;
      },
      { regularHours: 0, extraHours: 0, nightHours: 0, holidayHours: 0, totalHours: 0 }
    );
  }, [employeesHoursData]);

  const formatHours = (hours: number): string => {
    return hours.toFixed(2);
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Obtener los datos del empleado seleccionado
  const selectedEmployeeData = useMemo(() => {
    if (!selectedEmployeeId) return null;
    return employeesHoursData.find(data => data.employee.id === selectedEmployeeId) || null;
  }, [selectedEmployeeId, employeesHoursData]);

  // Manejar exportación de datos por empleado
  const handleExportEmployee = (employeeId: string, format: 'excel' | 'pdf' | 'txt') => {
    const employee = employeesHoursData.find(data => data.employee.id === employeeId);
    if (!employee) return;
    
    const fullName = `${employee.employee.name} ${employee.employee.lastName}`;
    alert(`Exportando datos de ${fullName} en formato ${format.toUpperCase()}`);
    // Aquí iría la lógica real de exportación
  };

  // Función para regresar a la pantalla de selección de reportes
  const handleGoBack = () => {
    navigate('/reports/attendance');
  };

  return (
    <ReportLayout
      title={
        <div className="flex items-center">
          <button 
            onClick={handleGoBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hotelería - Horas Trabajadas</h1>
          </div>
        </div>
      }
      description="Reporte detallado de horas trabajadas por empleados en el hotel"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      <div className="flex flex-col md:flex-row">
        {/* Lista de empleados */}
        <div className={`${selectedEmployeeId ? 'md:w-2/5' : 'w-full'} overflow-x-auto transition-all duration-300`}>
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
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('regularHours')}
                >
                  <div className="flex items-center">
                    Horas Regulares
                    {sortField === 'regularHours' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('extraHours')}
                >
                  <div className="flex items-center">
                    Horas Extra
                    {sortField === 'extraHours' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('nightHours')}
                >
                  <div className="flex items-center">
                    Horas Nocturnas
                    {sortField === 'nightHours' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('holidayHours')}
                >
                  <div className="flex items-center">
                    Horas Festivas
                    {sortField === 'holidayHours' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalHours')}
                >
                  <div className="flex items-center">
                    Total Horas
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
              {employeesHoursData.map((data) => (
                <tr 
                  key={data.employee.id}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedEmployeeId === data.employee.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedEmployeeId(data.employee.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {data.employee.name} {data.employee.lastName}
                    </div>
                    {data.employee.position && (
                      <div className="text-sm text-gray-500">
                        {data.employee.position}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(data.regularHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(data.extraHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(data.nightHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(data.holidayHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {formatHours(data.totalHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleExportEmployee(data.employee.id, 'excel')}
                      >
                        <FileSpreadsheet className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleExportEmployee(data.employee.id, 'pdf')}
                      >
                        <FileText className="h-5 w-5 text-red-500" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleExportEmployee(data.employee.id, 'txt')}
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Fila de totales */}
              <tr className="bg-gray-50 font-medium">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  TOTALES
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatHours(totals.regularHours)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatHours(totals.extraHours)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatHours(totals.nightHours)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatHours(totals.holidayHours)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {formatHours(totals.totalHours)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
            </tbody>
          </table>

          {employeesHoursData.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No hay datos para mostrar con los filtros seleccionados.
            </div>
          )}
        </div>
        
        {/* Vista detallada tipo Excel */}
        {selectedEmployeeData && (
          <div className="md:w-3/5 border-l border-gray-200 overflow-x-auto mt-4 md:mt-0">
            <div className="bg-gray-100 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalle de {selectedEmployeeData.employee.name} {selectedEmployeeData.employee.lastName}
              </h2>
            </div>
            
            {/* Vista tipo Excel */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border-collapse">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">A</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">B</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">C</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">D</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">E</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">F</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">G</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-200">H</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Fila 1: Encabezado */}
                  <tr>
                    <td className="px-4 py-2 text-center text-sm border border-gray-200 bg-gray-50">1</td>
                    <td colSpan={7} className="px-4 py-2 text-center text-sm font-semibold border border-gray-200">
                      Ho-Tech
                    </td>
                  </tr>
                  
                  {/* Fila 2: Información del empleado */}
                  <tr>
                    <td className="px-4 py-2 text-center text-sm border border-gray-200 bg-gray-50">2</td>
                    <td colSpan={3} className="px-4 py-2 text-sm border border-gray-200 font-semibold">
                      Empleado: {selectedEmployeeData.employee.name} {selectedEmployeeData.employee.lastName}
                    </td>
                    <td colSpan={4} className="px-4 py-2 text-sm border border-gray-200">
                      {selectedEmployeeData.employee.position || 'No especificado'}
                    </td>
                  </tr>
                  
                  {/* Fila 3: Encabezados de columnas */}
                  <tr>
                    <td className="px-4 py-2 text-center text-sm border border-gray-200 bg-gray-50">3</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-blue-100">Empleado</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-blue-100">Fecha</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-blue-100">Regular</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-blue-100">Nocturna</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-blue-100">Extra</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-blue-100">Feriado</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-blue-100">Total</td>
                  </tr>
                  
                  {/* Filas de datos */}
                  {selectedEmployeeData.entries.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-center text-sm border border-gray-200 bg-gray-50">{index + 4}</td>
                      <td className="px-4 py-2 text-sm border border-gray-200">
                        {selectedEmployeeData.employee.name} {selectedEmployeeData.employee.lastName}
                      </td>
                      <td className="px-4 py-2 text-sm border border-gray-200">{formatDate(entry.date)}</td>
                      <td className="px-4 py-2 text-sm border border-gray-200">{formatHours(entry.regularHours)} hrs</td>
                      <td className="px-4 py-2 text-sm border border-gray-200">{formatHours(entry.nightHours)} hrs</td>
                      <td className="px-4 py-2 text-sm border border-gray-200">{formatHours(entry.extraHours)} hrs</td>
                      <td className="px-4 py-2 text-sm border border-gray-200">{formatHours(entry.holidayHours)} hrs</td>
                      <td className="px-4 py-2 text-sm font-semibold border border-gray-200">{formatHours(entry.totalHours)} hrs</td>
                    </tr>
                  ))}
                  
                  {/* Fila de totales */}
                  <tr>
                    <td className="px-4 py-2 text-center text-sm border border-gray-200 bg-gray-50">
                      {selectedEmployeeData.entries.length + 4}
                    </td>
                    <td colSpan={2} className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-gray-100">TOTALES</td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-gray-100">
                      {formatHours(selectedEmployeeData.regularHours)} hrs
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-gray-100">
                      {formatHours(selectedEmployeeData.nightHours)} hrs
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-gray-100">
                      {formatHours(selectedEmployeeData.extraHours)} hrs
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-gray-100">
                      {formatHours(selectedEmployeeData.holidayHours)} hrs
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold border border-gray-200 bg-gray-100 text-blue-700">
                      {formatHours(selectedEmployeeData.totalHours)} hrs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ReportLayout>
  );
};

export default HotelHoursReport;