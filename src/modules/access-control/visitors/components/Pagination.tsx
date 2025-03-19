import React from 'react';
import { PaginationProps } from '../interfaces/types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="text-sm text-gray-500">
        Mostrando {startItem} a {endItem} de {totalItems} resultados
      </div>
      <div className="flex items-center">
        <div className="mr-4 flex items-center ">
          <span className="mr-2 text-sm text-gray-700">Filas por página</span>
          <select 
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 bg-white rounded-md px-3 py-1 text-sm "
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 bg-white rounded-md mx-1 ${
              currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            &lt;
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-gray-300 bg-white rounded-md mx-1 ${
              currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;