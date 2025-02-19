import React, { useState } from 'react';
import { Search, Plus, ChevronRight, Building2, Users, MapPin, Phone, Mail, Globe2, ChevronDown, MoreVertical, Edit, Trash, Settings } from 'lucide-react';
import { CompanyForm } from './CompanyForm';
import { companiesData } from './data';
import type { Company, Department } from '../../../types';

export function CompaniesScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const handleNodeToggle = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const renderTreeNode = (
    node: Company | Department,
    level: number = 0,
    parentPath: string = ''
  ) => {
    const currentPath = parentPath ? `${parentPath}-${node.id}` : node.id;
    const isExpanded = expandedNodes.includes(currentPath);
    const hasChildren = 'departments' in node && node.departments.length > 0;

    return (
      <div key={node.id} className="select-none">
        <div
          onClick={() => {
            if ('departments' in node) {
              setSelectedCompany(node);
            }
            if (hasChildren) {
              handleNodeToggle(currentPath);
            }
          }}
          className={`
            w-full text-left px-2 py-2 hover:bg-gray-50 rounded-lg
            flex items-center space-x-2 cursor-pointer
            ${selectedCompany?.id === node.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
          `}
          style={{ paddingLeft: `${(level * 1.5) + 0.5}rem` }}
        >
          {hasChildren ? (
            <ChevronRight
              className={`w-4 h-4 transition-transform flex-shrink-0 ${
                isExpanded ? 'transform rotate-90' : ''
              }`}
            />
          ) : (
            <div className="w-4" />
          )}
          
          {'departments' in node ? (
            <Building2 className="w-4 h-4 text-gray-400" />
          ) : (
            <Users className="w-4 h-4 text-gray-400" />
          )}
          
          <span className="flex-1 truncate text-sm">
            {node.name}
          </span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle more actions
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {hasChildren && isExpanded && 'departments' in node && (
          <div className="ml-4">
            {node.departments.map(dept =>
              renderTreeNode(dept, level + 1, currentPath)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Left Panel - Tree View */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Estructura</h2>
            <button
              onClick={() => {
                setSelectedCompany(null);
                setShowForm(true);
              }}
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
          {companiesData.map(company => renderTreeNode(company))}
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {selectedCompany ? (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {selectedCompany.logo ? (
                      <img
                        src={selectedCompany.logo}
                        alt={selectedCompany.name}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {selectedCompany.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                      RNC: {selectedCompany.rnc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowForm(true)}
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
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">{selectedCompany.address}</p>
                      <p className="text-sm text-gray-500">{selectedCompany.city}, {selectedCompany.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedCompany.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedCompany.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe2 className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedCompany.website}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Configuración regional
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Zona horaria</p>
                    <p className="text-sm text-gray-900">{selectedCompany.timezone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Moneda</p>
                    <p className="text-sm text-gray-900">{selectedCompany.currency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Idioma</p>
                    <p className="text-sm text-gray-900">{selectedCompany.language}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Estadísticas
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Total de empleados</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {selectedCompany.stats.totalEmployees}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departamentos</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {selectedCompany.departments.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sucursales</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {selectedCompany.stats.totalLocations}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">
                  Departamentos
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {selectedCompany.departments.map((dept) => (
                  <div key={dept.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {dept.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {dept.manager}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          {dept.employeeCount} empleados
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Selecciona una compañía para ver sus detalles
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <CompanyForm
              company={selectedCompany}
              onClose={() => {
                setShowForm(false);
                setSelectedCompany(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}