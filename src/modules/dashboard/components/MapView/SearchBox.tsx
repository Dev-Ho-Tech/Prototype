import React from 'react';
import { Search } from 'lucide-react';
import { Sede } from '../../interface/map';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectSede?: (sede: Sede) => void;
  filteredSedes?: Sede[];
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchChange,
  onSelectSede,
  filteredSedes = []
}) => {
  const [showResults, setShowResults] = React.useState(false);
  
  // Mostrar resultados cuando hay texto de búsqueda
  React.useEffect(() => {
    if (searchTerm.trim() !== '') {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm]);
  
  // Manejar clic en un resultado
  const handleSelectSede = (sede: Sede) => {
    if (onSelectSede) {
      onSelectSede(sede);
    }
    setShowResults(false);
  };
  
  return (
    <div className="relative flex-1 min-w-[300px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Buscar sede..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => searchTerm.trim() !== '' && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      
      {/* Resultados de búsqueda */}
      {showResults && filteredSedes.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          <ul>
            {filteredSedes.map(sede => (
              <li 
                key={sede.id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                onMouseDown={() => handleSelectSede(sede)}
              >
                <div className="font-medium">{sede.nombre}</div>
                <div className="text-xs text-gray-600">{sede.direccion}, {sede.ciudad}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;