import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import { Calendar, FileText, FileSpreadsheet } from 'lucide-react';

interface NoScheduleEvent {
  id: string;
  employeeId: string;
  eventType: 'vacation' | 'medical' | 'maternity' | 'paternity' | 'personal' | 'other';
  startDate: Date;
  endDate: Date;
  status: 'approved' | 'pending' | 'rejected';
  approvedBy?: string;
  notes?: string;
}

// Datos simulados para el ejemplo
const mockNoScheduleEvents: NoScheduleEvent[] = [
  {
    id: '1',
    employeeId: '1',
    eventType: 'vacation',
    startDate: new Date('2025-02-15'),
    endDate: new Date('2025-02-28'),
    status: 'approved',
    approvedBy: 'Juan Pérez',
    notes: 'Vacaciones anuales'
  },
  {
    id: '2',
    employeeId: '2',
    eventType: 'medical',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-03-10'),
    status: 'approved',
    approvedBy: 'María González',
    notes: 'Licencia médica por cirugía'
  },
  {
    id: '3',
    employeeId: '3',
    eventType: 'maternity',
    startDate: new Date('2025-01-10'),
    endDate: new Date('2025-04-10'),
    status: 'approved',
    approvedBy: 'Pedro Ramírez',
    notes: 'Licencia post natal'
  },
  {
    id: '4',
    employeeId: '4',
    eventType: 'personal',
    startDate: new Date('2025-03-15'),
    endDate: new Date('2025-03-16'),
    status: 'pending',
    notes: 'Asuntos personales'
  },
  {
    id: '5',
    employeeId: '5',
    eventType: 'paternity',
    startDate: new Date('2025-02-20'),
    endDate: new Date('2025-03-05'),
    status: 'approved',
    approvedBy: 'Ana Rodríguez',
    notes: 'Licencia por paternidad'
  }
];

const NoSchedulePayrollReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'no-schedule-payroll' });

  const [sortField, setSortField] = useState<'startDate' | 'endDate' | 'employee' | 'eventType' | 'status'>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Filtrar eventos por fecha y empleados seleccionados
  const filteredEvents = useMemo(() => {
    return mockNoScheduleEvents.filter(event => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);
      
      // Verificar si el evento se cruza con el rango de fechas del filtro
      const dateInRange = (
        (eventStartDate >= filter.dateRange.startDate && eventStartDate <= filter.dateRange.endDate) ||
        (eventEndDate >= filter.dateRange.startDate && eventEndDate <= filter.dateRange.endDate) ||
        (eventStartDate <= filter.dateRange.startDate && eventEndDate >= filter.dateRange.endDate)
      );
      
      // Verificar si el empleado está incluido en los filtros
      const employeeIncluded = filter.employees && filter.employees.length > 0 
        ? filter.employees.includes(event.employeeId)
        : true;
        
      return dateInRange && employeeIncluded;
    });
  }, [filter.dateRange.startDate, filter.dateRange.endDate, filter.employees]);

  // Ordenar eventos
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (sortField === 'startDate') {
        return sortDirection === 'asc'
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else if (sortField === 'endDate') {
        return sortDirection === 'asc'
          ? new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          : new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      } else if (sortField === 'employee') {
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
      } else if (sortField === 'eventType') {
        return sortDirection === 'asc'
          ? a.eventType.localeCompare(b.eventType)
          : b.eventType.localeCompare(a.eventType);
      } else if (sortField === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
  }, [filteredEvents, sortField, sortDirection, employees]);

  // Manejar cambio de ordenamiento
  const handleSort = (field: 'startDate' | 'endDate' | 'employee' | 'eventType' | 'status') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
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

  // Calcular duración en días
  const calculateDuration = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día final
    return diffDays;
  };

  // Traducir tipo de evento
  const translateEventType = (type: string) => {
    const translations: { [key: string]: string } = {
      'vacation': 'Vacaciones',
      'medical': 'Licencia Médica',
      'maternity': 'Licencia Post Natal',
      'paternity': 'Licencia por Paternidad',
      'personal': 'Asuntos Personales',
      'other': 'Otros'
    };
    return translations[type] || type;
  };

  // Obtener color según tipo de evento
  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'vacation': 'bg-blue-100 text-blue-800',
      'medical': 'bg-red-100 text-red-800',
      'maternity': 'bg-pink-100 text-pink-800',
      'paternity': 'bg-purple-100 text-purple-800',
      'personal': 'bg-yellow-100 text-yellow-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  // Obtener color según estado
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'approved': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Traducir estado
  const translateStatus = (status: string) => {
    const translations: { [key: string]: string } = {
      'approved': 'Aprobado',
      'pending': 'Pendiente',
      'rejected': 'Rechazado'
    };
    return translations[status] || status;
  };

  // Obtener evento seleccionado
  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return sortedEvents.find(event => event.id === selectedEventId) || null;
  }, [selectedEventId, sortedEvents]);

  // Manejar exportación de datos
  const handleExportEvent = (eventId: string, format: 'excel' | 'pdf' | 'txt') => {
    const event = sortedEvents.find(e => e.id === eventId);
    if (!event) return;
    
    const employee = employees.find(e => e.id === event.employeeId);
    if (!employee) return;
    
    const fullName = `${employee.name} ${employee.lastName}`;
    alert(`Exportando datos de ${fullName} - ${translateEventType(event.eventType)} en formato ${format.toUpperCase()}`);
  };

  return (
    <ReportLayout
      title="Planilla sin Horario"
      description="Registro de novedades como vacaciones, licencias médicas, y otros eventos sin horario regular"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      <div className="flex flex-col md:flex-row">
        {/* Lista de eventos */}
        <div className={`${selectedEvent ? 'md:w-2/3' : 'w-full'} overflow-x-auto transition-all duration-300`}>
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
                  onClick={() => handleSort('eventType')}
                >
                  <div className="flex items-center">
                    Tipo de Novedad
                    {sortField === 'eventType' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('startDate')}
                >
                  <div className="flex items-center">
                    Fecha Inicio
                    {sortField === 'startDate' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('endDate')}
                >
                  <div className="flex items-center">
                    Fecha Fin
                    {sortField === 'endDate' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Estado
                    {sortField === 'status' && (
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
              {sortedEvents.map((event) => {
                const employee = employees.find(e => e.id === event.employeeId);
                
                return (
                  <tr 
                    key={event.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selectedEventId === event.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedEventId(event.id)}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEventTypeColor(event.eventType)}`}>
                        {translateEventType(event.eventType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(event.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(event.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900 font-medium">
                          {calculateDuration(event.startDate, event.endDate)} días
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                        {translateStatus(event.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleExportEvent(event.id, 'excel')}
                        >
                          <FileSpreadsheet className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleExportEvent(event.id, 'pdf')}
                        >
                          <FileText className="h-5 w-5 text-red-500" />
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => handleExportEvent(event.id, 'txt')}
                        >
                          <FileText className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {sortedEvents.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No hay novedades para mostrar con los filtros seleccionados.
            </div>
          )}
        </div>
        
        {/* Detalle del evento seleccionado */}
        {selectedEvent && (
          <div className="md:w-1/3 md:ml-6 mt-6 md:mt-0 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalle de Novedad
              </h2>
            </div>
            
            <div className="p-4">
              {/* Información del empleado */}
              {(() => {
                const employee = employees.find(e => e.id === selectedEvent.employeeId);
                return employee ? (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Empleado</h3>
                    <p className="text-base font-medium">{employee.name} {employee.lastName}</p>
                    {employee.position && (
                      <p className="text-sm text-gray-500">{employee.position}</p>
                    )}
                    {employee.department && (
                      <p className="text-sm text-gray-500">Departamento: {employee.department}</p>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Empleado no encontrado</p>
                  </div>
                );
              })()}
              
              {/* Tipo de novedad */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de Novedad</h3>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEventTypeColor(selectedEvent.eventType)}`}>
                  {translateEventType(selectedEvent.eventType)}
                </span>
              </div>
              
              {/* Fechas */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha Inicio</h3>
                  <p className="text-base">{formatDate(selectedEvent.startDate)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha Fin</h3>
                  <p className="text-base">{formatDate(selectedEvent.endDate)}</p>
                </div>
              </div>
              
              {/* Duración */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Duración</h3>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-base">
                    {calculateDuration(selectedEvent.startDate, selectedEvent.endDate)} días
                  </span>
                </div>
              </div>
              
              {/* Estado */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Estado</h3>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedEvent.status)}`}>
                  {translateStatus(selectedEvent.status)}
                </span>
              </div>
              
              {/* Aprobador */}
              {selectedEvent.approvedBy && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Aprobado por</h3>
                  <p className="text-base">{selectedEvent.approvedBy}</p>
                </div>
              )}
              
              {/* Notas */}
              {selectedEvent.notes && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Notas</h3>
                  <p className="text-base text-gray-700">{selectedEvent.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ReportLayout>
  );
};

export default NoSchedulePayrollReport;