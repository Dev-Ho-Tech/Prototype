import React, { useState } from 'react';
import { X, Upload, Building2, Users, MapPin, Calendar, Phone, Mail, Briefcase, FileText, User, Settings, Clock, Camera, HelpCircle } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = TooltipPrimitive.Content;

const employeeSchema = z.object({
  firstName: z.string().min(1, 'El primer nombre es requerido'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'El primer apellido es requerido'),
  secondLastName: z.string().optional(),
  documentId: z.string().min(1, 'El número de documento es requerido'),
  documentType: z.string(),
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  gender: z.string().min(1, 'El género es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().min(1, 'El número de teléfono es requerido'),
  company: z.string().min(1, 'La empresa es requerida'),
  location: z.string().min(1, 'La sede es requerida'),
  department: z.string().min(1, 'El departamento es requerido'),
  employeeCode: z.string().min(1, 'El código de empleado es requerido'),
  position: z.string().min(1, 'El cargo es requerido'),
  contractType: z.string().min(1, 'El tipo de contrato es requerido'),
  startDate: z.string().min(1, 'La fecha de inicio es requerida'),
  endDate: z.string().optional(),
  scheduleType: z.string().min(1, 'El tipo de horario es requerido'),
  checkProfile: z.string(),
  status: z.boolean(),
  allowVisits: z.boolean(),
  photo: z.any().optional()
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  employee?: EmployeeFormData;
  onClose: () => void;
}

export function EmployeeForm({ employee, onClose }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee || {
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
      photo: null
    }
  });

  const onSubmit = (data: EmployeeFormData) => {
    // Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-gray-700">
              {employee ? 'Editar Empleado' : 'Nuevo Empleado'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-8">
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information Section */}
                  <div className="bg-gray-50/50 backdrop-blur-[2px] p-6 rounded-xl space-y-4 lg:col-span-2 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Información Personal
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-1">
                          <label className="block text-sm text-gray-500">Primer Nombre <span className="text-red-500">*</span></label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">Ingrese el primer nombre del empleado</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500" id="firstName-error">
                            {errors.firstName.message}
                          </p>
                        )}
                        <input
                          type="text"
                          {...register('firstName')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Segundo Nombre</label>
                        <input
                          type="text"
                          {...register('middleName')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">Primer Apellido <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          {...register('lastName')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Segundo Apellido</label>
                        <input
                          type="text"
                          {...register('secondLastName')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                      <div>
                        <label className="block text-sm text-gray-500">Fecha de Nacimiento <span className="text-red-500">*</span></label>
                        <input
                          type="date"
                          {...register('birthDate')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Género <span className="text-red-500">*</span></label>
                        <select
                          {...register('gender')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                          <option value="O">Otro</option>
                        </select>
                      </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">Tipo de Documento</label>
                        <select
                          {...register('documentType')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="dni">DNI</option>
                          <option value="extranjeria">Carné de Extranjería</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">N° de Documento</label>
                        <input
                          type="text"
                          {...register('documentId')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                
                  {/* Contact Information Section */}
                  <div className="bg-gray-50/50 backdrop-blur-[2px] p-6 rounded-xl space-y-4 lg:col-span-2 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Información de Contacto
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">Correo Principal</label>
                        <input
                          type="email"
                          {...register('email')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Celular</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            <img src="https://flagcdn.com/w20/co.png" alt="Colombia" className="w-5 h-auto mr-1" />
                            +57
                          </span>
                          <input
                            type="tel"
                            {...register('phone')}
                            className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                
                  {/* Employment Information Section */}
                  <div className="bg-gray-50/50 backdrop-blur-[2px] p-6 rounded-xl space-y-4 lg:col-span-3 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Información Laboral
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">Empresa</label>
                        <input
                          type="text"
                          {...register('company')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Sede</label>
                        <input
                          type="text"
                          {...register('location')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Departamento</label>
                        <input
                          type="text"
                          {...register('department')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">Código de Empleado</label>
                        <input
                          type="text"
                          {...register('employeeCode')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Cargo</label>
                        <input
                          type="text"
                          {...register('position')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Tipo de Contrato</label>
                        <select
                          {...register('contractType')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="indefinido">Indefinido</option>
                          <option value="temporal">Temporal</option>
                          <option value="practicas">Prácticas</option>
                        </select>
                      </div>
                    </div>
                  </div>
                
                  {/* Schedule Information Section */}
                  <div className="bg-gray-50/50 backdrop-blur-[2px] p-6 rounded-xl space-y-4 lg:col-span-3 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Horario y Asistencia
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">Fecha de Inicio</label>
                        <input
                          type="date"
                          {...register('startDate')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Fecha de Fin</label>
                        <input
                          type="date"
                          {...register('endDate')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Tipo de Horario</label>
                        <select
                          {...register('scheduleType')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="fullTime">Tiempo Completo</option>
                          <option value="partTime">Medio Tiempo</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">Perfil de Marcación</label>
                        <select
                          {...register('checkProfile')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="primary">Principal</option>
                          <option value="secondary">Secundario</option>
                          <option value="special">Especial</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-4 mt-6">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              {...register('status')}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-500">Activo</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              {...register('allowVisits')}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-500">Permitir Visitas</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="w-64 space-y-6">
                <div className="bg-gray-50/50 backdrop-blur-[2px] p-6 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-4">
                    <Camera className="w-4 h-4" />
                    Foto de Perfil
                  </h3>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-40 h-40 bg-gray-50 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {watch('photo') ? (
                          <img
                            src={URL.createObjectURL(watch('photo'))}
                            alt="Employee"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-20 h-20 text-gray-300" />
                        )}
                      </div>
                      <label className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-sm text-white text-xs py-2 text-center cursor-pointer hover:bg-black/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setValue('photo', file);
                          }}
                        />
                        <Camera className="w-4 h-4 mx-auto" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Haga clic en la imagen para cargar una foto
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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