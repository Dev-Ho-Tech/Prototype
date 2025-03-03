import React from 'react';
import { User, Fingerprint } from 'lucide-react';
import { PersonalDataFormProps } from '../../interface/types';

const biometricOptions = [
  { 
    id: 'rostro', 
    label: 'Rostro', 
    active: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"/>
        <path d="M13 10C13 9.44772 13.4477 9 14 9H14.01C14.5623 9 15.01 9.44772 15.01 10C15.01 10.5523 14.5623 11 14.01 11H14C13.4477 11 13 10.5523 13 10Z" fill="currentColor"/>
        <path d="M9 15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15H11C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8ZM8 5C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5H8Z" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'huella', 
    label: 'Huella', 
    active: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/>
      </svg>
    )
  },
  { 
    id: 'palma', 
    label: 'Palma', 
    active: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3c-4.97 0-9 4.03-9 9 0 .05.01.09.01.14C2.7 11.18 2 10.21 2 9c0-1.86 1.28-3.41 3-3.86V4c0-.55.45-1 1-1s1 .45 1 1v1.14c.6.16 1.15.5 1.57.97.46-.35 1.02-.56 1.63-.56.56 0 1.08.16 1.52.45.43-.29.93-.45 1.45-.45.66 0 1.26.21 1.75.57.46-.35 1.02-.57 1.64-.57 1.38 0 2.5 1.12 2.5 2.5 0 .95-.53 1.77-1.31 2.18.32.73.49 1.54.49 2.39 0 2.97-2.16 5.43-5 5.91V21c0 .55-.45 1-1 1s-1-.45-1-1v-1.91C10.2 18.73 9 17.27 9 15.5c0-.95.53-1.77 1.31-2.18-.32-.73-.49-1.54-.49-2.39C9.84 10.95 10 11 10 11c0 0-.16-.05-.16-.07 0-.07.06-.13.06-.19 0-1.69 1.37-3.06 3.06-3.06.15 0 .29.01.43.03C13.56 6.93 13.76 6 14.75 6c1.07 0 1.92.96 1.92 2.16 0 1.27-.87 2.32-2.02 2.65.21.42.32.89.32 1.38 0 1.71-1.39 3.09-3.1 3.09-.32 0-.63-.05-.91-.14.34-.39.55-.89.55-1.45 0-1.21-.98-2.18-2.18-2.18-.54 0-1.04.2-1.41.54.41.91 1.28 1.57 2.35 1.6.51.93 1.49 1.57 2.65 1.57 1.67 0 3.01-1.36 3.01-3.03 0-1.33-.83-2.46-2-2.91.57-.38.96-1.02.96-1.75 0-.89-.64-1.62-1.49-1.77.31-.34.49-.79.49-1.29 0-1.07-.86-1.94-1.93-1.94-.47 0-.9.17-1.24.45.04-.88.29-1.71.74-2.43-.35.08-.7.19-1.04.31-.04.72-.15 1.39-.31 2.04-.6.21-1.17.47-1.7.79.04-.22.08-.43.13-.63-1.19.25-2.3.75-3.26 1.46.14.12.28.24.41.37.27.11.54.21.82.29.23.25.5.47.8.65.21.12.43.22.67.3.38.13.8.2 1.22.2.08 0 .15-.01.22-.02 0 .03-.01.05-.01.08"/>
      </svg>
    )
  },
  { 
    id: 'iris', 
    label: 'Iris', 
    active: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0-4.5c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
      </svg>
    )
  },
  { 
    id: 'proximidad', 
    label: 'Proximidad', 
    active: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
      </svg>
    )
  },
  { 
    id: 'pin', 
    label: 'Pin', 
    active: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    )
  },
  { 
    id: 'firma', 
    label: 'Firma', 
    active: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.04 12.13c-.14 0-.28.06-.38.17l-1 1 2.05 2.05 1-1c.21-.21.21-.56 0-.77l-1.28-1.28c-.1-.1-.24-.17-.39-.17zm-1.97 1.75L13 19.94V22h2.06l6.06-6.07-2.05-2.05zM11.5 7.69c0-1.07-.87-1.94-1.94-1.94S7.62 6.62 7.62 7.69s.87 1.94 1.94 1.94 1.94-.87 1.94-1.94zm-3.88 10.06c0-1.94 1.94-3.81 4.06-4.23.76-1.76 2.58-3 4.63-3h2.42L17.94 2 12 4.41 6.06 2 5.28 10.5h1.22c1.66 0 2.94.59 4.24 1.96 1.05 1.1 1.91 1.99 3.57 1.99.83 0 1.55-.38 2.01-.96l.24.25c-2.28.4-4.44 1.97-4.91 4.01h-4.03z"/>
      </svg>
    )
  },
];

export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({ personalData, onChange }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-purple-500" />
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Teléfono
          </label>
          <div className="flex">
            <div className="w-16">
              <select
                className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              onChange={onChange}
              className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Biometría */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
          <Fingerprint className="w-5 h-5 mr-2 text-purple-500" />
          Biometría
        </h4>
        <div className="grid grid-cols-7 gap-4 mt-2">
          {biometricOptions.map((option) => (
            <div key={option.id} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-md flex items-center justify-center ${option.active ? 'bg-purple-100 text-purple-500' : 'bg-gray-100 text-gray-300'}`}>
                {option.icon}
              </div>
              <span className={`text-xs mt-2 ${option.active ? 'text-purple-600 font-medium' : 'text-gray-400'}`}>
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};