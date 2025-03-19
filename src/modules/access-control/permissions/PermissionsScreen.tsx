import React, { useState, useEffect } from 'react';
import { Permiso,  } from './interfaces/permisos';
import PermisosHeader from './components/Permisos/PermisosHeader';
import PermisosStats from './components/Permisos/PermisosStats';
import { PermisosList } from './components/Permisos/PermisosList';
// import PermisosCardView from './components/Permisos/PermisosCardView';
import { PermisoForm } from './components/Permisos/PermisoForm';
import { mockPermisosData } from './temp/mock-data';
import PermisosCardView from './components/Permisos/PermisosCardView';

const PermisosScreen: React.FC = () => {
  // Estados para manejar los permisos y la interfaz
  const [permisos, setPermisos] = useState<Permiso[]>(mockPermisosData);
  const [filteredPermisos, setFilteredPermisos] = useState<Permiso[]>(mockPermisosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedLevel, setSelectedLevel] = useState('todos');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [showForm, setShowForm] = useState(false);
  const [selectedPermiso, setSelectedPermiso] = useState<Permiso | null>(null);
  
  // Aplicar filtros
  useEffect(() => {
    let result = [...permisos];
    
    // Filtro por término de búsqueda
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(permiso => 
        permiso.nombre.toLowerCase().includes(searchTermLower) || 
        permiso.descripcion.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Filtro por estado
    if (selectedStatus !== 'todos') {
      result = result.filter(permiso => permiso.estado === selectedStatus);
    }
    
    // Filtro por tipo
    if (selectedType !== 'todos') {
      result = result.filter(permiso => permiso.tipo === selectedType);
    }
    
    // Filtro por nivel
    if (selectedLevel !== 'todos') {
      result = result.filter(permiso => permiso.nivel === selectedLevel);
    }
    
    setFilteredPermisos(result);
  }, [permisos, searchTerm, selectedStatus, selectedType, selectedLevel]);
  
  // Calcular estadísticas para el dashboard
  const activePermisos = permisos.filter(p => p.estado === 'activo').length;
  const pendingPermisos = permisos.filter(p => p.estado === 'pendiente').length;
  const inactivePermisos = permisos.filter(p => p.estado === 'inactivo').length;
  const totalUsers = permisos.reduce((sum, permiso) => sum + permiso.usuariosAsignados, 0);
  const restrictedAreas = [...new Set(permisos.flatMap(p => p.areas).filter(a => a.nivelSeguridad === 'alto' || a.nivelSeguridad === 'critico'))].length;
  
  // Manejadores de eventos
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };
  
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value);
  };
  
  const handleNewPermiso = () => {
    setSelectedPermiso(null);
    setShowForm(true);
  };
  
  const handleViewPermiso = (id: string) => {
    const permiso = permisos.find(p => p.id === id);
    if (permiso) {
      setSelectedPermiso(permiso);
      setShowForm(true);
    }
  };
  
  const handleEditPermiso = (id: string) => {
    const permiso = permisos.find(p => p.id === id);
    if (permiso) {
      setSelectedPermiso(permiso);
      setShowForm(true);
    }
  };
  
  const handleDeletePermiso = (id: string) => {
    setPermisos(prev => prev.filter(p => p.id !== id));
  };
  
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
    setShowForm(false);
  };
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header con título, filtros y búsqueda */}
        <PermisosHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onNewClick={handleNewPermiso}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          counts={{
            active: activePermisos,
            inactive: inactivePermisos,
            pending: pendingPermisos,
            total: permisos.length
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          selectedLevel={selectedLevel}
          onLevelChange={handleLevelChange}
        />
        
        {/* Estadísticas */}
        <PermisosStats
          active={activePermisos}
          users={totalUsers}
          pending={pendingPermisos}
          restrictedAreas={restrictedAreas}
        />
        
        {/* Lista o Cards según el modo seleccionado */}
        {viewMode === 'list' ? (
          <PermisosList
            permisos={filteredPermisos}
            onView={handleViewPermiso}
            onEdit={handleEditPermiso}
            onDelete={handleDeletePermiso}
          />
        ) : (
          <PermisosCardView
            permisos={filteredPermisos}
            onView={handleViewPermiso}
            onEdit={handleEditPermiso}
            onDelete={handleDeletePermiso}
          />
        )}
      </div>
      
      {/* Formulario modal */}
      {showForm && (
        <PermisoForm
          permiso={selectedPermiso}
          onClose={() => setShowForm(false)}
          onSave={handleSavePermiso}
        />
      )}
    </div>
  );
};

export default PermisosScreen;