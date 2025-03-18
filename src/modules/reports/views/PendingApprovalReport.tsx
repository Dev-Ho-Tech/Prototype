import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import { AlertTriangle, CheckCircle, XCircle, Clock, Calendar, User } from 'lucide-react';

interface PendingTimeEntry {
  id: string;
  employeeId: string;
  date: Date;
  hours: number;
  type: 'regular' | 'extra' | 'night' | 'holiday';
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
  approvalDeadline: Date;
  requestedBy: string;
  comments?: string;
}

// Datos de ejemplo
const mockPendingTimeData: PendingTimeEntry[] = [
  {
    id: '1',
    employeeId: '1',
    date: new Date('2025-03-10'),
    hours: 2.5,
    type: 'extra',
    status: 'pending',
    requestDate: new Date('2025-03-11T09:30:00'),
    approvalDeadline: new Date('2025-03-18T09:30:00'),
    requestedBy: 'Juan Pérez',
    comments: 'Trabajo extra para completar entrega de proyecto'
  },
  {
    id: '2',
    employeeId: '2',
    date: new Date('2025-03-12'),
    hours: 4,
    type: 'holiday',
    status: 'pending',
    requestDate: new Date('2025-03-13T10:15:00'),
    approvalDeadline: new Date('2025-03-20T10:15:00'),
    requestedBy: 'María López'
  },
  {
    id: '3',
    employeeId: '3',
    date: new Date('2025-03-08'),
    hours: 3,
    type: 'night',
    status: 'pending',
    requestDate: new Date('2025-03-09T14:45:00'),
    approvalDeadline: new Date('2025-03-16T14:45:00'),
    requestedBy: 'Carlos Rodríguez',
    comments: 'Soporte nocturno para implementación'
  },
  {
    id: '4',
    employeeId: '4',
    date: new Date('2025-03-05'),
    hours: 1.5,
    type: 'extra',
    status: 'pending',
    requestDate: new Date('2025-03-06T16:20:00'),
    approvalDeadline: new Date('2025-03-13T16:20:00'),
    requestedBy: 'Ana Martínez'
  },
  {
    id: '5',
    employeeId: '5',
    date: new Date('2025-03-15'),
    hours: 6,
    type: 'regular',
    status: 'pending',
    requestDate: new Date('2025-03-16T08:30:00'),
    approvalDeadline: new Date('2025-03-23T08:30:00'),
    requestedBy: 'Roberto Sánchez',
    comments: 'Trabajo sábado por mantenimiento'
  }
];

const PendingApprovalReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'pending-approval' });

  const [sortField, setSortField] = useState<'employee' | 'date' | 'requestDate' | 'deadline' | 'hours'>('deadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'regular' | 'extra' | 'night' | 'holiday'>('all');

  // Filtrar datos según los criterios
  const filteredData = useMemo(() => {
    return mockPendingTimeData.filter(entry => {
      // Filtro por fecha
      const entryDate = new Date(entry.date);
      const inDateRange = entryDate >= filter.dateRange.startDate && entryDate <= filter.dateRange.endDate;
      
      // Filtro por empleado
      const employeeIncluded = filter.employees && filter.employees.length > 0 
        ? filter.employees.includes(entry.employeeId)
        : true;
      
      // Filtro por tipo
      const typeIncluded = typeFilter === 'all' || entry.type === typeFilter;
      
      return inDateRange && employeeIncluded && typeIncluded && entry.status === 'pending';
    });
  }, [filter, typeFilter]);

  // Ordenar datos
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortField === 'employee') {
        const empA = employees.find(e => e.id === a.employeeId);
        const empB = employees.find(e => e.id === b.employeeId);
        
        if (empA && empB) {
          const nameA = `${empA.name} ${empA.lastName}`;
          const nameB = `${empB.name} ${empB.lastName}`;
          
          return sortDirection === 'asc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        }
        return 0;
      } else if (sortField === 'date') {
        return sortDirection === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === 'requestDate') {
        return sortDirection === 'asc'
          ? new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
          : new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
      } else if (sortField === 'deadline') {
        return sortDirection === 'asc'
          ? new Date(a.approvalDeadline).getTime() - new Date(b.approvalDeadline).getTime()
          : new Date(b.approvalDeadline).getTime() - new Date(a.approvalDeadline).getTime();
      } else if (sortField === 'hours') {
        return sortDirection === 'asc'
          ? a.hours - b.hours
          : b.hours - a.hours;
      }
      return 0;
    });
  }, [filteredData, sortField, sortDirection, employees]);

  // Obtener entrada seleccionada
  const selectedEntry = useMemo(() => {
    if (!selectedEntryId) return null;
    const entry = filteredData.find(e => e.id === selectedEntryId);
    if (!entry) return null;
    
    const employee = employees.find(e => e.id === entry.employeeId);
    return { ...entry, employee };
  }, [selectedEntryId, filteredData, employees]);

  // Manejar cambio de ordenamiento
  const handleSort = (field: 'employee' | 'date' | 'requestDate' | 'deadline' | 'hours') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Formatear fecha
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formatear fecha con hora
  const formatDateTime = (date: Date): string => {
    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Formatear horas
  const formatHours = (hours: number): string => {
    return hours.toFixed(1);
  };

  // Traducir tipo de horas
  const translateHoursType = (type: 'regular' | 'extra' | 'night' | 'holiday'): string => {
    const translations = {
      regular: 'Regulares',
      extra: 'Extra',
      night: 'Nocturnas',
      holiday: 'Festivas'
    };
    return translations[type];
  };

  // Obtener color para tipo de horas
  const getHoursTypeColor = (type: 'regular' | 'extra' | 'night' | 'holiday'): string => {
    const colors = {
      regular: 'bg-blue-100 text-blue-800',
      extra: 'bg-green-100 text-green-800',
      night: 'bg-purple-100 text-purple-800',
      holiday: 'bg-red-100 text-red-800'
    };
    return colors[type];
  };

  // Calcular estado de la aprobación
  const getApprovalStatus = (deadline: Date): { status: 'ontime' | 'urgent' | 'overdue', text: string } => {
    const now = new Date();
    const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining < 0) {
      return { status: 'overdue', text: 'Vencido' };
    } else if (daysRemaining <= 2) {
      return { status: 'urgent', text: 'Urgente' };
    } else {
      return { status: 'ontime', text: `${daysRemaining} días` };
    }
  };

  // Obtener color para estado de aprobación
  const getApprovalStatusColor = (status: 'ontime' | 'urgent' | 'overdue'): string => {
    const colors = {
      ontime: 'bg-green-100 text-green-800',
      urgent: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  // Calcular resumen de horas por tipo
  const hoursSummary = useMemo(() => {
    return filteredData.reduce((acc, entry) => {
      acc.total += entry.hours;
      acc[entry.type] += entry.hours;
      return acc;
    }, {
      regular: 0,
      extra: 0,
      night: 0,
      holiday: 0,
      total: 0
    });
  }, [filteredData]);

  // Manejar aprobación o rechazo
  const handleApproveReject = (entryId: string, action: 'approve' | 'reject') => {
    alert(`${action === 'approve' ? 'Aprobando' : 'Rechazando'} la solicitud ID: ${entryId}`);
    // Aquí iría la lógica real de aprobación/rechazo
    setSelectedEntryId(null);
  };

  return (
    <ReportLayout
      title="Tiempo Sin Aprobar"
      description="Horas pendientes de aprobación con plazos de vencimiento"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      {/* Resumen de horas pendientes */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 mb-1">Horas Regulares</h3>
          <p className="text-2xl font-bold text-blue-900">{formatHours(hoursSummary.regular)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-1">Horas Extra</h3>
          <p className="text-2xl font-bold text-green-900">{formatHours(hoursSummary.extra)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700 mb-1">Horas Nocturnas</h3>
          <p className="text-2xl font-bold text-purple-900">{formatHours(hoursSummary.night)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-700 mb-1">Horas Festivas</h3>
          <p className="text-2xl font-bold text-red-900">{formatHours(hoursSummary.holiday)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Total Pendiente</h3>
          <p className="text-2xl font-bold text-gray-900">{formatHours(hoursSummary.total)}</p>
        </div>
      </div>

      {/* Filtros de tipo */}
      <div className="mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded-l-md border ${
              typeFilter === 'all'
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTypeFilter('all')}
          >
            Todos
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium border-t border-b ${
              typeFilter === 'regular'
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTypeFilter('regular')}
          >
            Regulares
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium border-t border-b ${
              typeFilter === 'extra'
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTypeFilter('extra')}
          >
            Extra
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium border-t border-b ${
              typeFilter === 'night'
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTypeFilter('night')}
          >
            Nocturnas
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded-r-md border ${
              typeFilter === 'holiday'
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTypeFilter('holiday')}
          >
            Festivas
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Lista de horas pendientes */}
        <div className={`${selectedEntry ? 'md:w-2/3' : 'w-full'} overflow-x-auto transition-all duration-300`}>
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
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Fecha
                    {sortField === 'date' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('hours')}
                >
                  <div className="flex items-center">
                    Horas
                    {sortField === 'hours' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('requestDate')}
                >
                  <div className="flex items-center">
                    Solicitado
                    {sortField === 'requestDate' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('deadline')}
                >
                  <div className="flex items-center">
                    Plazo
                    {sortField === 'deadline' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((entry) => {
                const employee = employees.find(e => e.id === entry.employeeId);
                const approvalStatus = getApprovalStatus(entry.approvalDeadline);
                
                return (
                  <tr 
                    key={entry.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selectedEntryId === entry.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedEntryId(selectedEntryId === entry.id ? null : entry.id)}
                  >
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
                      {formatDate(entry.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getHoursTypeColor(entry.type)}`}>
                        {translateHoursType(entry.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {formatHours(entry.hours)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(entry.requestDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getApprovalStatusColor(approvalStatus.status)}`}>
                        {approvalStatus.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {sortedData.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No hay horas pendientes de aprobación con los filtros seleccionados.
            </div>
          )}
        </div>
        
        {/* Detalles de la entrada seleccionada */}
        {selectedEntry && (
          <div className="md:w-1/3 md:ml-6 mt-6 md:mt-0 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalle de Horas Pendientes
              </h2>
            </div>
            
            <div className="p-4">
              {/* Información del empleado */}
              {selectedEntry.employee && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {selectedEntry.employee.name} {selectedEntry.employee.lastName}
                      </h3>
                      {selectedEntry.employee.position && (
                        <p className="text-sm text-gray-500">
                          {selectedEntry.employee.position}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Información de horas */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs text-gray-500">Fecha de trabajo</h4>
                    <p className="text-sm font-medium flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {formatDate(selectedEntry.date)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500">Horas reportadas</h4>
                    <p className="text-sm font-medium flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      {formatHours(selectedEntry.hours)} horas
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs text-gray-500">Tipo de horas</h4>
                  <p className="mt-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getHoursTypeColor(selectedEntry.type)}`}>
                      {translateHoursType(selectedEntry.type)}
                    </span>
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-xs text-gray-500">Solicitado por</h4>
                  <p className="text-sm font-medium">{selectedEntry.requestedBy}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDateTime(selectedEntry.requestDate)}</p>
                </div>
                
                <div>
                  <h4 className="text-xs text-gray-500">Plazo de aprobación</h4>
                  <div className="flex items-center mt-1">
                    <AlertTriangle className={`h-4 w-4 mr-1 ${
                      getApprovalStatus(selectedEntry.approvalDeadline).status === 'overdue' ? 'text-red-500' :
                      getApprovalStatus(selectedEntry.approvalDeadline).status === 'urgent' ? 'text-yellow-500' : 
                      'text-green-500'
                    }`} />
                    <p className="text-sm font-medium">{formatDateTime(selectedEntry.approvalDeadline)}</p>
                  </div>
                </div>
                
                {selectedEntry.comments && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-xs text-gray-500">Comentarios</h4>
                    <p className="text-sm mt-1">{selectedEntry.comments}</p>
                  </div>
                )}
              </div>
              
              {/* Acciones */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-3">
                <button
                  type="button"
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => handleApproveReject(selectedEntry.id, 'approve')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprobar
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleApproveReject(selectedEntry.id, 'reject')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ReportLayout>
  );
};

export default PendingApprovalReport;