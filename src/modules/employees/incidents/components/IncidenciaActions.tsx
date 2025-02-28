import React from 'react';
import ActionButton from './ActionButton';
import { PlusCircle, Trash2 } from 'lucide-react';

interface IncidenciaActionsProps {
  onAddMarcaje: () => void;
  onDeleteMarcaje: () => void;
  canDelete: boolean;
}

const IncidenciaActions: React.FC<IncidenciaActionsProps> = ({
  onAddMarcaje,
  onDeleteMarcaje,
  canDelete
}) => {
  return (
    <div className="flex items-center space-x-3 mt-2">
      <ActionButton
        label="Agregar marcaje"
        onClick={onAddMarcaje}
        icon={<PlusCircle className="w-4 h-4" />}
        variant="primary"
      />
      
      <ActionButton
        label="Eliminar marcaje"
        onClick={onDeleteMarcaje}
        icon={<Trash2 className="w-4 h-4" />}
        variant="danger"
        disabled={!canDelete}
      />
    </div>
  );
};

export default IncidenciaActions;