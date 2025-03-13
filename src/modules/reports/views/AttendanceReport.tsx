import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';

const AttendanceReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    filteredAttendanceData, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'attendance' });

  const [sortBy, setSortBy] = useState<'date' | 'employee' | 'status'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Obtener empleados a partir de IDs
  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  // Ordenar datos de asistencia
  const sortedData = useMemo(() => {
    return [...filteredAttendanceData].sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'employee') {
        const empA = getEmployeeById(a.employeeId);
        const empB = getEmployeeById(b.employeeId);
        
        if (empA && empB) {
          const nameA = `${empA.name} ${empA.lastName}`;
          const nameB = `${empB.name} ${empB.lastName}`;
          
          return sortDirection === 'asc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        }
        return 0;
      } else if (sortBy === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
  }, [filteredAttendanceData, sortBy, sortDirection, employees]);

  // Manejar cambio de ordenamiento
  const handleSort = (field: 'date' | 'employee' | 'status') => {
    if (field === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  // Formatear fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Formatear hora
  const formatTime = (date?: Date) => {
    if (!date) return '—';
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Traducir estado
  const translateStatus = (status: 'present' | 'absent' | 'late' | 'excused') => {
    const translations = {
      present: 'Presente',
      absent: 'Ausente',
      late: 'Tardanza',
      excused: 'Justificado'
    };
    return translations[status];
  };

  // Obtener color según estado
  const getStatusColor = (status: 'present' | 'absent' | 'late' | 'excused') => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
      excused: 'bg-blue-100 text-blue-800'
    };
    return colors[status];
  };

  return (
    <ReportLayout
      title="Marcajes de Asistencia"
      description="Registro de asistencia de los empleados con hora de entrada y salida"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Fecha
                  {sortBy === 'date' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('employee')}
              >
                <div className="flex items-center">
                  Empleado
                  {sortBy === 'employee' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Estado
                  {sortBy === 'status' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entrada
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salida
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((attendance, index) => {
              const employee = getEmployeeById(attendance.employeeId);
              
              return (
                <tr key={`${attendance.employeeId}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(attendance.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name} {employee.lastName}
                        </div>
                        {employee.position && (
                          <div className="text-sm text-gray-500">
                            {employee.position}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Empleado no encontrado</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(attendance.status)}`}>
                      {translateStatus(attendance.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTime(attendance.checkIn)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTime(attendance.checkOut)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No hay datos de asistencia para mostrar con los filtros seleccionados.
        </div>
      )}
    </ReportLayout>
  );
};

export default AttendanceReport;