/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { 
  Info, 
  Clock, 
  FileText, 
  Fingerprint, 
  Settings,
  ChevronDown,
  Plus,
  X
} from 'lucide-react';
import { Contract, ScheduleLimitGroup, ContractDetailProps } from '../../interfaces/types';

interface ContractEditFormProps extends ContractDetailProps {
  onSave: (contract: Contract) => void;
  scheduleLimitGroups: ScheduleLimitGroup[];
  isEditMode: boolean;
}

export const ContractEditForm: React.FC<ContractEditFormProps> = ({
  contract: initialContract,
  // onEdit,
  onBack,
  onSave,
  scheduleLimitGroups,
  isEditMode
}) => {
  const [contract, setContract] = useState<Contract>({...initialContract});
  const [conceptSearch, setConceptSearch] = useState('');
  const [showConceptDropdown, setShowConceptDropdown] = useState(false);

  const weekdays = [
    { id: 'mon', label: 'Lun' },
    { id: 'tue', label: 'Mar' },
    { id: 'wed', label: 'Mié' },
    { id: 'thu', label: 'Jue' },
    { id: 'fri', label: 'Vie' },
    { id: 'sat', label: 'Sáb' },
    { id: 'sun', label: 'Dom' }
  ];

  const shifts = [
    { id: 'morning', label: 'Mañana' },
    { id: 'afternoon', label: 'Tarde' },
    { id: 'night', label: 'Noche' }
  ];
  
  const concepts = [
    { id: 'overtime', label: 'Horas fuera de horario' },
    { id: 'night-overtime', label: 'Horas fuera de horario nocturnas' },
    { id: 'holiday', label: 'Horas en día feriado' },
    { id: 'special', label: 'Horas especiales' },
    { id: 'weekend', label: 'Horas en fin de semana' },
    { id: 'early', label: 'Horas anticipadas' },
    { id: 'late', label: 'Horas tardías' }
  ];

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = ['00', '15', '30', '45'];
  const ampm = ['AM', 'PM'];

  // Inicializar con valores predeterminados si no existen
  useEffect(() => {
    if (!contract.workDays) {
      setContract(prev => ({
        ...prev,
        workDays: ['mon', 'tue', 'wed', 'thu', 'fri']
      }));
    }
    if (!contract.shifts) {
      setContract(prev => ({
        ...prev,
        shifts: ['morning']
      }));
    }
    if (!contract.concepts) {
      setContract(prev => ({
        ...prev,
        concepts: ['overtime', 'night-overtime', 'holiday', 'special']
      }));
    }
    if (!contract.allowedCheckMethods) {
      setContract(prev => ({
        ...prev,
        allowedCheckMethods: ['face']
      }));
    }
  });

  const handleWorkDayToggle = (dayId: string) => {
    if (!isEditMode) return;
    
    const workDays = contract.workDays || [];
    if (workDays.includes(dayId)) {
      setContract({
        ...contract,
        workDays: workDays.filter(day => day !== dayId)
      });
    } else {
      setContract({
        ...contract,
        workDays: [...workDays, dayId]
      });
    }
  };

  const handleShiftToggle = (shiftId: string) => {
    if (!isEditMode) return;
    
    const shifts = contract.shifts || [];
    if (shifts.includes(shiftId)) {
      setContract({
        ...contract,
        shifts: shifts.filter(shift => shift !== shiftId)
      });
    } else {
      setContract({
        ...contract,
        shifts: [...shifts, shiftId]
      });
    }
  };

  const handleCheckMethodSelect = (methodId: string) => {
    if (!isEditMode) return;
    
    setContract({
      ...contract,
      allowedCheckMethods: [methodId]
    });
  };

  const handleConceptToggle = (conceptId: string) => {
    if (!isEditMode) return;
    
    const concepts = contract.concepts || [];
    if (concepts.includes(conceptId)) {
      setContract({
        ...contract,
        concepts: concepts.filter(c => c !== conceptId)
      });
    } else {
      setContract({
        ...contract,
        concepts: [...concepts, conceptId]
      });
      setConceptSearch('');
      setShowConceptDropdown(false);
    }
  };

  const parseTime = (timeString: string = '7:00 AM') => {
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':');
    return {
      hour: hour,
      minute: minute,
      period: period
    };
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', part: 'hour' | 'minute' | 'period', value: string) => {
    if (!isEditMode) return;
    
    const timeField = field === 'startTime' ? 'startTime' : 'endTime';
    const currentTime = parseTime(contract[timeField]);
    
    const updatedTime = {
      ...currentTime,
      [part]: value
    };
    
    setContract({
      ...contract,
      [timeField]: `${updatedTime.hour}:${updatedTime.minute} ${updatedTime.period}`
    });
  };

  const handleToggle = (field: keyof Contract) => {
    if (!isEditMode) return;
    
    setContract({
      ...contract,
      [field]: !contract[field]
    });
  };

  const handleInputChange = (field: keyof Contract, value: any) => {
    if (!isEditMode) return;
    
    setContract({
      ...contract,
      [field]: value
    });
  };

  const handleWorkingHoursChange = (field: keyof Contract['workingHours'], value: any) => {
    if (!isEditMode) return;
    
    setContract({
      ...contract,
      workingHours: {
        ...contract.workingHours,
        [field]: value
      }
    });
  };

  const handleSaveChanges = () => {
    onSave(contract);
  };

  const filteredConcepts = concepts.filter(
    concept => 
      !contract.concepts?.includes(concept.id) &&
      concept.label.toLowerCase().includes(conceptSearch.toLowerCase())
  );

  const startTime = parseTime(contract.startTime || '7:00 AM');
  const endTime = parseTime(contract.endTime || '3:00 PM');

  const renderSectionTitle = (icon: React.ReactNode, title: string) => (
    <div className="flex items-center mb-4 text-blue-600">
      {icon}
      <h3 className="text-base font-medium ml-2">{title}</h3>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl">
        <h2 className="text-lg font-medium">
          {isEditMode 
            ? `Editar Modalidad De Tiempo: ${initialContract.name}`
            : `Modalidad De Tiempo: ${initialContract.name}`
          }
        </h2>
      </div>
  
      <div className="p-6 space-y-6">
        {/* Información Básica */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          {renderSectionTitle(
            <Info className="w-5 h-5" />, 
            "Información Básica"
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contract.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                disabled={!isEditMode}
                className={`w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de Modalidad De Tiempo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contract.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditMode}
                className={`w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grupo de asignación de turno
              </label>
              <div className="relative">
                <select
                  value={contract.workingHours.scheduleLimitGroup || ''}
                  onChange={(e) => handleWorkingHoursChange('scheduleLimitGroup', e.target.value)}
                  disabled={!isEditMode}
                  className={`appearance-none w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                >
                  {scheduleLimitGroups.map(group => (
                    <option key={group.id} value={group.name}>{group.name}</option>
                  ))}
                </select>
                {isEditMode && (
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Día de inicio
              </label>
              <div className="relative">
                <select
                  value={contract.workingHours.startDay || ''}
                  onChange={(e) => handleWorkingHoursChange('startDay', e.target.value)}
                  disabled={!isEditMode}
                  className={`appearance-none w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                >
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sábado">Sábado</option>
                  <option value="Domingo">Domingo</option>
                </select>
                {isEditMode && (
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
              </div>
            </div>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Días de la semana</label>
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-md">
              {weekdays.map(day => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleWorkDayToggle(day.id)}
                  disabled={!isEditMode}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition
                    ${contract.workDays?.includes(day.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-blue-500 text-blue-500'}
                    ${!isEditMode && !contract.workDays?.includes(day.id) ? 'opacity-50' : ''}
                  `}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Horario de Trabajo */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          {renderSectionTitle(
            <Clock className="w-5 h-5" />, 
            "Horario de Trabajo"
          )}
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Inicio de jornada de trabajo
              </label>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    value={startTime.hour}
                    onChange={(e) => handleTimeChange('startTime', 'hour', e.target.value)}
                    disabled={!isEditMode}
                    className={`appearance-none p-2 pr-6 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                  >
                    {hours.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  {isEditMode && (
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
                <span>:</span>
                <div className="relative">
                  <select
                    value={startTime.minute}
                    onChange={(e) => handleTimeChange('startTime', 'minute', e.target.value)}
                    disabled={!isEditMode}
                    className={`appearance-none p-2 pr-7 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                  >
                    {minutes.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {isEditMode && (
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
                <div className="relative">
                  <select
                    value={startTime.period}
                    onChange={(e) => handleTimeChange('startTime', 'period', e.target.value)}
                    disabled={!isEditMode}
                    className={`appearance-none p-2 pr-6 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                  >
                    {ampm.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {isEditMode && (
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
  
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Fin de jornada de trabajo
              </label>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    value={endTime.hour}
                    onChange={(e) => handleTimeChange('endTime', 'hour', e.target.value)}
                    disabled={!isEditMode}
                    className={`appearance-none p-2 pr-6 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                  >
                    {hours.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  {isEditMode && (
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
                <span>:</span>
                <div className="relative">
                  <select
                    value={endTime.minute}
                    onChange={(e) => handleTimeChange('endTime', 'minute', e.target.value)}
                    disabled={!isEditMode}
                    className={`appearance-none p-2 pr-7 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                  >
                    {minutes.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {isEditMode && (
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
                <div className="relative">
                  <select
                    value={endTime.period}
                    onChange={(e) => handleTimeChange('endTime', 'period', e.target.value)}
                    disabled={!isEditMode}
                    className={`appearance-none p-2 pr-6 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
                  >
                    {ampm.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {isEditMode && (
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Configuración de Horas */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          {renderSectionTitle(
            <FileText className="w-5 h-5" />, 
            "Configuración de Horas"
          )}
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad de horas semanales <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={contract.workingHours.perWeek}
                onChange={(e) => handleWorkingHoursChange('perWeek', parseInt(e.target.value))}
                disabled={!isEditMode}
                min="1"
                className={`w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máx. horas a trabajar por día
              </label>
              <input
                type="number"
                value={contract.workingHours.maxDailyHours || ''}
                onChange={(e) => handleWorkingHoursChange('maxDailyHours', parseInt(e.target.value))}
                disabled={!isEditMode}
                min="1"
                className={`w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
              />
            </div>
          </div>
  
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-gray-700">¿Cruzar días?</span>
            <div 
              className={`relative inline-block w-12 h-6 ${isEditMode ? 'cursor-pointer' : ''}`}
              onClick={() => isEditMode && handleToggle('crossDays')}
            >
              <div className={`absolute w-12 h-6 rounded-full transition-colors ${contract.crossDays ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${contract.crossDays ? 'translate-x-6' : 'translate-x-1'} top-0.5 left-0`}></div>
            </div>
          </div>
  
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Adscripción de turno (selección múltiple)
              </span>
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-md">
              {shifts.map(shift => (
                <button
                  key={shift.id}
                  type="button"
                  onClick={() => handleShiftToggle(shift.id)}
                  disabled={!isEditMode}
                  className={`
                    px-4 py-2 rounded-md transition
                    ${contract.shifts?.includes(shift.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-blue-500 text-blue-500'}
                    ${!isEditMode && !contract.shifts?.includes(shift.id) ? 'opacity-50' : ''}
                  `}
                >
                  {shift.label}
                </button>
              ))}
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mín. horas extras
              </label>
              <input
                type="number"
                value={contract.workingHours.minOvertimeHours || 0}
                onChange={(e) => handleWorkingHoursChange('minOvertimeHours', parseInt(e.target.value))}
                disabled={!isEditMode}
                min="0"
                className={`w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máx. horas extras
              </label>
              <input
                type="number"
                value={contract.workingHours.maxOvertimeHours || 0}
                onChange={(e) => handleWorkingHoursChange('maxOvertimeHours', parseInt(e.target.value))}
                disabled={!isEditMode}
                min="0"
                className={`w-full p-2 border border-gray-300 rounded-md ${!isEditMode ? 'bg-gray-100' : ''}`}
              />
            </div>
          </div>
  
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-gray-700">¿Auto aprobar?</span>
            <div 
              className={`relative inline-block w-12 h-6 ${isEditMode ? 'cursor-pointer' : ''}`}
              onClick={() => isEditMode && handleToggle('autoApprove')}
            >
              <div className={`absolute w-12 h-6 rounded-full transition-colors ${contract.autoApprove ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${contract.autoApprove ? 'translate-x-6' : 'translate-x-1'} top-0.5 left-0`}></div>
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Conceptos
              </span>
            </label>
            <div className="flex flex-wrap mb-2 p-2 bg-gray-50 rounded-md">
              {contract.concepts?.map(conceptId => {
                const concept = concepts.find(c => c.id === conceptId);
                if (!concept) return null;
                
                return (
                  <div key={conceptId} className="bg-blue-100 text-blue-800 text-sm rounded-md py-1 px-2 mr-2 mb-2 flex items-center">
                    {concept.label}
                    {isEditMode && (
                      <button 
                        type="button" 
                        className="ml-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleConceptToggle(conceptId)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
              
              {isEditMode && (
                <div className="relative mt-2 w-full">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={conceptSearch}
                      onChange={(e) => {
                        setConceptSearch(e.target.value);
                        setShowConceptDropdown(true);
                      }}
                      placeholder="Buscar conceptos..."
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md flex items-center"
                      onClick={() => setShowConceptDropdown(!showConceptDropdown)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {showConceptDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-40 overflow-y-auto">
                      {filteredConcepts.length > 0 ? (
                        filteredConcepts.map(concept => (
                          <div 
                            key={concept.id} 
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleConceptToggle(concept.id)}
                          >
                            {concept.label}
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500">No se encontraron conceptos</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
  
{/* Métodos de Marcaje Permitidos */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        {renderSectionTitle(
          <Fingerprint className="w-5 h-5" />, 
          "Métodos de Marcaje Permitidos"
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => handleCheckMethodSelect('face')}
            disabled={!isEditMode}
            className={`
              p-4 border rounded-lg flex flex-col items-center justify-center transition h-35
              ${contract.allowedCheckMethods?.includes('face')
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700'}
              ${!isEditMode && !contract.allowedCheckMethods?.includes('face') ? 'opacity-50' : ''}
            `}
          >
            <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                <circle cx="12" cy="7" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              </svg>
            </div>
            <span>Rostro</span>
          </button>

          <button
            type="button"
            onClick={() => handleCheckMethodSelect('fingerprint')}
            disabled={!isEditMode}
            className={`
              p-4 border rounded-lg flex flex-col items-center justify-center transition h-35
              ${contract.allowedCheckMethods?.includes('fingerprint')
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700'}
              ${!isEditMode && !contract.allowedCheckMethods?.includes('fingerprint') ? 'opacity-50' : ''}
            `}
          >
            <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04.054-.09A13.916 13.916 0 0 0 8 11a4 4 0 1 1 8 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0 0 15.171 17m3.839-1.132c.449-1.029.81-2.118 1.05-3.262A13.918 13.918 0 0 0 20 8.416a7.963 7.963 0 0 0-1.293-2.716M17 5.393A7.969 7.969 0 0 0 12 4c-2.5 0-4.727 1.164-6.183 2.766M9.998 15h.003"></path>
              </svg>
            </div>
            <span>Huella</span>
          </button>

          <button
            type="button"
            onClick={() => handleCheckMethodSelect('card')}
            disabled={!isEditMode}
            className={`
              p-4 border rounded-lg flex flex-col items-center justify-center transition h-35
              ${contract.allowedCheckMethods?.includes('card')
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700'}
              ${!isEditMode && !contract.allowedCheckMethods?.includes('card') ? 'opacity-50' : ''}
            `}
          >
            <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-600">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <span>Tarjeta</span>
          </button>

          <button
            type="button"
            onClick={() => handleCheckMethodSelect('pin')}
            disabled={!isEditMode}
            className={`
              p-4 border rounded-lg flex flex-col items-center justify-center transition h-35
              ${contract.allowedCheckMethods?.includes('pin')
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700'}
              ${!isEditMode && !contract.allowedCheckMethods?.includes('pin') ? 'opacity-50' : ''}
            `}
          >
            <div className="mb-2 rounded-full bg-white p-2 shadow-sm flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-600">
                <path d="M9 10h6V7c0-1.7-1.4-3-3-3S9 5.3 9 7z" />
                <rect width="18" height="12" x="3" y="10" rx="2" />
                <path d="M8 15h.01" />
                <path d="M12 15h.01" />
                <path d="M16 15h.01" />
              </svg>
            </div>
            <span>PIN</span>
          </button>
        </div>
      </div>
  
      {/* Configuración Adicional */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        {renderSectionTitle(
          <Settings className="w-5 h-5" />, 
          "Configuración Adicional"
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Ignorar ausencias</span>
            <div 
              className={`relative inline-block w-12 h-6 ${isEditMode ? 'cursor-pointer' : ''}`}
              onClick={() => isEditMode && handleToggle('ignoreAbsences')}
            >
              <div className={`absolute w-12 h-6 rounded-full transition-colors ${contract.ignoreAbsences ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${contract.ignoreAbsences ? 'translate-x-6' : 'translate-x-1'} top-0.5 left-0`}></div>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">¿Primer y último marcaje?</span>
            <div 
              className={`relative inline-block w-12 h-6 ${isEditMode ? 'cursor-pointer' : ''}`}
              onClick={() => isEditMode && handleToggle('firstLastCheck')}
            >
              <div className={`absolute w-12 h-6 rounded-full transition-colors ${contract.firstLastCheck ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${contract.firstLastCheck ? 'translate-x-6' : 'translate-x-1'} top-0.5 left-0`}></div>
            </div>
          </div>
        </div>
      </div>
        
      </div>
  
      {/* Footer con botones */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        {isEditMode && (
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Guardar
          </button>
        )}
      </div>
    </div>

  );
}