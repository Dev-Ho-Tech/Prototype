import React, { useEffect, useState } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';
import { useCheckProfiles } from './hooks/useCheckProfiles';
import CheckProfileCard from './components/CheckProfileCard';
import CheckProfileModal from './components/CheckProfileModal';
import Pagination from './components/Pagination';
import ExportProfiles from './components/ExportProfiles';

export function CheckProfilesScreen() {
  const {
    profiles,
    allProfiles,
    filteredProfiles,
    selectedProfile,
    isLoading,
    isSubmitting,
    searchTerm,
    selectedType,
    showModal,
    modalMode,
    currentPage,
    totalPages,
    setSearchTerm,
    setSelectedType,
    loadProfiles,
    handlePageChange,
    createProfile,
    updateProfile,
    deleteProfile,
    toggleProfileStatus,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    openViewModal,
    closeModal
  } = useCheckProfiles();

  const [showExportModal, setShowExportModal] = useState(false);

  // Función para manejar el cambio en la búsqueda con debounce
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(debouncedSearchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, setSearchTerm]);

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Perfiles de Marcaje</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los perfiles de marcaje y sus configuraciones
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              onClick={openCreateModal}
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Perfil</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o descripción"
                  value={debouncedSearchTerm}
                  onChange={(e) => setDebouncedSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los tipos</option>
                <option value="attendance">Asistencia</option>
                <option value="access">Acceso</option>
                <option value="dining">Comedor</option>
              </select>
              <button 
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={loadProfiles}
                title="Recargar perfiles"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              <span className="ml-2 text-gray-600">Cargando perfiles...</span>
            </div>
          ) : profiles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {profiles.map((profile) => (
                  <CheckProfileCard
                    key={profile.id}
                    profile={profile}
                    onView={openViewModal}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                    onToggleStatus={toggleProfileStatus}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="border-t border-gray-200 p-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              {filteredProfiles.length === 0 && allProfiles.length > 0 ? (
                <>
                  <p className="text-gray-500 mb-4">No se encontraron perfiles que coincidan con los criterios de búsqueda</p>
                  <button
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-4"
                    onClick={() => {
                      setDebouncedSearchTerm('');
                      setSelectedType('all');
                    }}
                  >
                    Limpiar filtros
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-500 mb-4">No hay perfiles de marcaje creados</p>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                    onClick={openCreateModal}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear nuevo perfil
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <CheckProfileModal
        isOpen={showModal}
        onClose={closeModal}
        mode={modalMode}
        profile={selectedProfile}
        isSubmitting={isSubmitting}
        onSubmit={modalMode === 'create' 
          ? createProfile 
          : (data) => selectedProfile ? updateProfile(selectedProfile.id, data) : Promise.resolve(false)
        }
        onDelete={(id) => deleteProfile(id)}
      />

      <ExportProfiles
        profiles={filteredProfiles}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}

export default CheckProfilesScreen;