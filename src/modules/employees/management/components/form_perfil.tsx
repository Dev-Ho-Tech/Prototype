import React from 'react';
import { User } from 'lucide-react';

interface PersonalData {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  genero: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  telefono?: string;
  correo?: string;
}

interface PersonalDataFormProps {
  personalData: PersonalData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({ personalData, handleChange }) => {
  // Biométricos disponibles
  const biometricOptions = [
    { id: 'rostro', label: 'Rostro', icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center bg-blue-100 rounded-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"/>
        <path d="M13 10C13 9.44772 13.4477 9 14 9H14.01C14.5623 9 15.01 9.44772 15.01 10C15.01 10.5523 14.5623 11 14.01 11H14C13.4477 11 13 10.5523 13 10Z" fill="currentColor"/>
        <path d="M9 15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15H11C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8ZM8 5C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5H8Z" fill="currentColor"/>
      </svg>
    </div>, active: true },
    { id: 'huella', label: 'Huella', icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center bg-blue-100 rounded-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.5 8C15.5 9.933 13.933 11.5 12 11.5C10.067 11.5 8.5 9.933 8.5 8C8.5 6.067 10.067 4.5 12 4.5C13.933 4.5 15.5 6.067 15.5 8ZM12 19.5C9.5 19.5 7.32 18.18 6 16.25C6.03 14.25 10 13.15 12 13.15C14 13.15 17.97 14.25 18 16.25C16.68 18.18 14.5 19.5 12 19.5Z" fill="currentColor"/>
      </svg>
    </div>, active: false },
    { id: 'palma', label: 'Palma', icon: <div className="w-10 h-10 text-gray-300 flex items-center justify-center bg-gray-100 rounded-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C11.5 2 11 2.2 10.6 2.6C10.2 3 10 3.5 10 4V11.3C9.4 11.1 8.8 11 8 11C6.4 11 5 11.8 4.6 12.1C4 12.5 3.5 13.1 3.1 13.8C2.8 14.5 3 15.4 3.4 16C4.6 18.2 7.6 21 12 21C16.4 21 19.4 18.2 20.6 16C21 15.4 21.3 14.5 20.9 13.8C20.6 13.1 20 12.5 19.4 12.1C18.5 11.6 17.6 11 16 11C15.2 11 14.5 11.1 14 11.3V4C14 3.5 13.8 3 13.4 2.6C13 2.2 12.5 2 12 2Z" fill="currentColor"/>
      </svg>
    </div>, active: false },
    { id: 'iris', label: 'Iris', icon: <div className="w-10 h-10 text-gray-300 flex items-center justify-center bg-gray-100 rounded-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill="currentColor"/>
      </svg>
    </div>, active: false },
    { id: 'proximidad', label: 'Proximidad', icon: <div className="w-10 h-10 text-gray-300 flex items-center justify-center bg-gray-100 rounded-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V6H20V18ZM6 11H8V9H6V11ZM6 14H8V12H6V14ZM10 11H18V9H10V11ZM10 14H15V12H10V14Z" fill="currentColor"/>
      </svg>
    </div>, active: false },
    { id: 'pin', label: 'Pin', icon: <div className="w-10 h-10 text-gray-300 flex items-center justify-center bg-gray-100 rounded-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 5C13.1 5 14 5.9 14 7C14 8.1 13.1 9 12 9C10.9 9 10 8.1 10 7C10 5.9 10.9 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
      </svg>
    </div>, active: false },
    { id: 'firma', label: 'Firma', icon: <div className="w-10 h-10 text-gray-300 flex items-center justify-center bg-gray-100 rounded-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.41 4.94998C20.02 4.55998 19.39 4.55998 19 4.94998L12 11.94L10.59 10.53C10.2 10.14 9.56999 10.14 9.17999 10.53C8.78999 10.92 8.78999 11.56 9.17999 11.95L11.29 14.06C11.68 14.45 12.32 14.45 12.71 14.06L20.41 6.35998C20.8 5.96998 20.8 5.33998 20.41 4.94998ZM4 20C3.45 20 3 19.55 3 19C3 18.45 3.45 18 4 18H15.75C16.3 18 16.75 18.45 16.75 19C16.75 19.55 16.3 20 15.75 20H4Z" fill="currentColor"/>
      </svg>
    </div>, active: false },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-500" />
        Datos personales
      </h3>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Primer Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="primerNombre"
            value={personalData.primerNombre}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-700 mt-8 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16Z" clipRule="evenodd" />
        </svg>
        Biometría
      </h3>

      <div className="grid grid-cols-7 gap-4">
        {biometricOptions.map((option) => (
          <div key={option.id} className="flex flex-col items-center">
            {option.icon}
            <span className={`text-xs mt-2 ${option.active ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};