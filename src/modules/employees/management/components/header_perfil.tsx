import { User, Briefcase, Calendar, X } from 'lucide-react';
import { EmployeeProfileHeaderProps } from '../interface/types';




export const EmployeeProfileHeader: React.FC<EmployeeProfileHeaderProps> = ({ employee, onClose }) => {
  return (
    <div className="bg-blue-50 p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-2xl mr-4">
            {employee?.initial || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{employee?.name || 'Usuario'}</h2>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <span className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-1" />
                {employee?.position || 'Sin cargo'}
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-1" />
                {employee?.department || 'Sin departamento'}
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {employee?.location || 'Sin ubicación'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};