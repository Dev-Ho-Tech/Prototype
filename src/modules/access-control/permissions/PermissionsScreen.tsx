import React, { useState } from 'react';
import { Search, Plus, Filter, Users, Shield, Clock, MapPin, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { accessProfilesData, accessRequestsData } from './data';
import { AccessProfileForm } from './components/AccessProfileForm';
import { AccessRequestForm } from './components/AccessRequestForm';
import type { AccessProfile, AccessRequest } from '../../../types';

export function PermissionsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<AccessProfile | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'profiles' | 'requests'>('profiles');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'inactive':
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Permisos de Acceso</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestión de perfiles y solicitudes de acceso
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowRequestForm(true)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Solicitud</span>
            </button>
            <button
              onClick={() => setShowProfileForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Perfil</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Perfiles activos</p>
                <p className="text-2xl font-semibold text-blue-600">12</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Usuarios asignados</p>
                <p className="text-2xl font-semibold text-green-600">450</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Solicitudes pendientes</p>
                <p className="text-2xl font-semibold text-yellow-600">8</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Áreas restringidas</p>
                <p className="text-2xl font-semibold text-red-600">15</p>
              </div>
              <MapPin className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('profiles')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'profiles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Perfiles de Acceso
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Solicitudes
              </button>
            </nav>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={activeTab === 'profiles' ? "Buscar por nombre o tipo" : "Buscar por solicitante o perfil"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {activeTab === 'profiles' ? (
                  <>
                    <option value="all">Todos los tipos</option>
                    <option value="employee">Empleados</option>
                    <option value="contractor">Contratistas</option>
                    <option value="visitor">Visitantes</option>
                    <option value="temporary">Temporales</option>
                  </>
                ) : (
                  <>
                    <option value="all">Todos los estados</option>
                    <option value="pending">Pendientes</option>
                    <option value="approved">Aprobadas</option>
                    <option value="rejected">Rechazadas</option>
                  </>
                )}
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {activeTab === 'profiles' ? (
            <div className="grid grid-cols-3 gap-6 p-6">
              {accessProfilesData.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {profile.description}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(profile.status)
                      }`}>
                        {profile.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">Usuarios asignados</span>
                        </div>
                        <span className="font-medium">{profile.assignedUsers}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">Áreas permitidas</span>
                        </div>
                        <span className="font-medium">{profile.areas.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">Última modificación</span>
                        </div>
                        <span className="font-medium">
                          {new Date(profile.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setSelectedProfile(profile);
                          setShowProfileForm(true);
                        }}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Configurar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Solicitante
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Perfil
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documentos
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accessRequestsData.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.requesterName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.requesterDepartment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.type === 'new' ? 'bg-green-100 text-green-800' :
                          request.type === 'modification' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.type === 'new' ? 'Nuevo' :
                           request.type === 'modification' ? 'Modificación' :
                           'Revocación'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.profile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(request.status)}
                          <span className={`ml-2 inline-flex text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status === 'pending' ? 'Pendiente' :
                             request.status === 'approved' ? 'Aprobado' :
                             'Rechazado'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.documents.length > 0 ? (
                          <div className="flex -space-x-2">
                            {request.documents.map((doc, index) => (
                              <button
                                key={index}
                                className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                                title={doc.name}
                              >
                                <FileText className="w-4 h-4 text-gray-600" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Sin documentos</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowRequestForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver detalles
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button className="text-green-600 hover:text-green-900">
                                Aprobar
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Rechazar
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Forms */}
      {showProfileForm && (
        <AccessProfileForm
          profile={selectedProfile}
          onClose={() => {
            setShowProfileForm(false);
            setSelectedProfile(null);
          }}
        />
      )}
      {showRequestForm && (
        <AccessRequestForm
          request={selectedRequest}
          onClose={() => {
            setShowRequestForm(false);
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
}