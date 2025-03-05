import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Building2, Check, Users, Home, LayoutGrid, Briefcase, Search } from 'lucide-react';
import { LocationSelection, StructureModalProps, TreeNodeData, TreeNodeProps } from '../../interface/types';
import { organizationalData } from './utils/const_organitation';

// Componente para cada nodo del árbol
const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level = 0, 
  selectedLocations, 
  onToggleSelect, 
  searchTerm 
}) => {
  const [isExpanded, setIsExpanded] = useState(node.expanded || false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedLocations.includes(node.id);
  
  // Verificación avanzada: ¿El nombre o el manager del nodo incluye el término de búsqueda?
  const nodeMatchesSearch = 
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (node.manager && node.manager.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Efecto para expandir nodos cuando hay una búsqueda
  useEffect(() => {
    if (searchTerm && (nodeMatchesSearch || findChildrenMatchingSearch(node, searchTerm))) {
      setIsExpanded(true);
    } else if (!searchTerm && !node.expanded) {
      // Restaurar el estado de expansión original cuando se limpia la búsqueda
      setIsExpanded(!!node.expanded);
    }
  }, [searchTerm, nodeMatchesSearch, node]);
  
  // Si hay búsqueda y ni este nodo ni sus hijos coinciden, no mostrar nada
  if (searchTerm && !nodeMatchesSearch && !findChildrenMatchingSearch(node, searchTerm)) {
    return null;
  }
  
  // Colores e iconos para los tipos de nodo
  const getNodeStyles = () => {
    // Destacar el nodo si coincide con la búsqueda
    const highlightMatch = searchTerm && nodeMatchesSearch 
      ? 'ring-2 ring-blue-300' 
      : '';
    
    // Definir colores según tipo/nivel o usar los proporcionados directamente
    let bgColor = 'bg-gray-100';
    let icon = node.icon || <Building2 className="w-5 h-5 text-gray-500" />;
    
    if (node.color) {
      switch (node.color) {
        case 'blue': bgColor = 'bg-blue-100'; break;
        case 'green': bgColor = 'bg-green-100'; break;
        case 'purple': bgColor = 'bg-purple-100'; break;
        case 'amber': bgColor = 'bg-amber-100'; break;
        case 'indigo': bgColor = 'bg-indigo-100'; break;
        default: bgColor = 'bg-gray-100';
      }
    } else {
      // Usar colores por nivel jerárquico si no se especifica color
      switch (level) {
        case 0: bgColor = 'bg-blue-100'; break;
        case 1: bgColor = 'bg-green-100'; break;
        case 2: bgColor = 'bg-purple-100'; break;
        case 3: bgColor = 'bg-amber-100'; break;
        default: bgColor = 'bg-gray-100';
      }
    }

    // Si no hay ícono personalizado, usar uno basado en el tipo
    if (!node.icon) {
      switch (node.type) {
        case 'company': 
          icon = <Building2 className="w-5 h-5 text-blue-500" />; 
          break;
        case 'branch': 
          icon = <Home className="w-5 h-5 text-green-500" />; 
          break;
        case 'department': 
          icon = <Briefcase className="w-5 h-5 text-purple-500" />; 
          break;
        case 'team': 
          icon = <Users className="w-5 h-5 text-amber-500" />; 
          break;
        case 'unit': 
          icon = <LayoutGrid className="w-5 h-5 text-indigo-500" />; 
          break;
        default: 
          icon = <Building2 className="w-5 h-5 text-gray-500" />;
      }
    }
    
    return { bgColor, icon, highlightMatch };
  };
  
  const { bgColor, icon, highlightMatch } = getNodeStyles();
  
  return (
    <div className="select-none">
      <div className={`flex items-center py-2 ${level > 0 ? 'ml-5' : ''}`}>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-5 h-5 flex items-center justify-center mr-1 rounded hover:bg-gray-100"
            type="button"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-150 ${
                isExpanded ? 'transform rotate-90' : ''
              }`}
            />
          </button>
        )}
        {!hasChildren && <div className="w-5 mr-1"></div>}
        
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            id={`check-${node.id}`}
            checked={isSelected}
            onChange={() => onToggleSelect(node.id)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        
        <div className={`flex items-center flex-1 p-1.5 rounded-lg hover:bg-gray-50 ${highlightMatch}`}>
          <div className={`p-1.5 rounded-md mr-2 ${bgColor}`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <label 
                  htmlFor={`check-${node.id}`}
                  className="text-sm font-medium cursor-pointer hover:text-blue-600"
                >
                  {highlightSearchTerm(node.name, searchTerm)}
                </label>
                {node.manager && (
                  <div className="text-xs text-gray-500">
                    {highlightSearchTerm(node.manager, searchTerm)}
                  </div>
                )}
              </div>
              {node.employeeCount !== undefined && node.employeeCount > 0 && (
                <div className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                  {node.employeeCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-2 pl-4 border-l border-gray-200">
          {node.children.map((childNode, index) => (
            <TreeNode 
              key={index} 
              node={childNode} 
              level={level + 1} 
              selectedLocations={selectedLocations}
              onToggleSelect={onToggleSelect}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Función para resaltar términos de búsqueda en el texto
const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

// Función auxiliar para verificar si algún hijo coincide con la búsqueda
function findChildrenMatchingSearch(node: TreeNodeData, searchTerm: string): boolean {
  if (!node.children || node.children.length === 0) {
    return false;
  }
  
  return node.children.some(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (child.manager && child.manager.toLowerCase().includes(searchTerm.toLowerCase())) || 
    findChildrenMatchingSearch(child, searchTerm)
  );
}

// Función para obtener nodos seleccionados
const getSelectedNodesInfo = (root: TreeNodeData, selectedIds: string[]): LocationSelection[] => {
  const result: LocationSelection[] = [];
  
  const findSelectedNodes = (node: TreeNodeData) => {
    if (selectedIds.includes(node.id)) {
      result.push({ 
        id: node.id, 
        name: node.name,
        type: node.type,
        manager: node.manager,
        employeeCount: node.employeeCount
      });
    }
    
    if (node.children && node.children.length > 0) {
      node.children.forEach(childNode => findSelectedNodes(childNode));
    }
  };
  
  findSelectedNodes(root);
  return result;
};

// Componente para mostrar nodo seleccionado en el panel derecho
const SelectedNode: React.FC<{ 
  node: LocationSelection, 
  onRemove: (id: string) => void 
}> = ({ node, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
      <div className="flex-1">
        <div className="font-medium text-sm">{node.name}</div>
        {node.manager && <div className="text-xs text-gray-500">{node.manager}</div>}
        {node.employeeCount && (
          <div className="text-xs text-gray-600">
            {node.employeeCount} empleados
          </div>
        )}
      </div>
      <button 
        onClick={() => onRemove(node.id)} 
        className="p-1 hover:bg-red-100 rounded-full"
      >
        <X className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
};

// Componente para la entrada de búsqueda
const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="relative mb-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

// Componente principal del modal
export const StructureModal: React.FC<StructureModalProps> = ({ 
  isOpen, 
  onClose,
  onSelectLocations,
  initialSelectedLocations = []
}) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialSelectedLocations);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleToggleSelect = (nodeId: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId);
      } else {
        return [...prev, nodeId];
      }
    });
  };

  const handleSaveSelections = () => {
    if (onSelectLocations) {
      const selections = getSelectedNodesInfo(organizationalData, selectedLocations);
      onSelectLocations(selections);
    }
    onClose();
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleRemoveSelection = (id: string) => {
    setSelectedLocations(prev => prev.filter(itemId => itemId !== id));
  };

  const selectedNodes = getSelectedNodesInfo(organizationalData, selectedLocations);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Cabecera del modal */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-blue-500" />
            Estructuras
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Cuerpo del modal */}
        <div className="flex-1 flex overflow-hidden">
          {/* Panel izquierdo - Árbol con búsqueda */}
          <div className="w-1/2 border-r p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
              <button 
                onClick={() => setSelectedLocations([])}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Limpiar
              </button>
            </div>
            
            {/* Componente de búsqueda */}
            <SearchInput 
              value={searchTerm} 
              onChange={handleSearchChange} 
              placeholder="Buscar estructuras..."
            />
            
            {/* Árbol de organización con scroll */}
            <div className="overflow-y-auto flex-1 border border-gray-200 rounded-md p-2 bg-white">
              <TreeNode 
                node={organizationalData} 
                selectedLocations={selectedLocations}
                onToggleSelect={handleToggleSelect}
                searchTerm={searchTerm}
              />
            </div>
          </div>
          
          {/* Panel derecho - Selecciones */}
          <div className="w-1/2 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Selecciones</h3>
              <span className="text-xs text-gray-500">
                {selectedNodes.length} {selectedNodes.length === 1 ? 'estructura seleccionada' : 'estructuras seleccionadas'}
              </span>
            </div>
            
            {/* Lista de selecciones */}
            <div className="overflow-y-auto flex-1 border border-gray-200 rounded-md p-2 bg-white">
              {selectedNodes.length > 0 ? (
                <div className="space-y-2">
                  {selectedNodes.map(node => (
                    <SelectedNode 
                      key={node.id} 
                      node={node} 
                      onRemove={handleRemoveSelection} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10 flex flex-col items-center">
                  <Building2 className="w-10 h-10 text-gray-300 mb-2" />
                  <p>No hay estructuras seleccionadas</p>
                  <p className="text-xs mt-1">Seleccione estructuras del panel izquierdo</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Pie del modal */}
        <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            type="button"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveSelections}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center"
            type="button"
          >
            <Check className="w-4 h-4 mr-1" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};