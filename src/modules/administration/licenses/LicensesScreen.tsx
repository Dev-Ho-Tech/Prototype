import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Building2, Users, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { licensesData } from './data';
import { LicenseForm } from './LicenseForm';
import type { License } from '../../../types';

export function LicensesScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  const filteredLicenses = licensesData.filter(license =>
    license.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.rnc.includes(searchTerm)
  );

  const handleEdit = (license: License) => {
    setSelectedLicense(license);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedLicense(null);
    setShowForm(false);
  };

  const getExpirationStatus = (date: string) => {
    const expirationDate = new Date(date);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return 'danger';
    if (diffDays <= 90) return 'warning';
    return 'success';
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Control de Tiempo':
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      case 'Control de Accesos':
        return <Building2 className="w-5 h-5 text-green-500" />;
      case 'Control de Comedor':
        return <Users className="w-5 h-5 text-amber-500" />;
      case 'Control de Capacitación':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };  

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Licencias</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administra las licencias y permisos de las empresas
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Licencia</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por empresa, ID o RNC"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID/Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compañías
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empleados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vencimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Módulos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLicenses.map((license) => (
                  <tr key={license.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{license.companyName}</div>
                          <div className="text-sm text-gray-500">
                            {license.id} • RNC: {license.rnc}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.usedCompanies}/{license.allowedCompanies}</div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(license.usedCompanies / license.allowedCompanies) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.activeEmployees}/{license.allowedEmployees}</div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(license.activeEmployees / license.allowedEmployees) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getExpirationStatus(license.expirationDate) === 'danger'
                          ? 'bg-red-100 text-red-800'
                          : getExpirationStatus(license.expirationDate) === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {new Date(license.expirationDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {license.modules.map((module) => (
                          <div key={module} className="tooltip" data-tip={module}>
                            {getModuleIcon(module)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        license.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {license.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(license)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <LicenseForm license={selectedLicense} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
}