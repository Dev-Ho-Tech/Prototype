import { useState, useEffect, useMemo } from 'react';
import { Plus, Building2, Users, MapPin, Phone, Mail, Edit, Trash, FolderTree, Briefcase, ChevronRight, Building } from 'lucide-react';
import { OrganizationalTree } from './components/OrganizationalTree';
import { NodeForm } from './components/NodeForm';
import { SearchComponent } from './components/SearchComponentProps';
import { organizationalStructureData } from './data';
import { Toast } from './components/Toast';
import type { OrganizationalNode } from '../../../types';
import { ConfirmationModal } from './components/ConfirmationModal';

export function StructureScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<OrganizationalNode | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Función recursiva para buscar nodos que coincidan con el término de búsqueda
  const searchNodes = (nodes: OrganizationalNode[], term: string): OrganizationalNode[] => {
    if (!term) return [];
    
    const results: OrganizationalNode[] = [];
    
    const search = (nodeArray: OrganizationalNode[]) => {
      nodeArray.forEach(node => {
        // Buscar en el nombre del nodo, responsable o tipo
        if (node.name.toLowerCase().includes(term.toLowerCase()) ||
            node.metadata?.contact?.managerFullName?.toLowerCase().includes(term.toLowerCase()) ||
            node.type.toLowerCase().includes(term.toLowerCase())) {
          results.push(node);
        }
        
        // Buscar recursivamente en los hijos
        if (node.children && node.children.length > 0) {
          search(node.children);
        }
      });
    };
    
    search(nodes);
    return results;
  };
  
  // Memorizar los resultados de búsqueda para evitar cálculos innecesarios
  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    
    const allRoots = [organizationalStructureData.root, ...(organizationalStructureData.children || [])];
    return searchNodes(allRoots, searchTerm);
  }, [searchTerm]);

  // Expandir automáticamente los nodos padres de los resultados de búsqueda
  useEffect(() => {
    if (searchResults.length > 0 && searchTerm) {
      // Seleccionar automáticamente el primer resultado si hay una búsqueda activa
      setSelectedNode(searchResults[0]);
    }
  }, [searchResults, searchTerm]);

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

  const handleEditNode = (nodeToEdit?: OrganizationalNode) => {
    const nodeToUpdate = nodeToEdit || selectedNode;
    if (nodeToUpdate) {
      setSelectedNode(nodeToUpdate);
      setShowForm(true);
    }
  };

  const handleSubmitNode = (data: Partial<OrganizationalNode>) => {
    console.log('Submitting node:', data);
    // Aquí iría la lógica para actualizar la estructura organizacional
    setShowForm(false);
    
    // Mostrar toast de éxito
    setToast({
      type: 'success',
      message: selectedNode ? 'Cambios guardados exitosamente' : 'Nuevo nodo creado exitosamente'
    });
  };
  
  const handleDeleteNode = () => {
    setShowDeleteConfirmation(true);
  };
  
  const confirmDeleteNode = () => {
    console.log('Deleting node:', selectedNode?.id);
    // Aquí iría la lógica para eliminar el nodo de la estructura
    setShowDeleteConfirmation(false);
    
    // Mostrar toast de éxito
    setToast({
      type: 'success',
      message: `${selectedNode?.type === 'company' ? 'Compañía' : 
                selectedNode?.type === 'branch' ? 'Sucursal' : 
                selectedNode?.type === 'department' ? 'Departamento' : 
                selectedNode?.type === 'section' ? 'Sección' : 
                selectedNode?.type === 'unit' ? 'Unidad' : 'Nodo'} eliminada correctamente`
    });
    
    // Volver a null el nodo seleccionado después de eliminarlo
    setSelectedNode(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSelectSearchResult = (node: OrganizationalNode) => {
    setSelectedNode(node);
    
    // Expandir todos los nodos necesarios para mostrar este nodo
    // Esta funcionalidad requeriría tener una referencia del padre de cada nodo
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
        onEdit={handleEditNode}
      />
    ));
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Panel izquierdo - Vista de árbol */}
      <div className="w-1/4 min-w-80 max-w-96 border-r border-gray-200 bg-white flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Estructura</h2>
            <button
              onClick={handleAddNode}
              className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg"
              title="Agregar nuevo nodo"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Componente de búsqueda separado */}
          <SearchComponent 
            onSearch={handleSearch}
            searchResults={searchResults}
            onSelectNode={handleSelectSearchResult}
            searchTerm={searchTerm}
          />
        </div>

        {/* Contenedor con scroll para el árbol de organización */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <OrganizationalTree
              node={organizationalStructureData.root}
              onSelect={setSelectedNode}
              selectedNode={selectedNode}
              expandedNodes={expandedNodes}
              onToggleExpand={handleNodeToggle}
              onEdit={handleEditNode}
            />
            {organizationalStructureData.children && renderTreeNodes(organizationalStructureData.children)}
          </div>
        </div>
      </div>

      {/* Panel derecho - Detalles */}
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
                  onClick={() => handleEditNode(selectedNode)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                {/* <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configuración</span>
                </button> */}
                <button 
                  onClick={handleDeleteNode}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg" 
                  title="Eliminar"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                          {child.type === 'company' && <Building2 className="w-5 h-5 text-blue-500" />}
                          {child.type === 'branch' && <Building className="w-5 h-5 text-green-500" />}
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

      {/* Formulario Modal */}
      {showForm && (
        <NodeForm
          node={selectedNode}
          parentType={selectedNode?.type}
          onClose={() => {
            setShowForm(false);
          }}
          onSubmit={handleSubmitNode}
        />
      )}

      {/* Toast de notificación */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Modal de confirmación para eliminar */}
      {showDeleteConfirmation && selectedNode && (
        <ConfirmationModal
          title={`Eliminar ${selectedNode.type === 'company' ? 'Compañía' : 
                           selectedNode.type === 'branch' ? 'Sucursal' : 
                           selectedNode.type === 'department' ? 'Departamento' : 
                           selectedNode.type === 'section' ? 'Sección' : 
                           selectedNode.type === 'unit' ? 'Unidad' : 'Nodo'}`}
          message={`¿Está seguro que desea eliminar ${selectedNode.type === 'company' ? 'la compañía' : 
                                                    selectedNode.type === 'branch' ? 'la sucursal' : 
                                                    selectedNode.type === 'department' ? 'el departamento' : 
                                                    selectedNode.type === 'section' ? 'la sección' : 
                                                    selectedNode.type === 'unit' ? 'la unidad' : 'el nodo'} "${selectedNode.name}"? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
          onConfirm={confirmDeleteNode}
          onCancel={() => setShowDeleteConfirmation(false)}
          type="danger"
        />
      )}
    </div>
  );
}