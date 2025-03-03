import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { 
  AccessTypeDetail, 
  AccessTypeDetailFormProps, 
  AssociatedDevice 
} from '../interfaces/types';
import { AccessScheduleSelector } from './AccessScheduleSelector';
import { AssociatedDevices } from './AssociatedDevices';

export const AccessTypeDetailForm: React.FC<AccessTypeDetailFormProps> = ({
  accessTypeId,
  accessDetail,
  accessSchedules,
  availableDevices,
  onSave,
  onCancel
}) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | undefined>(
    accessDetail?.schedule?.id
  );
  
  const [selectedDevices, setSelectedDevices] = useState<AssociatedDevice[]>(
    accessDetail?.associatedDevices || []
  );

  useEffect(() => {
    if (accessDetail) {
      setSelectedScheduleId(accessDetail.schedule?.id);
      setSelectedDevices(accessDetail.associatedDevices);
    }
  }, [accessDetail]);

  const handleDeviceToggle = (device: AssociatedDevice) => {
    const isSelected = selectedDevices.some(selectedDevice => selectedDevice.id === device.id);
    
    if (isSelected) {
      setSelectedDevices(selectedDevices.filter(selectedDevice => selectedDevice.id !== device.id));
    } else {
      setSelectedDevices([...selectedDevices, device]);
    }
  };

  const handleSubmit = () => {
    const selectedSchedule = accessSchedules.find(schedule => schedule.id === selectedScheduleId);
    
    const detailData: AccessTypeDetail = {
      id: accessDetail?.id || `detail-${Date.now()}`,
      accessTypeId,
      schedule: selectedSchedule,
      associatedDevices: selectedDevices
    };
    
    onSave(detailData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Configuración del Tipo de Acceso
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Selector de Horario */}
          <AccessScheduleSelector
            schedules={accessSchedules}
            selectedScheduleId={selectedScheduleId}
            onScheduleSelect={setSelectedScheduleId}
          />

          {/* Selector de Dispositivos Asociados */}
          <AssociatedDevices
            availableDevices={availableDevices}
            selectedDevices={selectedDevices}
            onDeviceToggle={handleDeviceToggle}
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};