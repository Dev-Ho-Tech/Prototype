import React, { useRef, useState } from 'react';
import { User, Briefcase, Upload } from 'lucide-react';
import { ExtendedHeaderProps } from '../../interface/types';

export const EmployeeHeader: React.FC<ExtendedHeaderProps> = ({ 
  employee,
  onClose, 
  onProfileImageChange 
}) => {
  const [profileImage, setProfileImage] = useState(employee?.profileImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        
        // Si existe la función de callback, la llamamos con el archivo
        if (onProfileImageChange) {
          onProfileImageChange(file, imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Información del empleado */}
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Área de imagen de perfil clicable */}
          <div 
            className="w-16 h-16 rounded-full mr-4 relative cursor-pointer group overflow-hidden"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Perfil" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-2xl">
                {employee?.initial || 'K'}
              </div>
            )}
            
            {/* Overlay con ícono de subir cuando se hace hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
              <Upload className="w-6 h-6 text-white" />
            </div>
            
            {/* Input de archivo oculto */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {employee ? employee.name : 'Nuevo Empleado'}
            </h2>
            {employee && (
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <span className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  {employee.position || 'Sin cargo'}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {employee.department || 'Sin departamento'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};