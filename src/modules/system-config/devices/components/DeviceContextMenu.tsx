import React from 'react';
import { Device } from '../interfaces/device';

interface DeviceContextMenuProps {
  device: Device;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (device: Device) => void;
  onOpenOperations: (device: Device) => void;
  onOpenEventos: (device: Device) => void;
  onRestart: (device: Device) => void;
  onDelete: (device: Device) => void;
}

export function DeviceContextMenu({
  device,
  isOpen,
  onClose,
  onEdit,
  onOpenOperations,
  onOpenEventos,
  onRestart,
  onDelete
}: DeviceContextMenuProps) {
  if (!isOpen) return null;

  // Cerrar el menú cuando se hace clic fuera de él
  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  // Evitar que los clics dentro del menú cierren el overlay
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay para capturar clics fuera del menú */}
      <div
        className="fixed inset-0 z-40"
        onClick={handleOutsideClick}
      />
      
      {/* El menú en sí */}
      <div 
        className="fixed z-50 bg-white rounded-md shadow-xl"
        onClick={handleMenuClick}
        style={{ 
          right: '20px',  // Ajustado para posicionamiento fijo
          width: '200px',
          overflow: 'visible',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="py-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(device);
              onClose();
            }} 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Editar dispositivo
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenOperations(device);
              onClose();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Operaciones biométricas
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenEventos(device);
              onClose();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Ver eventos
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRestart(device);
              onClose();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Reiniciar dispositivo
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(device);
              onClose();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Eliminar dispositivo
          </button>
        </div>
      </div>
    </>
  );
}