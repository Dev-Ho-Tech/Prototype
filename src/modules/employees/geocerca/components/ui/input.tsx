import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  className = '',
  icon,
  ...props 
}) => {
  const inputClasses = `w-full rounded-md border border-gray-300 py-2 px-4 text-sm 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
    placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 ${className}`;
  
  if (icon) {
    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input className={`${inputClasses} pl-10`} {...props} />
      </div>
    );
  }
  
  return <input className={inputClasses} {...props} />;
};
