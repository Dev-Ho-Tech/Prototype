import React, { useState } from 'react';
import { ChevronRight, Building2, Users, X } from 'lucide-react';
import { TreeNodeData } from '../../interface/types';

interface StructureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Datos de estructura organizacional (estáticos)
const organizationalData = {
  name: 'Hodelpa Hotels & Resorts',
  manager: 'Roberto Henríquez Martínez',
  employeeCount: 350 + 15 + 120 + 85,
  icon: <Building2 className="w-5 h-5 text-blue-500" />,
  color: 'blue',
  type: 'company',
  expanded: true,
  children: [
    {
      name: 'Hodelpa Gran Almirante',
      manager: 'Carlos Eduardo Sánchez',
      employeeCount: 350,
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: true,
      children: [
        {
          name: 'Recursos Humanos',
          manager: 'María González Pérez',
          employeeCount: 15,
          icon: <Users className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          expanded: true,
          children: [
            {
              name: 'Reclutamiento y Selección',
              manager: 'Ana Patricia Ramírez',
              employeeCount: 5,
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'section',
              expanded: true,
              children: [
                {
                  name: 'Selección de Personal',
                  manager: 'Laura Méndez Santos',
                  employeeCount: 2,
                  icon: <Users className="w-5 h-5 text-indigo-500" />,
                  color: 'indigo',
                  type: 'unit',
                  children: []
                },
                {
                  name: 'Evaluación y Desarrollo',
                  manager: 'José Miguel Torres',
                  employeeCount: 3,
                  icon: <Users className="w-5 h-5 text-indigo-500" />,
                  color: 'indigo',
                  type: 'unit',
                  children: []
                }
              ]
            },
            {
              name: 'Administración de Personal',
              manager: 'Carmen Luisa Díaz',
              employeeCount: 8,
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'section',
              expanded: false,
              children: []
            }
          ]
        },
        {
          name: 'Alimentos y Bebidas',
          manager: 'Juan Carlos Pérez Mena',
          employeeCount: 120,
          icon: <Users className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          expanded: false,
          children: []
        },
        {
          name: 'División Habitaciones',
          manager: 'Isabel Martínez Gómez',
          employeeCount: 85,
          icon: <Users className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          expanded: false,
          children: []
        }
      ]
    },
    {
      name: 'Hodelpa Garden',
      manager: 'Francisco Jiménez',
      employeeCount: 280,
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: false,
      children: []
    },
    {
      name: 'Centro Plaza Hodelpa',
      manager: 'Luisa Hernández',
      employeeCount: 150,
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: false,
      children: []
    }
  ]
};

// Componente para cada nodo del árbol
const TreeNode = ({ node, level = 0 }: { node: TreeNodeData; level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(node.expanded || false);
  const hasChildren = node.children && node.children.length > 0;
  
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
  
  // const getTextColor = () => {
  //   switch (node.color) {
  //     case 'blue': return 'text-blue-700';
  //     case 'green': return 'text-green-700';
  //     case 'purple': return 'text-purple-700';
  //     case 'amber': return 'text-amber-700';
  //     case 'indigo': return 'text-indigo-700';
  //     default: return 'text-gray-700';
  //   }
  // };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-2 ${level > 0 ? 'ml-6' : ''}`}
      >
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-5 h-5 flex items-center justify-center mr-1 rounded hover:bg-gray-100"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-150 ${
                isExpanded ? 'transform rotate-90' : ''
              }`}
            />
          </button>
        )}
        {!hasChildren && <div className="w-5 mr-1"></div>}
        
        <div className={`flex items-center flex-1`}>
          <div className={`p-1 rounded-md mr-2 ${getBgColor()}`}>
            {node.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">
                  {node.name}
                </div>
                <div className="text-xs text-gray-500">
                  {node.manager}
                </div>
              </div>
              <div className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                ({node.employeeCount})
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-2 pl-4 border-l border-gray-200">
          {node.children.map((childNode: TreeNodeData, index: React.Key | null | undefined) => (
            <TreeNode key={index} node={childNode} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const StructureModal: React.FC<StructureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Cabecera del modal */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Estructura Organizacional
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Cuerpo del modal con scroll */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 text-sm text-gray-500">
            Esta es la estructura completa de la organización. Haz clic en las flechas para expandir o contraer las secciones.
          </div>
          
          {/* Árbol de organización */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <TreeNode node={organizationalData} />
          </div>
        </div>
        
        {/* Pie del modal */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};