import React, { useState } from 'react';
import { X, Upload, Building2, Users, MapPin, Calendar, Phone, Mail, Briefcase, FileText, User, Settings, Clock, Camera } from 'lucide-react';

interface EmployeeFormProps {
  employee?: any;
  onClose: () => void;
}

export function EmployeeForm({ employee, onClose }: EmployeeFormProps) {
  const [formData, setFormData] = useState(employee || {
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

          <form onSubmit={handleSubmit}>
            <div className="flex gap-6">
              <div className="flex-grow">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Primer Nombre</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Segundo Nombre</label>
                        <input
                          type="text"
                          value={formData.middleName}
                          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Primer Apellido</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Segundo Apellido</label>
                        <input
                          type="text"
                          value={formData.secondLastName}
                          onChange={(e) => setFormData({ ...formData, secondLastName: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Tipo de Documento</label>
                        <select
                          value={formData.documentType}
                          onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        >
                          <option value="dni">DNI</option>
                          <option value="extranjeria">Carné de Extranjería</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">N° de Documento</label>
                        <input
                          type="text"
                          value={formData.documentId}
                          onChange={(e) => setFormData({ ...formData, documentId: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Correo Principal</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Celular</label>
                        <div className="flex">
                          <div className="w-24 flex items-center bg-gray-50 border border-gray-300 rounded-l-md px-3">
                            <img src="https://flagcdn.com/w20/co.png" alt="Colombia" className="w-5 h-auto mr-1" />
                            <span className="text-sm">+57</span>
                          </div>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-tr-lg rounded-br-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Perfiles de Marcaje</label>
                        <select
                          value={formData.checkProfile}
                          onChange={(e) => setFormData({ ...formData, checkProfile: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        >
                          <option value="primary">Perfil 1</option>
                          <option value="secondary">Perfil 2</option>
                        </select>
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Género</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        >
                          <option value="F">Mujer</option>
                          <option value="M">Hombre</option>
                        </select>
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Empresa</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Sede</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Departamento</label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Cargo</label>
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Contrato</label>
                        <input
                          type="text"
                          value={formData.contractType}
                          onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Fecha Inicial de Contrato</label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Fecha Final de Contrato</label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Código</label>
                        <input
                          type="text"
                          value={formData.employeeCode}
                          onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <label className="text-sm text-gray-500">Tipo de Planificación</label>
                        <input
                          type="text"
                          value={formData.scheduleType}
                          onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-44 flex-shrink-0">
                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <div className="aspect-square w-full bg-gray-200 rounded-md overflow-hidden mb-2">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Camera size={48} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <Upload className="w-5 h-5 mr-2" />
                      Subir Foto
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, photo: file });
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Tomar Foto
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {/* Employment Information */}
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
                {employee ? 'Guardar cambios' : 'Registrar empleado'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}