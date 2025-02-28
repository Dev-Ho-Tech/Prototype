import React from 'react';
import { User, Briefcase, Calendar, Save, X } from 'lucide-react';
import { EmployeeProfileHeaderProps } from '../interface/types';

export const EmployeeProfile: React.FC<EmployeeProfileHeaderProps> = ({ employee, onClose }) => {
  // Estados para los formularios
  const [formData, setFormData] = React.useState({
    // Datos personales
    primerNombre: employee?.name?.split(' ')[0] || '',
    segundoNombre: '',
    primerApellido: employee?.name?.split(' ')?.[1] || '',
    segundoApellido: '',
    genero: 'Mujer',
    tipoDocumento: 'Cédula',
    numeroDocumento: employee?.id || '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    
    // Datos laborales
    codigo: '',
    modalidadTiempo: '002-Operativo',
    fechaInicialContrato: '',
    fechaFinalContrato: '',
    empresa: 'Emp - Caldelpa S.a.',
    sede: employee?.location || '',
    tipoPlanificacion: '',
    cargo: employee?.position || '',
    perfilesMarcaje: 'Principal',
  });

  // Manejadores de eventos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Datos del formulario:', formData);
    onClose();
  };

  // Biométricos disponibles
  const biometricOptions = [
    { id: 'rostro', label: 'Rostro', active: true },
    { id: 'huella', label: 'Huella', active: false },
    { id: 'palma', label: 'Palma', active: false },
    { id: 'iris', label: 'Iris', active: false },
    { id: 'proximidad', label: 'Proximidad', active: false },
    { id: 'pin', label: 'Pin', active: false },
    { id: 'firma', label: 'Firma', active: false },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
  
          <h2 className="text-xl font-semibold text-gray-900">
            {employee ? 'Editar Empleado' : 'Nuevo Empleado'}
          </h2>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </div>

      {/* Información del empleado */}
      {employee && (
        <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-2xl mr-4">
            {employee?.initial || 'U'}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{employee?.name || 'Usuario'}</h3>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <span className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-1" />
                {employee?.position || 'Sin cargo'}
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-1" />
                {employee?.department || 'Sin departamento'}
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {employee?.location || 'Sin ubicación'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Formulario completo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda: Datos Personales */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            Datos personales
          </h3>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Primer Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="primerNombre"
                value={formData.primerNombre}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Segundo Nombre
              </label>
              <input
                type="text"
                name="segundoNombre"
                value={formData.segundoNombre}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Primer Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="primerApellido"
                value={formData.primerApellido}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Segundo Apellido
              </label>
              <input
                type="text"
                name="segundoApellido"
                value={formData.segundoApellido}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Género <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Mujer">Mujer</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Otro">Otro</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tipo De Documento <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Cédula">Cédula</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="DNI">DNI</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Número De Documento <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Fecha De Nacimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Teléfono
              </label>
              <div className="flex">
                <div className="w-16">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="+57">+57</option>
                    <option value="+1">+1</option>
                    <option value="+34">+34</option>
                  </select>
                </div>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Correo Principal
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Biometría */}
          <h4 className="text-md font-medium text-gray-700 mt-6 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2Z" clipRule="evenodd" />
            </svg>
            Biometría
          </h4>
          <div className="flex flex-wrap gap-4 mt-2">
            {biometricOptions.map((option) => (
              <div key={option.id} className="flex flex-col items-center bg-gray-50 p-3 rounded-md">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center ${option.active ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-300'}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {option.id === 'rostro' && <path d="M9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"/>}
                    {option.id === 'rostro' && <path d="M13 10C13 9.44772 13.4477 9 14 9H14.01C14.5623 9 15.01 9.44772 15.01 10C15.01 10.5523 14.5623 11 14.01 11H14C13.4477 11 13 10.5523 13 10Z" fill="currentColor"/>}
                    {option.id === 'rostro' && <path d="M9 15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15H11C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z" fill="currentColor"/>}
                    {option.id === 'rostro' && <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8ZM8 5C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5H8Z" fill="currentColor"/>}
                  </svg>
                </div>
                <span className={`text-xs mt-1 ${option.active ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha: Datos Laborales */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
            Datos laborales
          </h3>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Código <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1399"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Modalidad De Tiempo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="modalidadTiempo"
                  value={formData.modalidadTiempo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="002-Operativo">002-Operativo</option>
                  <option value="001-Administrativo">001-Administrativo</option>
                  <option value="003-Gerencial">003-Gerencial</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Fecha Inicial Contrato <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fechaInicialContrato"
                value={formData.fechaInicialContrato}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Fecha Final Contrato
              </label>
              <input
                type="date"
                name="fechaFinalContrato"
                value={formData.fechaFinalContrato}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Empresa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Emp - Caldelpa S.a.">Emp - Caldelpa S.a.</option>
                  <option value="Emp - Hodelpa">Emp - Hodelpa</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Sede <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="sede"
                  value={formData.sede}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Hodelpa Gran Almirante">Hodelpa Gran Almirante</option>
                  <option value="Hodelpa Garden">Hodelpa Garden</option>
                  <option value="Centro Plaza Hodelpa">Centro Plaza Hodelpa</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tipo De Planificación
              </label>
              <div className="relative">
                <select
                  name="tipoPlanificacion"
                  value={formData.tipoPlanificacion}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Fijo">Fijo</option>
                  <option value="Rotativo">Rotativo</option>
                  <option value="Especial">Especial</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Cargo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Vpue 56 - Costurera">Vpue 56 - Costurera</option>
                  <option value="Vpue 34 - Cocinero">Vpue 34 - Cocinero</option>
                  <option value="Vpue 12 - Recepcionista">Vpue 12 - Recepcionista</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Perfiles De Marcaje
              </label>
              <div className="relative flex items-center border border-gray-300 p-2 rounded-md">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  Principal
                  <button type="button" className="ml-1 text-blue-600 hover:text-blue-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
                <button 
                  type="button" 
                  className="text-blue-600 hover:text-blue-800 ml-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};