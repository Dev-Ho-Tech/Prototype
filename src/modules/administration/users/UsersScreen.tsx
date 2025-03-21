import React, { useState } from 'react';
import { Plus, Shield, Clock, Building2, Key, UserCog, XCircle, CheckCircle2, MoreVertical } from 'lucide-react';
import { usersData, roles } from './temp/data';
import { UserForm } from './UserForm';
import type { User } from './interfaces/user';

// Componentes reutilizables
import UsersSummary from './components/UsersSummary';
import Filters from './components/screen_components/Filters';
import SortableTable, { ColumnDefinition } from './components/screen_components/SortableTable';
import Pagination from './components/screen_components/Pagination';
import UserGrid from './components/UserGrid';
import UserContextMenu from './components/UserContextMenu';

export function UsersScreen() {
  // Estados básicos
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Estados para filtrado avanzado
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  
  // Estado para vista y ordenamiento
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortKey, setSortKey] = useState<string>('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  
  // Estado para menú contextual
  const [contextMenuUser, setContextMenuUser] = useState<User | null>(null);

  // Obtener todos los departamentos únicos para el filtro
  // const allDepartments = Array.from(
  //   new Set(
  //     usersData.flatMap(user => user.departments)
  //   )
  // ).sort();

  // Filtrar usuarios según los criterios seleccionados
  const filteredUsers = usersData.filter(user => {
    // Filtro por término de búsqueda
    const matchesSearch = 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por rol
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    // Filtro por estado
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    // Filtro por departamento
    const matchesDepartment = filterDepartment === 'all' || user.departments.includes(filterDepartment);
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });
  
  // Calcular los usuarios paginados (para la vista de lista)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Opciones de filtro para el componente Filters
  const filterOptions = {
    role: {
      label: 'Rol',
      options: [
        { value: 'all', label: 'Todos los roles' },
        ...roles.map(role => ({ value: role.value, label: role.label }))
      ]
    },
    status: {
      label: 'Estado',
      options: [
        { value: 'all', label: 'Todos los estados' },
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    },
    // department: {
    //   label: 'Departamento',
    //   options: [
    //     { value: 'all', label: 'Todos los departamentos' },
    //     ...allDepartments.map(dept => ({ value: dept, label: dept }))
    //   ]
    // }
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (filterName: string, value: string) => {
    switch (filterName) {
      case 'role':
        setFilterRole(value);
        break;
      case 'status':
        setFilterStatus(value);
        break;
      case 'department':
        setFilterDepartment(value);
        break;
    }
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1);
  };

  // Función para restablecer todos los filtros
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterRole('all');
    setFilterStatus('all');
    setFilterDepartment('all');
    setCurrentPage(1);
  };

  // Funciones para manejar la edición
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  // Funciones para manejar el menú contextual
  const handleOpenContextMenu = (user: User, e: React.MouseEvent) => {
    e.stopPropagation();
    // Cerrar menú si ya está abierto para el mismo usuario
    if (contextMenuUser && contextMenuUser.id === user.id) {
      setContextMenuUser(null);
    } else {
      setContextMenuUser(user);
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenuUser(null);
  };

  // Función para manejar clic en el usuario
  const handleUserClick = (user: User) => {
    handleEdit(user);
  };

  // Funciones para operaciones específicas
  const handleResetPassword = (user: User) => {
    console.log('Restablecer contraseña para:', user.email);
    // Implementar lógica de restablecimiento
  };

  const handleViewHistory = (user: User) => {
    console.log('Ver historial de:', user.email);
    // Implementar lógica para mostrar historial
  };

  const handleChangeStatus = (user: User) => {
    console.log('Cambiar estado de usuario:', user.email, 'a', user.status === 'active' ? 'inactive' : 'active');
    // Implementar lógica para cambiar estado
  };

  const handleExportData = (user: User) => {
    console.log('Exportar datos de usuario:', user.email);
    // Implementar lógica de exportación
  };

  // Mapeo de colores para roles
  const roleColors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800',
    supervisor: 'bg-blue-100 text-blue-800',
    manager: 'bg-green-100 text-green-800',
    user: 'bg-gray-100 text-gray-800'
  };

  // Función para obtener etiqueta de rol
  const getRoleLabel = (role: string) => {
    return roles.find(r => r.value === role)?.label || role;
  };

  // Definición de columnas para la tabla ordenable
  const columns: ColumnDefinition<User>[] = [
    {
      key: 'name',
      header: 'Usuario',
      sortable: true,
      sortKey: (user) => `${user.firstName} ${user.lastName}`,
      render: (user) => (
        <div className="flex items-center">
          <img
            src={user.avatar || 'https://via.placeholder.com/40'}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Rol/Departamentos',
      sortable: true,
      render: (user) => (
        <>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
            {getRoleLabel(user.role)}
          </span>
          <div className="mt-1 text-sm text-gray-500">
            {user.departments.join(', ')}
          </div>
        </>
      )
    },
    {
      key: 'permissions',
      header: 'Permisos',
      sortable: false,
      render: (user) => (
        <div className="flex space-x-2">
          {user.permissions.approveHours && (
            <div className="tooltip" data-tip="Aprobar horas">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          )}
          {user.permissions.modifyChecks && (
            <div className="tooltip" data-tip="Modificar registros">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
          )}
          {user.permissions.manageReports && (
            <div className="tooltip" data-tip="Administrar reportes">
              <Building2 className="w-5 h-5 text-amber-500" />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'lastLogin',
      header: 'Último acceso',
      sortable: true,
      render: (user) => (
        <span className="text-sm text-gray-500">
          {new Date(user.lastLogin).toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Estado',
      sortable: true,
      render: (user) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Acciones',
      sortable: false,
      align: 'right',
      cellClassName: 'stopPropagation',
      render: (user) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(user);
            }}
            className="text-blue-600 hover:text-blue-900"
            title="Editar usuario"
          >
            <UserCog className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleResetPassword(user);
            }}
            className="text-amber-600 hover:text-amber-900"
            title="Restablecer contraseña"
          >
            <Key className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleChangeStatus(user);
            }}
            className={`${
              user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
            }`}
            title={user.status === 'active' ? 'Desactivar usuario' : 'Activar usuario'}
          >
            {user.status === 'active' ? (
              <XCircle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </button>
          <button
              onClick={(e) => handleOpenContextMenu(user, e)}
              className="text-gray-500 hover:text-gray-700"
              title="Más acciones"
            >
              <MoreVertical className="h-5 w-5" />
          </button>
          {contextMenuUser && contextMenuUser.id === user.id && (
            <UserContextMenu
              user={user}
              isOpen={true}
              onClose={handleCloseContextMenu}
              onEdit={handleEdit}
              onResetPassword={handleResetPassword}
              onViewHistory={handleViewHistory}
              onChangeStatus={handleChangeStatus}
              onExportData={handleExportData}
            />
          )}
        </div>
      )
    }
  ];

  // Renderizar menú contextual para la vista de cuadrícula
  const renderContextMenu = (user: User) => (
    <UserContextMenu
      user={user}
      isOpen={true}
      onClose={handleCloseContextMenu}
      onEdit={handleEdit}
      onResetPassword={handleResetPassword}
      onViewHistory={handleViewHistory}
      onChangeStatus={handleChangeStatus}
      onExportData={handleExportData}
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
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Usuarios</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administra los usuarios y sus permisos en el sistema
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {/* Resumen de usuarios */}
        <UsersSummary users={usersData} />

        {/* Componente de filtros */}
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por nombre o correo"
          filterValues={{
            role: filterRole,
            status: filterStatus,
            department: filterDepartment
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
              data={paginatedUsers}
              columns={columns}
              keyExtractor={(user) => user.id}
              emptyMessage="No se encontraron usuarios con los filtros seleccionados."
              onRowClick={handleUserClick}
              initialSortKey={sortKey}
              initialSortDirection={sortDirection}
              onSort={handleSort}
            />
            
            {/* Paginación para la vista de lista */}
            <div className="p-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredUsers.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                itemsPerPageOptions={[10, 25, 50, 100]}
              />
            </div>
          </div>
        ) : (
          <UserGrid
            users={filteredUsers}
            onCardClick={handleUserClick}
            onMenuClick={handleOpenContextMenu}
            contextMenuUser={contextMenuUser}
            renderContextMenu={renderContextMenu}
            emptyMessage="No se encontraron usuarios con los filtros seleccionados."
            roleColors={roleColors}
            getRoleLabel={getRoleLabel}
          />
        )}
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <UserForm user={selectedUser} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
}