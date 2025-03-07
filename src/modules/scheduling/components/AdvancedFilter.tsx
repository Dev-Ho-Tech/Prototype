/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, Search, UserIcon, Building, Layers } from 'lucide-react';

interface Location {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
  locationId: string;
}





interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  locations: Location[];
  departments: Department[];


  employees: any[];
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  selectedLocations: string[];
  selectedDepartments: string[];
  selectedSections: string[];
  selectedUnits: string[];
  selectedEmployees: string[];
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  isOpen,
  onClose,
  locations,
  departments,


  employees,
  onFilterChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    selectedLocations: [],
    selectedDepartments: [],
    selectedSections: [],
    selectedUnits: [],
    selectedEmployees: []
  });

  const [expandedSections, setExpandedSections] = useState({
    locations: true,
    departments: true,
    sections: true,

    employees: true
  });

  // Filtrar las opciones disponibles según las selecciones superiores
  const filteredDepartments = filters.selectedLocations.length > 0
    ? departments.filter(dept => filters.selectedLocations.includes(dept.locationId))
    : departments;





  // Filtrado de empleados basado en los filtros seleccionados y el término de búsqueda
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchTerm === '' || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.code && employee.code.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = filters.selectedLocations.length === 0 || 
      filters.selectedLocations.includes(employee.location);
    
    const matchesDepartment = filters.selectedDepartments.length === 0 || 
      filters.selectedDepartments.includes(employee.department);
    
    // Aquí habría que agregar más filtros si tuviéramos sección y unidad en los datos de empleados
    
    return matchesSearch && matchesLocation && matchesDepartment;
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLocationChange = (locationId: string) => {
    setFilters(prev => {
      const newLocations = prev.selectedLocations.includes(locationId)
        ? prev.selectedLocations.filter(id => id !== locationId)
        : [...prev.selectedLocations, locationId];
      
      return { ...prev, selectedLocations: newLocations };
    });
  };

  const handleDepartmentChange = (departmentId: string) => {
    setFilters(prev => {
      const newDepartments = prev.selectedDepartments.includes(departmentId)
        ? prev.selectedDepartments.filter(id => id !== departmentId)
        : [...prev.selectedDepartments, departmentId];
      
      return { ...prev, selectedDepartments: newDepartments };
    });
  };




  const handleEmployeeChange = (employeeId: string) => {
    setFilters(prev => {
      const newEmployees = prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter(id => id !== employeeId)
        : [...prev.selectedEmployees, employeeId];
      
      return { ...prev, selectedEmployees: newEmployees };
    });
  };

  const handleSelectAllEmployees = () => {
    if (filters.selectedEmployees.length === filteredEmployees.length) {
      // Si todos están seleccionados, desmarca todos
      setFilters(prev => ({...prev, selectedEmployees: []}));
    } else {
      // Si no todos están seleccionados, marca todos
      setFilters(prev => ({
        ...prev, 
        selectedEmployees: filteredEmployees.map(emp => emp.id)
      }));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      selectedLocations: [],
      selectedDepartments: [],
      selectedSections: [],
      selectedUnits: [],
      selectedEmployees: []
    });
    setSearchTerm('');
  };

  // Enviar los cambios de filtro al componente padre
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  if (!isOpen) return null;

  return (
    <div className="absolute z-10 top-20 left-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-blue-600 font-medium flex items-center">
          <UserIcon className="w-5 h-5 mr-2" />
          Filtrar Empleados
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar Empleado, ID, Nro documento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="px-3 py-2 flex justify-between items-center border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700">Filtros</h4>
        <button 
          onClick={clearAllFilters} 
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Limpiar
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {/* Sedes */}
        <div className="border-b border-gray-200">
          <button 
            className="w-full px-3 py-2 flex justify-between items-center hover:bg-gray-50"
            onClick={() => toggleSection('locations')}
          >
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Sedes</span>
            </div>
            {expandedSections.locations ? 
              <ChevronUp className="w-4 h-4 text-gray-500" /> : 
              <ChevronDown className="w-4 h-4 text-gray-500" />
            }
          </button>
          
          {expandedSections.locations && (
            <div className="px-3 py-2 space-y-2">
              {locations.map(location => (
                <div key={location.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`location-${location.id}`}
                    checked={filters.selectedLocations.includes(location.id)}
                    onChange={() => handleLocationChange(location.id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label 
                    htmlFor={`location-${location.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {location.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Departamentos */}
        <div className="border-b border-gray-200">
          <button 
            className="w-full px-3 py-2 flex justify-between items-center hover:bg-gray-50"
            onClick={() => toggleSection('departments')}
          >
            <div className="flex items-center">
              <Layers className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Departamentos</span>
            </div>
            {expandedSections.departments ? 
              <ChevronUp className="w-4 h-4 text-gray-500" /> : 
              <ChevronDown className="w-4 h-4 text-gray-500" />
            }
          </button>
          
          {expandedSections.departments && (
            <div className="px-3 py-2 space-y-2">
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map(department => (
                  <div key={department.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`department-${department.id}`}
                      checked={filters.selectedDepartments.includes(department.id)}
                      onChange={() => handleDepartmentChange(department.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`department-${department.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {department.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">Seleccione una sede primero</p>
              )}
            </div>
          )}
        </div>

        {/* Secciones */}
        <div className="border-b border-gray-200">
          <button 
            className="w-full px-3 py-2 flex justify-between items-center hover:bg-gray-50"
            onClick={() => toggleSection('sections')}
          >
            <div className="flex items-center">
              <Layers className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Secciones</span>
            </div>
            {expandedSections.sections ? 
              <ChevronUp className="w-4 h-4 text-gray-500" /> : 
              <ChevronDown className="w-4 h-4 text-gray-500" />
            }
          </button>
          

        </div>


        {/* Empleados */}
        <div>
          <div className="px-3 py-2 flex justify-between items-center border-b border-gray-200">
            <button 
              className="flex items-center"
              onClick={() => toggleSection('employees')}
            >
              <UserIcon className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Empleados</span>
            </button>
            <div className="flex items-center">
              <button 
                onClick={handleSelectAllEmployees}
                className="text-xs text-blue-600 hover:text-blue-800 mr-2"
              >
                Seleccionar todos
              </button>
              {expandedSections.employees ? 
                <ChevronUp className="w-4 h-4 text-gray-500" /> : 
                <ChevronDown className="w-4 h-4 text-gray-500" />
              }
            </div>
          </div>
          
          {expandedSections.employees && (
            <div className="px-3 py-2 space-y-2">
              {filteredEmployees.map(employee => (
                <div key={employee.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`employee-${employee.id}`}
                    checked={filters.selectedEmployees.includes(employee.id)}
                    onChange={() => handleEmployeeChange(employee.id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label 
                    htmlFor={`employee-${employee.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    <div>{employee.name}</div>
                    <div className="text-xs text-gray-500">{employee.code || employee.id} • {employee.position}</div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilter;