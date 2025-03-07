import React, { useState, useEffect } from 'react';
import { X, Save, ChevronDown, X as XIcon } from 'lucide-react';
import { Contract, ContractFormProps, ContractType } from '../interfaces/types';
import TimeSelector from './TimeSelector';

// Componente para la selección múltiple de conceptos
const MultiSelect = ({ value = [], onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Función para manejar la selección de una opción
  const handleSelect = (option) => {
    if (!value.includes(option.value)) {
      const newValue = [...value, option.value];
      onChange(newValue);
    }
    setSearchTerm('');
  };
  
  // Función para eliminar una opción seleccionada
  const handleRemove = (optionValue) => {
    const newValue = value.filter(val => val !== optionValue);
    onChange(newValue);
  };
  
  // Obtener etiquetas para las opciones seleccionadas
  const getOptionLabel = (optionValue) => {
    const option = options.find(opt => opt.value === optionValue);
    return option ? option.label : optionValue;
  };
  
  // Filtrar opciones basado en el término de búsqueda
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !value.includes(option.value)
  );
  
  return (
    <div className="relative">
      {/* Área de visualización de selecciones */}
      <div 
        className="w-full p-2 border border-gray-300 rounded-md min-h-[42px] flex flex-wrap gap-1 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {value.length > 0 ? (
          value.map(val => (
            <div key={val} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {getOptionLabel(val)}
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(val);
                }}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <XIcon size={14} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Selecciona conceptos...</div>
        )}
        <div className="ml-auto flex items-center">
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>
      
      {/* Dropdown para la selección */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
          <div className="p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full p-2 border border-gray-300 rounded-md"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            {filteredOptions.map(option => (
              <li 
                key={option.value}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No hay opciones disponibles</li>
            )}
          </ul>
          <div className="p-2 border-t border-gray-200">
            <button
              type="button"
              className="w-full p-2 bg-gray-100 text-gray-700 rounded-md text-sm"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      
      {/* Overlay para cerrar el dropdown cuando se hace clic fuera */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const ContractForm: React.FC<ContractFormProps> = ({
  contract,
  onSave,
  onCancel,
  scheduleLimitGroups
}) => {
  const isEdit = !!contract;
  
  // Opciones para el campo de conceptos
  const conceptOptions = [
    { value: "horas-fuera-horario", label: "Horas fuera de horario" },
    { value: "horas-fuera-horario-nocturna", label: "Horas fuera de horario nocturnas" },
    { value: "horas-feriado", label: "Horas en día feriado" },
    { value: "horas-especiales", label: "Horas especiales" }
  ];
  
  // Estado inicial para un nuevo contrato
  const [formData, setFormData] = useState<Contract>({
    id: '',
    code: '',
    name: '',
    type: ContractType.FIXED,
    workingHours: {
      perWeek: 40,
      maxDailyHours: 8,
      minOvertimeHours: 0,
      maxOvertimeHours: 0,
      nightShiftStart: '09:00 pm',
      nightShiftEnd: '07:00 am',
      startDay: 'Lunes',
      scheduleLimitGroup: 'Semanal'
    },
    concepts: [], // Nuevo campo para conceptos
    overtimeAllowed: false,
    crossDays: false,
    autoApprove: false,
    ignoreAbsences: false,
    firstLastCheck: true,
    status: 'active'
  });

  // Cargar datos del contrato si estamos en modo edición
  useEffect(() => {
    if (contract) {
      setFormData({
        ...contract,
        concepts: contract.concepts || [] // Asegurarse de que concepts exista
      });
    }
  }, [contract]);

  // Manejador para cambios en campos simples
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Manejador para cambios en campos anidados (workingHours)
  const handleWorkingHoursChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | number = value;
    if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }
    
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [name]: parsedValue
      }
    });
  };

  // Manejador para el cambio en la selección de conceptos
  const handleConceptsChange = (newConcepts) => {
    setFormData({
      ...formData,
      concepts: newConcepts
    });
  };

  // Manejador para envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Asegurarse de que tenemos todos los campos requeridos
    if (!formData.code || !formData.name) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    // Crear un ID para nuevos contratos
    const completeData: Contract = {
      ...formData as Contract,
      id: contract?.id || `contract-${Date.now()}`
    };
    
    onSave(completeData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-lg font-medium">
          {isEdit ? `Editar Contrato: ${contract.name}` : 'Nuevo registro'}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sección 1: Información básica */}
          <div>
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Código <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del contrato <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="concepts" className="block text-sm font-medium text-gray-700 mb-1">
                Conceptos
              </label>
              <MultiSelect
                value={formData.concepts}
                onChange={handleConceptsChange}
                options={conceptOptions}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="scheduleLimitGroup" className="block text-sm font-medium text-gray-700 mb-1">
                Grupo de asignación de turno
              </label>
              <select
                id="scheduleLimitGroup"
                name="scheduleLimitGroup"
                value={formData.workingHours?.scheduleLimitGroup}
                onChange={handleWorkingHoursChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {scheduleLimitGroups.map(group => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="startDay" className="block text-sm font-medium text-gray-700 mb-1">
                Día de inicio
              </label>
              <select
                id="startDay"
                name="startDay"
                value={formData.workingHours?.startDay}
                onChange={handleWorkingHoursChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>
          </div>
          
          {/* Sección 2: Horario nocturno */}
          <div>
          <div className="mb-4">
            <TimeSelector
              id="nightShiftStart"
              name="nightShiftStart"
              value={formData.workingHours?.nightShiftStart}
              onChange={handleWorkingHoursChange}
              label="Inicio del recargo nocturno"
            />
          </div>
            
          <div className="mb-4">
            <TimeSelector
              id="nightShiftEnd"
              name="nightShiftEnd"
              value={formData.workingHours?.nightShiftEnd}
              onChange={handleWorkingHoursChange}
              label="Fin del recargo nocturno"
            />
          </div>
          </div>
          
          {/* Sección 3: Horas semanales */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">Horas semanales</h3>
            
            <div className="mb-4">
              <label htmlFor="perWeek" className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad de horas <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="perWeek"
                name="perWeek"
                value={formData.workingHours?.perWeek}
                onChange={handleWorkingHoursChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="minOvertimeHours" className="block text-sm font-medium text-gray-700 mb-1">
                Mín. horas extras
              </label>
              <input
                type="number"
                id="minOvertimeHours"
                name="minOvertimeHours"
                value={formData.workingHours?.minOvertimeHours}
                onChange={handleWorkingHoursChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="maxOvertimeHours" className="block text-sm font-medium text-gray-700 mb-1">
                Máx. horas extras
              </label>
              <input
                type="number"
                id="maxOvertimeHours"
                name="maxOvertimeHours"
                value={formData.workingHours?.maxOvertimeHours}
                onChange={handleWorkingHoursChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Sección Sin Horario */}
        <div className="px-6 pb-4">
          <h3 className="text-md font-medium text-gray-700 mb-3">Sin Horario</h3>
          
          <div className="mb-4">
            <label htmlFor="maxDailyHours" className="block text-sm font-medium text-gray-700 mb-1">
              Máx. horas a trabajar
            </label>
            <input
              type="number"
              id="maxDailyHours"
              name="maxDailyHours"
              value={formData.workingHours?.maxDailyHours}
              onChange={handleWorkingHoursChange}
              className="w-full md:w-48 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm text-gray-700">¿Cruzar días?</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="crossDays"
                  checked={formData.crossDays}
                  onChange={(e) => setFormData({...formData, crossDays: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm text-gray-700">¿Auto aprobar?</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="autoApprove"
                  checked={formData.autoApprove}
                  onChange={(e) => setFormData({...formData, autoApprove: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm text-gray-700">Ignorar ausencias</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="ignoreAbsences"
                  checked={formData.ignoreAbsences}
                  onChange={(e) => setFormData({...formData, ignoreAbsences: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm text-gray-700">¿Primer y último marcaje?</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="firstLastCheck"
                  checked={formData.firstLastCheck}
                  onChange={(e) => setFormData({...formData, firstLastCheck: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};