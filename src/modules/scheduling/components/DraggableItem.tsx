import React, { useState } from 'react';

interface DraggableItemProps {
  id: string;
  label: string;
  color: string;
  type: 'shift' | 'license';
  startTime?: string;
  endTime?: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  label,
  color,
  type,
  startTime = '08:00',
  endTime = '16:00'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Obtener el color de fondo a partir de la clase de Tailwind
  const getBgColor = (colorClass: string): string => {
    const bgClass = colorClass.split(' ')[0];
    
    // Mapear clases de Tailwind a valores hexadecimales
    const colorMap: {[key: string]: string} = {
      'bg-blue-500': '#3b82f6',
      'bg-green-500': '#10b981',
      'bg-red-500': '#ef4444',
      'bg-yellow-500': '#f59e0b',
      'bg-purple-500': '#8b5cf6',
      'bg-indigo-500': '#6366f1',
      'bg-pink-500': '#ec4899',
      'bg-blue-200': '#bfdbfe',
      'bg-green-200': '#a7f3d0',
      'bg-red-200': '#fecaca',
      'bg-yellow-200': '#fde68a',
      'bg-purple-200': '#ddd6fe',
      'bg-indigo-200': '#c7d2fe',
      'bg-pink-200': '#fbcfe8',
    };
    
    return colorMap[bgClass] || '#3b82f6';
  };
  
  // Iniciar arrastre
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    
    // Guardar información sobre el elemento arrastrado
    const dragData = {
      id,
      type,
      startTime,
      endTime
    };
    
    // Establecer datos para el arrastre
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    
    // Configurar la imagen de arrastre
    const dragImage = document.createElement('div');
    dragImage.style.backgroundColor = getBgColor(color);
    dragImage.style.width = '80px';
    dragImage.style.height = '30px';
    dragImage.style.borderRadius = '4px';
    dragImage.textContent = label;
    dragImage.style.color = 'white';
    dragImage.style.display = 'flex';
    dragImage.style.alignItems = 'center';
    dragImage.style.justifyContent = 'center';
    dragImage.style.fontSize = '12px';
    dragImage.style.fontWeight = '500';
    dragImage.style.overflow = 'hidden';
    dragImage.style.whiteSpace = 'nowrap';
    dragImage.style.textOverflow = 'ellipsis';
    dragImage.style.opacity = '0.8';
    dragImage.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    dragImage.style.padding = '0 8px';
    
    // Añadir temporalmente al DOM y usar como imagen de arrastre
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 40, 15);
    
    // Eliminar después de un momento
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };
  
  // Finalizar arrastre
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`rounded px-2 py-1 text-xs cursor-grab ${color} flex items-center space-x-1 ${
        isDragging ? 'opacity-50' : ''
      }`}
      title={`${label} (${startTime} - ${endTime})`}
    >
      <span className="truncate">{label}</span>
    </div>
  );
};

export default DraggableItem;