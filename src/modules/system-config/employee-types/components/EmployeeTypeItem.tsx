import React from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { EmployeeType } from '../interface/EmployeeType';

interface EmployeeTypeItemProps {
  employeeType: EmployeeType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const EmployeeTypeItem: React.FC<EmployeeTypeItemProps> = ({ 
  employeeType, 
  onEdit, 
  onDelete, 
  isSelected,
  onSelect
}) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
          checked={isSelected}
          onChange={() => onSelect(employeeType.id)}
        />
      </td>
      <td className="py-3 px-4">{employeeType.name}</td>
      <td className="py-3 px-4 text-center">
        {employeeType.intelliTime ? 
          <Check className="w-5 h-5 text-blue-500 mx-auto" /> : 
          <X className="w-5 h-5 text-gray-400 mx-auto" />}
      </td>
      <td className="py-3 px-4 text-center">
        {employeeType.intelliLunch ? 
          <Check className="w-5 h-5 text-blue-500 mx-auto" /> : 
          <X className="w-5 h-5 text-gray-400 mx-auto" />}
      </td>
      <td className="py-3 px-4 text-center">
        {employeeType.emailRequired ? 
          <Check className="w-5 h-5 text-blue-500 mx-auto" /> : 
          <X className="w-5 h-5 text-gray-400 mx-auto" />}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-center space-x-2">
          <button 
            onClick={() => onEdit(employeeType.id)}
            className="p-1 text-blue-500 hover:text-blue-700"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(employeeType.id)}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};