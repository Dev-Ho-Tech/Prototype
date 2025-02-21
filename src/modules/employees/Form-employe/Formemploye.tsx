import React, { useState } from 'react';
import { Calendar, Camera, Upload } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[90rem] mx-auto bg-white rounded-lg shadow-md p-6">        
        <div className="flex gap-6">
          <div className="flex-grow">
            <form onSubmit={handleSubmit}>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Primer Nombre</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Segundo Nombre</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Primer Apellido</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Segundo Apellido</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Tipo de Documento</label>
                      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>DNI</option>
                        <option>Carné de Extranjería</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >N° de Documento</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Correo Principal</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Celular</label>
                      <div className="flex">
                        <div className="w-24 flex items-center bg-gray-50 border border-gray-300 rounded-l-md px-3">
                          <img src="https://flagcdn.com/w20/co.png" alt="Colombia" className="w-5 h-auto mr-1" />
                          <span className="text-sm">+57</span>
                        </div>
                        <input type="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-tr-lg rounded-br-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500 leading-relaxed" >Perfiles de Marcaje</label>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Perfil 1</option>
                        <option>Perfil 2</option>
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <div className="relative">
                        <label className="text-sm text-gray-500" >Fecha de Nacimiento</label>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Género</label>
                      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Mujer</option>
                        <option>Hombre</option>
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Empresa</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Sede</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Departamento</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Cargo</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Contrato</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <div className="relative">
                        <label className="text-sm text-gray-500" >Fecha Inicial de Contrato</label>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="relative">
                        <label className="text-sm text-gray-500" >Fecha Final de Contrato</label>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                    </td>
                    <td className="py-2 px-2">                      
                      <label className="text-sm text-gray-500" >Código</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                    <td className="py-2 px-2">
                      <label className="text-sm text-gray-500" >Tipo de Planificación</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>

          <div className="w-44 flex-shrink-0">
            <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
              <div className="aspect-square w-full bg-gray-200 rounded-md overflow-hidden mb-2">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
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
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Camera className="w-5 h-5 mr-2" />
                  Tomar Foto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Formemploye;