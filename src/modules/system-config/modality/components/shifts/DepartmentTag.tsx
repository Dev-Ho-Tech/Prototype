import React from 'react';
import { X } from 'lucide-react';

interface DepartmentTagProps {
  department: string;
  onRemove: () => void;
}

export const DepartmentTag: React.FC<DepartmentTagProps> = ({ department, onRemove }) => {
  return (
    <span className="inline-flex items-center py-1 px-2 bg-blue-100 text-blue-800 text-sm rounded-md mr-1 mb-1">
      {department}
      <button 
        onClick={onRemove}
        className="ml-1 text-blue-600 hover:text-blue-800"
        aria-label="Eliminar departamento"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
};