import React from 'react';
import ActionButton from './ActionButton';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Confirmar eliminación</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">
                ¿Está seguro de eliminar este marcaje?
              </h3>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-4">
            <p>
              Está a punto de eliminar el marcaje <span className="font-semibold">{itemName}</span>. 
              Esta acción no se puede deshacer y podría afectar los cálculos de asistencia y horas 
              trabajadas del empleado.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <ActionButton
              label="Cancelar"
              onClick={onClose}
              variant="secondary"
            />
            <ActionButton
              label="Eliminar"
              onClick={onConfirm}
              variant="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;