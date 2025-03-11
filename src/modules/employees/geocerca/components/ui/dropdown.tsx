import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Cerrar el dropdown al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Clonar los hijos para pasarles las propiedades necesarias
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Si es el Trigger, le pasamos el control del estado
      if (child.type === DropdownMenuTrigger) {
        return React.cloneElement(child, {
          onClick: () => setIsOpen(!isOpen),
        });
      }
      
      // Si es el Content, le pasamos el estado
      if (child.type === DropdownMenuContent) {
        return React.cloneElement(child, {
          isOpen,
        });
      }
    }
    return child;
  });
  
  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {childrenWithProps}
    </div>
  );
};

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
  className?: string;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  children, 
  asChild = false,
  onClick,
  className = ''
}) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        onClick && onClick();
        children.props.onClick && children.props.onClick(e);
      },
    });
  }
  
  return (
    <button 
      type="button" 
      className={`focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface DropdownMenuContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  align?: 'start' | 'end' | 'center';
  className?: string;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ 
  children, 
  isOpen = false,
  align = 'end',
  className = ''
}) => {
  if (!isOpen) return null;
  
  // Alineación del contenido
  let alignClasses = '';
  switch (align) {
    case 'start':
      alignClasses = 'left-0';
      break;
    case 'end':
      alignClasses = 'right-0';
      break;
    case 'center':
      alignClasses = 'left-1/2 transform -translate-x-1/2';
      break;
  }
  
  return (
    <div 
      className={`absolute z-10 mt-2 ${alignClasses} min-w-[12rem] rounded-md bg-white shadow-lg border border-gray-200 py-1 ${className}`}
    >
      {children}
    </div>
  );
};

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  onClick,
  className = '',
  disabled = false
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  );
};