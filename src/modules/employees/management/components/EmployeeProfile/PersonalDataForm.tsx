// import React, { useState } from 'react';
// import { User, Fingerprint, Eye  } from 'lucide-react';
// import { PersonalDataFormProps } from '../../interface/types';
// import { StructureModal } from './TreeNode';

// const biometricOptions = [
//   { 
//     id: 'rostro', 
//     label: 'Rostro', 
//     active: true,
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"/>
//         <path d="M13 10C13 9.44772 13.4477 9 14 9H14.01C14.5623 9 15.01 9.44772 15.01 10C15.01 10.5523 14.5623 11 14.01 11H14C13.4477 11 13 10.5523 13 10Z" fill="currentColor"/>
//         <path d="M9 15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15H11C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z" fill="currentColor"/>
//         <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8ZM8 5C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5H8Z" fill="currentColor"/>
//       </svg>
//     )
//   },
//   { 
//     id: 'huella', 
//     label: 'Huella', 
//     active: false,
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//         <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/>
//       </svg>
//     )
//   },
//   { 
//     id: 'Tarjeta', 
//     label: 'Tarjeta', 
//     active: false,
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//         <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
//       </svg>
//     )
//   },
//   { 
//     id: 'pin', 
//     label: 'Pin', 
//     active: false,
//     icon: (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
//       </svg>
//     )
//   },
// ];

// export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({ personalData, onChange }) => {
//   const [showStructureModal, setShowStructureModal] = useState(false);
//   return (
//     <div className="p-6">
//       <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//         <User className="w-5 h-5 mr-2 text-blue-500" />
//         Datos personales
//       </h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Primer Nombre <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="primerNombre"
//             value={personalData.primerNombre}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Segundo Nombre
//           </label>
//           <input
//             type="text"
//             name="segundoNombre"
//             value={personalData.segundoNombre}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Primer Apellido <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="primerApellido"
//             value={personalData.primerApellido}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Segundo Apellido
//           </label>
//           <input
//             type="text"
//             name="segundoApellido"
//             value={personalData.segundoApellido}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Género <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="genero"
//               value={personalData.genero}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Mujer">Mujer</option>
//               <option value="Hombre">Hombre</option>
//               <option value="Otro">Otro</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//               <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Tipo De Documento <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="tipoDocumento"
//               value={personalData.tipoDocumento}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Cédula">Cédula</option>
//               <option value="Pasaporte">Pasaporte</option>
//               <option value="DNI">DNI</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//               <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Número De Documento <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="numeroDocumento"
//             value={personalData.numeroDocumento}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Fecha De Nacimiento <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="fechaNacimiento"
//             value={personalData.fechaNacimiento}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Teléfono
//           </label>
//           <div className="flex">
//             <div className="w-16">
//               <select
//                 className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="+57">+57</option>
//                 <option value="+1">+1</option>
//                 <option value="+34">+34</option>
//               </select>
//             </div>
//             <input
//               type="tel"
//               name="telefono"
//               value={personalData.telefono}
//               onChange={onChange}
//               className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Correo Principal
//           </label>
//           <input
//             type="email"
//             name="correo"
//             value={personalData.correo}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       {/* Biometría - Restructurado en dos columnas */}
//       <div className="mt-6">
//         <div className="flex justify-between items-center mb-3">
//           <div className="flex-1">
//             <h4 className="text-md font-medium text-gray-700 flex items-center">
//               <Fingerprint className="w-5 h-5 mr-2 text-blue-500" />
//               Métodos de marcajes permitidos
//             </h4>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <label htmlFor="permitir-visitas" className="mr-2 text-sm font-medium text-gray-700">
//                 Permitir visitas
//               </label>
//               <div className="relative inline-block w-10 mr-2 align-middle select-none">
//                 <input 
//                   type="checkbox" 
//                   name="permitirVisitas" 
//                   id="permitir-visitas" 
//                   className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
//                 />
//                 <label 
//                   htmlFor="permitir-visitas" 
//                   className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
//                 ></label>
//               </div>
//             </div>
//             <button 
//               type="button" 
//               className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//               onClick={() => setShowStructureModal(true)}
//             >
//               <Eye className="w-4 h-4 mr-1" />
//               Ver estructura
//             </button>
//           </div>
//         </div>
//         <div className="grid grid-cols-7 gap-4 mt-2">
//           {biometricOptions.map((option) => (
//             <div key={option.id} className="flex flex-col items-center">
//               <div className={`w-14 h-14 rounded-md flex items-center justify-center ${option.active ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-300'}`}>
//                 {option.icon}
//               </div>
//               <span className={`text-xs mt-2 ${option.active ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
//                 {option.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Sección de datos laborales añadida aquí */}
//       <div className="mt-8">
//         <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//           <User className="w-5 h-5 mr-2 text-blue-500" />
//           Datos laborales
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Código <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="codigo"
//               value={personalData.laborData?.codigo || ""}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="1399"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Modalidad De Tiempo <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <select
//                 name="modalidadTiempo"
//                 value={personalData.laborData?.modalidadTiempo || ""}
//                 onChange={onChange}
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="002-Operativo">002-Operativo</option>
//                 <option value="001-Administrativo">001-Administrativo</option>
//                 <option value="003-Gerencial">003-Gerencial</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Fecha Inicial Contrato <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="fechaInicialContrato"
//               value={personalData.laborData?.fechaInicialContrato || ""}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Fecha Final Contrato
//             </label>
//             <input
//               type="date"
//               name="fechaFinalContrato"
//               value={personalData.laborData?.fechaFinalContrato || ""}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Empresa <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <select
//                 name="empresa"
//                 value={personalData.laborData?.empresa || ""}
//                 onChange={onChange}
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="Emp - Caldelpa S.a.">Emp - Caldelpa S.a.</option>
//                 <option value="Emp - Hodelpa">Emp - Hodelpa</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Sede <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <select
//                 name="sede"
//                 value={personalData.laborData?.sede || ""}
//                 onChange={onChange}
//                 className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="111 - Hodelpa Gran Almirante">111 - Hodelpa Gran Almirante</option>
//                 <option value="112 - Hodelpa Garden">112 - Hodelpa Garden</option>
//                 <option value="113 - Centro Plaza Hodelpa">113 - Centro Plaza Hodelpa</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Estilos CSS para el toggle switch */}
//       <style>{`
//         .toggle-checkbox:checked {
//           right: 0;
//           border-color: #3B82F6;
//         }
//         .toggle-checkbox:checked + .toggle-label {
//           background-color: #3B82F6;
//         }
//         .toggle-label {
//           transition: background-color 0.2s ease;
//         }
//       `}      </style>
      
//       {/* Modal de Estructura Organizacional */}
//       <StructureModal 
//         isOpen={showStructureModal}
//         onClose={() => setShowStructureModal(false)}
//       />
//     </div>
//   );
// };