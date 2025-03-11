import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { WorkShift } from '../../interfaces/WorkShift';

interface WorkShiftItemProps {
  workShift: WorkShift;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const WorkShiftItem: React.FC<WorkShiftItemProps> = ({ workShift, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-4 px-6">{workShift.code}</td>
      <td className="py-4 px-6">{workShift.name}</td>
      <td className="py-4 px-6">{workShift.startTime} - {workShift.endTime}</td>
      <td className="py-4 px-6">
        <div className="flex flex-wrap gap-1">
          {workShift.departments.map((department, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {department}
            </span>
          ))}
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          workShift.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {workShift.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(workShift.id)}
            className="p-1 text-blue-500 hover:text-blue-700"
            aria-label="Editar"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(workShift.id)}
            className="p-1 text-red-500 hover:text-red-700"
            aria-label="Eliminar"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};
