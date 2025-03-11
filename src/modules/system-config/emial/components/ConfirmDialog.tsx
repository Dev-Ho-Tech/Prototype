import React from 'react';
import Modal from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  confirmInProgress?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  confirmInProgress = false,
}) => {
  // Button styles based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white';
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white';
      default:
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
    }
  };

  const getIconStyle = () => {
    switch (variant) {
      case 'danger':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-red-600';
    }
  };

  const DialogFooter = (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={confirmInProgress}
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonStyle()}`}
        disabled={confirmInProgress}
      >
        {confirmInProgress ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
        ) : (
          confirmLabel
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={DialogFooter}
    >
      <div className="flex items-start space-x-4">
        <div className={`${getIconStyle()} flex-shrink-0`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;