import React, { useState } from 'react';
import { Plus, Building2, Users, Calendar, CheckCircle2, FileEdit, MoreVertical } from 'lucide-react';
import { licensesData } from './temp/data';
import { LicenseForm } from './LicenseForm';
import type { License } from './interfaces/license';

// Componentes reutilizables
import Filters from './components/screen_components/Filters';
import SortableTable, { ColumnDefinition } from './components/screen_components/SortableTable';
import Pagination from './components/screen_components//Pagination';
import LicenseGrid from './components/LicenseGrid';
import LicenseContextMenu from './components/LicenseContextMenu';
import LicensesSummary from './components/LicensesSummary';

export function LicensesScreen() {
  // Estados básicos
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  
  // Estados para filtrado avanzado
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterModule, setFilterModule] = useState('all');
  const [filterExpiration, setFilterExpiration] = useState('all');
  
  // Estado para vista y ordenamiento
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortKey, setSortKey] = useState<string>('companyName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  
  // Estado para menú contextual
  const [contextMenuLicense, setContextMenuLicense] = useState<License | null>(null);

  // Filtrar licencias según los criterios seleccionados
  const filteredLicenses = licensesData.filter(license => {
    // Filtro por término de búsqueda
    const matchesSearch = 
      license.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.rnc.includes(searchTerm);
    
    // Filtro por estado
    const matchesStatus = 
      filterStatus === 'all' || license.status === filterStatus;
    
    // Filtro por módulo
    const matchesModule = 
      filterModule === 'all' || license.modules.includes(filterModule);
    
    // Filtro por vencimiento
    const matchesExpiration = filterExpiration === 'all' || (() => {
      const expirationDate = new Date(license.expirationDate);
      const today = new Date();
      const diffTime = expirationDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (filterExpiration) {
        case 'danger': return diffDays <= 30;
        case 'warning': return diffDays > 30 && diffDays <= 90;
        case 'safe': return diffDays > 90;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesModule && matchesExpiration;
  });
  
  // Calcular las licencias paginadas (para la vista de lista)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLicenses = filteredLicenses.slice(startIndex, endIndex);

  // Opciones de filtro para el componente Filters
  const filterOptions = {
    status: {
      label: 'Estado',
      options: [
        { value: 'all', label: 'Todos los estados' },
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    },
    // module: {
    //   label: 'Módulo',
    //   options: [
    //     { value: 'all', label: 'Todos los módulos' },
    //     { value: 'Control de Accesos', label: 'Control de Accesos' },
    //     { value: 'Control de Tiempo', label: 'Control de Tiempo' },
    //     { value: 'Control de Comedor', label: 'Control de Comedor' },
    //     { value: 'Control de Capacitación', label: 'Control de Capacitación' }
    //   ]
    // },
    expiration: {
      label: 'Vencimiento',
      options: [
        { value: 'all', label: 'Proximos a vencer' },
        { value: 'danger', label: 'Crítico (< 30 días)' },
        { value: 'warning', label: 'Próximo (< 90 días)' },
        { value: 'safe', label: 'Seguro (> 90 días)' }
      ]
    }
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (filterName: string, value: string) => {
    switch (filterName) {
      case 'status':
        setFilterStatus(value);
        break;
      case 'module':
        setFilterModule(value);
        break;
      case 'expiration':
        setFilterExpiration(value);
        break;
    }
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1);
  };

  // Función para restablecer todos los filtros
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterModule('all');
    setFilterExpiration('all');
    setCurrentPage(1);
  };

  // Funciones para manejar la edición
  const handleEdit = (license: License) => {
    setSelectedLicense(license);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedLicense(null);
    setShowForm(false);
  };

  // Funciones para manejar el menú contextual
  const handleOpenContextMenu = (license: License, e: React.MouseEvent) => {
    e.stopPropagation();
    // Cerrar menú si ya está abierto para la misma licencia
    if (contextMenuLicense && contextMenuLicense.id === license.id) {
      setContextMenuLicense(null);
    } else {
      setContextMenuLicense(license);
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenuLicense(null);
  };

  // Función para manejar clic en la licencia
  const handleLicenseClick = (license: License) => {
    handleEdit(license);
  };

  // Funciones para operaciones específicas
  const handleRenewLicense = (license: License) => {
    console.log('Renovar licencia:', license.id);
    // Implementar lógica de renovación
  };

  const handleExportLicense = (license: License) => {
    console.log('Exportar datos de licencia:', license.id);
    // Implementar lógica de exportación
  };

  const handleLicenseHistory = (license: License) => {
    console.log('Ver historial de licencia:', license.id);
    // Implementar lógica para mostrar historial
  };

  const handleDeleteLicense = (license: License) => {
    console.log('Eliminar licencia:', license.id);
    // Implementar lógica de eliminación
  };

  // Funciones auxiliares para renderizar estados y elementos visuales
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

  // Definición de columnas para la tabla ordenable
  const columns: ColumnDefinition<License>[] = [
    {
      key: 'companyName',
      header: 'ID/Empresa',
      sortable: true,
      render: (license) => (
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
      )
    },
    {
      key: 'usedCompanies',
      header: 'Compañías',
      sortable: true,
      sortKey: (license) => license.usedCompanies / license.allowedCompanies,
      render: (license) => (
        <>
          <div className="text-sm text-gray-900">{license.usedCompanies}/{license.allowedCompanies}</div>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(license.usedCompanies / license.allowedCompanies) * 100}%` }}
            />
          </div>
        </>
      )
    },
    {
      key: 'activeEmployees',
      header: 'Empleados',
      sortable: true,
      sortKey: (license) => license.activeEmployees / license.allowedEmployees,
      render: (license) => (
        <>
          <div className="text-sm text-gray-900">{license.activeEmployees}/{license.allowedEmployees}</div>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(license.activeEmployees / license.allowedEmployees) * 100}%` }}
            />
          </div>
        </>
      )
    },
    {
      key: 'expirationDate',
      header: 'Vencimiento',
      sortable: true,
      render: (license) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          getExpirationStatus(license.expirationDate) === 'danger'
            ? 'bg-red-100 text-red-800'
            : getExpirationStatus(license.expirationDate) === 'warning'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {new Date(license.expirationDate).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'modules',
      header: 'Módulos',
      sortable: false,
      render: (license) => (
        <div className="flex space-x-2">
          {license.modules.map((module) => (
            <div key={module} className="tooltip" data-tip={module}>
              {getModuleIcon(module)}
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Estado',
      sortable: true,
      render: (license) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          license.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {license.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Acciones',
      sortable: false,
      align: 'right',
      cellClassName: 'stopPropagation',
      render: (license) => (
        <div className="flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(license);
            }}
            className="text-blue-600 hover:text-blue-900 mr-3"
          >
            <FileEdit className="w-5 h-5" />
          </button>
          
          <button
              onClick={(e) => handleOpenContextMenu(license, e)}
              className="text-gray-500 hover:text-gray-700"
              title="Más acciones"
            >
              <MoreVertical className="h-5 w-5" />
          </button>
          {contextMenuLicense && contextMenuLicense.id === license.id && (
            <LicenseContextMenu
              license={license}
              isOpen={true}
              onClose={handleCloseContextMenu}
              onEdit={handleEdit}
              onRenew={handleRenewLicense}
              onExport={handleExportLicense}
              onHistory={handleLicenseHistory}
              onDelete={handleDeleteLicense}
            />
          )}
        </div>
      )
    }
  ];

  // Renderizar menú contextual para la vista de cuadrícula
  const renderContextMenu = (license: License) => (
    <LicenseContextMenu
      license={license}
      isOpen={true}
      onClose={handleCloseContextMenu}
      onEdit={handleEdit}
      onRenew={handleRenewLicense}
      onExport={handleExportLicense}
      onHistory={handleLicenseHistory}
      onDelete={handleDeleteLicense}
    />
  );

  // Función para manejar el cambio de ordenamiento
  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
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

        {/* Añadimos el resumen de licencias */}
        <LicensesSummary licenses={licensesData} />

        {/* Componente de filtros */}
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por empresa, ID o RNC"
          filterValues={{
            status: filterStatus,
            module: filterModule,
            expiration: filterExpiration
          }}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={handleResetFilters}
        />

        {/* Contenido principal - Según el modo de vista */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-lg shadow">
            <SortableTable
              data={paginatedLicenses}
              columns={columns}
              keyExtractor={(license) => license.id}
              emptyMessage="No se encontraron licencias con los filtros seleccionados."
              onRowClick={handleLicenseClick}
              initialSortKey={sortKey}
              initialSortDirection={sortDirection}
              onSort={handleSort}
            />
            
            {/* Paginación para la vista de lista */}
            <div className="p-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredLicenses.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                itemsPerPageOptions={[10, 25, 50, 100]}
              />
            </div>
          </div>
        ) : (
          <LicenseGrid
            licenses={filteredLicenses}
            onCardClick={handleLicenseClick}
            onMenuClick={handleOpenContextMenu}
            contextMenuLicense={contextMenuLicense}
            renderContextMenu={renderContextMenu}
            emptyMessage="No se encontraron licencias con los filtros seleccionados."
          />
        )}
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <LicenseForm license={selectedLicense} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
}