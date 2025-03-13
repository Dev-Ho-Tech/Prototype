import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { WorkShiftItem } from './components/shifts/WorkShiftItem';
import { WorkShiftForm } from './components/WorkShiftForm';
import { DeleteConfirmationModal } from './components/shifts/DeleteConfirmationModal';
import { WorkShift, WorkDay } from './interfaces/WorkShift';
import { workShiftsData } from './temp/workShiftsData';

export function WorkShiftsScreen() {
  const [workShifts, setWorkShifts] = useState<WorkShift[]>(workShiftsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkShift, setSelectedWorkShift] = useState<WorkShift | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredWorkShifts = workShifts.filter(
    shift => shift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             shift.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (id: string) => {
    const shift = workShifts.find(s => s.id === id);
    if (shift) {
      setSelectedWorkShift(shift);
      setIsEditing(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const shift = workShifts.find(s => s.id === id);
    if (shift) {
      setSelectedWorkShift(shift);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedWorkShift) {
      setWorkShifts(workShifts.filter(shift => shift.id !== selectedWorkShift.id));
      setDeleteModalOpen(false);
      setSelectedWorkShift(null);
    }
  };

  const handleSaveWorkShift = (updatedWorkShift: WorkShift) => {
    if (isEditing) {
      setWorkShifts(
        workShifts.map(shift => 
          shift.id === updatedWorkShift.id ? updatedWorkShift : shift
        )
      );
      setIsEditing(false);
    } else {
      setWorkShifts([...workShifts, updatedWorkShift]);
      setIsCreating(false);
    }
    setSelectedWorkShift(null);
  };

  const handleCancelForm = () => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedWorkShift(null);
  };

  const handleCreateNew = () => {
    // Crear un nuevo turno con valores predeterminados
    const newId = String(Math.max(...workShifts.map(shift => Number(shift.id))) + 1);
    
    const defaultWorkDays: WorkDay[] = [
      { day: 'monday', isActive: true },
      { day: 'tuesday', isActive: true },
      { day: 'wednesday', isActive: true },
      { day: 'thursday', isActive: true },
      { day: 'friday', isActive: true },
      { day: 'saturday', isActive: false },
      { day: 'sunday', isActive: false },
    ];

    const newWorkShift: WorkShift = {
      id: newId,
      code: String(newId).padStart(3, '0'),
      name: '',
      startTime: '7:00 AM',
      endTime: '3:00 PM',
      departments: [],
      status: 'active',
      workDays: defaultWorkDays,
      startDayOfWeek: 'monday',
      breaks: [],
      requiresSupervision: false,
      autoApprove: true,
      notes: '',
      applyOnHolidays: false,
      allowDayCrossing: false
    };
    
    setSelectedWorkShift(newWorkShift);
    setIsCreating(true);
  };

  // Si estamos en modo de edición o creación, mostrar el formulario
  if (isEditing || isCreating) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
        <WorkShiftForm
          workShift={selectedWorkShift as WorkShift}
          onSave={handleSaveWorkShift}
          onCancel={handleCancelForm}
          isEditMode={isEditing}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header con título y botón de nuevo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Turnos de Trabajo</h1>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleCreateNew}
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span>Nuevo Turno</span>
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar turnos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tabla de turnos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departamentos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkShifts.length > 0 ? (
                filteredWorkShifts.map(shift => (
                  <WorkShiftItem
                    key={shift.id}
                    workShift={shift}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron turnos que coincidan con la búsqueda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal de confirmación de eliminación */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          shiftName={selectedWorkShift?.name || ''}
        />
      </div>
    </div>
  );
}