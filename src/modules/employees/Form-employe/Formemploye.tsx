import React, { useState } from 'react';
import { Calendar, Camera, Upload, User, Phone, Briefcase, FileText, HelpCircle } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function Formemploye() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
      <div className="max-w-[90rem] mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nuevo Empleado</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Personal Information Section */}
              <div className="lg:col-span-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-medium text-gray-700">Información Personal</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Primer Nombre <span className="text-red-500">*</span></label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Segundo Nombre</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Primer Apellido <span className="text-red-500">*</span></label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Segundo Apellido</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                </div>
              </div>

              {/* Contact and Document Section */}
              <div className="lg:col-span-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-medium text-gray-700">Documentación y Contacto</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      Tipo de Documento <span className="text-red-500">*</span>
                      <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" data-tooltip-id="doc-type-help" data-tooltip-content="Seleccione el tipo de documento de identidad del empleado" />
                    </label>
                    <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200">
                      <option>DNI</option>
                      <option>Carné de Extranjería</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">N° de Documento <span className="text-red-500">*</span></label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Correo Principal <span className="text-red-500">*</span></label>
                    <input type="email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Celular <span className="text-red-500">*</span></label>
                    <div className="flex">
                      <div className="w-24 flex items-center bg-white border border-gray-300 rounded-l-md px-3">
                        <img src="https://flagcdn.com/w20/co.png" alt="Colombia" className="w-5 h-auto mr-1" />
                        <span className="text-sm">+57</span>
                      </div>
                      <input type="tel" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-r-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      Fecha de Nacimiento <span className="text-red-500">*</span>
                      <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" data-tooltip-id="birth-date-help" data-tooltip-content="La fecha de nacimiento debe ser mayor a 18 años" />
                    </label>
                    <input type="date" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Género</label>
                    <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200">
                      <option>Mujer</option>
                      <option>Hombre</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Employment Information Section */}
              <div className="lg:col-span-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-medium text-gray-700">Información Laboral</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Empresa</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Sede</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Departamento</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Cargo</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Código</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Perfiles de Marcaje</label>
                    <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200">
                      <option>Perfil 1</option>
                      <option>Perfil 2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contract Information Section */}
              <div className="lg:col-span-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-medium text-gray-700">Información de Contrato</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contrato</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha Inicial de Contrato</label>
                    <input type="date" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha Final de Contrato</label>
                    <input type="date" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tipo de Planificación</label>
                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:border-blue-400 transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-64 flex-shrink-0 order-first lg:order-last">
            <div className="sticky top-4 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="aspect-square w-full bg-gray-200 rounded-lg overflow-hidden mb-6 shadow-inner">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Camera size={48} />
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <label className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <Upload className="w-5 h-5 mr-2" />
                  Subir Foto
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
                <button type="button" className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <Camera className="w-5 h-5 mr-2" />
                  Tomar Foto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <Tooltip id="doc-type-help" />
          <Tooltip id="birth-date-help" />
          <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancelar
          </button>
          <button type="submit" className="px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Formemploye;