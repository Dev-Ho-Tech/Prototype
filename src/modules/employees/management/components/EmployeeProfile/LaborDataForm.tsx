// import React from 'react';
// import { Briefcase } from 'lucide-react';
// import { LaborDataFormProps } from '../../interface/types';

// export const LaborDataForm: React.FC<LaborDataFormProps> = ({ laborData, onChange }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg border border-gray-200">
//       <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//         <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
//         Datos laborales
//       </h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Código <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="codigo"
//             value={laborData.codigo}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="1399"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Modalidad De Tiempo <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="modalidadTiempo"
//               value={laborData.modalidadTiempo}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="002-Operativo">002-Operativo</option>
//               <option value="001-Administrativo">001-Administrativo</option>
//               <option value="003-Gerencial">003-Gerencial</option>
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
//             Fecha Inicial Contrato <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="fechaInicialContrato"
//             value={laborData.fechaInicialContrato}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Fecha Final Contrato
//           </label>
//           <input
//             type="date"
//             name="fechaFinalContrato"
//             value={laborData.fechaFinalContrato}
//             onChange={onChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Empresa <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="empresa"
//               value={laborData.empresa}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Emp - Caldelpa S.a.">Emp - Caldelpa S.a.</option>
//               <option value="Emp - Hodelpa">Emp - Hodelpa</option>
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
//             Sede <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="sede"
//               value={laborData.sede}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="111 - Hodelpa Gran Almirante">111 - Hodelpa Gran Almirante</option>
//               <option value="112 - Hodelpa Garden">112 - Hodelpa Garden</option>
//               <option value="113 - Centro Plaza Hodelpa">113 - Centro Plaza Hodelpa</option>
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
//             Tipo De Planificación
//           </label>
//           <div className="relative">
//             <select
//               name="tipoPlanificacion"
//               value={laborData.tipoPlanificacion}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Seleccionar</option>
//               <option value="Fijo">Fijo</option>
//               <option value="Rotativo">Rotativo</option>
//               <option value="Especial">Especial</option>
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
//             Cargo <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="cargo"
//               value={laborData.cargo}
//               onChange={onChange}
//               className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Seleccionar</option>
//               <option value="Vpue 56 - Costurera">Vpue 56 - Costurera</option>
//               <option value="Vpue 34 - Cocinero">Vpue 34 - Cocinero</option>
//               <option value="Vpue 12 - Recepcionista">Vpue 12 - Recepcionista</option>
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
//             Perfiles De Marcaje
//           </label>
//           <div className="relative flex items-center border border-gray-300 p-2 rounded-md">
//             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
//               Principal
//               <button type="button" className="ml-1 text-blue-600 hover:text-blue-800">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//               </button>
//             </span>
//             <button 
//               type="button" 
//               className="text-blue-600 hover:text-blue-800 ml-auto"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };