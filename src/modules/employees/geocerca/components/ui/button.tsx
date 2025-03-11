import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  // Base classes
  let classes = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant classes
  switch (variant) {
    case 'default':
      classes += ' bg-blue-600 text-white hover:bg-blue-700';
      break;
    case 'outline':
      classes += ' border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
      break;
    case 'destructive':
      classes += ' bg-red-600 text-white hover:bg-red-700';
      break;
    case 'ghost':
      classes += ' text-gray-700 hover:bg-gray-100';
      break;
  }
  
  // Size classes
  switch (size) {
    case 'default':
      classes += ' h-10 py-2 px-4 text-sm';
      break;
    case 'sm':
      classes += ' h-8 py-1 px-3 text-xs';
      break;
    case 'lg':
      classes += ' h-12 py-3 px-6 text-base';
      break;
    case 'icon':
      classes += ' h-9 w-9 p-1';
      break;
  }
  
  return (
    <button className={`${classes} ${className}`} {...props}>
      {children}
    </button>
  );
};