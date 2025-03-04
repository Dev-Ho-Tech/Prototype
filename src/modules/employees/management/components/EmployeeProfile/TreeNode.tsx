import React, { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { SearchInput } from './SearchInput';
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
  
  // Verificación simple: ¿El nombre del nodo incluye el término de búsqueda?
  const nodeMatchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
  
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
  
  // Colores para los niveles jerárquicos
  const getBgColor = () => {
    switch (node.color) {
      case 'blue': return 'bg-blue-100';
      case 'green': return 'bg-green-100';
      case 'purple': return 'bg-purple-100';
      case 'amber': return 'bg-amber-100';
      case 'indigo': return 'bg-indigo-100';
      default: return 'bg-gray-100';
    }
  };
  
  return (
    <div className="select-none">
      <div className={`flex items-center py-2 ${level > 0 ? 'ml-6' : ''}`}>
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
        
        <div className="flex items-center flex-1">
          <div className={`p-1 rounded-md mr-2 ${getBgColor()}`}>
            {node.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <label 
                  htmlFor={`check-${node.id}`}
                  className="text-sm font-medium cursor-pointer hover:text-blue-600"
                >
                  {node.name}
                </label>
                {node.manager && (
                  <div className="text-xs text-gray-500">
                    {node.manager}
                  </div>
                )}
              </div>
              {node.employeeCount !== undefined && node.employeeCount > 0 && (
                <div className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                  ({node.employeeCount})
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

// Función auxiliar para verificar si algún hijo coincide con la búsqueda
function findChildrenMatchingSearch(node: TreeNodeData, searchTerm: string): boolean {
  if (!node.children || node.children.length === 0) {
    return false;
  }
  
  return node.children.some(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    findChildrenMatchingSearch(child, searchTerm)
  );
}

// Función para obtener nodos seleccionados
const getSelectedNodesInfo = (root: TreeNodeData, selectedIds: string[]): LocationSelection[] => {
  const result: LocationSelection[] = [];
  
  const findSelectedNodes = (node: TreeNodeData) => {
    if (selectedIds.includes(node.id)) {
      result.push({ id: node.id, name: node.name });
    }
    
    if (node.children && node.children.length > 0) {
      node.children.forEach(childNode => findSelectedNodes(childNode));
    }
  };
  
  findSelectedNodes(root);
  return result;
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

  const selectedNodes = getSelectedNodesInfo(organizationalData, selectedLocations);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Cabecera del modal */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
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
            <h3 className="text-sm font-medium text-gray-700 mb-2">Estructuras</h3>
            
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
            <h3 className="text-sm font-medium text-gray-700 mb-2">Panel</h3>
            
            {/* Lista de selecciones */}
            <div className="overflow-y-auto flex-1 border border-gray-200 rounded-md p-2 bg-white">
              {selectedNodes.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {selectedNodes.map(node => (
                    <li key={node.id} className="py-2 px-1 hover:bg-gray-50">
                      {node.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No hay ubicaciones seleccionadas
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
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            type="button"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};