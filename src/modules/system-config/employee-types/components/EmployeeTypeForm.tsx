import React, { useState } from 'react';
import { EmployeeType } from '../interface/EmployeeType';
import { ToggleSwitch } from './ToggleSwitch';

// import { TagInput } from './TagInput';
// import { availableFields } from '../data';

interface EmployeeTypeFormProps {
  employeeType: EmployeeType;
  onSave: (employeeType: EmployeeType) => void;
  onCancel: () => void;
}

export const EmployeeTypeForm: React.FC<EmployeeTypeFormProps> = ({ 
  employeeType, 
  onSave, 
  onCancel 
}) => {
  const [type, setType] = useState(employeeType.name);
  const [selectedTags, ] = useState(employeeType.requiredFields);
  // const [selectedTags, setSelectedTags] = useState(employeeType.requiredFields);
  const [status, setStatus] = useState(employeeType.status === 'active');
  const [intelliTime, setIntelliTime] = useState(employeeType.intelliTime);
  const [intelliLunch, setIntelliLunch] = useState(employeeType.intelliLunch);
  const [emailRequired, setEmailRequired] = useState(employeeType.emailRequired);
  const [signatureRequired, setSignatureRequired] = useState(employeeType.signatureRequired);

  const handleSave = () => {
    onSave({
      ...employeeType,
      name: type,
      requiredFields: selectedTags,
      status: status ? 'active' : 'inactive',
      intelliTime,
      intelliLunch,
      emailRequired,
      signatureRequired
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="typeName" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de persona *
          </label>
          <input
            id="typeName"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Empleado"
          />
        </div>

        <div className="space-y-2">
          <ToggleSwitch label="Estado" isChecked={status} onChange={setStatus} />
          <ToggleSwitch label="Control de Tiempo" isChecked={intelliTime} onChange={setIntelliTime} />
          <ToggleSwitch label="Comedor" isChecked={intelliLunch} onChange={setIntelliLunch} />
          <ToggleSwitch label="Email requerido" isChecked={emailRequired} onChange={setEmailRequired} />
          <ToggleSwitch label="Firma por habeas data" isChecked={signatureRequired} onChange={setSignatureRequired} />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campos requeridos *</label>
          <TagInput
            tags={selectedTags}
            setTags={setSelectedTags}
            availableTags={availableFields}
          />
        </div> */}

        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};