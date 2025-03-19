
import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Users, Shield, Clock, MapPin } from 'lucide-react';
import { Permiso, PermisosFilterState, PaginationState } from './interfaces/permisos';
import { StatusTabs } from './components/Permisos/StatusTabs';
import { PermisosList } from './components/Permisos/PermisosList';
import { PermisoForm } from './components/Permisos/PermisoForm';
import { Pagination } from './components/Permisos/Pagination';
import { mockPermisosData } from './temp/mock-data';

export function PermisosScreen() {
  // Estados para manejar los permisos y la interfaz
  const [permisos, setPermisos] = useState<Permiso[]>(mockPermisosData);
  const [filteredPermisos, setFilteredPermisos] = useState<Permiso[]>(mockPermisosData);
  const [showForm, setShowForm] = useState(false);
  const [selectedPermiso, setSelectedPermiso] = useState<Permiso | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('list');
  
  // Estado para los filtros
  const [filters, setFilters] = useState<PermisosFilterState>({
    searchTerm: '',
    estado: 'todos',
    tipo: 'todos',
    nivel: 'todos'
  });
  
  // Estado para la paginación
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: mockPermisosData.length
  });
  
  // Efectos para aplicar filtros y paginación
  useEffect(() => {
    let result = [...permisos];
    
    // Aplicar filtro de búsqueda
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      result = result.filter(permiso => 
        permiso.nombre.toLowerCase().includes(searchTermLower) || 
        permiso.descripcion.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Aplicar filtro de estado
    if (filters.estado !== 'todos') {
      result = result.filter(permiso => permiso.estado === filters.estado);
    }
    
    // Aplicar filtro de tipo
    if (filters.tipo !== 'todos') {
      result = result.filter(permiso => permiso.tipo === filters.tipo);
    }
    
    // Aplicar filtro de nivel
    if (filters.nivel !== 'todos') {
      result = result.filter(permiso => permiso.nivel === filters.nivel);
    }
    
    setFilteredPermisos(result);
    setPagination(prev => ({ ...prev, total: result.length }));
  }, [permisos, filters]);
  
  // Función para cambiar el estado de los filtros
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (filterKey: keyof PermisosFilterState, value: any) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Resetear a la primera página
  };
  
  // Función para manejar el cambio de página
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };
  
  // Función para manejar el cambio de elementos por página
  const handlePageSizeChange = (newSize: number) => {
    setPagination(prev => ({ ...prev, pageSize: newSize, page: 1 }));
  };
  
  // Función para abrir el formulario
  const handleOpenForm = (permiso?: Permiso) => {
    setSelectedPermiso(permiso || null);
    setShowForm(true);
  };
  
  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPermiso(null);
  };
  
  // Función para guardar un permiso (crear o actualizar)
  const handleSavePermiso = (permiso: Permiso) => {
    if (permiso.id) {
      // Actualizar permiso existente
      setPermisos(prev => prev.map(p => p.id === permiso.id ? permiso : p));
    } else {
      // Crear nuevo permiso
      const newPermiso = {
        ...permiso,
        id: `PERM-${Date.now()}`,
        fechaCreacion: new Date().toISOString(),
        fechaModificacion: new Date().toISOString(),
        creadoPor: 'Usuario Actual',
        modificadoPor: 'Usuario Actual',
        usuariosAsignados: 0
      };
      setPermisos(prev => [...prev, newPermiso]);
    }
    handleCloseForm();
  };
  
  // Función para eliminar un permiso
  const handleDeletePermiso = (id: string) => {
    setPermisos(prev => prev.filter(p => p.id !== id));
  };
  
  // Calcular estadísticas para el dashboard
  const activePermisos = permisos.filter(p => p.estado === 'activo').length;
  const pendingPermisos = permisos.filter(p => p.estado === 'pendiente').length;
  const totalUsers = permisos.reduce((sum, permiso) => sum + permiso.usuariosAsignados, 0);
  const restrictedAreas = [...new Set(permisos.flatMap(p => p.areas).filter(a => a.nivelSeguridad === 'alto' || a.nivelSeguridad === 'critico'))].length;
  
  // Obtener permisos paginados
  const paginatedPermisos = filteredPermisos.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Permisos de Acceso</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestión de permisos y control de acceso
            </p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Permiso</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Permisos activos</p>
                <p className="text-2xl font-semibold text-blue-600">{activePermisos}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Usuarios asignados</p>
                <p className="text-2xl font-semibold text-green-600">{totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pendientes aprobación</p>
                <p className="text-2xl font-semibold text-yellow-600">{pendingPermisos}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Áreas restringidas</p>
                <p className="text-2xl font-semibold text-red-600">{restrictedAreas}</p>
              </div>
              <MapPin className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <StatusTabs 
          activeTab={filters.estado === 'todos' ? 'todos' : filters.estado} 
          totalCount={permisos.length}
          activeCount={activePermisos}
          inactiveCount={permisos.filter(p => p.estado === 'inactivo').length}
          pendingCount={pendingPermisos}
          onTabChange={(tab) => handleFilterChange('estado', tab)}
        />

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o descripción"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={filters.tipo}
                onChange={(e) => handleFilterChange('tipo', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los tipos</option>
                <option value="empleado">Empleados</option>
                <option value="contratista">Contratistas</option>
                <option value="visitante">Visitantes</option>
                <option value="temporal">Temporales</option>
              </select>
              <select
                value={filters.nivel}
                onChange={(e) => handleFilterChange('nivel', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los niveles</option>
                <option value="bajo">Bajo</option>
                <option value="medio">Medio</option>
                <option value="alto">Alto</option>
                <option value="critico">Crítico</option>
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
              <div>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-l-lg border ${viewMode === 'list' 
                    ? 'bg-blue-50 text-blue-600 border-blue-600' 
                    : 'bg-white text-gray-400 border-gray-300'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-r-lg border ${viewMode === 'cards' 
                    ? 'bg-blue-50 text-blue-600 border-blue-600' 
                    : 'bg-white text-gray-400 border-gray-300'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Permisos List Component */}
          <PermisosList 
            permisos={paginatedPermisos}
            viewMode={viewMode}
            onEdit={handleOpenForm}
            onDelete={handleDeletePermiso}
          />
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-200">
            <Pagination 
              currentPage={pagination.page}
              totalPages={Math.ceil(pagination.total / pagination.pageSize)}
              pageSize={pagination.pageSize}
              totalItems={pagination.total}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>

      {/* Permiso Form Modal */}
      {showForm && (
        <PermisoForm
          permiso={selectedPermiso}
          onClose={handleCloseForm}
          onSave={handleSavePermiso}
        />
      )}
    </div>
  );
}