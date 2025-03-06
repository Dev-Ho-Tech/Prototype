
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Determinar qué números de página mostrar
  const getPageNumbers = () => {
    const pages = [];
    
    // Siempre mostrar la primera página
    pages.push(1);
    
    // Mostrar páginas cercanas a la actual
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Agregar "..." si hay un salto desde la página 1
    if (rangeStart > 2) {
      pages.push('...');
    }
    
    // Agregar páginas del rango
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Agregar "..." si hay un salto hasta la última página
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }
    
    // Mostrar la última página si hay más de una página
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      
      {/* Números de página */}
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-1 text-gray-500">...</span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 rounded-md text-sm font-medium 
              ${currentPage === page 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
          >
            {page}
          </button>
        )
      ))}
      
      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
}