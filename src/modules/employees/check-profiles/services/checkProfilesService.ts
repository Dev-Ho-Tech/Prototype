import { CheckProfile, CheckProfileFormData } from '../interfaces/CheckProfile';
import { v4 as uuidv4 } from 'uuid';
import { checkProfilesData } from '../data';

// Simulamos una base de datos utilizando localStorage
const STORAGE_KEY = 'check-profiles';

// Función para inicializar los datos si no existen
const initializeData = (): CheckProfile[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    const initialData = checkProfilesData.map(profile => ({
      ...profile,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(storedData);
};

// Función para guardar datos en localStorage
const saveData = (data: CheckProfile[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const checkProfilesService = {
  // Obtener todos los perfiles
  getAll: async (): Promise<CheckProfile[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = initializeData();
        resolve(profiles);
      }, 300); // Simulamos latencia de red
    });
  },

  // Obtener un perfil por ID
  getById: async (id: string): Promise<CheckProfile | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = initializeData();
        const profile = profiles.find(p => p.id === id) || null;
        resolve(profile);
      }, 300);
    });
  },

  // Crear un nuevo perfil
  create: async (profileData: CheckProfileFormData): Promise<CheckProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = initializeData();
        const newProfile: CheckProfile = {
          ...profileData,
          id: uuidv4(),
          employeeCount: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        profiles.push(newProfile);
        saveData(profiles);
        resolve(newProfile);
      }, 500);
    });
  },

  // Actualizar un perfil existente
  update: async (id: string, profileData: CheckProfileFormData): Promise<CheckProfile | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = initializeData();
        const index = profiles.findIndex(p => p.id === id);
        
        if (index === -1) {
          resolve(null);
          return;
        }
        
        const updatedProfile: CheckProfile = {
          ...profiles[index],
          ...profileData,
          updatedAt: new Date()
        };
        
        profiles[index] = updatedProfile;
        saveData(profiles);
        resolve(updatedProfile);
      }, 500);
    });
  },

  // Eliminar un perfil
  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = initializeData();
        const index = profiles.findIndex(p => p.id === id);
        
        if (index === -1) {
          resolve(false);
          return;
        }
        
        profiles.splice(index, 1);
        saveData(profiles);
        resolve(true);
      }, 500);
    });
  },

  // Cambiar el estado de un perfil (activar/desactivar)
  toggleStatus: async (id: string): Promise<CheckProfile | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = initializeData();
        const index = profiles.findIndex(p => p.id === id);
        
        if (index === -1) {
          resolve(null);
          return;
        }
        
        const updatedProfile: CheckProfile = {
          ...profiles[index],
          status: profiles[index].status === 'active' ? 'inactive' : 'active',
          updatedAt: new Date()
        };
        
        profiles[index] = updatedProfile;
        saveData(profiles);
        resolve(updatedProfile);
      }, 300);
    });
  },

  // Buscar perfiles
  search: async (query: string, type: string = 'all'): Promise<CheckProfile[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = initializeData();
        let filteredProfiles = profiles;

        // Filtrar por tipo si no es 'all'
        if (type !== 'all') {
          filteredProfiles = filteredProfiles.filter(p => p.type === type);
        }

        // Filtrar por query en nombre o descripción
        if (query) {
          const lowerQuery = query.toLowerCase();
          filteredProfiles = filteredProfiles.filter(
            p => p.name.toLowerCase().includes(lowerQuery) || 
                 p.description.toLowerCase().includes(lowerQuery)
          );
        }

        resolve(filteredProfiles);
      }, 300);
    });
  }
};