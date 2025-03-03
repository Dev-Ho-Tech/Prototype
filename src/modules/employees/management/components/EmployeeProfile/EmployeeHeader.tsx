import React from 'react';
import { User, Briefcase } from 'lucide-react';
import { ExtendedHeaderProps } from '../../interface/types';


export const EmployeeHeader: React.FC<ExtendedHeaderProps> = ({ employee, onClose, activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Barra de navegación superior */}
      {/* <div className="px-6 py-3 flex items-center border-b border-gray-200">
        <button 
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a la lista de empleados
        </button>
      </div> */}
      
      {/* Información del empleado */}
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-2xl mr-4">
            {employee?.initial || 'K'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {employee ? employee.name : 'Nuevo Empleado'}
            </h2>
            {employee && (
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <span className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  {employee.position || 'Sin cargo'}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {employee.department || 'Sin departamento'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onTabChange('personal')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              activeTab === 'personal' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Datos personales
          </button>
          <button
            onClick={() => onTabChange('laboral')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              activeTab === 'laboral' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Datos laborales
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};