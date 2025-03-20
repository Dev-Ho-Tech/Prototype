/* eslint-disable react-hooks/rules-of-hooks */
import { AlertTriangle, X } from 'lucide-react';
import { useCallback } from 'react';

interface DeleteDeviceModalProps {
  deviceName: string;
  onDelete: () => void;
  onCancel: () => void;
  isOpen?: boolean;
}

export function ConfirmModal({ 
  deviceName, 
  onDelete, 
  onCancel,
  isOpen = false
}: DeleteDeviceModalProps) {
  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;
  
  // Manejador de eventos para el botón de eliminar
  const handleDelete = useCallback((e: React.MouseEvent) => {
    // Detener cualquier propagación o comportamiento por defecto
    e.preventDefault();
    e.stopPropagation();
    
    // Ejecutar la acción de eliminar
    onDelete();
  }, [onDelete]);
  
  // Manejador de eventos para el botón de cancelar
  const handleCancel = useCallback((e: React.MouseEvent) => {
    // Detener cualquier propagación o comportamiento por defecto
    e.preventDefault();
    e.stopPropagation();
    
    // Ejecutar la acción de cancelar
    onCancel();
  }, [onCancel]);
  
  // Manejador para el overlay (background)
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    // Solo cerrar si se hace clic directamente en el overlay
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }, [onCancel]);

  return (
    <div 
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-[9999]" 
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full relative z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Eliminar Geocerca</h2>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Cerrar"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            ¿Está seguro que desea eliminar "{deviceName}"? Esta acción no se puede deshacer.
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="button"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}