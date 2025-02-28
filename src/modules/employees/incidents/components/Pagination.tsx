import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Función para generar el rango de páginas a mostrar
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 3; // Número máximo de páginas visibles
    
    // Si hay pocas páginas, mostrar todas
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }
    
    // Si estamos en las primeras páginas
    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      for (let i = 1; i <= maxVisiblePages; i++) {
        range.push(i);
      }
      return range;
    }
    
    // Si estamos en las últimas páginas
    if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
      for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }
    
    // Si estamos en medio
    const start = currentPage - Math.floor(maxVisiblePages / 2);
    for (let i = start; i < start + maxVisiblePages; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex items-center justify-end mt-4 space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm rounded border ${
          currentPage === 1 
            ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
        }`}
      >
        Anterior
      </button>
      
      {getPageRange().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* <span className="px-1 text-gray-600">/</span>
      <span className="text-sm text-gray-600">{totalPages}</span> */}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm rounded border ${
          currentPage === totalPages 
            ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;