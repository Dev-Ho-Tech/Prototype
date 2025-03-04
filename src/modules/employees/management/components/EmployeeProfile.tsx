import { useState } from 'react';
import { ActionButtons } from './EmployeeProfile/ActionButtons';
import { EmployeeHeader } from './EmployeeProfile/EmployeeHeader';
import { StructureModal } from './EmployeeProfile/TreeNode';
import { Briefcase, Eye, Fingerprint, User } from 'lucide-react';
import { Employee } from '../interface/types';
import { biometricOptions } from './EmployeeProfile/utils/const_biometric';

export const EmployeeProfileForm = ({ employee, onClose }: { employee?: Employee | null; onClose: () => void }) => {
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [personalData, setPersonalData] = useState({
    primerNombre: employee?.primerNombre || '',
    segundoNombre: employee?.segundoNombre || '',
    primerApellido: employee?.primerApellido || '',
    segundoApellido: employee?.segundoApellido || '',
    genero: employee?.genero || 'Mujer',
    tipoDocumento: employee?.tipoDocumento || 'Cédula',
    numeroDocumento: employee?.numeroDocumento || '',
    fechaNacimiento: employee?.fechaNacimiento || '',
    telefono: employee?.telefono || '',
    correo: employee?.correo || '',
    permitirVisitas: employee?.permitirVisitas || false,
  });

  const [laborData, setLaborData] = useState({
    codigo: employee?.codigo || '',
    modalidadTiempo: employee?.modalidadTiempo || '002-Operativo',
    fechaInicialContrato: employee?.fechaInicialContrato || '',
    fechaFinalContrato: employee?.fechaFinalContrato || '',
    empresa: employee?.empresa || 'Emp - Caldelpa S.a.',
    sede: employee?.sede || 'Hodelpa Gran Almirante',
    tipoPlanificacion: employee?.tipoPlanificacion || '',
    cargo: employee?.cargo || '',
    perfilesMarcaje: employee?.perfilesMarcaje || ['Principal'],
  });


  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setPersonalData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLaborDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setLaborData({
      ...laborData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    // Lógica para guardar cambios
    console.log('Datos guardados:', { personalData, laborData });
    onClose();
  };

  return (
    <div className="flex flex-col h-full">
      <EmployeeHeader employee={employee ?? null} onClose={onClose} />
      
      <div className="p-6 flex-1 overflow-auto">
        {/* Contenedor principal con layout mejorado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Columna de Datos Personales */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Datos personales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Primer Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="primerNombre"
                  value={personalData.primerNombre}
                  onChange={handlePersonalDataChange}
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
                  value={personalData.segundoNombre}
                  onChange={handlePersonalDataChange}
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
                  value={personalData.primerApellido}
                  onChange={handlePersonalDataChange}
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
                  value={personalData.segundoApellido}
                  onChange={handlePersonalDataChange}
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
                    value={personalData.genero}
                    onChange={handlePersonalDataChange}
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
                    value={personalData.tipoDocumento}
                    onChange={handlePersonalDataChange}
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
                  value={personalData.numeroDocumento}
                  onChange={handlePersonalDataChange}
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
                  value={personalData.fechaNacimiento}
                  onChange={handlePersonalDataChange}
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
                    value={personalData.telefono}
                    onChange={handlePersonalDataChange}
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
                  value={personalData.correo}
                  onChange={handlePersonalDataChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Columna de Datos Laborales */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
              Datos laborales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Código <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="codigo"
                  value={laborData.codigo}
                  onChange={handleLaborDataChange}
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
                    value={laborData.modalidadTiempo}
                    onChange={handleLaborDataChange}
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
                  value={laborData.fechaInicialContrato}
                  onChange={handleLaborDataChange}
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
                  value={laborData.fechaFinalContrato}
                  onChange={handleLaborDataChange}
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
                    value={laborData.empresa}
                    onChange={handleLaborDataChange}
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
                    value={laborData.sede}
                    onChange={handleLaborDataChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="111 - Hodelpa Gran Almirante">111 - Hodelpa Gran Almirante</option>
                    <option value="112 - Hodelpa Garden">112 - Hodelpa Garden</option>
                    <option value="113 - Centro Plaza Hodelpa">113 - Centro Plaza Hodelpa</option>
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
                    value={laborData.tipoPlanificacion}
                    onChange={handleLaborDataChange}
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
                    value={laborData.cargo}
                    onChange={handleLaborDataChange}
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
        
        {/* Sección de Biometría */}
        <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1">
              <h4 className="text-md font-medium text-gray-700 flex items-center">
                <Fingerprint className="w-5 h-5 mr-2 text-blue-500" />
                Métodos de marcajes permitidos
              </h4>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label htmlFor="permitir-visitas" className="mr-2 text-sm font-medium text-gray-700">
                  Permitir visitas
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="permitirVisitas" 
                    id="permitir-visitas" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label 
                    htmlFor="permitir-visitas" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
              <button 
                type="button" 
                className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                onClick={() => setShowStructureModal(true)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Ver estructura
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-4 mt-2">
            {biometricOptions.map((option) => (
              <div key={option.id} className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-md flex items-center justify-center ${option.active ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-300'}`}>
                  {option.icon}
                </div>
                <span className={`text-xs mt-2 ${option.active ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Botones de acción */}
        <ActionButtons onSave={handleSave} onCancel={onClose} />
        
        {/* Estilos CSS para el toggle switch */}
        <style>{`
          .toggle-checkbox:checked {
            right: 0;
            border-color: #3B82F6;
          }
          .toggle-checkbox:checked + .toggle-label {
            background-color: #3B82F6;
          }
          .toggle-label {
            transition: background-color 0.2s ease;
          }
        `}</style>
        
        {/* Modal de Estructura Organizacional */}
        <StructureModal 
          isOpen={showStructureModal}
          onClose={() => setShowStructureModal(false)}
        />
      </div>
    </div>
  );
};
