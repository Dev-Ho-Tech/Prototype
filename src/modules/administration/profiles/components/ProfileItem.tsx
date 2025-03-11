import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Profile } from '../interfaces/Profile';
import { User } from 'lucide-react';

interface ProfileItemProps {
  profile: Profile;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProfileItem: React.FC<ProfileItemProps> = ({ profile, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-4 px-6">{profile.name}</td>
      <td className="py-4 px-6 text-gray-500">{profile.description}</td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <User className="w-4 h-4 text-gray-400 mr-1" />
          <span>{profile.assignedUsers}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          profile.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {profile.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(profile.id)}
            className="p-1 text-blue-500 hover:text-blue-700"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(profile.id)}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};