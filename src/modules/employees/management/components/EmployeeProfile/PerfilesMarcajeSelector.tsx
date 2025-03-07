import { useState, useRef, useEffect } from 'react';
import { Search, X, Plus, Check } from 'lucide-react';

// Opciones de perfiles de marcaje disponibles
const availableProfiles = [
  { id: 'principal', name: 'Principal' },
  { id: 'secundario', name: 'Secundario' },
  { id: 'auxiliar', name: 'Auxiliar' },
  { id: 'remoto', name: 'Remoto' },
  { id: 'administrativo', name: 'Administrativo' },
  { id: 'gerencial', name: 'Gerencial' },
  { id: 'temporal', name: 'Temporal' },
  { id: 'visitante', name: 'Visitante' }
];

const PerfilesMarcajeSelector = ({ 
  selectedProfiles = ['Principal'], 
  onChange = () => {} 
}) => {
  const [profiles, setProfiles] = useState(selectedProfiles);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtrar perfiles según término de búsqueda
  const filteredProfiles = availableProfiles.filter(
    profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Perfiles disponibles (que no están ya seleccionados)
  const availableToSelect = filteredProfiles.filter(
    profile => !profiles.includes(profile.name)
  );

  // Añadir un perfil
  const addProfile = (profileName) => {
    if (!profiles.includes(profileName)) {
      const newProfiles = [...profiles, profileName];
      setProfiles(newProfiles);
      onChange(newProfiles);
      setSearchTerm('');
      // Enfocar el input después de seleccionar
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Eliminar un perfil
  const removeProfile = (profileName) => {
    const newProfiles = profiles.filter(p => p !== profileName);
    setProfiles(newProfiles);
    onChange(newProfiles);
  };

  // Alternar el dropdown
  const toggleDropdown = () => {
    setIsSelectOpen(!isSelectOpen);
    if (!isSelectOpen && inputRef.current) {
      // Enfocar el input cuando se abre el dropdown
      setTimeout(() => {
        inputRef.current.focus();
      }, 50);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm text-gray-600 mb-1">
        Perfiles De Marcaje
      </label>
      
      <div className="relative" ref={dropdownRef}>
        {/* Contenedor de los chips seleccionados y botón de añadir */}
        <div 
          className="relative flex flex-wrap items-center gap-2 min-h-10 border border-gray-300 p-2 rounded-md cursor-text"
          onClick={toggleDropdown}
        >
          {profiles.map(profile => (
            <span key={profile} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {profile}
              <button 
                type="button" 
                className="ml-1 text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProfile(profile);
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800 ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        {/* Dropdown de búsqueda y selección */}
        {isSelectOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar perfil..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            <ul className="max-h-60 overflow-y-auto py-1">
              {availableToSelect.length > 0 ? (
                availableToSelect.map(profile => (
                  <li 
                    key={profile.id}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center text-sm"
                    onClick={() => {
                      addProfile(profile.name);
                      if (availableToSelect.length === 1) {
                        setIsSelectOpen(false);
                      }
                    }}
                  >
                    <Check className="w-4 h-4 mr-2 text-transparent" />
                    {profile.name}
                  </li>
                ))
              ) : searchTerm ? (
                <li className="px-3 py-2 text-gray-500 text-sm">No se encontraron perfiles</li>
              ) : (
                <li className="px-3 py-2 text-gray-500 text-sm">No hay más perfiles disponibles</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilesMarcajeSelector;