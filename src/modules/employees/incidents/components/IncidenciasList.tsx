import React, { useState } from 'react';
import { Marcaje } from '../interface/types';
import IncidenciaItem from './IncidenciaItem'; 
import DeleteConfirmModal from './DeleteConfirmModal';

interface IncidenciasListProps {
  marcajes: Marcaje[];
  onDelete: (id: string) => void;
  title?: string;
}

const IncidenciasList: React.FC<IncidenciasListProps> = ({ 
  marcajes, 
  onDelete,
  title = "Fechas de incidencias" 
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMarcaje, setSelectedMarcaje] = useState<Marcaje | null>(null);

  const handleDeleteClick = (id: string) => {
    const marcaje = marcajes.find(m => m.id === id);
    if (marcaje) {
      setSelectedMarcaje(marcaje);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedMarcaje) {
      onDelete(selectedMarcaje.id);
      setDeleteModalOpen(false);
      setSelectedMarcaje(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {marcajes.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay marcajes registrados para este empleado en la fecha seleccionada.
          </div>
        ) : (
          marcajes.map(marcaje => (
            <IncidenciaItem 
              key={marcaje.id}
              marcaje={marcaje}
              onDelete={handleDeleteClick}
            />
          ))
        )}
      </div>
      
      <DeleteConfirmModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedMarcaje 
          ? `${selectedMarcaje.fecha} - ${selectedMarcaje.hora} (${selectedMarcaje.tipoMarcaje})`
          : ''}
      />
    </div>
  );
};

export default IncidenciasList;