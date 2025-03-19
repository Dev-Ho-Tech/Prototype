import React from 'react';
import { Users, Calendar, Clock, AlertCircle } from 'lucide-react';
import { VisitorsStatsProps } from '../interfaces/types';

const VisitorsStats: React.FC<VisitorsStatsProps> = ({
  current,
  scheduled,
  avgDuration,
  pending
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Visitantes actuales</p>
            <p className="text-2xl font-semibold text-blue-600">{current}</p>
          </div>
          <Users className="w-8 h-8 text-blue-400" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Visitas programadas</p>
            <p className="text-2xl font-semibold text-green-600">{scheduled}</p>
          </div>
          <Calendar className="w-8 h-8 text-green-400" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Tiempo promedio</p>
            <p className="text-2xl font-semibold text-amber-600">{avgDuration}</p>
          </div>
          <Clock className="w-8 h-8 text-amber-400" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pendientes</p>
            <p className="text-2xl font-semibold text-yellow-600">{pending}</p>
          </div>
          <AlertCircle className="w-8 h-8 text-yellow-400" />
        </div>
      </div>
    </div>
  );
};

export default VisitorsStats;