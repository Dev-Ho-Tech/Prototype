import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { WorkShift } from '../interfaces/WorkShift';
import { DepartmentTag } from './shifts/DepartmentTag';
import { Toggle } from './shifts/Toggle';
import { departments } from '../temp/workShiftsData';

interface BasicInfoTabProps {
  workShift: WorkShift;
  onChange: (updatedValues: Partial<WorkShift>) => void;
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ workShift, onChange }) => {
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [showDepartmentSearch, setShowDepartmentSearch] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

  const filteredDepartments = departments.filter(
    (dept) => 
      !workShift.departments.includes(dept.name) &&
      dept.name.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const handleDepartmentSelect = (deptName: string) => {
    onChange({
      departments: [...workShift.departments, deptName]
    });
    setDepartmentSearch('');
    setShowDepartmentDropdown(false);
    setShowDepartmentSearch(false);
  };

  const handleRemoveDepartment = (deptName: string) => {
    onChange({
      departments: workShift.departments.filter(d => d !== deptName)
    });
  };

  const handleStatusChange = (isActive: boolean) => {
    onChange({
      status: isActive ? 'active' : 'inactive'
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mt-4">
      <div className="mb-6">
        <h2 className="text-base font-semibold flex items-center text-gray-800">
          <span className="flex items-center justify-center bg-indigo-100 w-6 h-6 rounded-full mr-2">
            <span className="text-indigo-600 text-sm">1</span>
          </span>
          Información Básica del Turno
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Código <span className="text-red-500">*</span>
          </label>
          <input
            id="code"
            type="text"
            value={workShift.code}
            onChange={(e) => onChange({ code: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="001"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Turno <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={workShift.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Mañana"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Departamentos aplicables
        </label>
        
        <div className="flex flex-wrap items-center gap-2 mb-2 border border-gray-200 rounded-md p-2 min-h-[40px]">
          {workShift.departments.map((dept, index) => (
            <DepartmentTag
              key={index}
              department={dept}
              onRemove={() => handleRemoveDepartment(dept)}
            />
          ))}
          
          {!showDepartmentSearch && (
            <button
              type="button"
              onClick={() => setShowDepartmentSearch(true)}
              className="inline-flex items-center py-1 px-2 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Añadir
            </button>
          )}
        </div>
        
        {showDepartmentSearch && (
          <div className="relative mt-2">
            <div className="flex items-center">
              <input
                type="text"
                value={departmentSearch}
                onChange={(e) => {
                  setDepartmentSearch(e.target.value);
                  setShowDepartmentDropdown(true);
                }}
                autoFocus
                onFocus={() => setShowDepartmentDropdown(true)}
                placeholder="Buscar departamento..."
                className="flex-1 p-2 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                className="ml-2 inline-flex items-center py-2 px-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                onClick={() => {
                  setShowDepartmentSearch(false);
                  setDepartmentSearch('');
                  setShowDepartmentDropdown(false);
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {showDepartmentDropdown && departmentSearch.trim() !== '' && filteredDepartments.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredDepartments.map((dept) => (
                  <div
                    key={dept.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDepartmentSelect(dept.name)}
                  >
                    {dept.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
          <Toggle
          label="Activo"
          isChecked={workShift.status === "active"}
          onChange={handleStatusChange}
        />
      </div>
    </div>
  );
};