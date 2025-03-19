/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { VisitorFormProps, Visitor} from '../interfaces/types';

// Componente para formulario de visitantes
const VisitorForm: React.FC<VisitorFormProps> = ({ visitor, onClose, onSave }) => {
  // Estado inicial para nuevo visitante
  const emptyVisitor: Visitor = {
    id: '',
    firstName: '',
    lastName: '',
    company: '',
    documentType: 'cedula',
    documentNumber: '',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg', // Placeholder
    status: 'pending',
    visit: {
      reason: '',
      host: '',
      hostDepartment: '',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hora después
      duration: '1h'
    },
    credentials: {
      type: 'card',
      requiresEscort: false
    }
  };

  // Estado para el formulario
  const [formData, setFormData] = useState<Visitor>(visitor || emptyVisitor);
  
  // Inicializar formulario cuando cambia el visitante
  useEffect(() => {
    if (visitor) {
      setFormData(visitor);
    }
  }, [visitor]);

  // Manejar cambios en campos simples
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en campos anidados
  const handleNestedChange = (section: 'visit' | 'credentials', name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  // Manejar checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        [name]: checked
      }
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.firstName || !formData.lastName || !formData.documentNumber || 
        !formData.visit.reason || !formData.visit.host) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    // Asignar ID para nuevo visitante
    const visitorToSave: Visitor = {
      ...formData,
      id: formData.id || `visitor-${Date.now()}`
    };

    onSave(visitorToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Cabecera */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-medium">
            {visitor ? 'Editar Visitante' : 'Nuevo Visitante'}
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Formulario */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna 1: Información del visitante */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Visitante</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Documento
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="cedula">Cédula</option>
                    <option value="passport">Pasaporte</option>
                    <option value="license">Licencia</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Documento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="active">Activo</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>
              
              {/* Columna 2: Información de la visita */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Visita</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motivo de Visita <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.visit.reason}
                    onChange={(e) => handleNestedChange('visit', 'reason', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anfitrión <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.visit.host}
                    onChange={(e) => handleNestedChange('visit', 'host', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departamento
                  </label>
                  <input
                    type="text"
                    value={formData.visit.hostDepartment}
                    onChange={(e) => handleNestedChange('visit', 'hostDepartment', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora Inicio
                    </label>
                    <input
                      type="datetime-local"
                      value={new Date(formData.visit.startTime).toISOString().slice(0, 16)}
                      onChange={(e) => handleNestedChange('visit', 'startTime', new Date(e.target.value).toISOString())}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora Fin
                    </label>
                    <input
                      type="datetime-local"
                      value={new Date(formData.visit.endTime).toISOString().slice(0, 16)}
                      onChange={(e) => handleNestedChange('visit', 'endTime', new Date(e.target.value).toISOString())}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Credencial
                  </label>
                  <select
                    value={formData.credentials.type}
                    onChange={(e) => handleNestedChange('credentials', 'type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="card">Tarjeta</option>
                    <option value="pin">PIN</option>
                    <option value="card_pin">Tarjeta + PIN</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="requiresEscort"
                      checked={formData.credentials.requiresEscort}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Requiere acompañante
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {visitor ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitorForm;