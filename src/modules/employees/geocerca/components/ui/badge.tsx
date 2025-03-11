import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
  onClick,
  ...props
}) => {
  let classes = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  
  switch (variant) {
    case 'default':
      classes += ' bg-blue-100 text-blue-800';
      break;
    case 'outline':
      classes += ' border border-gray-300 text-gray-700';
      break;
    case 'secondary':
      classes += ' bg-gray-100 text-gray-800';
      break;
  }
  
  if (onClick) {
    classes += ' cursor-pointer transition-colors hover:bg-opacity-80';
  }
  
  return (
    <span 
      className={`${classes} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};