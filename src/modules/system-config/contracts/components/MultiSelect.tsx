import React, { useState, useRef, useEffect } from 'react';
import { X as XIcon, ChevronDown, Plus } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ 
  value = [], 
  onChange, 
  options,
  placeholder = "Seleccionar opciones..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Función para manejar la selección de una opción
  const handleSelect = (option: Option) => {
    if (!value.includes(option.value)) {
      const newValue = [...value, option.value];
      onChange(newValue);
    }
    setSearchTerm('');
  };
  
  // Función para eliminar una opción seleccionada
  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el dropdown
    const newValue = value.filter(val => val !== optionValue);
    onChange(newValue);
  };
  
  // Obtener etiquetas para las opciones seleccionadas
  const getOptionLabel = (optionValue: string) => {
    const option = options.find(opt => opt.value === optionValue);
    return option ? option.label : optionValue;
  };
  
  // Filtrar opciones basado en el término de búsqueda
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !value.includes(option.value)
  );
  
  return (
    <div className="relative" ref={containerRef}>
      {/* Área de visualización de selecciones */}
      <div 
        className="w-full p-2 border border-gray-300 rounded-md min-h-[42px] flex flex-wrap gap-2 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length > 0 ? (
          <>
            {value.map(val => (
              <div key={val} className="flex items-center bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm">
                {getOptionLabel(val)}
                <button 
                  type="button" 
                  onClick={(e) => handleRemove(val, e)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  <XIcon size={14} />
                </button>
              </div>
            ))}
            {/* Botón Agregar */}
            <button 
              type="button"
              className="flex items-center text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              <Plus size={16} className="mr-1" />
              <span className="text-sm">Agregar</span>
            </button>
          </>
        ) : (
          <div className="text-gray-500">{placeholder}</div>
        )}
        <div className="ml-auto flex items-center">
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>
      
      {/* Dropdown para la selección */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
          <div className="p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full p-2 border border-gray-300 rounded-md"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            {filteredOptions.map(option => (
              <li 
                key={option.value}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No hay opciones disponibles</li>
            )}
          </ul>
          <div className="p-2 border-t border-gray-200">
            <button
              type="button"
              className="w-full p-2 bg-gray-100 text-gray-700 rounded-md text-sm"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;