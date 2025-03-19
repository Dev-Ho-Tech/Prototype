import React, { useState, useEffect } from 'react';
import { ComedorListProps } from '../interfaces/types';
import { Edit, Trash2, Users, ArrowUpDown } from 'lucide-react';
import ComedorCard from './ComedorCard';
import Pagination from './Pagination';

const ComedorList: React.FC<ComedorListProps> = ({
  comedores,
  onEdit,
  onDelete,
  viewMode = 'list'
}) => {
  // Estados para paginación y filtrado
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // Ordenar por sede si es necesario
  const sortedComedores = sortDirection 
    ? [...comedores].sort((a, b) => {
        const comparison = a.ubicacion.localeCompare(b.ubicacion);
        return sortDirection === 'asc' ? comparison : -comparison;
      })
    : comedores;

  // Calcular comedores paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComedores = sortedComedores.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular número total de páginas
  const totalPages = Math.ceil(sortedComedores.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Manejar ordenamiento por sede
  const handleSortBySede = () => {
    // Ciclo de ordenamiento: null -> asc -> desc -> null
    if (sortDirection === null) {
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection(null);
    }
  };

  // Asegurar que la página actual sea válida cuando cambian los filtros
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Si no hay comedores, mostrar un mensaje
  if (comedores.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-8 text-center">
        <p className="text-gray-500">No hay comedores registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {viewMode === 'list' ? (
        // Vista de lista
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={handleSortBySede}>
                      Sede
                      <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacidad
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mesas
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Encargado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentComedores.map((comedor) => (
                  <tr key={comedor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{comedor.nombre}</div>
                          <div className="text-sm text-gray-500">{comedor.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comedor.ubicacion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comedor.capacidadMaxima} personas
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comedor.cantidadMesas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comedor.encargado || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        comedor.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {comedor.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(comedor)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(comedor.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Vista de tarjetas
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentComedores.map((comedor) => (
              <ComedorCard 
                key={comedor.id}
                comedor={comedor}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Componente de paginación (común para ambas vistas) */}
      <Pagination 
        currentPage={currentPage}
        totalItems={sortedComedores.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1); // Reiniciar a primera página al cambiar el tamaño
        }}
      />
    </div>
  );
};

export default ComedorList;