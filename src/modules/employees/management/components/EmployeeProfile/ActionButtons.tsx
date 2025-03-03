import React from 'react';
import { Save, X } from 'lucide-react';
import { ActionButtonsProps } from '../../interface/types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onCancel }) => {
  return (
    <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <X className="w-4 h-4 mr-2" />
        Cancelar
      </button>
      <button
        type="button"
        onClick={onSave}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Save className="w-4 h-4 mr-2" />
        Guardar
      </button>
    </div>
  );
};