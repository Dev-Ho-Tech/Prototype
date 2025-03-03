import React from 'react';
import { User } from 'lucide-react';

interface EmployeeAvatarProps {
  photoUrl?: string;
  name: string;
  size?: 'small' | 'medium' | 'large';
}

const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({ 
  photoUrl, 
  name,
  size = 'medium' 
}) => {
  // Determinar el tamaño basado en la prop
  const sizeClass = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-sm',
    large: 'w-20 h-20 text-lg'
  }[size];
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center`}>
      {photoUrl ? (
        <img 
          src={photoUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600">
          <User className={size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-6 h-6' : 'w-10 h-10'} />
        </div>
      )}
    </div>
  );
};

export default EmployeeAvatar;