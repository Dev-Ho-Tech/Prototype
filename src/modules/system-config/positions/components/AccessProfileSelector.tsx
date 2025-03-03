import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { AccessProfile } from '../interfaces/types';

interface AccessProfileSelectorProps {
  profiles: AccessProfile[];
  selectedProfileId?: string;
  onChange: (profileId: string) => void;
}

export const AccessProfileSelector: React.FC<AccessProfileSelectorProps> = ({
  profiles,
  selectedProfileId,
  onChange
}) => {
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!selectedProfileId && profiles.length > 0) {
      const defaultProfile = profiles.find(p => p.isDefault) || profiles[0];
      onChange(defaultProfile.id);
    }
  }, [profiles, selectedProfileId, onChange]);

  const selectedProfile = profiles.find(p => p.id === selectedProfileId);
  
  const filteredProfiles = profiles.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-md font-medium text-gray-900">Perfil de acceso *</h3>
        <div className="mt-2 flex items-center">
          {selectedProfile ? (
            <div className="flex-1 flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md">
              <span className="text-sm">{selectedProfile.name}</span>
              <button
                type="button"
                className="ml-2 text-gray-400 hover:text-gray-500"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          ) : (
            <div className="flex-1 px-4 py-2 border border-gray-300 text-gray-400 rounded-md">
              Seleccione un perfil
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <div className="p-4">
          <input 
            type="text"
            placeholder="Buscar perfiles..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          
          <div className="mt-2 max-h-40 overflow-y-auto">
            {filteredProfiles.map(profile => (
              <div 
                key={profile.id}
                className={`px-3 py-2 my-1 rounded-md cursor-pointer ${
                  profile.id === selectedProfileId 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  onChange(profile.id);
                  setExpanded(false);
                }}
              >
                <div className="font-medium">{profile.name}</div>
                {profile.description && (
                  <div className="text-xs text-gray-500">{profile.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};