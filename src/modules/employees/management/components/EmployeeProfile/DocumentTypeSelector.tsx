import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

// Lista ampliada de tipos de documentos
const documentTypes = [
  { id: 'cedula', name: 'Cédula' },
  { id: 'pasaporte', name: 'Pasaporte' },
  { id: 'dni', name: 'DNI' },
  { id: 'identificacion_extranjeria', name: 'Identificación de Extranjería' },
  { id: 'licencia_conducir', name: 'Licencia de Conducir' },
  { id: 'tarjeta_identidad', name: 'Tarjeta de Identidad' },
  { id: 'carnet_diplomatico', name: 'Carnet Diplomático' },
  { id: 'carnet_refugiado', name: 'Carnet de Refugiado' },
  { id: 'documento_identidad', name: 'Documento de Identidad' },
  { id: 'carnet_militar', name: 'Carnet Militar' },
  { id: 'carnet_seguro', name: 'Carnet de Seguro Social' },
  { id: 'registro_civil', name: 'Registro Civil' },
  { id: 'visa', name: 'Visa' }
];

const DocumentTypeSelector = ({ 
  selectedType = 'Cédula', 
  onChange = () => {},
  required = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSelection, setCurrentSelection] = useState(selectedType);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtrar tipos de documento por término de búsqueda
  const filteredTypes = searchTerm
    ? documentTypes.filter(type => 
        type.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documentTypes;

  // Manejar la selección de un tipo de documento
  const handleSelect = (typeName) => {
    setCurrentSelection(typeName);
    onChange({ target: { name: 'tipoDocumento', value: typeName } });
    setIsOpen(false);
    setSearchTerm('');
  };

  // Alternar la apertura/cierre del dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm text-gray-600 mb-1">
        Tipo De Documento {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Campo seleccionado (visible siempre) */}
      <div 
        className="relative w-full cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <span className="text-gray-900">{currentSelection}</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </div>
      
      {/* Dropdown de búsqueda y selección */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
          {/* Campo de búsqueda */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar tipo de documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          {/* Lista de tipos de documento */}
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredTypes.length > 0 ? (
              filteredTypes.map(type => (
                <li 
                  key={type.id}
                  className={`px-3 py-2 cursor-pointer text-sm hover:bg-blue-50 ${currentSelection === type.name ? 'bg-blue-50 font-medium' : ''}`}
                  onClick={() => handleSelect(type.name)}
                >
                  {type.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 text-sm">No se encontraron tipos de documento</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentTypeSelector;
