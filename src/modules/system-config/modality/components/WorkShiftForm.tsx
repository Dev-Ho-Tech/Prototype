import React, { useState } from 'react';
import { WorkShift } from '../interfaces/WorkShift';
import { TabHeader } from './shifts/TabHeader';
import { BasicInfoTab } from './BasicInfoTab';
import { WorkScheduleTab } from './WorkScheduleTab';
import { DaysConfigTab } from './DaysConfigTab';
import { AdditionalConfigTab } from './AdditionalConfigTab';

interface WorkShiftFormProps {
  workShift: WorkShift;
  onSave: (workShift: WorkShift) => void;
  onCancel: () => void;
  isEditMode: boolean;
}

export const WorkShiftForm: React.FC<WorkShiftFormProps> = ({ 
  workShift: initialWorkShift, 
  onSave, 
  onCancel,
  isEditMode
}) => {
  const [workShift, setWorkShift] = useState<WorkShift>(initialWorkShift);
  const [activeTab, setActiveTab] = useState(0);
  
  const handleChange = (updatedValues: Partial<WorkShift>) => {
    setWorkShift({ ...workShift, ...updatedValues });
  };

  const handleSubmit = () => {
    onSave(workShift);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <BasicInfoTab workShift={workShift} onChange={handleChange} />;
      case 1:
        return <WorkScheduleTab workShift={workShift} onChange={handleChange} />;
      case 2:
        return <DaysConfigTab workShift={workShift} onChange={handleChange} />;
      case 3:
        return <AdditionalConfigTab workShift={workShift} onChange={handleChange} />;
      default:
        return <BasicInfoTab workShift={workShift} onChange={handleChange} />;
    }
  };

  const isFormValid = () => {
    // Validaciones básicas
    return (
      workShift.code.trim() !== '' &&
      workShift.name.trim() !== '' &&
      workShift.departments.length > 0
    );
  };

  return (
    <div className="flex flex-col px-20 py-10">
      {/* Header con título y botones */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? 'Editar Turno de Trabajo' : 'Nuevo Turno de Trabajo'}
        </h1>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`px-4 py-2 rounded-md text-white ${
              isFormValid() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-700 cursor-not-allowed'
            }`}
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Pestañas */}
      <TabHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Contenido de la pestaña activa */}
      <div className="px-6">
        {renderTabContent()}
      </div>
    </div>
  );
};