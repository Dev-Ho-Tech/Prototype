import React from 'react';
import { WorkShift, Break } from '../interfaces/WorkShift';
import { Toggle } from './shifts/Toggle';
import { X, Plus } from 'lucide-react';

interface AdditionalConfigTabProps {
  workShift: WorkShift;
  onChange: (updatedValues: Partial<WorkShift>) => void;
}

export const AdditionalConfigTab: React.FC<AdditionalConfigTabProps> = ({ workShift, onChange }) => {
  // Función para añadir un nuevo descanso
  const handleAddBreak = () => {
    const newBreak: Break = {
      id: `${workShift.id}-${Date.now()}`,
      startTime: '12:00',
      endTime: '13:00',
      description: 'Descanso'
    };
    
    onChange({ breaks: [...workShift.breaks, newBreak] });
  };

  // Función para eliminar un descanso
  const handleRemoveBreak = (breakId: string) => {
    onChange({
      breaks: workShift.breaks.filter(b => b.id !== breakId)
    });
  };

  // Función para actualizar un descanso
  const handleUpdateBreak = (breakId: string, field: keyof Break, value: string) => {
    onChange({
      breaks: workShift.breaks.map(b => 
        b.id === breakId ? { ...b, [field]: value } : b
      )
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mt-4">
      <div className="mb-8">
        <h2 className="text-lg font-medium flex items-center text-gray-800">
          <span className="flex items-center justify-center bg-indigo-100 w-8 h-8 rounded-full mr-2">
            <span className="text-indigo-600">4</span>
          </span>
          Configuración Adicional
        </h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Descansos programados
          </label>
          <button
            type="button"
            onClick={handleAddBreak}
            className="inline-flex items-center py-1 px-3 border border-indigo-600 text-sm text-indigo-600 rounded hover:bg-indigo-50"
          >
            <Plus className="w-4 h-4 mr-1" /> Añadir descanso
          </button>
        </div>

        {workShift.breaks.length > 0 ? (
          <div className="border rounded-md divide-y">
            <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-gray-50 font-medium text-sm">
              <div>Inicio</div>
              <div>Fin</div>
              <div>Descripción</div>
            </div>
            
            {workShift.breaks.map((breakItem) => (
              <div key={breakItem.id} className="grid grid-cols-3 gap-2 px-4 py-3 items-center">
                <div>
                  <input
                    type="time"
                    value={breakItem.startTime}
                    onChange={(e) => handleUpdateBreak(breakItem.id, 'startTime', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <input
                    type="time"
                    value={breakItem.endTime}
                    onChange={(e) => handleUpdateBreak(breakItem.id, 'endTime', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={breakItem.description}
                    onChange={(e) => handleUpdateBreak(breakItem.id, 'description', e.target.value)}
                    className="flex-grow p-1 border border-gray-300 rounded"
                    placeholder="Descripción"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBreak(breakItem.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
            No hay descansos programados
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Toggle
          label="Requiere supervisión"
          description="Los marcajes en este turno necesitarán aprobación especial"
          isChecked={workShift.requiresSupervision}
          onChange={(checked) => onChange({ requiresSupervision: checked })}
        />
        
        <Toggle
          label="¿Auto aprobar?"
          description="Aprueba automáticamente los marcajes dentro de la tolerancia"
          isChecked={workShift.autoApprove}
          onChange={(checked) => onChange({ autoApprove: checked })}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notas
        </label>
        <textarea
          value={workShift.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          placeholder="Información adicional sobre este turno..."
        />
      </div>
    </div>
  );
};