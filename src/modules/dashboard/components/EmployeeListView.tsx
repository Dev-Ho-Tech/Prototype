import React from 'react';
import { Users } from 'lucide-react';
import EmployeeCard from './EmployeCardUser';
import { Employee } from '../interface/types';

interface EmployeeListViewProps {
  currentEmpleados: Employee[];
  viewMode: 'grid' | 'list';
  onEmployeeSelect: (employee: Employee) => void;
}

export const EmployeeListView: React.FC<EmployeeListViewProps> = ({ 
  currentEmpleados, 
  viewMode, 
  onEmployeeSelect 
}) => {
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

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      {viewMode === 'grid' ? (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {currentEmpleados.map(empleado => (
              <EmployeeCard 
                key={empleado.id} 
                empleado={empleado} 
                onSelect={onEmployeeSelect} 
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
              {currentEmpleados.map(empleado => {
                const estadoClase = getEstadoClase(empleado.estado);
                const estadoTexto = getEstadoTexto(empleado.estado);
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
                
                return (
                  <tr 
                    key={empleado.id}
                    className={`${bgColorClass} cursor-pointer hover:bg-gray-100`}
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
    </div>
  );
};

export default EmployeeListView;