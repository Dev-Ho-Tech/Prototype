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

  // Estado para almacenar todos los datos disponibles
  const [availableData, setAvailableData] = useState<{
    sedes: string[];
    departamentos: Record<string, string[]>;
    secciones: Record<string, string[]>;
    unidades: Record<string, string[]>;
  }>({
    sedes: [],
    departamentos: {},
    secciones: {},
    unidades: {}
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
      // Inicializar el estado 'checked' basado en si el valor ya está en filterState
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

  // Procesar datos cuando los empleados están disponibles
  useEffect(() => {
    if (employees && employees.length > 0) {
      // Recopilar todas las opciones de filtro disponibles
      const sedesSet = new Set<string>();
      const departamentosBySede: Record<string, Set<string>> = {};
      const seccionesByDepartamento: Record<string, Set<string>> = {};
      const unidadesBySeccion: Record<string, Set<string>> = {};
      
      // Primera pasada: recolectar todas las sedes
      employees.forEach(employee => {
        if (employee.location) {
          sedesSet.add(employee.location);
        }
      });
      
      // Segunda pasada: mapear departamentos por sede
      employees.forEach(employee => {
        if (employee.location && employee.department) {
          if (!departamentosBySede[employee.location]) {
            departamentosBySede[employee.location] = new Set<string>();
          }
          departamentosBySede[employee.location].add(employee.department);
        }
      });
      
      // Tercera pasada: mapear secciones por departamento
      employees.forEach(employee => {
        if (employee.department && employee.section) {
          if (!seccionesByDepartamento[employee.department]) {
            seccionesByDepartamento[employee.department] = new Set<string>();
          }
          seccionesByDepartamento[employee.department].add(employee.section);
        }
      });
      
      // Cuarta pasada: mapear unidades por sección
      employees.forEach(employee => {
        if (employee.section && employee.unit) {
          if (!unidadesBySeccion[employee.section]) {
            unidadesBySeccion[employee.section] = new Set<string>();
          }
          unidadesBySeccion[employee.section].add(employee.unit);
        }
      });
      
      // Convertir Sets a Arrays
      const sedesArray = Array.from(sedesSet);
      const departamentosMap: Record<string, string[]> = {};
      const seccionesMap: Record<string, string[]> = {};
      const unidadesMap: Record<string, string[]> = {};
      
      Object.keys(departamentosBySede).forEach(sede => {
        departamentosMap[sede] = Array.from(departamentosBySede[sede]);
      });
      
      Object.keys(seccionesByDepartamento).forEach(departamento => {
        seccionesMap[departamento] = Array.from(seccionesByDepartamento[departamento]);
      });
      
      Object.keys(unidadesBySeccion).forEach(seccion => {
        unidadesMap[seccion] = Array.from(unidadesBySeccion[seccion]);
      });
      
      // Guardar toda la información recopilada
      setAvailableData({
        sedes: sedesArray,
        departamentos: departamentosMap,
        secciones: seccionesMap,
        unidades: unidadesMap
      });
      
      // Inicializar las opciones de sedes
      setFilterSections(prevSections => {
        return prevSections.map(section => {
          if (section.id === 'sedes') {
            return {
              ...section,
              options: sedesArray.map(sede => ({
                id: sede,
                nombre: sede,
                checked: filterState.sedes.includes(sede)
              }))
            };
          }
          return section;
        });
      });
    }
  }, [employees]);

  // Actualizar las opciones de secciones basado en la selección de sedes/departamentos
  useEffect(() => {
    // Función auxiliar para obtener todos los departamentos disponibles en las sedes seleccionadas
    const getAvailableDepartamentos = () => {
      if (filterState.sedes.length === 0) {
        return getUniqueOptions('department');
      }
      
      const deptSet = new Set<string>();
      
      filterState.sedes.forEach(sede => {
        const deptsForSede = availableData.departamentos[sede] || [];
        deptsForSede.forEach(dept => deptSet.add(dept));
      });
      
      return Array.from(deptSet).map(deptId => ({
        id: deptId,
        nombre: deptId,
        checked: filterState.departamentos.includes(deptId)
      }));
    };
    
    // Función auxiliar para obtener todas las secciones disponibles en los departamentos seleccionados
    const getAvailableSecciones = () => {
      if (filterState.departamentos.length === 0) {
        return getUniqueOptions('section');
      }
      
      const sectionSet = new Set<string>();
      
      filterState.departamentos.forEach(dept => {
        const sectionsForDept = availableData.secciones[dept] || [];
        sectionsForDept.forEach(section => sectionSet.add(section));
      });
      
      return Array.from(sectionSet).map(sectionId => ({
        id: sectionId,
        nombre: sectionId,
        checked: filterState.secciones.includes(sectionId)
      }));
    };
    
    // Actualizar departamentos cuando cambian las sedes seleccionadas
    setFilterSections(prevSections => {
      return prevSections.map(section => {
        if (section.id === 'departamentos') {
          return {
            ...section,
            options: getAvailableDepartamentos()
          };
        }
        else if (section.id === 'secciones') {
          return {
            ...section,
            options: getAvailableSecciones()
          };
        }
        
        return section;
      });
    });
  }, [filterState.sedes, filterState.departamentos, availableData]);

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
      
      // Lógica para manejar dependencias cuando se desmarca una opción
      if (sectionId === 'sedes' && !checked) {
        // Si se desmarca una sede, revisar si algún departamento seleccionado ya no es válido
        const validDepartamentos = new Set<string>();
        
        // Para cada sede que queda seleccionada, agregar sus departamentos como válidos
        newState.sedes.forEach(sede => {
          const deptsForSede = availableData.departamentos[sede] || [];
          deptsForSede.forEach(dept => validDepartamentos.add(dept));
        });
        
        // Filtrar los departamentos que ya no son válidos
        newState.departamentos = newState.departamentos.filter(dept => 
          validDepartamentos.has(dept)
        );
        
        // Si se eliminaron todos los departamentos, limpiar también las secciones y unidades
        if (newState.departamentos.length === 0) {
          newState.secciones = [];
          newState.unidades = [];
        } else {
          // Si aún quedan departamentos, verificar secciones válidas
          const validSecciones = new Set<string>();
          
          newState.departamentos.forEach(dept => {
            const sectionsForDept = availableData.secciones[dept] || [];
            sectionsForDept.forEach(section => validSecciones.add(section));
          });
          
          // Filtrar secciones que ya no son válidas
          newState.secciones = newState.secciones.filter(seccion => 
            validSecciones.has(seccion)
          );
          
          // Si se eliminaron todas las secciones, limpiar unidades
          if (newState.secciones.length === 0) {
            newState.unidades = [];
          }
        }
      } else if (sectionId === 'departamentos' && !checked) {
        // Lógica similar para cuando se desmarca un departamento
        const validSecciones = new Set<string>();
        
        newState.departamentos.forEach(dept => {
          const sectionsForDept = availableData.secciones[dept] || [];
          sectionsForDept.forEach(section => validSecciones.add(section));
        });
        
        newState.secciones = newState.secciones.filter(seccion => 
          validSecciones.has(seccion)
        );
        
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
              options: availableData.sedes.map(sede => ({ 
                id: sede, 
                nombre: sede, 
                checked: false 
              })),
              expanded: true
            };
          } else if (section.id === 'departamentos') {
            return {
              ...section,
              options: [],
              expanded: true
            };
          } else if (section.id === 'secciones') {
            return {
              ...section,
              options: [],
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

      {/* Debug: Mostrar estado actual de filtros (puedes eliminar esto en producción) */}
      {/* <div className="mb-3 text-xs bg-gray-100 p-2 rounded">
        <div>Sedes: {filterState.sedes.join(', ')}</div>
        <div>Departamentos: {filterState.departamentos.join(', ')}</div>
        <div>Secciones: {filterState.secciones.join(', ')}</div>
      </div> */}

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
                  ) : section.options.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      No hay opciones disponibles
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