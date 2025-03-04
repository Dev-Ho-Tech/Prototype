/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Building2, ChevronDown, Search, X } from 'lucide-react';
import { deviceTypes, estructuras } from '../data';
import { Device } from '../interfaces/device';

interface EstructuraSeleccionada {
  id: string;
  name: string;
  type: string;
  path: string;
}

interface DeviceFormProps {
  device?: Device;
  onClose: () => void;
}

export function DeviceForm({ device, onClose }: DeviceFormProps) {
  const [formData, setFormData] = useState<Partial<Device>>(
    device || {
      name: '',
      serialNumber: '',
      brand: '',
      model: '',
      type: 'biometric',
      ip: '',
      subnet: '255.255.255.0',
      location: '',
      timezone: 'America/Santo_Domingo',
      operationMode: 'attendance',
      capacity: {
        total: 3000,
        used: 0,
        type: 'fingerprints'
      },
      // Nuevos campos para la estructura asignada
      estructuraId: '',
      estructuraNombre: ''
    }
  );

  // Estado para controlar la visibilidad del modal de selección de estructura
  const [showStructureModal, setShowStructureModal] = useState(false);
  // Estado para el término de búsqueda en el modal
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para las estructuras desplegadas en el árbol
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['caldelpa-empresas']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Formulario enviado con:', formData);
    onClose();
  };

  // Función para seleccionar una estructura
  const handleSelectEstructura = (estructura: EstructuraSeleccionada) => {
    setFormData({
      ...formData,
      estructuraId: estructura.id,
      estructuraNombre: estructura.name,
      // Podríamos guardar también la ruta completa
      location: estructura.path
    });
    setShowStructureModal(false);
  };

  // Función para alternar la expansión de un nodo
  const toggleNodeExpansion = (nodeId: string) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  // Componente recursivo para renderizar el árbol de estructuras
  const renderTree = (node: any, path = '', level = 0) => {
    const currentPath = path ? `${path} > ${node.name}` : node.name;
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    
    // Filtro para búsqueda
    const matchesSearch = searchTerm === '' || 
      node.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Verificar si algún hijo coincide con la búsqueda
    const childrenMatch = node.children && node.children.some((child: any) => {
      return child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (child.children && child.children.some((grandchild: any) => 
          grandchild.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    });
    
    // Si no coincide con la búsqueda y no tiene hijos que coincidan, no mostrar
    if (searchTerm !== '' && !matchesSearch && !childrenMatch) {
      return null;
    }

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center py-2 ${level > 0 ? 'ml-6' : ''}`}
        >
          {hasChildren && (
            <button
              type="button"
              onClick={() => toggleNodeExpansion(node.id)}
              className="w-5 h-5 flex items-center justify-center mr-1 rounded hover:bg-gray-100"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  isExpanded ? 'transform rotate-180' : ''
                }`}
              />
            </button>
          )}
          {!hasChildren && <div className="w-5 mr-1"></div>}
          
          <div 
            className="flex items-center flex-1 cursor-pointer hover:bg-gray-50 p-1 rounded"
            onClick={() => handleSelectEstructura({
              id: node.id,
              name: node.name,
              type: node.type,
              path: currentPath
            })}
          >
            <div className="p-1 rounded-md mr-2 bg-blue-100">
              <Building2 className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-sm font-medium">
              {node.name}
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-2 pl-4 border-l border-gray-200">
            {node.children.map((child: any) => renderTree(child, currentPath, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {device ? 'Editar Dispositivo' : 'Nuevo Dispositivo'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Sección: Información básica */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                  <span className="text-xs">1</span>
                </div>
                <h3 className="text-md font-medium text-gray-700">
                  Información básica
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nombre del dispositivo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tipo de dispositivo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Device['type'] })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    {deviceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Modelo
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese modelo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Número de serie
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese número de serie"
                  />
                </div>
              </div>
            </div>

            {/* Sección: Configuración de estructura (reemplazando la sección de red) */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                  <span className="text-xs">2</span>
                </div>
                <h3 className="text-md font-medium text-gray-700">
                  Asignación de estructura
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Seleccionar estructura
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowStructureModal(true)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-left hover:bg-gray-50 flex justify-between items-center"
                  >
                    {formData.estructuraNombre || "Seleccione sede o departamento"}
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.location || "No se ha seleccionado ninguna estructura"}
                  </p>
                </div>
              </div>
            </div>

            {/* Sección: Configuración operativa */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                  <span className="text-xs">3</span>
                </div>
                <h3 className="text-md font-medium text-gray-700">
                  Configuración operativa
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ubicación física
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese ubicación"
                    disabled={!!formData.estructuraNombre}
                    title={formData.estructuraNombre ? "Este campo se actualiza al seleccionar una estructura" : ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Zona horaria
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="America/Santo_Domingo">America/Santo_Domingo (GMT-4)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Capacidad máxima
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={formData.capacity?.total}
                      onChange={(e) => setFormData({
                        ...formData,
                        capacity: { ...formData.capacity!, total: parseInt(e.target.value) }
                      })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <select
                      value={formData.capacity?.type}
                      onChange={(e) => setFormData({
                        ...formData,
                        capacity: { ...formData.capacity!, type: e.target.value as unknown as Device['capacity']['type'] }
                      })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="fingerprints">Huellas</option>
                      <option value="faces">Rostros</option>
                      <option value="users">Usuarios</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {device ? 'Guardar cambios' : 'Crear dispositivo'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para seleccionar estructura */}
      {showStructureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            {/* Cabecera del modal */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Seleccionar estructura
              </h2>
              <button
                onClick={() => setShowStructureModal(false)}
                className="text-gray-400 hover:text-gray-500"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Cuerpo del modal */}
            <div className="p-4 flex-1 overflow-hidden flex flex-col">
              {/* Búsqueda */}
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar estructura..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Árbol de estructuras */}
              <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-2">
                {estructuras.map(estructura => renderTree(estructura))}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Seleccione una estructura para asignar el dispositivo
              </div>
            </div>
            
            {/* Pie del modal */}
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowStructureModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}