import React, { useState, useEffect } from 'react';
import { User, Building2, Eye, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { VisitorListProps, getStatusColor, getStatusLabel } from '../interfaces/types';
import VisitorCard from './VisitorCard';
import Pagination from './Pagination';

const VisitorList: React.FC<VisitorListProps> = ({
  visitors,
  onEdit,
  onFinish,
  searchTerm,
  selectedStatus,
  viewMode = 'list'
}) => {
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBySede, setSortBySede] = useState<'asc' | 'desc' | null>(null);

  // Filtrar visitantes según la búsqueda y estado seleccionado
  const filteredVisitors = visitors.filter(visitor => {
    // Filtrar por término de búsqueda
    const searchMatch = searchTerm === '' || 
      visitor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.visit.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtrar por estado
    const statusMatch = selectedStatus === 'all' || visitor.status === selectedStatus;
    
    return searchMatch && statusMatch;
  });

  // Ordenar por sede/visita si es necesario
  const sortedVisitors = sortBySede 
    ? [...filteredVisitors].sort((a, b) => {
        const comparison = a.visit.reason.localeCompare(b.visit.reason);
        return sortBySede === 'asc' ? comparison : -comparison;
      })
    : filteredVisitors;

  // Calcular visitantes paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVisitors = sortedVisitors.slice(indexOfFirstItem, indexOfLastItem);

  // Manejar ordenamiento por sede
  const handleSortBySede = () => {
    // Ciclo de ordenamiento: null -> asc -> desc -> null
    if (sortBySede === null) {
      setSortBySede('asc');
    } else if (sortBySede === 'asc') {
      setSortBySede('desc');
    } else {
      setSortBySede(null);
    }
  };

  // Resetear a la primera página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Formatear hora
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {viewMode === 'list' ? (
        // Vista de lista
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={handleSortBySede}>
                      Sede
                      <ArrowUpDown className={`h-4 w-4 ml-1 ${sortBySede ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credenciales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVisitors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No se encontraron visitantes
                    </td>
                  </tr>
                ) : (
                  currentVisitors.map((visitor) => (
                    <tr key={visitor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={visitor.photo}
                            alt={`${visitor.firstName} ${visitor.lastName}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {visitor.firstName} {visitor.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {visitor.company}
                            </div>
                            <div className="text-xs text-gray-500">
                              {visitor.documentType === 'cedula' ? 'Cédula' : 
                               visitor.documentType === 'passport' ? 'Pasaporte' : 
                               'Licencia'}: {visitor.documentNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{visitor.visit.reason}</div>
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {visitor.visit.host}
                          </div>
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            {visitor.visit.hostDepartment}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(visitor.visit.startTime)} - {formatTime(visitor.visit.endTime)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Duración: {visitor.visit.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {visitor.credentials.type === 'card' ? 'Tarjeta' :
                           visitor.credentials.type === 'pin' ? 'PIN' :
                           'Tarjeta + PIN'}
                        </div>
                        {visitor.credentials.requiresEscort && (
                          <div className="text-sm text-amber-600">
                            Requiere acompañante
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusColor(visitor.status)
                        }`}>
                          {getStatusLabel(visitor.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => console.log('Ver detalles')}
                            title="Ver detalles"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => onEdit(visitor)}
                            title="Editar visitante"
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          {visitor.status === 'active' && onFinish && (
                            <button 
                              onClick={() => onFinish(visitor.id)}
                              title="Finalizar visita"
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Vista de tarjetas
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentVisitors.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                No se encontraron visitantes
              </div>
            ) : (
              currentVisitors.map((visitor) => (
                <VisitorCard
                  key={visitor.id}
                  visitor={visitor}
                  onEdit={onEdit}
                  onFinish={onFinish}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredVisitors.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default VisitorList;