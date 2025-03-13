import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';

const BiometricReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    filteredBiometricData, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'biometric' });

  const [sortBy, setSortBy] = useState<'date' | 'employee' | 'device' | 'verified'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Obtener empleados a partir de IDs
  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  // Ordenar datos biométricos
  const sortedData = useMemo(() => {
    return [...filteredBiometricData].sort((a, b) => {
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
      } else if (sortBy === 'device') {
        return sortDirection === 'asc'
          ? a.deviceId.localeCompare(b.deviceId)
          : b.deviceId.localeCompare(a.deviceId);
      } else if (sortBy === 'verified') {
        return sortDirection === 'asc'
          ? Number(a.verified) - Number(b.verified)
          : Number(b.verified) - Number(a.verified);
      }
      return 0;
    });
  }, [filteredBiometricData, sortBy, sortDirection, employees]);

  // Manejar cambio de ordenamiento
  const handleSort = (field: 'date' | 'employee' | 'device' | 'verified') => {
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

  // Agrupar datos por empleado para mostrar estadísticas
  const employeeStats = useMemo(() => {
    const stats = new Map();
    
    filteredBiometricData.forEach(entry => {
      if (!stats.has(entry.employeeId)) {
        stats.set(entry.employeeId, {
          employeeId: entry.employeeId,
          totalEntries: 0,
          verifiedEntries: 0,
          devices: new Set()
        });
      }
      
      const employeeStats = stats.get(entry.employeeId);
      employeeStats.totalEntries += 1;
      if (entry.verified) {
        employeeStats.verifiedEntries += 1;
      }
      employeeStats.devices.add(entry.deviceId);
    });
    
    return Array.from(stats.values()).map(stat => ({
      ...stat,
      verificationRate: (stat.verifiedEntries / stat.totalEntries) * 100,
      devices: Array.from(stat.devices)
    }));
  }, [filteredBiometricData]);

  return (
    <ReportLayout
      title="Personas con Biometría"
      description="Registro de marcajes biométricos y verificación de identidad"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      {/* Resumen de estadísticas */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Total Registros</h3>
          <p className="text-3xl font-bold text-blue-900">{filteredBiometricData.length}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-700 mb-2">Verificados</h3>
          <p className="text-3xl font-bold text-green-900">
            {filteredBiometricData.filter(d => d.verified).length}
            <span className="text-base ml-2">
              ({Math.round((filteredBiometricData.filter(d => d.verified).length / filteredBiometricData.length) * 100)}%)
            </span>
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-purple-700 mb-2">Dispositivos</h3>
          <p className="text-3xl font-bold text-purple-900">
            {new Set(filteredBiometricData.map(d => d.deviceId)).size}
          </p>
        </div>
      </div>

      {/* Lista de empleados con estadísticas */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estadísticas por Empleado</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Registros
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verificados
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasa de Verificación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispositivos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeStats.map(stat => {
                const employee = getEmployeeById(stat.employeeId);
                
                return (
                  <tr key={stat.employeeId} className="hover:bg-gray-50">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.totalEntries}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.verifiedEntries}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                          <div 
                            className={`h-full rounded-full ${
                              stat.verificationRate >= 90 ? 'bg-green-500' : 
                              stat.verificationRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${stat.verificationRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">
                          {Math.round(stat.verificationRate)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.devices.join(', ')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registro detallado */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Registro Detallado</h3>
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
                  onClick={() => handleSort('device')}
                >
                  <div className="flex items-center">
                    Dispositivo
                    {sortBy === 'device' && (
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
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('verified')}
                >
                  <div className="flex items-center">
                    Verificado
                    {sortBy === 'verified' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((entry, index) => {
                const employee = getEmployeeById(entry.employeeId);
                
                return (
                  <tr key={`${entry.employeeId}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(entry.date)}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.deviceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(entry.checkIn)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(entry.checkOut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {entry.verified ? 'Verificado' : 'No Verificado'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {sortedData.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No hay datos biométricos para mostrar con los filtros seleccionados.
        </div>
      )}
    </ReportLayout>
  );
};

export default BiometricReport;