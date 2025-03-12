import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { UnifiedEmployee } from '../../../../global/interfaces/unifiedTypes';

// Interfaces
interface FilterOption {
  id: string;
  nombre: string;
  checked?: boolean;
}

interface FilterSection {
  id: string;
  title: string;
  icon: string;
  options: FilterOption[];
  expanded: boolean;
  dependsOn?: {
    sectionId: string;
    message: string;
  };
}

interface FilterState {
  sedes: string[];
  departamentos: string[];
  secciones: string[];
  unidades: string[];
}

interface AdvancedFiltersDashboardProps {
  onFilterChange: (filters: FilterState) => void;
  onSearchTermChange: (term: string) => void;
  searchTerm: string;
  onClearFilters: () => void;
  employees?: UnifiedEmployee[];
}

const AdvancedFiltersDashboard: React.FC<AdvancedFiltersDashboardProps> = ({
  onFilterChange,
  onSearchTermChange,
  // searchTerm,
  onClearFilters,
  employees = [] // Valor por defecto vacío para evitar errores
}) => {
  // Estado inicial de filtros
  const [filterState, setFilterState] = useState<FilterState>({
    sedes: [],
    departamentos: [],
    secciones: [],
    unidades: []
  });

  // Extraer opciones únicas de los datos de empleados
  const getUniqueOptions = (key: keyof UnifiedEmployee): FilterOption[] => {
    if (!employees || employees.length === 0) {
      return []; // Retornar arreglo vacío si no hay empleados
    }
    
    const uniqueValues = new Set<string>();
    
    employees.forEach(employee => {
      if (employee && employee[key]) {
        uniqueValues.add(employee[key] as string);
      }
    });
    
    return Array.from(uniqueValues).map(value => ({
      id: value,
      nombre: value,
      // IMPORTANTE: Inicializar el estado 'checked' basado en si el valor ya está en filterState
      checked: filterState[key as keyof FilterState]?.includes(value) || false
    }));
  };

  // Estado para las secciones de filtro
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    {
      id: 'sedes',
      title: 'Sedes',
      icon: 'building',
      options: [],
      expanded: true
    },
    {
      id: 'departamentos',
      title: 'Departamentos',
      icon: 'briefcase',
      options: [],
      expanded: true,
      dependsOn: {
        sectionId: 'sedes',
        message: 'Seleccione una sede primero'
      }
    },
    {
      id: 'secciones',
      title: 'Secciones',
      icon: 'layers',
      options: [],
      expanded: true,
      dependsOn: {
        sectionId: 'departamentos',
        message: 'Seleccione un departamento primero'
      }
    },
    {
      id: 'unidades',
      title: 'Unidades',
      icon: 'users',
      options: [], // Inicialmente vacío porque dependerá de la sección
      expanded: true,
      dependsOn: {
        sectionId: 'secciones',
        message: 'Seleccione una sección primero'
      }
    }
  ]);

  // Inicializar las opciones cuando los empleados estén disponibles
  useEffect(() => {
    if (employees && employees.length > 0) {
      setFilterSections(prevSections => 
        prevSections.map(section => {
          if (section.id === 'sedes') {
            return {
              ...section,
              options: getUniqueOptions('location').map(opt => ({
                ...opt,
                checked: filterState.sedes.includes(opt.id)
              }))
            };
          } else if (section.id === 'departamentos') {
            return {
              ...section,
              options: getUniqueOptions('department').map(opt => ({
                ...opt,
                checked: filterState.departamentos.includes(opt.id)
              }))
            };
          } else if (section.id === 'secciones') {
            return {
              ...section,
              options: getUniqueOptions('section').map(opt => ({
                ...opt,
                checked: filterState.secciones.includes(opt.id)
              }))
            };
          }
          return section;
        })
      );
    }
  }, [employees]);

  // Actualizar las opciones de secciones basado en la selección de departamentos
  useEffect(() => {
    const updateFilterOptions = () => {
      // Verificar si hay empleados disponibles
      if (!employees || employees.length === 0) return;
      
      // Actualizamos las listas dependientes
      if (filterState.sedes.length > 0) {
        // Filtrar departamentos basados en las sedes seleccionadas
        const filteredDepartments = new Set<string>();
        
        employees.forEach(employee => {
          if (employee && employee.location && filterState.sedes.includes(employee.location) && employee.department) {
            filteredDepartments.add(employee.department);
          }
        });
        
        // Actualizar opciones de departamentos
        setFilterSections(prevSections => 
          prevSections.map(section => {
            if (section.id === 'departamentos') {
              const currentDeptOptions = Array.from(filteredDepartments).map(dept => ({
                id: dept,
                nombre: dept,
                checked: filterState.departamentos.includes(dept)
              }));
              
              return {
                ...section,
                options: currentDeptOptions
              };
            }
            return section;
          })
        );
      }
      
      if (filterState.departamentos.length > 0) {
        // Filtrar secciones basadas en los departamentos seleccionados
        const filteredSections = new Set<string>();
        
        employees.forEach(employee => {
          if (employee && employee.department && filterState.departamentos.includes(employee.department) && employee.section) {
            filteredSections.add(employee.section);
          }
        });
        
        // Actualizar opciones de secciones
        setFilterSections(prevSections => 
          prevSections.map(section => {
            if (section.id === 'secciones') {
              const currentSectionOptions = Array.from(filteredSections).map(sec => ({
                id: sec,
                nombre: sec,
                checked: filterState.secciones.includes(sec)
              }));
              
              return {
                ...section,
                options: currentSectionOptions
              };
            }
            return section;
          })
        );
      }
    };
    
    updateFilterOptions();
  }, [employees, filterState.sedes, filterState.departamentos, filterState.secciones]);

  // Función para manejar el cambio de estado de una opción de filtro
  const handleOptionChange = (sectionId: string, optionId: string, checked: boolean) => {
    // Verificar si hay empleados disponibles
    if (!employees || employees.length === 0) return;
    
    // Actualizar estado de secciones de filtro (para controlar checkboxes)
    setFilterSections(sections => 
      sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map(option => {
              if (option.id === optionId) {
                return { ...option, checked };
              }
              return option;
            })
          };
        }
        return section;
      })
    );

    // Actualizar estado de filtros seleccionados
    setFilterState(prevState => {
      const newState = { ...prevState };
      
      // Si el checkbox está marcado, añadir a la lista (solo si no existe ya)
      if (checked) {
        // Comprobar si el ID ya existe para evitar duplicados
        if (!newState[sectionId as keyof FilterState].includes(optionId)) {
          newState[sectionId as keyof FilterState] = [
            ...newState[sectionId as keyof FilterState], 
            optionId
          ];
        }
      } 
      // Si está desmarcado, quitar de la lista
      else {
        newState[sectionId as keyof FilterState] = newState[sectionId as keyof FilterState]
          .filter(id => id !== optionId);
      }
      
      // Si cambia la selección de una sección padre, limpiamos las selecciones hijas
      if (sectionId === 'sedes' && !checked) {
        // Si desmarcamos una sede, verificamos si debemos limpiar departamentos relacionados
        const remainingSedes = newState.sedes;
        const validDepartamentos = new Set<string>();
        
        employees.forEach(employee => {
          if (employee && employee.location && employee.department && remainingSedes.includes(employee.location)) {
            validDepartamentos.add(employee.department);
          }
        });
        
        // Filtrar los departamentos que ya no son válidos
        newState.departamentos = newState.departamentos.filter(dept => 
          validDepartamentos.has(dept)
        );
        
        // Si se eliminaron todos los departamentos, limpiar secciones
        if (newState.departamentos.length === 0) {
          newState.secciones = [];
          newState.unidades = [];
        }
      } else if (sectionId === 'departamentos' && !checked) {
        // Si desmarcamos un departamento, verificamos si debemos limpiar secciones relacionadas
        const remainingDepartamentos = newState.departamentos;
        const validSecciones = new Set<string>();
        
        employees.forEach(employee => {
          if (employee && employee.department && remainingDepartamentos.includes(employee.department)) {
            validSecciones.add(employee.section);
          }
        });
        
        // Filtrar las secciones que ya no son válidas
        newState.secciones = newState.secciones.filter(sec => 
          validSecciones.has(sec)
        );
        
        // Si se eliminaron todas las secciones, limpiar unidades
        if (newState.secciones.length === 0) {
          newState.unidades = [];
        }
      }
      
      // Llamar al callback con el nuevo estado
      // Importante: Ya no cerramos el panel aquí, dejamos que se mantenga abierto
      onFilterChange(newState);
      return newState;
    });
  };

  // Función para expandir/colapsar una sección
  const toggleSection = (sectionId: string) => {
    setFilterSections(sections => 
      sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, expanded: !section.expanded };
        }
        return section;
      })
    );
  };

  // Verificar si una sección depende de otra y si hay selecciones en la sección dependiente
  const isSectionDisabled = (section: FilterSection): boolean => {
    if (!section.dependsOn) return false;
    
    const { sectionId } = section.dependsOn;
    return filterState[sectionId as keyof FilterState].length === 0;
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setFilterState({
      sedes: [],
      departamentos: [],
      secciones: [],
      unidades: []
    });
    
    // Reiniciar las opciones de las secciones, solo si hay empleados disponibles
    if (employees && employees.length > 0) {
      setFilterSections(sections => 
        sections.map(section => {
          if (section.id === 'sedes') {
            return {
              ...section,
              options: getUniqueOptions('location').map(opt => ({ ...opt, checked: false })),
              expanded: true
            };
          } else if (section.id === 'departamentos') {
            return {
              ...section,
              options: getUniqueOptions('department').map(opt => ({ ...opt, checked: false })),
              expanded: true
            };
          } else if (section.id === 'secciones') {
            return {
              ...section,
              options: getUniqueOptions('section').map(opt => ({ ...opt, checked: false })),
              expanded: true
            };
          } else {
            return {
              ...section,
              options: [],
              expanded: true
            };
          }
        })
      );
    }
    
    onSearchTermChange('');
    onClearFilters();
  };

  // Evitar la propagación en checkboxes para mantener el panel abierto
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="p-4">
      {/* Título de Filtros y botón Limpiar */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-indigo-900">Filtros</h2>
        <button
          onClick={handleClearFilters}
          className="text-xs text-indigo-600 hover:text-indigo-800"
          type="button"
        >
          Limpiar
        </button>
      </div>

      {/* Secciones de filtro */}
      <div className="space-y-3">
        {filterSections.map((section) => {
          const isDisabled = isSectionDisabled(section);
          
          return (
            <div key={section.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
              {/* Cabecera de sección */}
              <button
                className="flex items-center justify-between w-full text-left py-1"
                onClick={() => toggleSection(section.id)}
                disabled={isDisabled}
                type="button"
              >
                <div className="flex items-center text-sm font-medium text-indigo-900">
                  {/* Icono según el tipo de sección */}
                  {section.icon === 'building' && (
                    <span className="text-indigo-300 mr-2">□</span>
                  )}
                  {section.icon === 'briefcase' && (
                    <span className="text-indigo-300 mr-2">□</span>
                  )}
                  {section.icon === 'layers' && (
                    <span className="text-indigo-300 mr-2">◉</span>
                  )}
                  {section.icon === 'users' && (
                    <span className="text-indigo-300 mr-2">◉</span>
                  )}
                  {section.title}
                </div>
                {section.expanded ? (
                  <ChevronUp className="h-4 w-4 text-indigo-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-indigo-500" />
                )}
              </button>
              
              {/* Contenido de la sección */}
              {section.expanded && (
                <div className="mt-2 ml-5 space-y-2">
                  {isDisabled ? (
                    <p className="text-sm text-gray-500 italic">
                      {section.dependsOn?.message}
                    </p>
                  ) : (
                    section.options.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={`${section.id}-${option.id}`}
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={!!option.checked}
                          onChange={(e) => handleOptionChange(section.id, option.id, e.target.checked)}
                          onClick={handleCheckboxClick} // Evitar propagación de eventos
                        />
                        <label
                          htmlFor={`${section.id}-${option.id}`}
                          className="ml-2 block text-sm text-gray-700"
                          onClick={handleCheckboxClick} // Evitar propagación de eventos
                        >
                          {option.nombre}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedFiltersDashboard;