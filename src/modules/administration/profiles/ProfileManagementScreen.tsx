import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { ProfileItem } from './components/ProfileItem';
import { ProfileForm } from './components/ProfileForm';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { Profile } from './interfaces/Profile';
import { profilesData } from './temp/profilesData';

export function ProfileManagementScreen() {
  const [profiles, setProfiles] = useState<Profile[]>(profilesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredProfiles = profiles.filter(
    profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setIsEditing(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedProfile) {
      setProfiles(profiles.filter(profile => profile.id !== selectedProfile.id));
      setDeleteModalOpen(false);
      setSelectedProfile(null);
    }
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    if (isEditing) {
      setProfiles(
        profiles.map(profile => 
          profile.id === updatedProfile.id ? updatedProfile : profile
        )
      );
      setIsEditing(false);
    } else {
      setProfiles([...profiles, updatedProfile]);
      setIsCreating(false);
    }
    setSelectedProfile(null);
  };

  const handleCancelForm = () => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedProfile(null);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
  };

  // Si estamos en modo de edición o creación, mostrar el formulario
  if (isEditing || isCreating) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
        <ProfileForm
          profile={selectedProfile || undefined}
          onSave={handleSaveProfile}
          onCancel={handleCancelForm}
          isEditMode={isEditing}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header con título y botón de nuevo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Perfiles</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administra los perfiles de permisos que pueden asignarse a los usuarios
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleCreateNew}
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span>Nuevo Perfil</span>
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tabla de perfiles */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perfil
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuarios Asignados
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map(profile => (
                  <ProfileItem
                    key={profile.id}
                    profile={profile}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron perfiles que coincidan con la búsqueda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal de confirmación de eliminación */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          profileName={selectedProfile?.name || ''}
        />
      </div>
    </div>
  );
}