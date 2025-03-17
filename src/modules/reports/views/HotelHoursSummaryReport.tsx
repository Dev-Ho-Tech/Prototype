/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import {  FileText, FileSpreadsheet, Printer } from 'lucide-react';

const HotelHoursSummaryReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    filteredHotelHoursData, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'hotel-hours-summary' });

  const [sortField, setSortField] = useState<'employee' | 'regularHours' | 'extraHours' | 'nightHours' | 'holidayHours' | 'sundayHours' | 'totalHours'>('totalHours');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [groupBy, setGroupBy] = useState<'employee' | 'department' | 'none'>('employee');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Procesar los datos para agruparlos por empleado o departamento
  const summarizedData = useMemo(() => {
    if (groupBy === 'none') {
      // Sumatorio global sin agrupación
      const summary = filteredHotelHoursData.reduce(
        (acc, entry) => {
          acc.regularHours += entry.regularHours;
          acc.extraHours += entry.extraHours;
          acc.nightHours += entry.nightHours;
          acc.holidayHours += entry.holidayHours;
          // Asumimos que tenemos que calcular horas dominicales
          const date = new Date(entry.date);
          const isSunday = date.getDay() === 0;
          acc.sundayHours += isSunday ? entry.regularHours : 0;
          acc.totalHours += entry.totalHours;
          return acc;
        },
        { 
          id: 'total', 
          name: 'Total General', 
          department: 'Todos', 
          regularHours: 0, 
          extraHours: 0, 
          nightHours: 0, 
          holidayHours: 0, 
          sundayHours: 0, 
          totalHours: 0 
        }
      );
      
      return [summary];
    } else if (groupBy === 'employee') {
      // Agrupación por empleado
      const employeeMap = new Map();
      
      filteredHotelHoursData.forEach(entry => {
        const employee = employees.find(e => e.id === entry.employeeId);
        if (!employee) return;
        
        if (!employeeMap.has(entry.employeeId)) {
          employeeMap.set(entry.employeeId, {
            id: employee.id,
            name: `${employee.name} ${employee.lastName}`,
            department: employee.department || 'No asignado',
            regularHours: 0,
            extraHours: 0,
            nightHours: 0,
            holidayHours: 0,
            sundayHours: 0,
            totalHours: 0
          });
        }
        
        const data = employeeMap.get(entry.employeeId);
        data.regularHours += entry.regularHours;
        data.extraHours += entry.extraHours;
        data.nightHours += entry.nightHours;
        data.holidayHours += entry.holidayHours;
        
        // Calcular horas dominicales
        const date = new Date(entry.date);
        const isSunday = date.getDay() === 0;
        data.sundayHours += isSunday ? entry.regularHours : 0;
        
        data.totalHours += entry.totalHours;
      });
      
      return Array.from(employeeMap.values());
    } else {
      // Agrupación por departamento
      const departmentMap = new Map();
      
      filteredHotelHoursData.forEach(entry => {
        const employee = employees.find(e => e.id === entry.employeeId);
        if (!employee) return;
        
        const department = employee.department || 'No asignado';
        
        if (!departmentMap.has(department)) {
          departmentMap.set(department, {
            id: department,
            name: department,
            department: department,
            regularHours: 0,
            extraHours: 0,
            nightHours: 0,
            holidayHours: 0,
            sundayHours: 0,
            totalHours: 0
          });
        }
        
        const data = departmentMap.get(department);
        data.regularHours += entry.regularHours;
        data.extraHours += entry.extraHours;
        data.nightHours += entry.nightHours;
        data.holidayHours += entry.holidayHours;
        
        // Calcular horas dominicales
        const date = new Date(entry.date);
        const isSunday = date.getDay() === 0;
        data.sundayHours += isSunday ? entry.regularHours : 0;
        
        data.totalHours += entry.totalHours;
      });
      
      return Array.from(departmentMap.values());
    }
  }, [filteredHotelHoursData, employees, groupBy]);

  // Ordenar datos
  const sortedData = useMemo(() => {
    return [...summarizedData].sort((a, b) => {
      if (sortField === 'employee') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc'
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      }
    });
  }, [summarizedData, sortField, sortDirection]);

  // Manejar cambio de ordenamiento
  const handleSort = (field: 'employee' | 'regularHours' | 'extraHours' | 'nightHours' | 'holidayHours' | 'sundayHours' | 'totalHours') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Obtener detalles de un empleado específico
  const selectedEmployeeDetails = useMemo(() => {
    if (!selectedEmployeeId) return null;
    
    // Filtrar entradas solo para el empleado seleccionado
    const employeeEntries = filteredHotelHoursData.filter(
      entry => entry.employeeId === selectedEmployeeId
    );
    
    // Agrupar por fecha
    interface DailyEntry {
      date: Date;
      regularHours: number;
      extraHours: number;
      nightHours: number;
      holidayHours: number;
      sundayHours: number;
      totalHours: number;
    }

    const entriesByDate = employeeEntries.reduce<Record<string, DailyEntry>>((acc, entry) => {
      const dateString = new Date(entry.date).toISOString().split('T')[0];
      
      if (!acc[dateString]) {
        acc[dateString] = {
          date: new Date(entry.date),
          regularHours: 0,
          extraHours: 0,
          nightHours: 0,
          holidayHours: 0,
          sundayHours: 0,
          totalHours: 0
        };
      }
      
      acc[dateString].regularHours += entry.regularHours;
      acc[dateString].extraHours += entry.extraHours;
      acc[dateString].nightHours += entry.nightHours;
      acc[dateString].holidayHours += entry.holidayHours;
      
      // Calcular horas dominicales
      const date = new Date(entry.date);
      const isSunday = date.getDay() === 0;
      acc[dateString].sundayHours += isSunday ? entry.regularHours : 0;
      
      acc[dateString].totalHours += entry.totalHours;
      
      return acc;
    }, {});
    
    // Convertir a array ordenado por fecha
    const sortedEntries = Object.values(entriesByDate).sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // Encontrar info del empleado
    const employee = employees.find(e => e.id === selectedEmployeeId);
    
    return {
      employee,
      entries: sortedEntries
    };
  }, [selectedEmployeeId, filteredHotelHoursData, employees]);

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

  // Manejar cambio de agrupación
  const handleGroupByChange = (value: 'employee' | 'department' | 'none') => {
    setGroupBy(value);
    setSelectedEmployeeId(null);
  };

  // Calcular totales generales
  const totals = useMemo(() => {
    return sortedData.reduce(
      (acc, curr) => {
        acc.regularHours += curr.regularHours;
        acc.extraHours += curr.extraHours;
        acc.nightHours += curr.nightHours;
        acc.holidayHours += curr.holidayHours;
        acc.sundayHours += curr.sundayHours;
        acc.totalHours += curr.totalHours;
        return acc;
      },
      { regularHours: 0, extraHours: 0, nightHours: 0, holidayHours: 0, sundayHours: 0, totalHours: 0 }
    );
  }, [sortedData]);

  // Manejar exportación
  const handleExportItem = (id: string, format: 'excel' | 'pdf' | 'txt') => {
    const item = sortedData.find(d => d.id === id);
    if (!item) return;
    
    alert(`Exportando datos de ${item.name} en formato ${format.toUpperCase()}`);
  };

  return (
    <ReportLayout
      title="Hotelería - Sumatorio"
      description="Reporte consolidado de horas trabajadas por empleado o departamento en el período seleccionado"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      {/* Controles de agrupación */}
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-sm font-medium text-gray-700 mr-3">Agrupar por:</span>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                groupBy === 'employee'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleGroupByChange('employee')}
            >
              Empleado
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                groupBy === 'department'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleGroupByChange('department')}
            >
              Departamento
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                groupBy === 'none'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleGroupByChange('none')}
            >
              Total General
            </button>
          </div>
        </div>
        
        <div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => exportReport('pdf')}
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Reporte
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Tabla principal */}
        <div className={`${selectedEmployeeDetails ? 'md:w-2/3' : 'w-full'} overflow-x-auto transition-all duration-300`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('employee')}
                >
                  <div className="flex items-center">
                    {groupBy === 'employee' ? 'Empleado' : groupBy === 'department' ? 'Departamento' : 'Total'}
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
                  onClick={() => handleSort('sundayHours')}
                >
                  <div className="flex items-center">
                    Horas Dominicales
                    {sortField === 'sundayHours' && (
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
              {sortedData.map((item) => (
                <tr 
                  key={item.id}
                  className={`
                    hover:bg-gray-50 
                    ${groupBy === 'employee' ? 'cursor-pointer' : ''}
                    ${selectedEmployeeId === item.id ? 'bg-blue-50' : ''}
                  `}
                  onClick={() => {
                    if (groupBy === 'employee' && item.id !== 'total') {
                      setSelectedEmployeeId(selectedEmployeeId === item.id ? null : item.id);
                    }
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      {groupBy === 'employee' && item.department && (
                        <div className="text-sm text-gray-500">
                          {item.department}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(item.regularHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(item.extraHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(item.nightHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(item.holidayHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatHours(item.sundayHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {formatHours(item.totalHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2" onClick={(e) => {
                      e.stopPropagation();
                    }}>
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleExportItem(item.id, 'excel')}
                      >
                        <FileSpreadsheet className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleExportItem(item.id, 'pdf')}
                      >
                        <FileText className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Fila de totales generales */}
              {(groupBy === 'employee' || groupBy === 'department') && (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatHours(totals.sundayHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {formatHours(totals.totalHours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>
              )}
            </tbody>
          </table>

          {sortedData.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No hay datos para mostrar con los filtros seleccionados.
            </div>
          )}
        </div>
        
        {/* Detalles por fecha para el empleado seleccionado */}
        {selectedEmployeeDetails && (
          <div className="md:w-1/3 md:ml-6 mt-6 md:mt-0 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalle por Fecha: {selectedEmployeeDetails.employee?.name} {selectedEmployeeDetails.employee?.lastName}
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
                      Regular
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Extra
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Noche
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedEmployeeDetails.entries.map((entry: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatHours(entry.regularHours)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatHours(entry.extraHours)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatHours(entry.nightHours)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                        {formatHours(entry.totalHours)}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Horas Regulares</h3>
                    <p className="text-lg font-medium text-gray-900">
                      {formatHours(selectedEmployeeDetails.entries.reduce((total: number, entry: any) => total + entry.regularHours, 0))}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Horas Extra</h3>
                    <p className="text-lg font-medium text-gray-900">
                      {formatHours(selectedEmployeeDetails.entries.reduce((total: number, entry: any) => total + entry.extraHours, 0))}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Horas Nocturnas</h3>
                    <p className="text-lg font-medium text-gray-900">
                      {formatHours(selectedEmployeeDetails.entries.reduce((total: number, entry: any) => total + entry.nightHours, 0))}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Horas Trabajadas</h3>
                    <p className="text-lg font-medium text-blue-600">
                      {formatHours(selectedEmployeeDetails.entries.reduce((total: number, entry: any) => total + entry.totalHours, 0))}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ReportLayout>
  );
};

export default HotelHoursSummaryReport;