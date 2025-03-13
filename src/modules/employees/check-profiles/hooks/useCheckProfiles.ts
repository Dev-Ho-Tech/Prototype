import { useState, useEffect, useCallback } from 'react';
import { CheckProfile, CheckProfileFormData } from '../interfaces/CheckProfile';
import { toast } from 'react-hot-toast';
import { checkProfilesService } from '../services/checkProfilesService';

interface UseCheckProfilesProps {
  initialSearchTerm?: string;
  initialType?: string;
  itemsPerPage?: number;
}

export const useCheckProfiles = ({ 
  initialSearchTerm = '', 
  initialType = 'all',
  itemsPerPage = 9
}: UseCheckProfilesProps = {}) => {
  const [allProfiles, setAllProfiles] = useState<CheckProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<CheckProfile[]>([]);
  const [paginatedProfiles, setPaginatedProfiles] = useState<CheckProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<CheckProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete' | 'view'>('create');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Cargar perfiles iniciales
  const loadProfiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await checkProfilesService.getAll();
      setAllProfiles(data);
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast.error('Error al cargar los perfiles de marcaje');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto para cargar los perfiles al montar el componente
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  // Filtrar perfiles
  useEffect(() => {
    // Aplicar filtros
    let result = [...allProfiles];
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        profile => 
          profile.name.toLowerCase().includes(lowerSearchTerm) || 
          profile.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    if (selectedType !== 'all') {
      result = result.filter(profile => profile.type === selectedType);
    }
    
    setFilteredProfiles(result);
    
    // Actualizar total de páginas
    setTotalPages(Math.max(1, Math.ceil(result.length / itemsPerPage)));
    
    // Si la página actual es mayor que el total de páginas, ajustar a la última página
    if (currentPage > Math.max(1, Math.ceil(result.length / itemsPerPage))) {
      setCurrentPage(Math.max(1, Math.ceil(result.length / itemsPerPage)));
    }
  }, [allProfiles, searchTerm, selectedType, itemsPerPage, currentPage]);

  // Actualizar perfiles paginados
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProfiles(filteredProfiles.slice(startIndex, endIndex));
  }, [filteredProfiles, currentPage, itemsPerPage]);

  // Cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Crear un nuevo perfil
  const createProfile = async (profileData: CheckProfileFormData) => {
    try {
      setIsSubmitting(true);
      const newProfile = await checkProfilesService.create(profileData);
      setAllProfiles(prev => [...prev, newProfile]);
      toast.success('Perfil creado exitosamente');
      setShowModal(false);
      return true;
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Error al crear el perfil');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Actualizar un perfil existente
  const updateProfile = async (id: string, profileData: CheckProfileFormData) => {
    try {
      setIsSubmitting(true);
      const updatedProfile = await checkProfilesService.update(id, profileData);
      
      if (updatedProfile) {
        setAllProfiles(prev => 
          prev.map(profile => profile.id === id ? updatedProfile : profile)
        );
        toast.success('Perfil actualizado exitosamente');
        setShowModal(false);
        return true;
      } else {
        toast.error('Perfil no encontrado');
        return false;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eliminar un perfil
  const deleteProfile = async (id: string) => {
    try {
      setIsSubmitting(true);
      const success = await checkProfilesService.delete(id);
      
      if (success) {
        setAllProfiles(prev => prev.filter(profile => profile.id !== id));
        toast.success('Perfil eliminado exitosamente');
        setShowModal(false);
        return true;
      } else {
        toast.error('Perfil no encontrado');
        return false;
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Error al eliminar el perfil');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cambiar el estado de un perfil
  const toggleProfileStatus = async (id: string) => {
    try {
      const updatedProfile = await checkProfilesService.toggleStatus(id);
      
      if (updatedProfile) {
        setAllProfiles(prev => 
          prev.map(profile => profile.id === id ? updatedProfile : profile)
        );
        toast.success(`Perfil ${updatedProfile.status === 'active' ? 'activado' : 'desactivado'} exitosamente`);
        return true;
      } else {
        toast.error('Perfil no encontrado');
        return false;
      }
    } catch (error) {
      console.error('Error toggling profile status:', error);
      toast.error('Error al cambiar el estado del perfil');
      return false;
    }
  };

  // Abrir modal para crear un nuevo perfil
  const openCreateModal = () => {
    setSelectedProfile(null);
    setModalMode('create');
    setShowModal(true);
  };

  // Abrir modal para editar un perfil
  const openEditModal = (profile: CheckProfile) => {
    setSelectedProfile(profile);
    setModalMode('edit');
    setShowModal(true);
  };

  // Abrir modal para confirmar eliminación
  const openDeleteModal = (profile: CheckProfile) => {
    setSelectedProfile(profile);
    setModalMode('delete');
    setShowModal(true);
  };

  // Abrir modal para ver detalles
  const openViewModal = (profile: CheckProfile) => {
    setSelectedProfile(profile);
    setModalMode('view');
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
  };

  return {
    profiles: paginatedProfiles,
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
  };
};