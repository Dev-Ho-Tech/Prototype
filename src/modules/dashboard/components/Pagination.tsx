import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const SimplePagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex items-center justify-between py-4 bg-white border-t border-gray-200 px-4">
      {/* Texto informativo alineado a la izquierda */}
      <div className="text-sm text-gray-500">
        Mostrando {currentPage} de {totalPages} 
      </div>
      
      {/* Controles de paginación alineados a la derecha */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-1 text-sm font-medium rounded-md ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Anterior
        </button>
        
        {/* Contador de página actual */}
        <div className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">
          {currentPage}
        </div>
        
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-1 text-sm font-medium rounded-md ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SimplePagination;