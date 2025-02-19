import React, { useState } from 'react';
import { Search, Plus, Filter, Building2, Users, MapPin, Phone, Mail, Globe2, ChevronDown, MoreVertical, Edit, Trash, Settings, FolderTree, Briefcase, ChevronRight, Building } from 'lucide-react';
import { OrganizationalTree } from './components/OrganizationalTree';
import { NodeForm } from './components/NodeForm';
import { organizationalStructureData } from './data';
import type { OrganizationalNode } from '../../../types';

export function StructureScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<OrganizationalNode | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const handleNodeToggle = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const handleAddNode = () => {
    setSelectedNode(null);
    setShowForm(true);
  };

  const handleEditNode = () => {
    if (selectedNode) {
      setShowForm(true);
    }
  };

  const handleSubmitNode = (data: Partial<OrganizationalNode>) => {
    console.log('Submitting node:', data);
    // Here would go the logic to update the organizational structure
  };

  const renderTreeNodes = (nodes: OrganizationalNode[]) => {
    return nodes.map(node => (
      <OrganizationalTree
        key={node.id}
        node={node}
        onSelect={setSelectedNode}
        selectedNode={selectedNode}
        expandedNodes={expandedNodes}
        onToggleExpand={handleNodeToggle}
      />
    ));
  };

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Left Panel - Tree View */}
      <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Estructura</h2>
            <button
              onClick={handleAddNode}
              className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <OrganizationalTree
            node={organizationalStructureData.root}
            onSelect={setSelectedNode}
            selectedNode={selectedNode}
            expandedNodes={expandedNodes}
            onToggleExpand={handleNodeToggle}
          />
          {organizationalStructureData.children && renderTreeNodes(organizationalStructureData.children)}
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {selectedNode ? (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {selectedNode.type === 'company' && <Building2 className="w-8 h-8 text-blue-500" />}
                  {selectedNode.type === 'branch' && <Building className="w-8 h-8 text-green-500" />}
                  {selectedNode.type === 'department' && <Users className="w-8 h-8 text-purple-500" />}
                  {selectedNode.type === 'section' && <FolderTree className="w-8 h-8 text-amber-500" />}
                  {selectedNode.type === 'unit' && <Briefcase className="w-8 h-8 text-indigo-500" />}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {selectedNode.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {selectedNode.metadata?.contact?.position}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleEditNode}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configuración</span>
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Información de contacto
                </h3>
                <div className="space-y-4">
                  {selectedNode.metadata?.contact && (
                    <>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-900">{selectedNode.metadata.contact.physicalLocation.building}</p>
                          <p className="text-sm text-gray-500">
                            {selectedNode.metadata.contact.physicalLocation.floor}, {selectedNode.metadata.contact.physicalLocation.office}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {selectedNode.metadata.contact.phone} ext. {selectedNode.metadata.contact.extension}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedNode.metadata.contact.email}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Estadísticas
                </h3>
                <div className="space-y-4">
                  {selectedNode.metadata?.employeeCount !== undefined && (
                    <div>
                      <p className="text-sm text-gray-500">Total de empleados</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {selectedNode.metadata.employeeCount}
                      </p>
                    </div>
                  )}
                  {selectedNode.children && (
                    <div>
                      <p className="text-sm text-gray-500">Subniveles</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {selectedNode.children.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Detalles
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Tipo</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nivel</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedNode.level}
                    </p>
                  </div>
                  {selectedNode.description && (
                    <div>
                      <p className="text-sm text-gray-500">Descripción</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedNode.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedNode.children && selectedNode.children.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">
                    Subniveles
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {selectedNode.children.map((child) => (
                    <div key={child.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {child.type === 'department' && <Users className="w-5 h-5 text-purple-500" />}
                          {child.type === 'section' && <FolderTree className="w-5 h-5 text-amber-500" />}
                          {child.type === 'unit' && <Briefcase className="w-5 h-5 text-indigo-500" />}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {child.name}
                            </h4>
                            {child.metadata?.contact && (
                              <p className="text-sm text-gray-500">
                                {child.metadata.contact.managerFullName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {child.metadata?.employeeCount && (
                            <div className="text-sm text-gray-500">
                              {child.metadata.employeeCount} empleados
                            </div>
                          )}
                          <button
                            onClick={() => setSelectedNode(child)}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Selecciona un nodo para ver sus detalles
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <NodeForm
          node={selectedNode}
          parentType={selectedNode?.type}
          onClose={() => {
            setShowForm(false);
            setSelectedNode(null);
          }}
          onSubmit={handleSubmitNode}
        />
      )}
    </div>
  );
}