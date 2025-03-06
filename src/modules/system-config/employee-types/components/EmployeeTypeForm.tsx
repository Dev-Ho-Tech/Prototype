import React, { useState } from 'react';
// import { TagInput } from './TagInput';
import { ToggleSwitch } from './ToggleSwitch';

interface EmployeeType {
  name: string;
  requiredFields: string[];
  status: string;
  intelliTime: boolean;
  intelliLunch: boolean;
  emailRequired: boolean;
  signatureRequired: boolean;
}

interface EmployeeTypeFormProps {
  employeeType: EmployeeType;
  onSave: (employeeType: EmployeeType) => void;
  onCancel: () => void;
}

export const EmployeeTypeForm: React.FC<EmployeeTypeFormProps> = ({ employeeType, onSave, onCancel }) => {
  const [type, setType] = useState(employeeType.name || '');
  const [selectedTags,] = useState(employeeType.requiredFields || []);
  // const [selectedTags, setSelectedTags] = useState(employeeType.requiredFields || []);
  const [status, setStatus] = useState(employeeType.status === 'active');
  const [intelliTime, setIntelliTime] = useState(employeeType.intelliTime || false);
  const [intelliLunch, setIntelliLunch] = useState(employeeType.intelliLunch || false);
  const [emailRequired, setEmailRequired] = useState(employeeType.emailRequired || false);
  const [signatureRequired, setSignatureRequired] = useState(employeeType.signatureRequired || false);

  // const availableTags = [
  //   'Huella', 'Rostro', 'Perfil De Marcaje', 'Estructura', 
  //   'Contrato', 'Fecha Inicial Contrato', 'Fecha Final Contrato',
  //   'Código', 'Cargo', 'Departamento', 'Sección', 'Sede',
  //   'Contenedor', 'Empresa', 'Segundo Nombre', 'Segundo Apellido',
  //   'Género', 'Fecha De Nacimiento', 'País', 'Estado', 'Teléfono'
  // ];

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
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400"
            checked={true}
            readOnly
          />
          <span className="text-lg font-medium">{type || 'Empleado'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 text-white rounded-full px-4 py-1 text-sm">
            Si
          </div>
          <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1 text-sm">
            No
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de persona *</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="EMPLEADO"
        />
      </div>

      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Campos requeridos *</label>
        <TagInput
          tags={selectedTags}
          setTags={setSelectedTags}
          availableTags={availableTags}
        />
      </div> */}

      <div className="grid grid-cols-4 gap-6 mb-6">
        <ToggleSwitch label="Estatus" isChecked={status} onChange={setStatus} />
        <ToggleSwitch label="Control de Tiempo" isChecked={intelliTime} onChange={setIntelliTime} />
        <ToggleSwitch label="Comedor" isChecked={intelliLunch} onChange={setIntelliLunch} />
        <ToggleSwitch label="Email requerido" isChecked={emailRequired} onChange={setEmailRequired} />
        <ToggleSwitch label="Firma por habeas data" isChecked={signatureRequired} onChange={setSignatureRequired} />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white rounded-md bg-blue-500"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};