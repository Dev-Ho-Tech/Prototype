import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import EmployeeCard from './EmployeCardUser';
import { Employee } from '../interface/types';
import SimplePagination from '../components/Pagination'; 

interface EmployeeListViewProps {
  currentEmpleados: Employee[];
  viewMode: 'grid' | 'list';
  onEmployeeSelect: (employee: Employee) => void;
  itemsPerPage?: number;
  activeFilter?: string | null; // Nuevo prop para el filtro activo
}

export const EmployeeListView: React.FC<EmployeeListViewProps> = ({ 
  currentEmpleados, 
  viewMode, 
  onEmployeeSelect,
  itemsPerPage = 18,
  activeFilter = null // Valor por defecto
}) => {
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedEmpleados, setPaginatedEmpleados] = useState<Employee[]>([]);
  
  // Calcular paginación cada vez que cambian los empleados o la página actual
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedEmpleados(currentEmpleados.slice(indexOfFirstItem, indexOfLastItem));
    
    // Si la página actual ya no tiene elementos (excepto página 1), regresar a la página anterior
    if (currentPage > 1 && indexOfFirstItem >= currentEmpleados.length) {
      setCurrentPage(Math.max(1, Math.ceil(currentEmpleados.length / itemsPerPage)));
    }
  }, [currentEmpleados, currentPage, itemsPerPage]);
  
  // Cambiar página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Opcionalmente, hacer scroll al inicio de la lista
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para obtener clase CSS basada en estado para vista de lista
  const getEstadoClase = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'bg-green-100 text-green-800';
      case 'permiso':
        return 'bg-orange-100 text-orange-800';
      case 'ausencia':
        return 'bg-red-100 text-red-800';
      case 'planificado':
        return 'bg-blue-100 text-blue-800';
      case 'trabajó':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el texto del estado para vista de lista
  const getEstadoTexto = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'Trabajando';
      case 'permiso':
        return 'Permiso';
      case 'ausencia':
        return 'Ausencia';
      case 'planificado':
        return 'Planificado';
      case 'trabajó':
        return 'Trabajó';
      default:
        return estado;
    }
  };

  // Función para convertir hora (HH:MM) a minutos desde medianoche
  const parseTimeToMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Función para determinar si un empleado coincide con el filtro activo
  const matchesActiveFilter = (empleado: Employee) => {
    if (!activeFilter) return false;
    
    switch (activeFilter) {
      case 'tardanzas':
        // Suponemos que una tardanza es un empleado que entró después de las 8:00 AM
        if (empleado.ultimaAccion) {
          const minutesSinceMidnight = parseTimeToMinutes(empleado.ultimaAccion);
          return minutesSinceMidnight > 480; // 8:00 AM en minutos
        }
        return false;
      
      case 'permisos':
        return empleado.estado === 'permiso';
      
      case 'salidas':
        // Asumimos que salidas intempestivas son aquellos que tienen salida registrada pero siguen trabajando
        return empleado.estado === 'trabajando' && empleado.ultimaAccion2;
      
      case 'ausencias':
        return empleado.estado === 'ausencia';
      
      case 'sin-horario':
        // Empleados sin horas planificadas o que no tienen contrato
        return !empleado.horas || empleado.horas === '0 hrs 0 min';
      
      case 'horas-extras':
        // Para horas extras, buscamos empleados que trabajaron más de 8 horas
        if (empleado.horas) {
          const hoursStr = empleado.horas.split(' ')[0];
          return parseFloat(hoursStr) > 8;
        }
        return false;
      
      default:
        return false;
    }
  };

  // Renderizar mensaje de "No hay empleados" si la lista está vacía
  if (currentEmpleados.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No hay empleados disponibles</h3>
        <p className="text-gray-500">
          {activeFilter 
            ? `No se encontraron empleados con "${activeFilter}" que coincidan con los criterios de búsqueda.`
            : "No se encontraron empleados que coincidan con los criterios de búsqueda."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      {viewMode === 'grid' ? (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {paginatedEmpleados.map(empleado => (
              <EmployeeCard 
                key={empleado.id} 
                empleado={empleado} 
                onSelect={onEmployeeSelect} 
                activeFilter={activeFilter} // Asegúrate de que esta prop se pase correctamente
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  País
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Acción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEmpleados.map(empleado => {
                const estadoClase = getEstadoClase(empleado.estado);
                const estadoTexto = getEstadoTexto(empleado.estado);
                const isHighlighted = matchesActiveFilter(empleado);
                
                // Base color class for row
                const bgColorClass = 
                  empleado.estado === 'permiso' 
                    ? 'bg-orange-50' 
                    : empleado.estado === 'ausencia' 
                      ? 'bg-red-50' 
                      : empleado.estado === 'trabajando' 
                        ? 'bg-green-50' 
                        : empleado.estado === 'planificado'
                          ? 'bg-blue-50'
                          : 'bg-gray-50';
                
                // Add highlighted class if matches filter
                const rowClass = `${bgColorClass} cursor-pointer hover:bg-gray-100 ${
                  isHighlighted ? 'ring-2 ring-blue-500 relative' : ''
                }`;
                
                return (
                  <tr 
                    key={empleado.id}
                    className={rowClass}
                    onClick={() => onEmployeeSelect(empleado)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          {empleado.foto ? (
                            <img 
                              src={empleado.foto} 
                              alt={empleado.nombre} 
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          
                          {/* Insignia de coincidencia con filtro */}
                          {isHighlighted && (
                            <span className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                              {activeFilter && activeFilter.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {empleado.nombre}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {empleado.pais}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {empleado.horas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {empleado.ultimaAccion ? empleado.ultimaAccion : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${estadoClase}`}>
                        {estadoTexto}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Componente de paginación simplificado */}
      <SimplePagination 
        totalItems={currentEmpleados.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeeListView;