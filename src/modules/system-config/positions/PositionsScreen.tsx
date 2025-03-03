import { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Save, X } from 'lucide-react';
import { AccessType, AccessTypeDetail, AssociatedDevice } from './interfaces/types';
import { 
  accessTypes as mockAccessTypes, 
  accessProfiles, 
  accessSchedules, 
  associatedDevices,
  accessTypeDetails as mockAccessTypeDetails
} from './data';
import { AccessTypeList } from './components/AccessTypeList';
import { AccessTypeForm } from './components/AccessTypeForm';
import { AccessScheduleSelector } from './components/AccessScheduleSelector';
import { ImprovedAssociatedDevices } from './components/ImprovedAssociatedDevices';
import { AccessProfileSelector } from './components/AccessProfileSelector';

enum ScreenMode {
  LIST = 'LIST',
  ADD = 'ADD',
  EDIT = 'EDIT',
  DETAIL = 'DETAIL'
}

export function AccessTypesScreen() {
  // Estado para los tipos de acceso y sus detalles
  const [accessTypes, setAccessTypes] = useState<AccessType[]>(mockAccessTypes);
  const [accessTypeDetails, setAccessTypeDetails] = useState<AccessTypeDetail[]>(mockAccessTypeDetails);
  
  // Estado para controlar el modo de la pantalla
  const [screenMode, setScreenMode] = useState<ScreenMode>(ScreenMode.LIST);
  
  // Estado para el tipo de acceso y detalle actualmente seleccionados
  const [selectedAccessType, setSelectedAccessType] = useState<AccessType | null>(null);
  const [selectedAccessDetail, setSelectedAccessDetail] = useState<AccessTypeDetail | null>(null);
  
  // Estado para la configuración de acceso
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | undefined>(undefined);
  const [selectedDevices, setSelectedDevices] = useState<AssociatedDevice[]>([]);

  // Efecto para establecer el detalle seleccionado cuando cambia el tipo de acceso seleccionado
  useEffect(() => {
    if (selectedAccessType && screenMode === ScreenMode.DETAIL) {
      const detail = accessTypeDetails.find(
        detail => detail.accessTypeId === selectedAccessType.id
      ) || null;
      
      setSelectedAccessDetail(detail);
      
      if (detail) {
        setSelectedScheduleId(detail.schedule?.id);
        setSelectedDevices(detail.associatedDevices);
      } else {
        setSelectedScheduleId(undefined);
        setSelectedDevices([]);
      }
    } else {
      setSelectedAccessDetail(null);
      setSelectedScheduleId(undefined);
      setSelectedDevices([]);
    }
  }, [selectedAccessType, accessTypeDetails, screenMode]);

  // Manejadores de eventos
  const handleAddAccessType = () => {
    setSelectedAccessType(null);
    setScreenMode(ScreenMode.ADD);
  };

  const handleEditAccessType = (accessType: AccessType) => {
    setSelectedAccessType(accessType);
    setScreenMode(ScreenMode.EDIT);
  };

  const handleSelectAccessType = (accessType: AccessType) => {
    setSelectedAccessType(accessType);
    setScreenMode(ScreenMode.DETAIL);
  };

  const handleDeleteAccessType = (id: string) => {
    setAccessTypes(accessTypes.filter(type => type.id !== id));
    setAccessTypeDetails(accessTypeDetails.filter(detail => detail.accessTypeId !== id));
  };

  const handleSaveAccessType = (accessType: AccessType) => {
    if (screenMode === ScreenMode.ADD) {
      setAccessTypes([...accessTypes, accessType]);
    } else if (screenMode === ScreenMode.EDIT) {
      setAccessTypes(
        accessTypes.map(type => (type.id === accessType.id ? accessType : type))
      );
    }
    setScreenMode(ScreenMode.LIST);
  };

  const handleSaveAccessDetail = () => {
    if (!selectedAccessType) return;

    const selectedSchedule = accessSchedules.find(schedule => schedule.id === selectedScheduleId);
    
    const detailData: AccessTypeDetail = {
      id: selectedAccessDetail?.id || `detail-${Date.now()}`,
      accessTypeId: selectedAccessType.id,
      schedule: selectedSchedule,
      associatedDevices: selectedDevices
    };
    
    const existingDetailIndex = accessTypeDetails.findIndex(
      d => d.accessTypeId === detailData.accessTypeId
    );

    if (existingDetailIndex >= 0) {
      const newDetails = [...accessTypeDetails];
      newDetails[existingDetailIndex] = detailData;
      setAccessTypeDetails(newDetails);
    } else {
      setAccessTypeDetails([...accessTypeDetails, detailData]);
    }

    setScreenMode(ScreenMode.LIST);
  };

  const handleDeviceToggle = (device: AssociatedDevice) => {
    const isSelected = selectedDevices.some(selectedDevice => selectedDevice.id === device.id);
    
    if (isSelected) {
      setSelectedDevices(selectedDevices.filter(selectedDevice => selectedDevice.id !== device.id));
    } else {
      setSelectedDevices([...selectedDevices, device]);
    }
  };

  const handleCancel = () => {
    setScreenMode(ScreenMode.LIST);
    setSelectedAccessType(null);
    setSelectedAccessDetail(null);
  };

  // Renderizado del formulario de detalle de acceso
  const renderDetailForm = () => {
    if (!selectedAccessType) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={handleCancel}
              className="mr-3 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-medium text-gray-900">
              Configuración de acceso: {selectedAccessType.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Selector de Perfil */}
            <AccessProfileSelector
              profiles={accessProfiles}
              selectedProfileId={selectedProfileId}
              onChange={setSelectedProfileId}
            />

            {/* Selector de Horario */}
            <AccessScheduleSelector
              schedules={accessSchedules}
              selectedScheduleId={selectedScheduleId}
              onScheduleSelect={setSelectedScheduleId}
            />

            {/* Selector de Dispositivos Asociados */}
            <ImprovedAssociatedDevices
              availableDevices={associatedDevices}
              selectedDevices={selectedDevices}
              onDeviceToggle={handleDeviceToggle}
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveAccessDetail}
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

  // Renderizado condicional según el modo de la pantalla
  const renderContent = () => {
    switch (screenMode) {
      case ScreenMode.ADD:
      case ScreenMode.EDIT:
        return (
          <AccessTypeForm
            accessType={screenMode === ScreenMode.EDIT ? selectedAccessType || undefined : undefined}
            accessProfiles={accessProfiles}
            onSave={handleSaveAccessType}
            onCancel={handleCancel}
          />
        );
      case ScreenMode.DETAIL:
        return renderDetailForm();
      case ScreenMode.LIST:
      default:
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Tipos de Acceso</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Configuración de acceso para visitantes, proveedores y otros usuarios externos
                </p>
              </div>
              <button
                onClick={handleAddAccessType}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Tipo de Acceso</span>
              </button>
            </div>

            <AccessTypeList
              accessTypes={accessTypes}
              onSelect={handleSelectAccessType}
              onAdd={handleAddAccessType}
              onEdit={handleEditAccessType}
              onDelete={handleDeleteAccessType}
            />
          </>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        {renderContent()}
      </div>
    </div>
  );
}