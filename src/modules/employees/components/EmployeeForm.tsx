import { X, Phone, Briefcase, User, Clock, Camera } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Datos de ejemplo para los selectores
const empresas = [
  { id: 1, nombre: "Empresa ABC" },
  { id: 2, nombre: "Corporación XYZ" },
  { id: 3, nombre: "Grupo Innovación" },
  { id: 4, nombre: "Tecnología Aplicada S.A." }
];

const sedes = [
  { id: 1, nombre: "Sede Principal" },
  { id: 2, nombre: "Sucursal Norte" },
  { id: 3, nombre: "Oficina Central" },
  { id: 4, nombre: "Centro Operativo" }
];

const departamentos = [
  { id: 1, nombre: "Recursos Humanos" },
  { id: 2, nombre: "Tecnología" },
  { id: 3, nombre: "Contabilidad" },
  { id: 4, nombre: "Operaciones" },
  { id: 5, nombre: "Ventas" },
  { id: 6, nombre: "Marketing" }
];

// Estilos personalizados
const inputStyles = "mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-8";
const selectStyles = "mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-8 bg-white";
const labelStyles = "block text-xs text-gray-500";

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

  const onSubmit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-h-screen">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-700">
              {employee ? 'Editar Empleado' : 'Nuevo Empleado'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              {/* Left Column - Photo Upload */}
              <div className="w-48 px-2">
                <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-300 mb-4">
                  <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2">
                    <Camera className="w-3 h-3" />
                    Foto de Perfil
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 bg-gray-50 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {watch('photo') ? (
                          <img
                            src={URL.createObjectURL(watch('photo'))}
                            alt="Employee"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-16 h-16 text-gray-300" />
                        )}
                      </div>
                      <label className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-sm text-white text-xs py-1 text-center cursor-pointer hover:bg-black/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setValue('photo', file);
                          }}
                        />
                        <Camera className="w-3 h-3 mx-auto" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Cargar foto
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content - Form Fields */}
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-4 gap-3">
                  {/* Personal Information Row */}
                  <div className="col-span-4">
                    <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2 px-2">
                      <User className="w-3 h-3" />
                      Datos personales
                    </h3>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Primer Nombre <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className={inputStyles}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500" id="firstName-error">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Segundo Nombre</label>
                    <input
                      type="text"
                      {...register('middleName')}
                      className={inputStyles}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Primer Apellido <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className={inputStyles}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Segundo Apellido</label>
                    <input
                      type="text"
                      {...register('secondLastName')}
                      className={inputStyles}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Género <span className="text-red-500">*</span></label>
                    <select
                      {...register('gender')}
                      className={selectStyles}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Tipo de Documento</label>
                    <select
                      {...register('documentType')}
                      className={selectStyles}
                    >
                      <option value="dni">DNI</option>
                      <option value="extranjeria">Carné de Extranjería</option>
                    </select>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>N° de Documento</label>
                    <input
                      type="text"
                      {...register('documentId')}
                      className={inputStyles}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Fecha de Nacimiento</label>
                    <input
                      type="date"
                      {...register('birthDate')}
                      className={`px-1 ${inputStyles}`}
                    />
                  </div>

                  {/* Contact Information Row */}
                  <div className="col-span-4 mt-2">
                    <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2 px-2">
                      <Phone className="w-3 h-3" />
                      Información de Contacto
                    </h3>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Correo Principal</label>
                    <input
                      type="email"
                      {...register('email')}
                      className={inputStyles}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Celular</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm h-8">
                        <img src="https://flagcdn.com/w20/co.png" alt="Colombia" className="w-4 h-auto mr-1" />
                        +57
                      </span>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-8"
                      />
                    </div>
                  </div>

                  {/* Employment Information Row */}
                  <div className="col-span-4 mt-2">
                    <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2 px-2">
                      <Briefcase className="w-3 h-3" />
                      Información Laboral
                    </h3>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Empresa</label>
                    <select
                      {...register('company')}
                      className={selectStyles}
                    >
                      <option value="">Seleccionar...</option>
                      {empresas.map(empresa => (
                        <option key={empresa.id} value={empresa.id.toString()}>
                          {empresa.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Sede</label>
                    <select
                      {...register('location')}
                      className={selectStyles}
                    >
                      <option value="">Seleccionar...</option>
                      {sedes.map(sede => (
                        <option key={sede.id} value={sede.id.toString()}>
                          {sede.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Departamento</label>
                    <select
                      {...register('department')}
                      className={selectStyles}
                    >
                      <option value="">Seleccionar...</option>
                      {departamentos.map(departamento => (
                        <option key={departamento.id} value={departamento.id.toString()}>
                          {departamento.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Código de Empleado</label>
                    <input
                      type="text"
                      {...register('employeeCode')}
                      className={inputStyles}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Cargo</label>
                    <input
                      type="text"
                      {...register('position')}
                      className={inputStyles}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Tipo de Contrato</label>
                    <select
                      {...register('contractType')}
                      className={selectStyles}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="indefinido">Indefinido</option>
                      <option value="temporal">Temporal</option>
                      <option value="practicas">Prácticas</option>
                    </select>
                  </div>

                  {/* Schedule Information Row */}
                  <div className="col-span-4 mt-2">
                    <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2 px-2">
                      <Clock className="w-3 h-3" />
                      Horario y Asistencia
                    </h3>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Fecha de Inicio</label>
                    <input
                      type="date"
                      {...register('startDate')}
                      className={`px-1 ${inputStyles}`}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Fecha de Fin</label>
                    <input
                      type="date"
                      {...register('endDate')}
                      className={`px-1 ${inputStyles}`}
                    />
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Tipo de Horario</label>
                    <select
                      {...register('scheduleType')}
                      className={selectStyles}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="fullTime">Tiempo Completo</option>
                      <option value="partTime">Medio Tiempo</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  
                  <div className="px-2">
                    <label className={labelStyles}>Perfil de Marcación</label>
                    <select
                      {...register('checkProfile')}
                      className={selectStyles}
                    >
                      <option value="primary">Principal</option>
                      <option value="secondary">Secundario</option>
                      <option value="special">Especial</option>
                    </select>
                  </div>
                  
                  <div className="px-2 flex items-center space-x-4 mt-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('status')}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs text-gray-500">Activo</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('allowVisits')}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs text-gray-500">Permitir Visitas</span>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 mt-4 pt-3 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}