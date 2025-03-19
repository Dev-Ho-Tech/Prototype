import React from 'react';
import { Shield, Users, Clock, MapPin } from 'lucide-react';

interface PermisosStatsProps {
  active: number;
  users: number;
  pending: number;
  restrictedAreas: number;
}

const PermisosStats: React.FC<PermisosStatsProps> = ({
  active,
  users,
  pending,
  restrictedAreas
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Permisos activos</p>
            <p className="text-2xl font-semibold text-blue-600">{active}</p>
          </div>
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Usuarios asignados</p>
            <p className="text-2xl font-semibold text-green-600">{users}</p>
          </div>
          <Users className="w-8 h-8 text-green-400" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pendientes aprobación</p>
            <p className="text-2xl font-semibold text-yellow-600">{pending}</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-400" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Áreas restringidas</p>
            <p className="text-2xl font-semibold text-red-600">{restrictedAreas}</p>
          </div>
          <MapPin className="w-8 h-8 text-red-400" />
        </div>
      </div>
    </div>
  );
};

export default PermisosStats;