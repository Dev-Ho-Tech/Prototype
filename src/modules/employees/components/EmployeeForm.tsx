import React, { useState } from 'react';
import { X, Upload, Building2, Users, MapPin, Calendar, Phone, Mail, Briefcase, FileText, User, Settings, Clock } from 'lucide-react';

interface EmployeeFormProps {
  onClose: () => void;
}

export function EmployeeForm({ onClose }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    documentId: '',
    documentType: 'cedula',
    birthDate: '',
    gender: '',
    email: '',
    
    // Contact Information
    phone: '',
    
    // Employment Information
    company: '',
    location: '',
    department: '',
    employeeCode: '',
    position: '',
    contractType: '',
    startDate: '',
    endDate: '',
    scheduleType: '',
    
    // Attendance Configuration
    checkProfile: 'primary',
    
    // Status and Controls
    status: true,
    allowVisits: false,
    
    photo: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {employee ? 'Editar Empleado' : 'Nuevo Empleado'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-400" />
                    Información Personal
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          {formData.photo ? (
                            <img
                              src={URL.createObjectURL(formData.photo)}
                              alt="Preview"
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm border border-gray-200"
                        >
                          <Upload className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primer nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Segundo nombre
                      </label>
                      <input
                        type="text"
                        value={formData.middleName}
                        onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primer apellido <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Segundo apellido
                      </label>
                      <input
                        type="text"
                        value={formData.secondLastName}
                        onChange={(e) => setFormData({ ...formData, secondLastName: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-gray-400" />
                    Documentación
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de documento <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.documentType}
                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="cedula">Cédula</option>
                        <option value="passport">Pasaporte</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de documento <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.documentId}
                        onChange={(e) => setFormData({ ...formData, documentId: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de nacimiento <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Género
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar género</option>
                        <option value="M">Hombre</option>
                        <option value="F">Mujer</option>
                        <option value="O">Otro</option>
                        <option value="N">No especificado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-gray-400" />
                    Información de Contacto
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo principal
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <div className="flex">
                        <select className="rounded-l-md border-r-0 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="+1">+1</option>
                          <option value="+53">+53</option>
                          <option value="+809">+809</option>
                          <option value="+849">+849</option>
                        </select>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="flex-1 rounded-r-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="XXX-XXX-XXXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                    Información Laboral
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar empresa</option>
                        <option value="hodelpa">Hodelpa Hotels & Resorts</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sede <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar sede</option>
                        <option value="gran_almirante">Hodelpa Gran Almirante</option>
                        <option value="garden_court">Hodelpa Garden Court</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Departamento <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar departamento</option>
                        <option value="lavanderia">Lavandería</option>
                        <option value="housekeeping">Housekeeping</option>
                        <option value="front_desk">Front Desk</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código de empleado <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.employeeCode}
                        onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cargo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contrato <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.contractType}
                        onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar contrato</option>
                        <option value="operativo">Operativo</option>
                        <option value="administrativo">Administrativo</option>
                        <option value="temporal">Temporal</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha inicio <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha fin
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de planificación
                      </label>
                      <select
                        value={formData.scheduleType}
                        onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar tipo</option>
                        <option value="fixed">Horario fijo</option>
                        <option value="rotating">Turnos rotativos</option>
                        <option value="flexible">Horario flexible</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-200">
              {/* Attendance Configuration */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  Configuración de Asistencia
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Perfil de marcaje
                    </label>
                    <select
                      value={formData.checkProfile}
                      onChange={(e) => setFormData({ ...formData, checkProfile: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="primary">Principal</option>
                      <option value="secondary">Secundario</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status and Controls */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-gray-400" />
                  Estado y Controles
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Empleado activo</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.allowVisits}
                        onChange={(e) => setFormData({ ...formData, allowVisits: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Permitir visitas</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}