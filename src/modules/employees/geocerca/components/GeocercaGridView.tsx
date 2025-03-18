import React from 'react';
import { Geocerca } from '../interfaces/Geocerca';
import GeocercaCard from './GeocercaCard';
import { MapPin } from 'lucide-react';

interface GeocercaGridViewProps {
  geocercas: Geocerca[];
  onView: (geocerca: Geocerca) => void;
  onEdit: (geocerca: Geocerca) => void;
  onDelete: (geocerca: Geocerca) => void;
}

const GeocercaGridView: React.FC<GeocercaGridViewProps> = ({
  geocercas,
  onView,
  onEdit,
  onDelete
}) => {
  if (geocercas.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-48 bg-gray-50 rounded-lg">
        <MapPin className="h-10 w-10 text-blue-300 mb-2" />
        <p className="text-gray-500">No se encontraron geocercas.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {geocercas.map((geocerca) => (
          <GeocercaCard 
            key={geocerca.id}
            geocerca={geocerca}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default GeocercaGridView;