/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import DeviceCard from '../DeviceCard';
import Pagination from './Pagination';

interface DeviceGridProps {
  devices: any[];
  onCardClick: (device: any) => void;
  onMenuClick: (device: any, e: React.MouseEvent) => void;
  onOperationsClick: (device: any, e: React.MouseEvent) => void;
  onEventsClick: (device: any, e: React.MouseEvent) => void;
  onRestartClick: (device: any, e: React.MouseEvent) => void;
  contextMenuDevice: any | null;
  renderContextMenu?: (device: any) => React.ReactNode;
  emptyMessage?: string;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({
  devices,
  onCardClick,
  onMenuClick,
  onOperationsClick,
  onEventsClick,
  onRestartClick,
  contextMenuDevice,
  renderContextMenu,
  emptyMessage = "No se encontraron dispositivos con los filtros seleccionados."
}) => {
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12); // Opciones: 6, 12, 24, 36
  
  // Calcular los dispositivos que se mostrarán en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDevices = devices.slice(startIndex, endIndex);
  
  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll al inicio de la cuadrícula
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Manejar cambio de elementos por página
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Resetear a la primera página
  };

  return (
    <div>
      {devices.length > 0 ? (
        <>
          {/* Cuadrícula de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedDevices.map((device) => (
              <div key={device.id} className="relative">
                <DeviceCard
                  device={device}
                  onCardClick={onCardClick}
                  onMenuClick={onMenuClick}
                  onOperationsClick={onOperationsClick}
                  onEventsClick={onEventsClick}
                  onRestartClick={onRestartClick}
                  menuOpen={contextMenuDevice && contextMenuDevice.id === device.id}
                />
                {/* Renderizar menú contextual si existe y está abierto para este dispositivo */}
                {contextMenuDevice && 
                 contextMenuDevice.id === device.id && 
                 renderContextMenu && 
                 renderContextMenu(device)}
              </div>
            ))}
          </div>
          
          {/* Paginación */}
          <Pagination
            currentPage={currentPage}
            totalItems={devices.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={[6, 12, 24, 36]} // Opciones específicas para la vista de cuadrícula
          />
        </>
      ) : (
        // Mensaje cuando no hay dispositivos
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DeviceGrid;