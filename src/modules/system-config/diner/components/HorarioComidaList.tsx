import React, { useState, useEffect } from 'react';
import { HorarioComidaListProps } from '../interfaces/types';
import { Edit, Trash2, Clock } from 'lucide-react';
import HorarioCard from './HorarioCard';
import Pagination from './Pagination';

const HorarioComidaList: React.FC<HorarioComidaListProps> = ({
  horarios,
  comedores,
  onEdit,
  onDelete,
  viewMode = 'list'
}) => {
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calcular horarios paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHorarios = horarios.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular número total de páginas
  const totalPages = Math.ceil(horarios.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Función para obtener el nombre del comedor según su ID
  const getComedorNombre = (comedorId: string): string => {
    const comedor = comedores.find(c => c.id === comedorId);
    return comedor ? comedor.nombre : 'Comedor no encontrado';
  };

  // Función para mostrar los días de la semana como texto
  const formatDiasSemana = (dias: string[]): string => {
    if (dias.length === 0) return "-";
    if (dias.length === 7) return "Todos los días";
    
    // Si son días consecutivos, mostrar rango
    const diasOrdenados = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const indices = dias.map(dia => diasOrdenados.indexOf(dia)).sort((a, b) => a - b);
    
    if (indices.length > 1 && indices[indices.length - 1] - indices[0] === indices.length - 1) {
      return `${diasOrdenados[indices[0]]} a ${diasOrdenados[indices[indices.length - 1]]}`;
    }
    
    // Si no son consecutivos, mostrar lista separada por comas
    return dias.join(', ');
  };

  // Asegurar que la página actual sea válida cuando cambian los datos
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, horarios]);

  // Si no hay horarios, mostrar un mensaje
  if (horarios.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-8 text-center">
        <p className="text-gray-500">No hay horarios registrados</p>
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
                    Comedor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Días
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacidad
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
                {currentHorarios.map((horario) => (
                  <tr key={horario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{horario.nombre}</div>
                          <div className="text-sm text-gray-500">{horario.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getComedorNombre(horario.comedorId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {horario.horaInicio} - {horario.horaFin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDiasSemana(horario.diasSemana)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {horario.capacidadMaxima} personas
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        horario.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {horario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(horario)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(horario.id)}
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
            {currentHorarios.map((horario) => (
              <HorarioCard 
                key={horario.id}
                horario={horario}
                comedores={comedores}
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
        totalItems={horarios.length}
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

export default HorarioComidaList;