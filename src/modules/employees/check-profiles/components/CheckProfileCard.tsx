import React from 'react';
import { CheckProfile } from '../interfaces/CheckProfile';
import { Users, Clock, Fingerprint, Camera, DoorClosed, MapPin, CheckSquare, Settings, MoreVertical, Edit, Trash, Eye, Power } from 'lucide-react';

interface CheckProfileCardProps {
  profile: CheckProfile;
  onView: (profile: CheckProfile) => void;
  onEdit: (profile: CheckProfile) => void;
  onDelete: (profile: CheckProfile) => void;
  onToggleStatus: (id: string) => Promise<boolean>;
}

const CheckProfileCard: React.FC<CheckProfileCardProps> = ({
  profile,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'access':
        return <DoorClosed className="w-5 h-5 text-green-600" />;
      case 'dining':
        return <Settings className="w-5 h-5 text-amber-600" />;
      default:
        return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleToggleStatus = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onToggleStatus(profile.id);
    setShowMenu(false);
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
      onClick={() => onView(profile)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              {getTypeIcon(profile.type)}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {profile.name}
              </h3>
              <p className="text-sm text-gray-500">
                {profile.description}
              </p>
            </div>
          </div>
          <div className="relative">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
              profile.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {profile.status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
            <button 
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(profile);
                      setShowMenu(false);
                    }}
                  >
                    <Eye className="mr-3 h-4 w-4 text-gray-500" />
                    Ver detalles
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(profile);
                      setShowMenu(false);
                    }}
                  >
                    <Edit className="mr-3 h-4 w-4 text-gray-500" />
                    Editar
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleToggleStatus}
                  >
                    <Power className="mr-3 h-4 w-4 text-gray-500" />
                    {profile.status === 'active' ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(profile);
                      setShowMenu(false);
                    }}
                  >
                    <Trash className="mr-3 h-4 w-4 text-red-500" />
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">Empleados</span>
            </div>
            <span className="font-medium">{profile.employeeCount}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">Horario</span>
            </div>
            <span className="font-medium">
              {profile.schedule.startTime} - {profile.schedule.endTime}
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
              <Fingerprint className="w-4 h-4" />
              <span>Métodos permitidos</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.methods.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs"
                >
                  {method === 'fingerprint' && <Fingerprint className="w-3 h-3 mr-1" />}
                  {method === 'face' && <Camera className="w-3 h-3 mr-1" />}
                  {method === 'card' && <DoorClosed className="w-3 h-3 mr-1" />}
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
              <CheckSquare className="w-4 h-4" />
              <span>Validaciones</span>
            </div>
            <div className="space-y-1">
              {profile.validations.requirePhoto && (
                <div className="flex items-center text-xs text-gray-600">
                  <Camera className="w-3 h-3 mr-1" />
                  <span>Requiere foto</span>
                </div>
              )}
              {profile.validations.requireLocation && (
                <div className="flex items-center text-xs text-gray-600">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Requiere ubicación</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(profile);
            }}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Configurar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckProfileCard;