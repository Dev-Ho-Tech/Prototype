import React, { useState, useEffect } from 'react';
import { PerfilComidaListProps } from '../interfaces/types';
import { Edit, Trash2, BookOpen } from 'lucide-react';
import PerfilCard from './PerfilCard';
import Pagination from './Pagination';

const PerfilComidaList: React.FC<PerfilComidaListProps> = ({
  perfiles,
  horarios,
  estaciones,
  onEdit,
  onDelete,
  viewMode = 'list'
}) => {
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calcular perfiles paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPerfiles = perfiles.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular número total de páginas
  const totalPages = Math.ceil(perfiles.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Función para obtener los nombres de los horarios asociados
  const getHorariosNombres = (horarioIds: string[]): string => {
    if (horarioIds.length === 0) return "-";
    
    const nombresHorarios = horarioIds.map(id => {
      const horario = horarios.find(h => h.id === id);
      return horario ? horario.nombre : 'Desconocido';
    });
    
    if (nombresHorarios.length > 2) {
      return `${nombresHorarios.slice(0, 2).join(', ')} y ${nombresHorarios.length - 2} más`;
    }
    
    return nombresHorarios.join(', ');
  };

  // Función para obtener los nombres de las estaciones asociadas
  const getEstacionesNombres = (estacionIds: string[]): string => {
    if (estacionIds.length === 0) return "-";
    
    const nombresEstaciones = estacionIds.map(id => {
      const estacion = estaciones.find(e => e.id === id);
      return estacion ? estacion.nombre : 'Desconocida';
    });
    
    if (nombresEstaciones.length > 2) {
      return `${nombresEstaciones.slice(0, 2).join(', ')} y ${nombresEstaciones.length - 2} más`;
    }
    
    return nombresEstaciones.join(', ');
  };

  // Asegurar que la página actual sea válida cuando cambian los datos
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, perfiles]);

  // Si no hay perfiles, mostrar un mensaje
  if (perfiles.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-8 text-center">
        <p className="text-gray-500">No hay perfiles registrados</p>
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
                    Horarios
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estaciones
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
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
                {currentPerfiles.map((perfil) => (
                  <tr key={perfil.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-green-100 rounded-full">
                          <BookOpen className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{perfil.nombre}</div>
                          <div className="text-sm text-gray-500">{perfil.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getHorariosNombres(perfil.horarioIds)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getEstacionesNombres(perfil.estacionIds)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {perfil.ticketsDisponibles > 0 ? perfil.ticketsDisponibles : 'Ilimitados'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {perfil.descripcion ? 
                        (perfil.descripcion.length > 30 ? 
                          `${perfil.descripcion.substring(0, 30)}...` : 
                          perfil.descripcion) : 
                        "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        perfil.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {perfil.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(perfil)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(perfil.id)}
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
            {currentPerfiles.map((perfil) => (
              <PerfilCard 
                key={perfil.id}
                perfil={perfil}
                horarios={horarios}
                estaciones={estaciones}
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
        totalItems={perfiles.length}
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

export default PerfilComidaList;