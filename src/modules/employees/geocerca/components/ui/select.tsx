import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Select Trigger
interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ 
  className = '', 
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button 
      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
    </button>
  );
};

// Select Value
interface SelectValueProps {
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export const SelectValue: React.FC<SelectValueProps> = ({ 
  className = '', 
  placeholder, 
  children 
}) => {
  return (
    <span className={`truncate ${children ? '' : 'text-gray-400'} ${className}`}>
      {children || placeholder}
    </span>
  );
};

// Select Content
interface SelectContentProps {
  className?: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
  open: boolean;
}

export const SelectContent: React.FC<SelectContentProps> = ({ 
  className = '', 
  children,
  side = 'bottom',
  open
}) => {
  if (!open) return null;
  
  return (
    <div className={`absolute z-50 min-w-[8rem] bg-white rounded-md border border-gray-200 shadow-lg overflow-hidden text-gray-900 ${side === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} ${className}`}>
      <div className="p-1">
        {children}
      </div>
    </div>
  );
};

// Select Item
interface SelectItemProps {
  className?: string;
  children: React.ReactNode;
  value: string;
  onClick?: (value: string) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ 
  className = '', 
  children,
  value,
  onClick
}) => {
  return (
    <div 
      className={`relative flex cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100 ${className}`}
      onClick={() => onClick && onClick(value)}
    >
      {children}
    </div>
  );
};

// Main Select Component
interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  disabled = false,
  placeholder = 'Seleccionar...',
  children,
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  // Find SelectValue and update it with current value
  const selectedItem = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.value === value
  );
  
  const displayValue = selectedItem && React.isValidElement(selectedItem) 
    ? selectedItem.props.children 
    : null;
  
  // Map children to include onClick handlers
  const mappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectContent) {
      // Map SelectContent children
      const contentChildren = React.Children.map(child.props.children, (contentChild) => {
        if (React.isValidElement(contentChild) && contentChild.type === SelectItem) {
          return React.cloneElement(contentChild, {
            onClick: (itemValue: string) => {
              onValueChange && onValueChange(itemValue);
              setOpen(false);
            }
          });
        }
        return contentChild;
      });
      
      return React.cloneElement(child, { 
        ...child.props,
        open,
        children: contentChildren
      });
    }
    
    if (React.isValidElement(child) && child.type === SelectTrigger) {
      return React.cloneElement(child, {
        ...child.props,
        onClick: () => setOpen(!open),
        disabled
      });
    }
    
    if (React.isValidElement(child) && child.type === SelectValue) {
      return React.cloneElement(child, {
        ...child.props,
        placeholder,
        children: displayValue
      });
    }
    
    return child;
  });
  
  // Close the select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div ref={selectRef} className={`relative inline-block ${className}`}>
      {mappedChildren}
    </div>
  );
};