import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemLabel?: string; // Por ejemplo: "empleados", "registros", etc.
}

const ImprovedPagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  itemLabel = 'empleados',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) return null;
  
  // Calcula el rango de elementos que se están mostrando actualmente
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Crear lista de páginas a mostrar (con números y elipsis cuando sea necesario)
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      // Si hay pocas páginas, mostramos todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Siempre mostrar primera y última página
      pageNumbers.push(1);
      
      // Determinar el rango de páginas alrededor de la página actual
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajustar el rango para que siempre se muestren 3 números
      if (startPage === 2) endPage = Math.min(totalPages - 1, 4);
      if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);
      
      // Añadir elipsis inicial si es necesario
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Añadir las páginas del rango
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Añadir elipsis final si es necesario
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Añadir la última página
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="flex items-center justify-between py-3 bg-white border-t border-gray-200 px-4">
      {/* Información izquierda - "Mostrando X de Y empleados" */}
      <div className="flex items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <span className="bg-yellow-100 py-1 px-2 rounded-l-md border-y border-l border-yellow-200">
            Mostrando {firstItem} de {totalItems}
          </span>
          <span className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="#FEF9C3" 
              className="w-6 h-6 -ml-1"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" stroke="#F7E8AB" />
            </svg>
          </span>
        </div>
      </div>
      
      {/* Navegación en el centro */}
      <div className="flex items-center justify-center space-x-1">
        {/* Botón Anterior */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Anterior
        </button>
        
        {/* Números de página */}
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        {/* Botón Siguiente */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Siguiente
        </button>
      </div>
      
      {/* Tooltip informativo - Mostrar en versión development */}
      <div className="absolute top-0 left-0 right-0 flex justify-between">
        <div className="bg-yellow-100 text-xs text-gray-700 p-1 rounded border border-yellow-300 inline-block shadow-sm ml-4 -mt-3">
          <strong>Debería decir:</strong> Mostrando {firstItem}-{lastItem} de {totalItems} {itemLabel}
        </div>
        
        <div className="bg-yellow-100 text-xs text-gray-700 p-1 rounded border border-yellow-300 inline-block shadow-sm mr-4 -mt-3">
          <strong>Debería verse:</strong> Las demás páginas, actualmente hay {totalPages}, ejemplo:<br/>
          1,2,3...{totalPages}
        </div>
      </div>
    </div>
  );
};

// Versión final sin tooltips para producción
const ProductionPagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  itemLabel = 'empleados',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) return null;
  
  // Calcula el rango de elementos que se están mostrando actualmente
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Crear lista de páginas a mostrar (con números y elipsis cuando sea necesario)
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      // Si hay pocas páginas, mostramos todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Siempre mostrar primera y última página
      pageNumbers.push(1);
      
      // Determinar el rango de páginas alrededor de la página actual
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajustar el rango para que siempre se muestren 3 números
      if (startPage === 2) endPage = Math.min(totalPages - 1, 4);
      if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);
      
      // Añadir elipsis inicial si es necesario
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Añadir las páginas del rango
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Añadir elipsis final si es necesario
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Añadir la última página
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="flex items-center justify-between py-3 bg-white border-t border-gray-200 px-4">
      {/* Información izquierda - "Mostrando X-Y de Z empleados" */}
      <div className="text-sm text-gray-500">
        Mostrando {firstItem}-{lastItem} de {totalItems} {itemLabel}
      </div>
      
      {/* Navegación en el centro/derecha */}
      <div className="flex items-center space-x-1">
        {/* Botón Anterior */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Anterior
        </button>
        
        {/* Números de página */}
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        {/* Botón Siguiente */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
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

// Exportar ambas versiones - usar ProductionPagination en producción
export { ImprovedPagination, ProductionPagination };
export default ProductionPagination;