import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { EmployeeTypeItem } from './components/EmployeeTypeItem';
import { EmployeeTypeForm } from './components/EmployeeTypeForm';
import { Modal } from './components/Modal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { EmployeeType } from './interface/EmployeeType';
import { employeeTypesData } from './data';

export function EmployeeTypesScreen() {
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>(employeeTypesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<EmployeeType | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredTypes = employeeTypes.filter(
    type => type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (id: string) => {
    const type = employeeTypes.find(t => t.id === id);
    if (type) {
      setSelectedEmployeeType(type);
      setEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const type = employeeTypes.find(t => t.id === id);
    if (type) {
      setSelectedEmployeeType(type);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployeeType) {
      setEmployeeTypes(employeeTypes.filter(type => type.id !== selectedEmployeeType.id));
      setDeleteModalOpen(false);
      setSelectedEmployeeType(null);
    }
  };

  const handleSave = (updatedType: EmployeeType) => {
    setEmployeeTypes(
      employeeTypes.map(type => 
        type.id === updatedType.id ? updatedType : type
      )
    );
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setSelectedEmployeeType(null);
  };

  const handleAddNew = () => {
    const newId = String(Math.max(...employeeTypes.map(type => parseInt(type.id))) + 1);
    const newType: EmployeeType = {
      id: newId,
      name: '',
      code: '',
      status: 'active',
      intelliTime: false,
      intelliLunch: false,
      emailRequired: false,
      signatureRequired: false,
      requiredFields: []
    };
    setSelectedEmployeeType(newType);
    setCreateModalOpen(true);
  };

  const handleCreateSave = (newType: EmployeeType) => {
    setEmployeeTypes([...employeeTypes, newType]);
    setCreateModalOpen(false);
    setSelectedEmployeeType(null);
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

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
          
          <div className="flex items-center space-x-3">

            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span>Nuevo Tipo</span>
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
          </div>
        </div>

        {/* Tabla de tipos de personal */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-4 py-3 text-left w-12"></th>
                <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Tipo de persona
                </th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Control de Tiempo
                </th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Comedor
                </th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Email requerido
                </th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTypes.map(type => (
                <EmployeeTypeItem
                  key={type.id}
                  employeeType={type}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  isSelected={selectedIds.includes(type.id)}
                  onSelect={toggleSelect}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de edición */}
        <Modal 
          isOpen={editModalOpen} 
          onClose={() => setEditModalOpen(false)}
          title="Editar tipo de personal"
          size="md"
        >
          {selectedEmployeeType && (
            <EmployeeTypeForm
              employeeType={selectedEmployeeType}
              onSave={handleSave}
              onCancel={() => setEditModalOpen(false)}
            />
          )}
        </Modal>

        {/* Modal de creación */}
        <Modal 
          isOpen={createModalOpen} 
          onClose={() => setCreateModalOpen(false)}
          title="Nuevo tipo de personal"
          size="md"
        >
          {selectedEmployeeType && (
            <EmployeeTypeForm
              employeeType={selectedEmployeeType}
              onSave={handleCreateSave}
              onCancel={() => setCreateModalOpen(false)}
            />
          )}
        </Modal>

        {/* Modal de confirmación de eliminación */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          typeName={selectedEmployeeType?.name || ''}
        />
      </div>
    </div>
  );
}