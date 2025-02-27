import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import { EmployeeTypeItem } from './components/EmployeeTypeItem';
import { EmployeeTypeForm } from './components/EmployeeTypeForm';

// Datos de ejemplo para los tipos de empleados
const employeeTypesInitial = [
  {
    id: '1',
    name: 'Empleado',
    code: 'EMP',
    status: 'active',
    intelliTime: true,
    intelliLunch: false,
    emailRequired: true,
    signatureRequired: true,
    requiredFields: ['Huella', 'Rostro', 'Perfil De Marcaje', 'Estructura', 'Contrato', 'Fecha Inicial Contrato', 'Fecha Final Contrato', 'Código', 'Cargo', 'Departamento', 'Sección', 'Sede', 'Contenedor', 'Empresa']
  },
  {
    id: '2',
    name: 'Proveedor',
    code: 'PRV',
    status: 'active',
    intelliTime: false,
    intelliLunch: false,
    emailRequired: false,
    signatureRequired: false,
    requiredFields: ['Código', 'Empresa', 'Contrato']
  },
  {
    id: '3',
    name: 'Visitante',
    code: 'VIS',
    status: 'active',
    intelliTime: false,
    intelliLunch: false,
    emailRequired: false,
    signatureRequired: true,
    requiredFields: ['Huella', 'Empresa Visitada', 'Motivo']
  },
];

export function EmployeeTypesScreen() {
  const [employeeTypes, setEmployeeTypes] = useState(employeeTypesInitial);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<typeof employeeTypesInitial[0] | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleTypeClick = (typeId: string) => {
    const type = employeeTypes.find(t => t.id === typeId);
    if (type) {
      setSelectedType(type);
    }
    setShowForm(true);
  };

  const handleSave = (updatedType: typeof employeeTypesInitial[0]) => {
    setEmployeeTypes(
      employeeTypes.map(type => 
        type.id === updatedType.id ? updatedType : type
      )
    );
    setShowForm(false);
    setSelectedType(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedType(null);
  };

  const handleAddNew = () => {
    const newType = {
      id: String(employeeTypes.length + 1),
      name: '',
      code: '',
      status: 'active',
      intelliTime: false,
      intelliLunch: false,
      emailRequired: false,
      signatureRequired: false,
      requiredFields: []
    };
    setSelectedType(newType);
    setShowForm(true);
  };

  const filteredTypes = employeeTypes.filter(
    type => type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header con título y botón de nuevo */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Tipos de Personal</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona los tipos de personal y sus configuraciones
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-full bg-gray-200 text-gray-500"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddNew}
              className="p-2 rounded-full bg-blue-500 text-white"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar un tipo de personal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Lista de tipos y encabezados */}
        <div className="bg-white rounded-lg shadow">
          {/* Encabezados de columna */}
          <div className="flex items-center p-4 border-b border-gray-200 bg-gray-50">
            <div className="w-8"></div>
            <span className="flex-1 font-medium text-sm">Tipo de persona</span>
            <div className="flex items-center space-x-8">
              <div className="w-24 text-center text-sm font-medium">¿Intelli Time?</div>
              <div className="w-24 text-center text-sm font-medium">¿Intelli Lunch?</div>
              <div className="w-6"></div>
            </div>
          </div>

          {/* Lista de tipos */}
          <div>
            {filteredTypes.map(type => (
              <React.Fragment key={type.id}>
                <EmployeeTypeItem
                  type={type.name}
                  isSelected={selectedType?.id === type.id}
                  onClick={() => handleTypeClick(type.id)}
                  intelliTime={type.intelliTime}
                  intelliLunch={type.intelliLunch}
                />
                
                {selectedType?.id === type.id && showForm && (
                  <div className="border-b border-gray-200 p-4 bg-gray-50">
                    <EmployeeTypeForm
                      employeeType={selectedType}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}